/**
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( wb, QUnit ) {
	'use strict';

QUnit.module( 'wikibase.datamodel.EntityId' );

var testSets = [
	'Q1', 'P1'
];

QUnit.test( 'Constructor and getters', function( assert ) {
	assert.expect( 6 );
	for( var i = 0; i < testSets.length; i++ ) {
		var entityId = new wb.datamodel.EntityId( testSets[i] );

		assert.ok(
			entityId instanceof wb.datamodel.EntityId,
			'Test set #' + i + ': Instantiated EntityId.'
		);

		assert.equal(
			entityId.getSerialization(),
			testSets[i],
			'Test set #' + i + ': Verified retrieved serialized id.'
		);

		assert.equal(
			entityId.getValue(),
			entityId,
			'Test set #' + i + ': Verified getValue() returning original object.'
		);
	}
} );

QUnit.test( 'equals()', function( assert ) {
	assert.expect( 4 );
	for( var i = 0; i < testSets.length; i++ ) {
		var entityId1 = new wb.datamodel.EntityId( testSets[i] );

		for( var j = 0; j < testSets.length; j++ ) {
			var entityId2 = new wb.datamodel.EntityId( testSets[j] );

			if( i === j ) {
				assert.ok(
					entityId1.equals( entityId2 ),
					'Test set #' + i + ' is equal to test set #' + j + '.'
				);
				continue;
			}

			assert.ok(
				!entityId1.equals( entityId2 ),
				'Test set #' + i + ' is not equal to test set #' + j + '.'
			);
		}
	}
} );

QUnit.test( 'toJSON() & newFromJSON()', function( assert ) {
	assert.expect( 2 );
	for( var i = 0; i < testSets.length; i++ ) {
		var entityId = new wb.datamodel.EntityId( testSets[i] ),
			json = entityId.toJSON();

		assert.ok(
			wb.datamodel.EntityId.newFromJSON( json ).equals( entityId ),
			'Test set #' + i + ': Instantiated EntityId from generated JSON.'
		);
	}
} );

}( wikibase, QUnit ) );
