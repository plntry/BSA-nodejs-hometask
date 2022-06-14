const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', (req, res, next) => {
    try {
      const users = UserService.showList('names');
      res.data = users;
    } catch (err) {
      res.notFound = true;
      res.message = err.message;
    }
    next();
  },
  responseMiddleware
);

router.get('/:id', (req, res, next) => {
    try {
      const findUser = UserService.search({ id: req.params.id });
      res.data = findUser;
    } catch (err) {
      res.notFound = true;
      res.message = err.message;
    }
    next();
  },
  responseMiddleware
);

router.post('/', createUserValid, (req, res, next) => {
      if (!res.badRequest) {
        try {
          const user = UserService.createUser(req.body);
          res.data = user;
        } catch (err) {
          res.badRequest = true;
          res.message = err.message;
        }
      }
      next();
    },
    responseMiddleware
  );
  
  router.put('/:id', updateUserValid, (req, res, next) => {
      if (!res.badRequest) {
        try {
          const user = UserService.updateUser(req.params.id, req.body);
          res.data = user;
        } catch (err) {
          res.badRequest = true;
          res.message = err.message;
        }
      }
      next();
    },
    responseMiddleware
  );
  
  router.delete('/:id', (req, res, next) => {
      try {
        const user = UserService.deleteUser(req.params.id);
        res.data = user;
      } catch (err) {
        res.notFound = true;
        res.message = err.message;
      }
      next();
    },
    responseMiddleware
  );

module.exports = router;