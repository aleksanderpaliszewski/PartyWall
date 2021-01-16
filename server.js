const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');

server.use(jsonServer.defaults());

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

const key = '123456789';
const expiresIn = '1h';

const createToken = (payload) => jwt.sign(payload, key, {expiresIn});

const verifyToken = (token) =>
  jwt.verify(token, key, (err, decode) => {
    if (err) {
      throw err;
    }
    return decode;
  });

const isAuthenticated = ({email, password}) => {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

  return userdb.users.some(
    (user) => user.email === email && user.password === password,
  );
};

const emailExists = ({email}) => {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

  return userdb.users.some((user) => user.email === email);
};

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (!isAuthenticated({email, password})) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({status, message});
    return;
  }
  const jwtToken = createToken({email, password});
  res.status(200).json({jwtToken});
});

server.post('/auth/register', (req, res) => {
  const {email, password} = req.body;

  if (emailExists({email})) {
    const status = 401;
    const message = 'Email already exist';
    res.status(status).json({status, message});
    return;
  }

  fs.readFile('./users.json', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({status, message});
      return;
    }

    let db = JSON.parse(data.toString());

    const id = db.users[db.users.length - 1].id + 1;

    db.users.push({id, email, password});

    fs.writeFile('./users.json', JSON.stringify(db), (err) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({status, message});
      }
      const jwtToken = createToken({email, password});
      res.status(200).json({jwtToken});
    });
  });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({status, message});
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error: access_token is not valid';
    res.status(status).json({status, message});
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('Run Auth API Server');
});

server.use('/api', router);
