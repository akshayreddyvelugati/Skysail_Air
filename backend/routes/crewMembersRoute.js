const express = require('express');
const router = express.Router();
const crewMembersController = require('../controllers/crewMembersController');

module.exports = (pool) => {
  const controller = crewMembersController(pool);
  router.get('/', controller.getAllCrewMembers);
  router.post('/', controller.addCrewMember);
  router.put('/:id', controller.updateCrewMember);
  router.delete('/:id', controller.deleteCrewMember);

  return router;
};