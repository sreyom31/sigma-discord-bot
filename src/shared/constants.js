const DISCORD_URLS = {
  GET_USER_PROFILE: 'https://discord.com/api/v8/users/@me',
  GET_ACCESS_TOKEN: 'https://discord.com/api/v8/oauth2/token',
  GET_SERVER_INVITE: (guild_id, userId) => {
    return `https://discord.com/api/v8/guilds/${guild_id}/members/${userId}`;
  },
};

module.exports = DISCORD_URLS