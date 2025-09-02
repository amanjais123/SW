const express = require('express');
const router = express.Router();
const { TeamDetails, getTeams , getTeamByLeaderEmail ,updateTeam} = require('../controllers/Team');
const {auth} = require('../middleware/auth')
router.post('/teams', TeamDetails);   
router.get('/teams', getTeams);       
router.get('/teamdetails' ,auth ,getTeamByLeaderEmail );
router.put("/update/:email", updateTeam);

module.exports = router;


