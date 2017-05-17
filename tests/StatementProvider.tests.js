( function ( wb, $, QUnit ) {
	'use strict';

	QUnit.module( 'wikibase.datamodel.StatementProvider' );
	var TestStatementProvider = function ( statementGroupSet ) {
		wb.datamodel.StatementProvider.call( this, statementGroupSet );
	};

	wb.datamodel.StatementProvider.mixInto( TestStatementProvider );

	QUnit.test( 'Can find the statement by guid', function ( assert ) {
		var statement = createStatement( 'P2', 'existing guid' );
		var statementGroupSet = createStatementGroupSet( statement );

		var statementProvider = new TestStatementProvider( statementGroupSet );

		assert.equal( statementProvider.findStatementByGuid( 'existing guid' ), statement );
		assert.equal( statementProvider.findStatementByGuid( 'nonexistent guid' ), null );
	} );

	function createStatement( propertyId, guid ) {
		var snack = new wb.datamodel.PropertyNoValueSnak( propertyId );
		var claim = new wb.datamodel.Claim( snack, undefined, guid );
		return new wb.datamodel.Statement( claim, undefined );
	}

	function createStatementGroupSet( statement ) {
		var statementGroupSet = new wb.datamodel.StatementGroupSet();
		var statementList = new wb.datamodel.StatementList( [ statement ] );
		var statementGroup = new wb.datamodel.StatementGroup(
			statement.getClaim().getMainSnak().getPropertyId(),
			statementList
		);
		statementGroupSet.addItem( statementGroup );
		return statementGroupSet;
	}


}( wikibase, jQuery, QUnit ) );
