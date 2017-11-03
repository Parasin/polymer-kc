const bodyParser  = require( 'body-parser' ),
      compression = require( 'compression' ),
      config      = require( './config' ),
      express     = require( 'express' ),
      mongoose    = require( 'mongoose' ),
      morgan      = require( 'morgan' ),
      path        = require( 'path' ),
      rfs         = require( 'rotating-file-stream' ),
      routes      = require( './routes' );

let fs     = require( 'fs' ),
    logDir = path.join( __dirname, config.logDir );


// Check for 'logs' directory
fs.access( logDir, ( err ) => {
  if ( err ) {
    fs.mkdirSync( logDir );
  }
} );

mongoose.Promise = global.Promise;
mongoose.connect( config.dbUrl, {
  useMongoClient : true,
  autoReconnect  : true
}, ( err ) => {
  if ( err ) {
    throw err;
  }
  console.log( 'Database connection successful' );

  // Initialize express instance, and log rotation
  let app             = express(),
      accessLogStream = rfs( 'access.log', {
        interval : '1d',
        path     : logDir
      } );

  // Setup views and pathing
  app.set( 'view engine', 'html' );
  app.set( 'views', path.join( __dirname, 'src' ) );
  // Serve static content
  app.use( '/src', express.static( path.join( __dirname, 'src' ) ) );
  app.use( '/bower_components', express.static( path.join( __dirname, 'bower_components' ) ) );
  app.use( '/images', express.static( path.join( __dirname, 'images' ) ) );

  // Set up middleware
  app.use( morgan( 'dev', { stream : accessLogStream } ) );
  app.use( compression() );
  app.use( bodyParser.urlencoded( {
    extended : false,
    limit    : '20mb'
  } ) );
  app.use( bodyParser.json( { limit : '20mb' } ) );

  // Pass app to routes
  routes( app );

  // Start application
  app.listen( config.port, () => {
    console.log( 'Environment: ', config.env);
    console.log( 'Express running, now listening on port', config.port );
  } );
} );
