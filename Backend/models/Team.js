const { request } = require('express');
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    teamname: {
        type: String,
        required: true,
    },
    Instituename: {
        type: String,
        required: true,
    },
    teamLeader: {
        type: String,
        required: true,
    },
    teamLeader_email: {
        type: String,
        required: true,
    },
    teamLeader_mobile: {
        type: String,
        required: true
    },
    teamLeader_branch: {
        type: String,
        required: true,
    },
    teamLeader_year: {
        type: String,
        required: true
    },
    team_member1_name: {
        type: String
    },
    team_member1_email: {
        type: String,
    },
    team_member1_mob: {
        type: String,
    },
    team_member1_branch: {
        type: String,
    },
    team_member1_year: {
        type: String
    },
    team_member2_name: {
        type: String
    },
    team_member2_email: {
        type: String,
    },
    team_member2_mob: {
        type: String,
    },
    team_member2_branch: {
        type: String,
    },
    team_member2_year: {
        type: String
    },
    team_member3_name: {
        type: String
    },
    team_member3_email: {
        type: String,
    },
    team_member3_mob: {
        type: String,
    },
    team_member3_branch: {
        type: String,
    },
    team_member3_year: {
        type: String
    },
    team_member4_name: {
        type: String
    },
    team_member4_email: {
        type: String,
    },
    team_member4_mob: {
        type: String,
    },
    team_member4_branch: {
        type: String,
    },
    team_member4_year: {
        type: String
    },

    image_url:{
        type:String,
        required:true,
    },

    tranjectionId:{
        type:String,
        required:true,
    }
});


module.exports = mongoose.model('Team', TeamSchema);





