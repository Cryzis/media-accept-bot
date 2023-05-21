# Media Accept Bot
A simple discord.js bot that allows certain users to use accept other members onto the media/famous team. This bot would automatically create a invite to the user to join the media discord and would give them a rank in the main discord as well. This can be an addon to a existing discord ticket bot or you can simply use it as it's original state.

## Installation
You need to install the [discord.js](https://cryzis.uk) package for the bot to work. 
```bash
npm install discord.js
```

## Configuration
For the discord bot to work succesfully, you need to fill out the config.json

```json
{
  "prefix": "!", # your prefix for the command
  "token": "DISCORD TOKEN",
  "staffRoleID": "STAFF-ROLE",
  "mediaTeamRoleID": "MEDIA-ROLE",
  "guildID": "DISCORD-SERVER",
  "secondaryGuildID": "MEDIA-DISCORD",
  "secondaryChannelID": "INVITE-TEXT-CHANNEL",
  "famousRoleID": "FAMOUS-ROLE",
  
# discord activity status

  "statusDelay": 5000,
  "statuses": [
    "Cryzis Development",
    "cryzis.uk",
    "store.cryzis.uk",
    "status.cryzis.uk"
  ]
}

```

## Credits
[Cryzis](https://cryzis.uk)

You are welcome to use my code, there are no guidelines when using my code.

