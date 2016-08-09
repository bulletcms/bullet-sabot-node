const BulletSabot = require('./lib');
const Sabot = BulletSabot.Sabot;
const Services = BulletSabot.Services;

const sabot = new Sabot({
  repository   : new Services.MockRepo(),
  authentcation: new Services.GoogleAuth(require('./client_secret.json').web),
});

sabot.listen(5000);
