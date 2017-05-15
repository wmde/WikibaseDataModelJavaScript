( function ( wb, $ ) {
	'use strict';

	/**
	 * Combination of a claim, a rank and references.
	 * @mixin wikibase.datamodel.StatementProvider
	 *
	 * @param {wikibase.datamodel.StatementGroupSet|null} [statementGroupSet=new wikibase.datamodel.StatementGroupSet()]
	 * @license GPL-2.0+
	 */
	var SELF = wb.datamodel.StatementProvider = function WbDataModelStatementProvider( statementGroupSet ) {
		statementGroupSet = statementGroupSet || new wb.datamodel.StatementGroupSet();
		this._statementGroupSet = statementGroupSet;
	};

	/**
	 * @class wikibase.datamodel.Statement
	 */
	$.extend( SELF.prototype, {
		/**
		 * @property {wikibase.datamodel.StatementGroupSet}
		 * @private
		 */
		_statementGroupSet: null,

		/**
		 * @return {wikibase.datamodel.StatementGroupSet}
		 */
		getStatements: function () {
			return this._statementGroupSet;
		},

		/**
		 * @param {wikibase.datamodel.Statement} statement
		 */
		addStatement: function ( statement ) {
			this._statementGroupSet.addStatement( statement );
		},

		/**
		 * @param {wikibase.datamodel.Statement} statement
		 */
		removeStatement: function ( statement ) {
			this._statementGroupSet.removeStatement( statement );
		},

		getStatementByGuid: function (guid) {
			var res = null;
			this._statementGroupSet.each( function() {
				this.getItemContainer().each( function() {
					if ( this.getClaim().getGuid() === guid ) {
						res = this;
					}
				} );
			} );
			return res;
		}
	} );

}( wikibase, jQuery ) );
