const axios = require('axios');
const DISCORD_URLS =  require('../../shared/constants');

exports.getAccessToken = async (code) => {
  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.DISCORD_CLIENT_ID);
    params.append('grant_type', 'authorization_code');
    params.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
    params.append('code', code);
    params.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);
    params.append('scope', 'email identify guilds.join');

    const { data } = await axios.post(DISCORD_URLS.GET_ACCESS_TOKEN, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return data;
  } catch (err) {
    if (err.isAxiosError)
      throw { code: err.response.status, message: err.response.data };
    else throw err;
  }
}

exports.getAccessTokenFromRefreshToken = async (refresh_token) => {
  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.DISCORD_CLIENT_ID);
    params.append('grant_type', 'refresh_token');
    params.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
    params.append('refresh_token', refresh_token);
    params.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);
    params.append('scope', 'email identify guilds.join');

    const { data } = await axios.post(DISCORD_URLS.GET_ACCESS_TOKEN, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    if (err.isAxiosError)
      throw { code: err.response.status, message: err.response.data };
    else throw err;
  }
}

exports.getUserDiscordProfile = async (access_token) => {
  try {
    const { data } = await axios.get(DISCORD_URLS.GET_USER_PROFILE, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return {
      userId: data.id,
      username: data.username,
      avatar: data.avatar
        ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
        : null,
      email: data.email,
      isVerified: data.verified,
      discriminator: data.discriminator,
    };
  } catch (err) {
    if (err.isAxiosError)
      throw { code: err.response.status, message: err.response.data };
    else throw err;
  }
}