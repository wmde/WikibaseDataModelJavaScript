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

		if( !( statementGroupSet instanceof wb.datamodel.StatementGroupSet ) ) {
			throw new Error( 'Given argument `statementGroupSet` is not instance of `wb.datamodel.StatementGroupSet`' );
		}
		this._statementGroupSet = statementGroupSet;
	};

	/**
	 * @class wikibase.datamodel.Statement
	 */
	$.extend( SELF.prototype, {
		/**
		 * @property {wikibase.datamodel.StatementGroupSet}
		 * @protected
		 */
		_statementGroupSet: null,

		/**
		 * @return {wikibase.datamodel.StatementGroupSet}
		 */
		getStatements: function () {
			return this._statementGroupSet;
		},

		/**
		 * @param {string} guid
		 *
		 * @return {wikibase.datamodel.Statement|null}
		 */
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

	SELF.mixInto = function (target) {
		var mixin = SELF;
		for ( var method in mixin.prototype ) {
			if (mixin.prototype.hasOwnProperty(method) && !target.prototype.hasOwnProperty( method ) ) {
				target.prototype[ method ] = mixin.prototype[ method ];
			}
		}
	};

}( wikibase, jQuery ) );
