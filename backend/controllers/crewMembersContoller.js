const crewMembersModel = require('../models/crewMembersModel');

exports.getAllCrewMembers = async (req, res) => {
  try {
    const crew = await crewMembersModel.getAllCrewMembers();
    res.json(crew);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching crew members' });
  }
};

exports.addCrewMember = async (req, res) => {
  try {
    const newCrew = await crewMembersModel.addCrewMember(req.body);
    res.status(201).json(newCrew);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding crew member' });
  }
};

exports.updateCrewMember = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCrew = await crewMembersModel.updateCrewMember(id, req.body);
    res.json(updatedCrew);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating crew member' });
  }
};

exports.deleteCrewMember = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCrew = await crewMembersModel.deleteCrewMember(id);
    res.json(deletedCrew);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting crew member' });
  }
};
