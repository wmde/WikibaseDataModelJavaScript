( function ( wb, $, QUnit ) {
	'use strict';

	QUnit.module( 'wikibase.datamodel.StatementProvider' );
	var TestStatementProvider = function ( statementGroupSet ) {
		wb.datamodel.StatementProvider.call( this, statementGroupSet );
	};

	wb.datamodel.StatementProvider.mixInto( TestStatementProvider );

	QUnit.test( 'Can find the statement by guid', function ( assert ) {
		var statementGroupSet = new wb.datamodel.StatementGroupSet();
		var snack = new wb.datamodel.PropertyNoValueSnak( 'P2' );
		var claim = new wb.datamodel.Claim( snack, undefined, 'existing guid' );
		var statement = new wb.datamodel.Statement( claim, undefined );

		var statementList = new wb.datamodel.StatementList( [ statement ] );
		var statementGroup = new wb.datamodel.StatementGroup( 'P2', statementList );
		statementGroupSet.addItem( statementGroup );

		var statementProvider = new TestStatementProvider( statementGroupSet );

		assert.equal( statementProvider.findStatementByGuid( 'existing guid' ), statement );
		assert.equal( statementProvider.findStatementByGuid( 'nonexistent guid' ), null );
	} );


}( wikibase, jQuery, QUnit ) );
