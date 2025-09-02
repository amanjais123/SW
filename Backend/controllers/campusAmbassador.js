const CampusAmbassadorReferral = require("../models/CampusAmbassadorReferral");
const User = require("../models/User");

exports.createReferral = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { teamName, teamLeaderName } = req.body;

    if (!teamName || !teamLeaderName) {
      return res.status(400).json({
        success: false,
        message: "Team name and team leader name are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.accountType !== "Campus_Ambasdor") {
      return res.status(403).json({
        success: false,
        message: "Only Campus Ambassadors can create referrals",
      });
    }

    const referral = await CampusAmbassadorReferral.create({
      ambassador: user._id,
      teamName,
      teamLeaderName,
    });

    return res.status(201).json({
      success: true,
      message: "Referral created successfully",
      data: referral,
    });
  } catch (error) {
    console.error("Error creating referral:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getMyReferrals = async (req, res) => {
  try {
    const userId = req.user.id;

    const referrals = await CampusAmbassadorReferral.find({ ambassador: userId });

    return res.status(200).json({
      success: true,
      data: referrals,
    });
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
