/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./server/config/index.js":
/*!********************************!*\
  !*** ./server/config/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n//this file is the single source of truth of all things configuration in an environment variable\n\ndotenv__WEBPACK_IMPORTED_MODULE_0__.config();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  db: {\n    host: process.env.DB_HOST,\n    user: process.env.DB_USER,\n    password: process.env.DB_PASS,\n    database: process.env.DB_SCHEMA\n  },\n  jwt: {\n    secret: process.env.JWT_SECRET,\n    expires: process.env.JWT_EXPIRE\n  }\n});\n\n//# sourceURL=webpack://auth-auth/./server/config/index.js?");

/***/ }),

/***/ "./server/db/index.js":
/*!****************************!*\
  !*** ./server/db/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Query\": () => (/* binding */ Query),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql */ \"mysql\");\n/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mysql__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ \"./server/config/index.js\");\n/* harmony import */ var _queries_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queries/users */ \"./server/db/queries/users.js\");\n\n\nconst pool = mysql__WEBPACK_IMPORTED_MODULE_0__.createPool(_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].db);\nconst Query = (query, values) => {\n  return new Promise((resolve, reject) => {\n    pool.query(query, values, (err, results) => {\n      if (err) {\n        reject(err);\n      } else {\n        resolve(results);\n      }\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  users: _queries_users__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n});\n\n//# sourceURL=webpack://auth-auth/./server/db/index.js?");

/***/ }),

/***/ "./server/db/queries/users.js":
/*!************************************!*\
  !*** ./server/db/queries/users.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ \"./server/db/index.js\");\n // const find = (email) => Query('SELECT * FROM users WHERE email = ?', [email]) //finding someone's email in our database//select statements always return arrray of objects\n\nconst find = (column, value) => (0,___WEBPACK_IMPORTED_MODULE_0__.Query)('SELECT * FROM users WHERE ?? = ?', [column, value]);\n\nconst insert = (email, password) => (0,___WEBPACK_IMPORTED_MODULE_0__.Query)('INSERT INTO users (email, password) VALUE (?, ?)', [email, password]); //^this is good for a few insertions but what if there were 30?\n// const insert = (newUser: {email, password}) =>('INSERT INTO users SET ?', newUser)\n//^this statement will cause the below entry to...\n// {\n//     \"email\": \"register@test.com\",\n//     \"password\": \"$2b$12$XRyRk5Cm5ZDTxVo60r.VJOxqCZ3PbIraa0tdfO7GRCAnBY9tJ/7ju\"\n//be processed like this..\n//INSERT INTO users SET email = \"register@test.com\", password = \"$2b$12$XRyRk5Cm5ZDTxVo60r.VJOxqCZ3PbIraa0tdfO7GRCAnBY9tJ/7ju\"\n// }\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  find,\n  insert\n});\n\n//# sourceURL=webpack://auth-auth/./server/db/queries/users.js?");

/***/ }),

/***/ "./server/middlewares/auth.mw.js":
/*!***************************************!*\
  !*** ./server/middlewares/auth.mw.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"tokenCheck\": () => (/* binding */ tokenCheck)\n/* harmony export */ });\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n\n //middleware with the 3 arguments it needs. intercept the request, maybe send a response if it needs to, otherwise move to the next step.\n\nfunction tokenCheck(req, res, next) {\n  passport__WEBPACK_IMPORTED_MODULE_0___default().authenticate('jwt', (err, user, info) => {\n    if (err) {\n      return next(err);\n    }\n\n    if (info) {\n      info.message === \"invalid token\"; //this is the passport response so I am changing it below.\n\n      return res.status(401).json({\n        message: \"this is not the token you are looking for\"\n      }); //here could just be { message: info.message}\n    }\n\n    if (!user) {\n      return res.status(401).json({\n        message: \"redirect to login\"\n      }); //res.redirect('/login')\n    }\n\n    req.user = user;\n    next();\n  })(req, res, next);\n}\n\n//# sourceURL=webpack://auth-auth/./server/middlewares/auth.mw.js?");

