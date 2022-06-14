const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// DONE
// TODO: Implement route controllers for fighter

router.get('/', (req, res, next) => {
    try {
      const fighters = FighterService.showList();
      res.data = fighters;
    } catch (err) {
      res.notFound = true;
      res.message = err.message;
    }

    next();
  },

  responseMiddleware
);
//!
router.get('/:id', (req, res, next) => {
    try {
      const findFighter = FighterService.search({ id: req.params.id });
      res.data = findFighter;
    } catch (err) {
      res.notFound = true;
      res.message = err.message;
    }

    next();
  },

  responseMiddleware
);
//!
router.post('/', createFighterValid, (req, res, next) => {
      if (!res.badRequest) {
        try {
          const fighter = FighterService.createFighter(req.body);
          res.data = fighter;
        } catch (err) {
          res.badRequest = true;
          res.message = err.message;
        }
      }
      
      next();
    },

    responseMiddleware
  );

  router.put('/:id', updateFighterValid, (req, res, next) => {
      if (!res.badRequest) {
        try {
          const fighter = FighterService.updateFighter(req.params.id, req.body);
          res.data = fighter;
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
        const fighterToDelete = FighterService.deleteFighter(req.params.id);
        res.data = fighterToDelete;
      } catch (err) {
        res.notFound = true;
        res.message = err.message;
      }
      req.body = fighterToDelete;

      next();
    },

    responseMiddleware
  );

module.exports = router;