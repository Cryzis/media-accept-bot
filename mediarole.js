const Discord = require('discord.js');
const config = require('./config.json');

async function messageHandler(message, client) {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'accept' && args[0] === 'media') {
    // check if the user has the staff role
    if (!message.member.roles.cache.has(config.staffRoleID)) {
      return message.channel.send('You do not have permission to use this command.');
    }
    // check if the message mentions a user
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to add them to the Media Team!');
    }

    // get the mentioned user and the guild they belong to
    const user = message.mentions.users.first();
    const guild = message.guild;

    // check if the guild member is not found
    const member = await guild.members.fetch(user.id).catch(console.error);
    if (!member) {
      return message.reply('that user is not in this server!');
    }

    // add the Media Team role to the member
    const mediaTeamRole = guild.roles.cache.get(config.mediaTeamRoleID);
    await member.roles.add(mediaTeamRole).catch(console.error);

    // generate temporary invite for the secondary guild
    const secondaryGuild = await client.guilds.fetch(config.secondaryGuildID).catch(console.error);
    const invite = await secondaryGuild.channels.cache.get(config.secondaryChannelID).createInvite({ maxUses: 1, unique: true });

    // send the welcome message embed
    const embed = new Discord.MessageEmbed()
      .setTitle(`Welcome to the Media Team, ${member.user.username}!`)
      .setColor('#00ff00')
      .setDescription('We\'re excited to have you on board!')
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: 'User Info', value: `**Username:** ${member.user.username}\n**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}` }
      )
      .setTimestamp()
      .setFooter('Click below to join the media discord.', 'https://media.discordapp.net/attachments/1104418991214170192/1104449331173539940/aaaaaaaaaaa.png?width=671&height=671');

    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setLabel('Join Discord')
          .setStyle('LINK')
          .setURL(invite.url)
      );
    await message.reply({ embeds: [embed], components: [row] });
  }
}

module.exports = { messageHandler };