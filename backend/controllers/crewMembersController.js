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
        const newCrew = await crewMembersModel(pool).addCrewMember(req.body);
        res.status(201).json(newCrew);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error adding crew member' });
      }
    },

    updateCrewMember: async (req, res) => {
      const { id } = req.params;
      try {
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