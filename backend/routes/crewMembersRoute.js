const express = require('express');
const router = express.Router();
const crewMembersController = require('../controllers/crewMembersController');

router.get('/', crewMembersController.getAllCrewMembers);
router.post('/', crewMembersController.addCrewMember);
router.put('/:id', crewMembersController.updateCrewMember);
router.delete('/:id', crewMembersController.deleteCrewMember);

module.exports = router;
