const Team = require('../models/Team');
const cloudinary=require('cloudinary').v2;
const mongoose=require('mongoose');
const mailSender = require('../utils/mailsender');


function isfiletypesupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}


async function uploadfilecloudinary(file, folder, quality) {
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.TeamDetails = async (req, res) => {
    try {
        console.log("Form data:", req.body);
        console.log("File uploaded:", req.files);

        const {
            teamname,
            Instituename,
            teamLeader,
            teamLeader_email,
            teamLeader_mobile,
            teamLeader_branch,
            teamLeader_year,
            team_member1_name,
            team_member1_email,
            team_member1_mob,
            team_member1_branch,
            team_member1_year,
            team_member2_name,
            team_member2_email,
            team_member2_mob,
            team_member2_branch,
            team_member2_year,
            team_member3_name,
            team_member3_email,
            team_member3_mob,
            team_member3_branch,
            team_member3_year,
            team_member4_name,
            team_member4_email,
            team_member4_mob,
            team_member4_branch,
            team_member4_year,
            tranjectionId,
        } = req.body;

        const uploadedImage = req.files.imagefile;
        console.log(uploadedImage);

        if (!teamname || !Instituename || !teamLeader || !teamLeader_email || !teamLeader_mobile || !teamLeader_branch || !teamLeader_year || !tranjectionId) {
            return res.status(400).json({
                success:false,
                message: "All team leader fields are required" 
            });
        }

        const supportedFiles = ["jpeg", "jpg", "png"];
        const filetype = uploadedImage.name.split('.').pop().toLowerCase();
        if (!isfiletypesupported(filetype, supportedFiles)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        const response = await uploadfilecloudinary(uploadedImage, "uploadnew");
        console.log(response);

        const team = await Team.create({
            teamname,
            Instituename,
            teamLeader,
            teamLeader_email,
            teamLeader_mobile,
            teamLeader_branch,
            teamLeader_year,
            team_member1_name,
            team_member1_email,
            team_member1_mob,
            team_member1_branch,
            team_member1_year,
            team_member2_name,
            team_member2_email,
            team_member2_mob,
            team_member2_branch,
            team_member2_year,
            team_member3_name,
            team_member3_email,
            team_member3_mob,
            team_member3_branch,
            team_member3_year,
            team_member4_name,
            team_member4_email,
            team_member4_mob,
            team_member4_branch,
            team_member4_year,
            image_url: response.secure_url,
            tranjectionId
        });


        const allEmails = [
            teamLeader_email,
            team_member1_email,
            team_member2_email,
            team_member3_email,
            team_member4_email
        ].filter(email => email); 

        await mailSender(
            allEmails.join(","),
            "🎉 Team Registration Successful",
            registrationEmailTemplate(teamname, Instituename)
        );

        res.status(201).json({
            success:true,
            message: "Team registered successfully and emails sent",
            data: team
        });

    } catch (error) {
        res.status(500).json({
            message: "Error registering team",
            error: error.message
        });
    }
};


exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        if(!teams){
            return res.status(404).json({
                success:false,
                message:"Teams data are not fetched"
            })
        }
        res.status(200).json({
            message: "Teams fetched successfully",
            data: teams
        });
    } 
    catch (error) {
        res.status(500).json({
            message: "Error fetching teams",
            error: error.message
        });
    }
};


exports.getTeamByLeaderEmail = async (req, res) => {
    try {
        // You can take email from logged-in user (req.user) if you are using auth middleware
        // or directly from query/body if you pass it in request
        const leaderEmail = req.user?.email || req.query.email || req.body.email;

        if (!leaderEmail) {
            return res.status(400).json({
                success: false,
                message: "Leader email is required"
            });
        }

        // Find team where leader email matches
        const team = await Team.findOne({ teamLeader_email: leaderEmail });

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "No team found for this leader email"
            });
        }

        res.status(200).json({
            success: true,
            message: "Team fetched successfully",
            data: team
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching team by leader email",
            error: error.message
        });
    }
};

exports.updateTeam = async (req, res) => {
  try {
    const leaderEmail = req.params.email; // take from URL

    if (!leaderEmail) {
      return res.status(400).json({
        success: false,
        message: "Leader email is required to update team"
      });
    }

    // Extract allowed fields (team name + members only, not leader)
    const {
      teamname,

      team_member1_name,
      team_member1_email,
      team_member1_mob,
      team_member1_branch,
      team_member1_year,

      team_member2_name,
      team_member2_email,
      team_member2_mob,
      team_member2_branch,
      team_member2_year,

      team_member3_name,
      team_member3_email,
      team_member3_mob,
      team_member3_branch,
      team_member3_year,

      team_member4_name,
      team_member4_email,
      team_member4_mob,
      team_member4_branch,
      team_member4_year,
    } = req.body;

    const updateData = {
      teamname,

      team_member1_name,
      team_member1_email,
      team_member1_mob,
      team_member1_branch,
      team_member1_year,

      team_member2_name,
      team_member2_email,
      team_member2_mob,
      team_member2_branch,
      team_member2_year,

      team_member3_name,
      team_member3_email,
      team_member3_mob,
      team_member3_branch,
      team_member3_year,

      team_member4_name,
      team_member4_email,
      team_member4_mob,
      team_member4_branch,
      team_member4_year,
    };

    // remove undefined values
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    // find team by leader email
    const team = await Team.findOneAndUpdate(
      { teamLeader_email: leaderEmail },
      updateData,
      { new: true, runValidators: true }
    );

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found for this leader email"
      });
    }

    res.status(200).json({
      success: true,
      message: "Team details updated successfully",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating team details",
      error: error.message,
    });
  }
};



function registrationEmailTemplate(teamname, Instituename) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">

  
    <h2 style="color: #4CAF50; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px;">
        🎉 Registration Successful!
    </h2>

    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin-bottom: 20px;">
        Congratulations 🎉,
    </p>

    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin-bottom: 20px;">
        Your team <b>${teamname}</b> from <b>${Instituename}</b> has been successfully registered for the <b>SwiftWing'25</b> event!
    </p>

    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin-bottom: 30px;">
        Get ready to showcase your talent! We will share more details with you soon. Stay tuned for upcoming updates!
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin-bottom: 30px;">

    <p style="font-size: 14px; color: #777777; text-align: center; line-height: 1.6;">
        Regards,<br>
        <span style="font-weight: bold; color: #4CAF50;">Rajneesh Event Team</span>
    </p>

    <!-- Footer section -->
    <div style="font-size: 12px; color: #999999; text-align: center; margin-top: 20px;">
        <p>SwiftWing'25 - The Event of the Year</p>
        <p>If you have any questions, feel free to <a href="mailto:info@swiftwing25.com" style="color: #4CAF50;">contact us</a>.</p>
    </div>
</div>

    `;
}




