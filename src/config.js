require("dotenv").config();

module.exports = {
   bot: {
      token: process.env.BOT_TOKEN,
      clientId: process.env.BOT_CLIENT_ID
   },
   db: {
      url: process.env.MONGODB_URL
   }
};