/***/ }),

/***/ "./server/middlewares/passport-strategies.mw.js":
/*!******************************************************!*\
  !*** ./server/middlewares/passport-strategies.mw.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport-local */ \"passport-local\");\n/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\n/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../db */ \"./server/db/index.js\");\n/* harmony import */ var _utils_password__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/password */ \"./server/utils/password.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ \"./server/config/index.js\");\n //bring in passport \n\n\n\n\n\n\npassport__WEBPACK_IMPORTED_MODULE_0__.serializeUser((user, done) => {\n  if (user.password) {\n    delete user.password; //security\n  }\n\n  done(null, user);\n});\npassport__WEBPACK_IMPORTED_MODULE_0__.deserializeUser((user, done) => done(null, user)); //passport middleware         //strategy is a constructor function that takes 2 arguments...a configuration or options object, and after that a callback function\n//by default passport is coded to look for a username.\n\npassport__WEBPACK_IMPORTED_MODULE_0__.use(new passport_local__WEBPACK_IMPORTED_MODULE_1__.Strategy({\n  usernameField: 'email',\n  //default is username so need to override with email for login.\n  session: false\n}, async (email, password, done) => {\n  try {\n    const [userFound] = await _db__WEBPACK_IMPORTED_MODULE_3__[\"default\"].users.find('email', email);\n\n    if (userFound && (0,_utils_password__WEBPACK_IMPORTED_MODULE_4__.compareHash)(password, userFound.password)) {\n      done(null, userFound); //call null here b/c there is no error.\n      //could create token here but not recommended b/c this is simply for the logic used for the login.\n    } else {\n      //this is if the password fails or the user is not found\n      done(null, false); //null b/c there is no error and false b/c no user was found\n      //the false here sends a status 401 text of Unauthorized error message\n    }\n  } catch (error) {\n    done(error);\n  }\n})); // const token = jwt.sign(  \n//     { userid: req.user.id, email: req.user.email, role: 'guest'}, \n//     config.jwt.secret,   \n//     { expiresIn: '15d'} \n//     ); //payload\n//this dosen't know what the payload is \n\npassport__WEBPACK_IMPORTED_MODULE_0__.use(new passport_jwt__WEBPACK_IMPORTED_MODULE_2__.Strategy({\n  jwtFromRequest: passport_jwt__WEBPACK_IMPORTED_MODULE_2__.ExtractJwt.fromAuthHeaderAsBearerToken(),\n  secretOrKey: _config__WEBPACK_IMPORTED_MODULE_5__[\"default\"].jwt.secret\n}, (payload, done) => {\n  try {\n    done(null, payload);\n  } catch (error) {\n    done;\n  }\n}));\n\n//# sourceURL=webpack://auth-auth/./server/middlewares/passport-strategies.mw.js?");

/***/ }),

/***/ "./server/routes/api/index.js":
/*!************************************!*\
  !*** ./server/routes/api/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _pizza__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pizza */ \"./server/routes/api/pizza.js\");\n\n\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\nrouter.use('/pizza', _pizza__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://auth-auth/./server/routes/api/index.js?");

/***/ }),

/***/ "./server/routes/api/pizza.js":
/*!************************************!*\
  !*** ./server/routes/api/pizza.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _middlewares_auth_mw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../middlewares/auth.mw */ \"./server/middlewares/auth.mw.js\");\n// import * as jwt from 'jsonwebtoken'; \n// import config from '../../config'; \n\n\n\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)(); // router.get('/', passport.authenticate('jwt', {successRedirect: '', failureRedirect : '', session: false}), (req,res) => {           \n//^instead of authenticate we want to use our tokenCheck() from auth.mw.js.\n\nrouter.get('/', _middlewares_auth_mw__WEBPACK_IMPORTED_MODULE_2__.tokenCheck, (req, res) => {\n  try {\n    //    //no token? no go\n    // const bearerToken = req.headers.authorization?.split(' '); \n    // const token = bearerToken && bearerToken[0] === \"Bearer\" ? bearerToken[1] : null;\n    // if (!bearerToken || !token) {\n    //     res.status(401).json({ message: 'unauthorized'});\n    //     return;\n    // }\n    // //validate that the token is not expired and has the correct signature\n    // const payload = jwt.verify(token, config.jwt.secret); \n    // console.log(token);\n    res.json({\n      message: `Hell Yeah, got that token ${req.user.email}!!!`\n    });\n  } catch (error) {\n    console.log(error);\n    res.status(500).json({\n      message: 'my code sucks',\n      error: error.message\n    });\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://auth-auth/./server/routes/api/pizza.js?");

