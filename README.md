# cycycy-bot
A simple bot for a simple discord server

Invite link: https://discordapp.com/oauth2/authorize?client_id=530305194131456000&scope=bot&permissions=8

# Install and run locally
1. Clone this repo.
2. Run ```npm install```
2. Make a ```.env``` file 
3. Inside the ```.env``` file add your own MongoDB URL with a variable ```DB_PASS```
3. Inside the ```.env``` file add your own discord bot token with a variable ```BOT_TOKEN```
4. Run the bot! ```node bot.js```

# Functions(for now)
## Admin Commands
  ### Role Counter
  **Returns how many members the given role have**
  * Usage: !=rc <role_name>
  
  ### Set logger channel
  **Enable/Disable the event logger (message deleted, member left, member kicked, etc.)**
  * Usage: !=setlogger <enable/disable> <channel_name>(channel name is optional only if you set it to disabled)
  
   ### Set Mod Role (IMPORTANT TO SETUP)
  **Sets the mod role of the server to be able to use mod commands**
  * Usage: !=setmod <mod_name>
  
## Mod Commands
  ### Adding/Deleting Ban Phrase
  **Adds/Deletes a ban phrase/word to the server**
  * Usage: !=addbanphrase <phrase/word>
  * Usage: !=delbanphrase <phrase/word>
  
   ### Adding/Deleting/Editing custom command
  **Adds/Deletes/Edits a custom command to the server**
  * Usage: !=addcmd <command_name> <command_response>
  * Usage: !=delcmd <command_name>
  * Usage: !=editcmd <command_name> <command_response>
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
