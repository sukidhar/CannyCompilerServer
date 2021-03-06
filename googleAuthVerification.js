const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports.verifyGID = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: process.env.APP_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};
