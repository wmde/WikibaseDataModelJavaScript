/**
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( wb, QUnit, $ ) {
'use strict';

QUnit.module( 'wikibase.datamodel.ClaimList' );

var testSets = [
	[],
	[
		new wb.datamodel.Claim( new wb.datamodel.PropertyNoValueSnak( 'P1' ), null, 'guid1' ),
		new wb.datamodel.Claim( new wb.datamodel.PropertyNoValueSnak( 'P2' ), null, 'guid21' ),
		new wb.datamodel.Claim( new wb.datamodel.PropertySomeValueSnak( 'P2' ), null, 'guid22' )
	]
];

QUnit.test( 'Constructor', function( assert ) {
	for( var i = 0; i < testSets.length; i++ ) {
		assert.ok(
			( new wb.datamodel.ClaimList( testSets[i] ) ) instanceof wb.datamodel.ClaimList,
			'Test set #' + i + ': Instantiated ClaimList.'
		);
	}

	assert.throws(
		function() {
			return new wb.datamodel.ClaimList( ['string1', 'string2'] );
		},
		'Throwing error when trying to instantiate a ClaimList with other than Claim objects.'
	);
} );

QUnit.test( 'getPropertyIds()', function( assert ) {
	for( var i = 0; i < testSets.length; i++ ) {
		var expectedPropertyIds = [];

		for( var j = 0; j < testSets[i].length; j++ ) {
			var propertyId = testSets[i][j].getMainSnak().getPropertyId();
			if( $.inArray( propertyId , expectedPropertyIds ) === -1 ) {
				expectedPropertyIds.push( propertyId );
			}
		}

		var claimList = new wb.datamodel.ClaimList( testSets[i] );

		assert.deepEqual(
			claimList.getPropertyIds(),
			expectedPropertyIds,
			'Retrieved property ids.'
		);
	}
} );

}( wikibase, QUnit, jQuery ) );