/***/ }),

/***/ "./server/routes/auth/index.js":
/*!*************************************!*\
  !*** ./server/routes/auth/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login */ \"./server/routes/auth/login.js\");\n/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register */ \"./server/routes/auth/register.js\");\n\n\n\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\nrouter.use('/login', _login__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nrouter.use('/register', _register__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://auth-auth/./server/routes/auth/index.js?");

/***/ }),

/***/ "./server/routes/auth/login.js":
/*!*************************************!*\
  !*** ./server/routes/auth/login.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config */ \"./server/config/index.js\");\n\n //we won't be using all of passport so we can import just one thing from it called authenticate.\n// import { authenticate } from 'passport';\n\n // import db from '../../db'; \n\n // import { compareHash } from '../../utils/password';\n\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_2__.Router)(); //this function's sole purpose now to retrieve and receive the userFound info, make the token, and send the token as a response.\n\nrouter.post('/', passport__WEBPACK_IMPORTED_MODULE_1__.authenticate('local', {\n  successRedirect: '',\n  //you could put a route to a page upon successful or unsuccessful completion.\n  failureRedirect: '',\n  session: false\n}), async (req, res) => {\n  //this part was moved to the passport.use function\n  // const email = req.body.email;\n  // const password = req.body.password;\n  try {\n    // console.log(req.user); //this property req.user is created by userFound in passport-strategies. it knows how to populate req.user with the done() from that page.\n    //check for the users email\n    // const [userFound] = await db.users.find('email', email);\n    // console.log(userFound);\n    //checking if users email is found && if passwords compare and pass\n    // if ( userFound && compareHash(password, userFound.password)) {\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__.sign({\n      userid: req.user.id,\n      email: req.user.email,\n      role: 'guest'\n    }, //userFound here is changed to req.user\n    _config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwt.secret, // { expiresIn: '15d'} \n    {\n      expiresIn: _config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwt.expires\n    }); //payload\n\n    res.json(token); //can't have multiple callbacks Ex. res.status after res.json\n    // res.status(401).json({ message: 'invalid credentials'});\n    //    res.json('plz'); //if this is left in the error occurs (Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client)\n    //The error \"Error: Can't set headers after they are sent.\" means that you're already in the Body or Finished state, but some function tried to set a header or statusCode.\n  } catch (error) {\n    console.log(error);\n    res.status(500).json({\n      message: 'my code sucks!'\n    });\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://auth-auth/./server/routes/auth/login.js?");

/***/ }),

/***/ "./server/routes/auth/register.js":
/*!****************************************!*\
  !*** ./server/routes/auth/register.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../db */ \"./server/db/index.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config */ \"./server/config/index.js\");\n/* harmony import */ var _utils_password__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/password */ \"./server/utils/password.js\");\n\n\n\n\n\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_1__.Router)();\nrouter.post('/', async (req, res) => {\n  const newUser = req.body;\n\n  try {\n    newUser.password = (0,_utils_password__WEBPACK_IMPORTED_MODULE_4__.generateHash)(newUser.password); //the right side of the assignment will be evaluated first.\n    //^this will take their current plain text password salt and hash it and reassign it over itself on the newUser.\n\n    const result = await _db__WEBPACK_IMPORTED_MODULE_2__[\"default\"].users.insert(req.body.email, req.body.password);\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__.sign({\n      userid: result.insertId,\n      email: newUser.email,\n      role: 'guest'\n    }, //result.unsertId is who just got inserted into the databasew\n    _config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwt.secret, {\n      expiresIn: _config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwt.expires\n    });\n    console.log(newUser); // const token = jwt.sign(\n    //     { userid: req.user.id, email: req.user.email, role: 'guest' },\n    //     config.jwt.secret,\n    //     { expiresIn: '15d' }\n    // ); //payload\n    // res.json(token);\n\n    res.json(token);\n  } catch (error) {\n    console.log(error);\n    res.status(500).json({\n      message: 'my code sucks!'\n    });\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://auth-auth/./server/routes/auth/register.js?");

