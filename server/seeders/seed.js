const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeed.json');
const cleanDB = require('./cleanDB')

db.once('open', async () => {
  await cleanDB('User', 'users');
  await User.create(userSeeds);

  console.info('Database seed completed.');
  process.exit(0);
});
