const express = require("express");
const router = express.Router();

const { createReferral, getMyReferrals } = require("../controllers/campusAmbassador");

const { auth } = require("../middleware/auth");

router.post("/create-referral", auth, createReferral);

router.get("/my-referrals", auth, getMyReferrals);

module.exports = router;
