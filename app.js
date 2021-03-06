const express         = require('express')
      ,bodyParser     = require('body-parser')
      ,path           = require('path')
      ,chalk          = require('chalk')
      ,cors           = require('cors')
      ,routes         = require('./routes/routes')
      ,config         = require('./config')
      ,errorHandler   = require('errorhandler')
      ,dotenv         = require('dotenv')
      ,logger         = require('morgan')
      ,multer         = require('multer');
      // ,index          = require('./routes/index')
      // ,uploads        = require('./routes/uploads');

/**
 * Cosmos
 * Load environment variables from .env file, where API keys and passwords are configured.
 * process.env now has the keys and values you defined in your .env file.
 */
dotenv.load();

/** * Create Express server.
 */
var app = express();

/**
 * Express configuration.
 * TODO: move to config.js file
 */
config(app);
app.use(cors());
app.use(errorHandler());
app.use(logger('short'));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 9000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'cosmos')));
//process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Express routing.
 */
routes(app);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});

module.exports = app; //module exported for testing