/***/ }),

/***/ "./server/routes/index.js":
/*!********************************!*\
  !*** ./server/routes/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"./server/routes/api/index.js\");\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth */ \"./server/routes/auth/index.js\");\n\n\n\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\nrouter.use('/api', _api__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nrouter.use('/auth', _auth__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://auth-auth/./server/routes/index.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ \"./server/routes/index.js\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _middlewares_passport_strategies_mw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middlewares/passport-strategies.mw */ \"./server/middlewares/passport-strategies.mw.js\");\n\n\n //bring in passport \n// import * as PassportLocal from 'passport-local';\n\n //when the server starts it will run this file as a side effect.\n//then passport will initialize with these strategies from tis file coded on it.\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0__(); //all this moved to passport-strategies.mw.js\n// import db from './db';\n// import { compareHash } from './utils/password';\n// //passport middleware         //strategy is a constructor function that takes 2 arguments...a configuration or options object, and after that a callback function\n// //by default passport is coded to look for a username.\n// passport.use(new PassportLocal.Strategy({\n//     usernameField: 'email' //default is username so need to override with email for login.\n// }, async (email, password, done) => {\n//     try {\n//         const [userFound] = await db.users.find('email', email);  \n//         if (userFound && compareHash(password, userFound.password)) {\n//             done(null, userFound); //call null here b/c there is no error.\n//             //could create token here but not recommended b/c this is simply for the logic used for the login.\n//         } else { //this is if the password fails or the user is not found\n//             done(null, false); //null b/c there is no error and false b/c no user was found\n//         }\n//     } catch (error) {\n//         done(error);\n//     }\n// }));\n\napp.use(passport__WEBPACK_IMPORTED_MODULE_2__.initialize()); //this makes it available middleware\n\napp.use(express__WEBPACK_IMPORTED_MODULE_0__[\"static\"]('public'));\napp.use(express__WEBPACK_IMPORTED_MODULE_0__.json());\napp.use(_routes__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nconst port = process.env.Port || 3000;\napp.listen(port, () => {\n  console.log(`Server listening on port: ${port}`);\n});\nconsole.log('You can do it!!');\n\n//# sourceURL=webpack://auth-auth/./server/server.js?");

/***/ }),

/***/ "./server/utils/password.js":
/*!**********************************!*\
  !*** ./server/utils/password.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"compareHash\": () => (/* binding */ compareHash),\n/* harmony export */   \"generateHash\": () => (/* binding */ generateHash)\n/* harmony export */ });\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_0__);\n //generateHash('password123'); \n\nfunction generateHash(password) {\n  const salt = bcrypt__WEBPACK_IMPORTED_MODULE_0__.genSaltSync(12);\n  const hash = bcrypt__WEBPACK_IMPORTED_MODULE_0__.hashSync(password, salt);\n  return hash;\n}\nfunction compareHash(password, hashed) {\n  return bcrypt__WEBPACK_IMPORTED_MODULE_0__.compareSync(password, hashed);\n} // console.log(generateHash('password123'));\n// console.log(compareHash('password123', '$2b$12$YKmf3M4uLKDO8jpFx6sQYO96OknleImqWCa9GYwGHr53xgIjySEne'))\n\n//# sourceURL=webpack://auth-auth/./server/utils/password.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

module.exports = require("mysql");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("passport");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	
/******/ })()
;