# cycycy-bot
A simple bot for a simple discord server

Invite link: https://discordapp.com/oauth2/authorize?client_id=530305194131456000&scope=bot&permissions=8

# Install
1. Clone this repo.
2. Run ```npm install```
2. Make a ```.env``` file with your own MongoDB database with a variable ```DB_PASS``
3. Inside the ```.env``` file add your discord bot token with variable ```BOT_TOKEN```
4. Run the bot! ```node bot.js```

# Functions(for now)
### Translate
Translates message from any language to english

Command: !=translate (message)

### Wiki search
Returns a summary of the user's input from wikipedia

Command: !=wiki (message)

### Get User Info
Shows the user's information in the server

Command: !=userinfo <optional arg>( tag a user )
  
### Get Server Info
Shows the current server's information

Command: !=serverinfo

### Temporary Mute
Temporarily mutes the tagged user.

Command: !=tempmute (user) (time e.g.: 1s, 1m, 1w)
### Unmute
Unmutes a muted user

Command: !=unmute (user)

### Warn a user
Warn a user and time them out based on the number of warns.

Command: !=warn (user) (reason)



# Upcoming features
### Weather search
### Play a music using youtube
### Twitch Live Announcements
### ~~Wiki search~~ ✔
### ~~Translate language~~ ✔
### Trivia games
### Some mini-games

# Ultimate Goal
### Build a web dashboard for the bot.
