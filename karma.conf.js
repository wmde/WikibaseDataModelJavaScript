module.exports = function ( config ) {
	config.set( {
		frameworks: [ 'qunit' ],

		// Order DOES matter, as soon as we have no dependency management in JS
		files: [
			'node_modules/jquery/dist/jquery.js',
			'vendor/data-values/javascript/src/dataValues.js',
			'vendor/data-values/javascript/lib/util/util.inherit.js',
			'vendor/data-values/javascript/src/DataValue.js',
			'src/__namespace.js',
			'src/Claim.js',
			'src/Entity.js',
			'src/Fingerprint.js',
			'src/GroupableCollection.js',
			'src/Group.js',
			'src/Map.js',
			'src/MultiTerm.js',
			'src/Reference.js',
			'src/SiteLink.js',
			'src/Snak.js',
			'src/Statement.js',
			'src/Term.js',
			'src/Set.js',
			'src/List.js',
			'src/StatementProvider.js',
			'vendor/data-values/javascript/lib/globeCoordinate/globeCoordinate.js',
			'vendor/data-values/javascript/lib/globeCoordinate/globeCoordinate.GlobeCoordinate.js',
			'vendor/data-values/javascript/src/valueFormatters/valueFormatters.js',
			'vendor/data-values/javascript/src/valueParsers/valueParsers.js',
			'vendor/data-values/javascript/src/dataValues.js',
			'vendor/data-values/javascript/src/*.js',
			'vendor/data-values/javascript/src/values/*.js',
			'src/*.js',
			'tests/*.js'
		],
		port: 9876,

		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		browsers: [ 'PhantomJS' ]
	} );
};
