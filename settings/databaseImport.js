const mongoose = require('mongoose');
const Notify = require('../models/notifyDB');
const Afk = require('../models/afkDB');
const Cmd = require('../models/customCommandsDB');
const BanPhrase = require('../models/banPhraseDB');
const Logger = require('../models/loggerDB');
const Welcome = require('../models/welcomeDB');
const AntiWeeb = require('../models/antiweebDB');

module.exports = {
  mongoose,
  Notify,
  Afk,
  Cmd,
  BanPhrase,
  Logger,
  Welcome,
  AntiWeeb,
};
