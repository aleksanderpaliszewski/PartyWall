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

const isAuthenticated = ({username, password}) => {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

  return userdb.users.some(
    (user) => user.username === username && user.password === password,
  );
};

const mockPasswordExists = ({username}) => {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

  return userdb.users.some((user) => user.username === username);
};

server.post('/auth/login', (req, res) => {
  const {username, password} = req.body;
  if (!isAuthenticated({username, password})) {
    const status = 401;
    const message = 'Incorrect username or password';
    res.status(status).json({status, message});
    return;
  }
  const jwtToken = createToken({username, password});
  res.status(200).json({jwtToken});
});

server.post('/auth/register', (req, res) => {
  const {username, mockPassword, password} = req.body;

  if (mockPasswordExists({mockPassword})) {
    const status = 401;
    const message = 'Username already exist';
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

    db.users.push({id, username: username.trim(), password});

    fs.writeFile('./users.json', JSON.stringify(db), (err) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({status, message});
      }
      const jwtToken = createToken({username, password});
      res.status(200).json({jwtToken});
    });
  });
});

server.post('/products', (req, res, next) => {
  const {name, quantity, price, description, weight, volume} = req.body;

  fs.readFile('./db.json', (err, data) => {
    if (err) {
      const {status, message} = err;
      res.status(status).json({status, message});
      return;
    }

    let db = JSON.parse(data.toString());

    const id = db.products[db.products.length - 1].id + 1;

    db.products.push({id, name, quantity, price, description, weight, volume});

    fs.writeFile('./db.json', JSON.stringify(db), (err) => {
      if (err) {
        const {status, message} = err;
        res.status(status).json({status, message});
      }
      next();
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
