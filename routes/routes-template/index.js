let express = require( 'express' ),
    router  = express.Router(),
    path    = require( 'path' );

//POST
router.get( '*', ( req, res ) => {
  res.sendFile( path.join(__dirname + '/../../index.html') );
} );

module.exports = router;
