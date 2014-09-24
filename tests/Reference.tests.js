/**
 * @licence GNU GPL v2+
 * @author Daniel Werner < daniel.werner@wikimedia.de >
 * @author H. Snater < mediawiki@snater.com >
 */

( function( wb, QUnit ) {
	'use strict';

	QUnit.module( 'wikibase.datamodel.Reference' );

	QUnit.test( 'constructor, getSnaks()', function( assert ) {
		var snakLists = [
			new wb.datamodel.SnakList( [] ),
			new wb.datamodel.SnakList( [new wb.datamodel.PropertyNoValueSnak( 'P1' )] ),
			new wb.datamodel.SnakList( [
				new wb.datamodel.PropertyNoValueSnak( 'P1' ),
				new wb.datamodel.PropertySomeValueSnak( 'P2' )
			] )
		];

		for( var i = 0; i < snakLists.length; i++ ) {
			var reference = new wb.datamodel.Reference( snakLists[i] );

			assert.ok(
				reference instanceof wb.datamodel.Reference,
				'Test set #' + i + ': Instantiated Reference object.'
			);

			assert.ok(
				reference.getSnaks().equals( new wb.datamodel.SnakList( snakLists[i] ) ),
				'Test set #' + i + ': Retrieved Snaks passed to the constructor.'
			);
		}

		assert.throws(
			function() {
				return new wb.datamodel.Reference( [new wb.datamodel.PropertyNoValueSnak( 'P1' )] );
			},
			'Throwing an error when trying to instantiate a Reference with a plain array of Snak '
			+ 'objects.'
		);
	} );

	QUnit.test( 'getHash()', function( assert ) {
		var hash = 'hash12390213';

		assert.equal(
			( new wb.datamodel.Reference( null, hash ) ).getHash(),
			hash,
			'Reference\'s hash from constructor returned in getHash()'
		);

		assert.equal(
			( new wb.datamodel.Reference() ).getHash(),
			null,
			'Reference without initial hash will return null in getHash()'
		);
	} );

	QUnit.test( 'equals()', function( assert ) {
		var references = [
			new wb.datamodel.Reference(),
			new wb.datamodel.Reference(
				new wb.datamodel.SnakList( [new wb.datamodel.PropertyNoValueSnak( 'P1' )] ),
				'hash12390213'
			),
			new wb.datamodel.Reference(
				new wb.datamodel.SnakList(
					[
						new wb.datamodel.PropertyNoValueSnak( 'P1' ),
						new wb.datamodel.PropertySomeValueSnak( 'P2' )
					]
				)
			)
		];

		// Compare references:
		for( var i = 0; i < references.length; i++ ) {
			var clonedReference = new wb.datamodel.Reference(
				references[i].getSnaks(),
				references[i].getHash()
			);

			// Check if "cloned" reference is equal:
			assert.ok(
				references[i].equals( clonedReference ),
				'Verified reference "' + i + '" on equality.'
			);

			// Compare to all other references:
			for( var j = 0; j < references.length; j++ ) {
				if ( j !== i ) {
					assert.ok(
						!references[i].equals( references[j] ),
						'Reference "' + i + '" is not equal to reference "'+ j + '".'
					);
				}
			}

		}

	} );

}( wikibase, QUnit ) );
