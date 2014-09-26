/**
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( wb, QUnit ) {
'use strict';

QUnit.module( 'wikibase.datamodel.TermList' );

var testSets = [
	[],
	[
		new wb.datamodel.Term( 'de', 'de-string' ),
		new wb.datamodel.Term( 'en', 'en-string' )
	]
];

QUnit.test( 'Constructor', function( assert ) {
	for( var i = 0; i < testSets.length; i++ ) {
		assert.ok(
			( new wb.datamodel.TermList( testSets[i] ) ) instanceof wb.datamodel.TermList,
			'Test set #' + i + ': Instantiated TermList.'
		);
	}

	assert.throws(
		function() {
			return new wb.datamodel.TermList( ['string1', 'string2'] );
		},
		'Throwing error when trying to instantiate a TermList without Term objects.'
	);
} );

}( wikibase, QUnit ) );
