const { getAccessToken, getUserDiscordProfile } = require('./auth-service');

async function handleGetAccessToken(req, res) {
  try {
    const { code } = req.query;
    const data = await getAccessToken(code);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function handleGetUserInfo(req, res) {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(404).json({ message: 'No authorization header found' });
  }

  const token = header.split(' ')[1];
  if (!token) {
    return res.status(404).json({ message: 'No authorization token found' });
  }

  try {
    const user = await getUserDiscordProfile(token);
    if (!user) {
      return res.status(404).json({
        message: 'No user found',
      });
    }
    return res.send(user)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      error,
    });
  }
}

module.exports = { handleGetAccessToken, handleGetUserInfo };
