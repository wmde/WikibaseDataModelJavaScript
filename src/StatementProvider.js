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
		 * Returns all statements of given entity. Statements on sub-entities are NOT included.
		 *
		 * @return {wikibase.datamodel.StatementGroupSet}
		 */
		getStatements: function () {
			return this._statementGroupSet;
		},

		/**
		 * Finds a statement with given GUID either on current entity or on one of sub-entities.
		 *
		 * @param {string} guid
		 *
		 * @return {wikibase.datamodel.Statement|null} Statement that has given GUID. Returned statement can belong to the entity itself as
		 *  well as to one of the sub-entities. `null` if entity is not found.
		 */
		findStatementByGuid: function (guid) {
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
