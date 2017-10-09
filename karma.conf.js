module.exports = function ( config ) {
	config.set( {
		frameworks: [ 'qunit' ],

		// Order DOES matter, as soon as we have no dependency management in JS
		files: [
			'node_modules/jquery/dist/jquery.js',
			'node_modules/wikibase-data-values/src/dataValues.js',
			'node_modules/wikibase-data-values/lib/util/util.inherit.js',
			'node_modules/wikibase-data-values/src/DataValue.js',
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
			'node_modules/wikibase-data-values/lib/globeCoordinate/globeCoordinate.js',
			'node_modules/wikibase-data-values/lib/globeCoordinate/globeCoordinate.GlobeCoordinate.js',
			'node_modules/wikibase-data-values/src/valueFormatters/valueFormatters.js',
			'node_modules/wikibase-data-values/src/valueParsers/valueParsers.js',
			'node_modules/wikibase-data-values/src/dataValues.js',
			'node_modules/wikibase-data-values/src/*.js',
			'node_modules/wikibase-data-values/src/values/*.js',
			'src/*.js',
			'tests/*.js'
		],
		port: 9876,

		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		browsers: [ 'PhantomJS' ]
	} );
};
