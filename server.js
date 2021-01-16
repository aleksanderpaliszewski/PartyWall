const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');

const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

server.use(jsonServer.defaults());

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

const key = '123456789';
const expiresIn = '1h';

const createToken = (payload) => jwt.sign(payload, key, {expiresIn});

const verifyToken = (token) =>
  jwt.verify(token, key, (err, decode) =>
    decode !== undefined ? decode : err,
  );

const isAuthenticated = ({email, password}) =>
  userdb.users.some(
    (user) => user.email === email && user.password === password,
  );

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (!isAuthenticated({email, password})) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({status, message});
    return;
  }
  const access_token = createToken({email, password});
  res.status(200).json({access_token});
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
  } catch ({status, message}) {
    res.status(status).json({status, message});
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('Run Auth API Server');
});

server.use('/api', router);
