const Schedule = require("../../models/Schedule");
const cloudinary = require("../../utils/coludinary");
const convertBufferToString = require("../../utils/convertBufferToString");

module.exports = {
  async createSchedule(req, res) {
    try {
      if (req.user.role === "Admin") {
        const {
          matchDate,
          matchType,
          matchPlace,
          team1,
          team2,
          capacity,
          price,
        } = req.body;
        let imageContent1 = null;
        let imageContent2 = null;
        let ticketContent = null

        let team1ImageUrl = null;
        let team2ImageUrl = null;
        let ticket = null

        for (let i = 0; i < req.files.length; i++) {
          if (req.files[i].originalname === `${team1}.png`) {
            imageContent1 = await convertBufferToString(
              req.files[i].originalname,
              req.files[i].buffer
            );
            const imageResponse1 = await cloudinary.uploader.upload(
              imageContent1
            );
            team1ImageUrl = imageResponse1.secure_url;
          }
          if (req.files[i].originalname === `${team2}.png`) {
            imageContent2 = await convertBufferToString(
              req.files[i].originalname,
              req.files[i].buffer
            );
            const imageResponse2 = await cloudinary.uploader.upload(
              imageContent2
            );
            team2ImageUrl = imageResponse2.secure_url;
          }
          if (req.files[i].mimetype === `application/pdf`) {
            ticketContent = await convertBufferToString(
              req.files[i].originalname,
              req.files[i].buffer
            );
            const imageResponse2 = await cloudinary.uploader.upload(
              ticketContent
            );
            ticket = imageResponse2.secure_url;
          }
        }

        const adminId = req.user._id;
        if (
          !matchDate ||
          !matchType ||
          !matchPlace ||
          !team1 ||
          !team2 ||
          !capacity ||
          !price
        ) {
          return res.json({ statusCode: 400, message: "Bad request" });
        }

        const schedule = await Schedule.create({
          adminId,
          matchDate,
          matchType,
          matchPlace,
          team1,
          team2,
          capacity,
          price,
          team1ImageUrl,
          team2ImageUrl,
          ticket
        });
        return res.status(201).json({ statusCode: 201, schedule });
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  },

  async updateSchedule(req, res) {
    try {
      if (req.user.role === "Admin") {
        const {
          matchDate,
          matchType,
          matchPlace,
          team1,
          team2,
          capacity,
          price,
        } = req.body;
        let imageContent1 = null;
        let imageContent2 = null;

        let team1ImageUrl = null;
        let team2ImageUrl = null;

        for (let i = 0; i < req.files.length; i++) {
          if (req.files[i].originalname === `${team1}.png`) {
            imageContent1 = await convertBufferToString(
              req.files[i].originalname,
              req.files[i].buffer
            );
            const imageResponse1 = await cloudinary.uploader.upload(
              imageContent1
            );
            team1ImageUrl = imageResponse1.secure_url;
          }
          if (req.files[i].originalname === `${team2}.png`) {
            imageContent2 = await convertBufferToString(
              req.files[i].originalname,
              req.files[i].buffer
            );
            const imageResponse2 = await cloudinary.uploader.upload(
              imageContent2
            );
            team2ImageUrl = imageResponse2.secure_url;
          }
        }

        const { scheduleId } = req.params;
        const schedule = await Schedule.findOne({ _id: scheduleId });
        if (!schedule)
          return res
            .status(400)
            .json({ statusCode: 400, message: "No Such schedule Exists" });
        if (
          team1ImageUrl ||
          team2ImageUrl ||
          matchType ||
          matchDate ||
          matchPlace ||
          team1 ||
          team2 ||
          price ||
          capacity
        ) {
          if (team1ImageUrl) await schedule.updateOne({ team1ImageUrl });
          if (team2ImageUrl) await schedule.updateOne({ team2ImageUrl });
          if (matchType) await schedule.updateOne({ matchType });
          if (matchDate) await schedule.updateOne({ matchDate });
          if (matchPlace) await schedule.updateOne({ matchPlace });
          if (team1) await schedule.updateOne({ team1 });
          if (team2) await schedule.updateOne({ team2 });
          if (price) await schedule.updateOne({ price });
          if (capacity) await schedule.updateOne({ capacity });
        }
        return res
          .status(200)
          .json({ statusCode: 200, message: "Updated Sucseesfully" });
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  },

  async deleteSchedule(req, res) {
    try {
      const { scheduleId } = req.params;
      const schedule = await Schedule.findOne({_id: scheduleId})
      if (req.user.role === "Admin") {
        if(schedule){
          await Schedule.findByIdAndDelete({ _id: scheduleId });
          return res.json({ statusCode: 200, message: "Schedule Deleted Sucseesfully" });
        }
        else{
            return res.json({ statusCode: 400, message: 'No Such Schedule found' })
        }
      }
      else{
          return res.json({statusCode: 400, message: 'Sorry only Admin can delete the Schedule'})
      }
    } catch (err) {
      return res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  },
};
