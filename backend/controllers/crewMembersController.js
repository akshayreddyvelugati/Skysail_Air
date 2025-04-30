const crewMembersModel = require('../models/crewMembersModel');

module.exports = (pool) => {
  return {
    getAllCrewMembers: async (req, res) => {
      try {
        const crew = await crewMembersModel(pool).getAllCrewMembers();
        res.json(crew);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching crew members' });
      }
    },

    addCrewMember: async (req, res) => {
      try {
        const { position, license_number } = req.body;
        // Validate license_number for Captain and First Officer
        if ((position === 'Captain' || position === 'First Officer') && !license_number) {
          throw new Error('License number is required for Captain and First Officer');
        }
        const newCrew = await crewMembersModel(pool).addCrewMember(req.body);
        res.status(201).json(newCrew);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Server error adding crew member' });
      }
    },

    updateCrewMember: async (req, res) => {
      const { id } = req.params;
      try {
        const { position, license_number } = req.body;
        // Validate license_number for Captain and First Officer during update
        if ((position === 'Captain' || position === 'First Officer') && !license_number) {
          throw new Error('License number is required for Captain and First Officer');
        }
        const updatedCrew = await crewMembersModel(pool).updateCrewMember(id, req.body);
        res.json(updatedCrew);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error updating crew member' });
      }
    },

    deleteCrewMember: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedCrew = await crewMembersModel(pool).deleteCrewMember(id);
        res.json(deletedCrew);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error deleting crew member' });
      }
    }
  };
};