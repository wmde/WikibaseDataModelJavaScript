( function( wb, util ) {
	'use strict';

var PARENT = wb.datamodel.Entity;

/**
 * Entity derivative featuring a data type and statements.
 * @class wikibase.datamodel.Property
 * @extends wikibase.datamodel.Entity
 * @since 1.0
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 *
 * @param {string} entityId
 * @param {string} dataTypeId
 * @param {wikibase.datamodel.EntityTerms|null} [entityTerms=new wikibase.datamodel.EntityTerms()]
 * @param {wikibase.datamodel.StatementGroupSet|null} [statementGroupSet=new wikibase.datamodel.StatementGroupSet()]
 *
 * @throws {Error} if a required parameter is not specified properly.
 */
var SELF = wb.datamodel.Property = util.inherit(
	'WbDataModelProperty',
	PARENT,
	function( entityId, dataTypeId, entityTerms, statementGroupSet ) {
		entityTerms = entityTerms || new wb.datamodel.EntityTerms();
		statementGroupSet = statementGroupSet || new wb.datamodel.StatementGroupSet();

		if(
			typeof entityId !== 'string'
			|| typeof dataTypeId !== 'string'
			|| !( entityTerms instanceof wb.datamodel.EntityTerms )
			|| !( statementGroupSet instanceof wb.datamodel.StatementGroupSet )
		) {
			throw new Error( 'Required parameter(s) missing or not defined properly' );
		}

		this._id = entityId;
		this._entityTerms = entityTerms;
		this._dataTypeId = dataTypeId;
		this._statementGroupSet = statementGroupSet;
	},
{
	/**
	 * @property {string}
	 * @private
	 */
	_dataTypeId: null,

	/**
	 * @property {wikibase.datamodel.StatementGroupSet}
	 * @private
	 */
	_statementGroupSet: null,

	/**
	 * @return {string}
	 */
	getDataTypeId: function() {
		return this._dataTypeId;
	},

	/**
	 * @return {wikibase.datamodel.StatementGroupSet}
	 */
	getStatements: function() {
		return this._statementGroupSet;
	},

	/**
	 * @param {wikibase.datamodel.Statement} statement
	 */
	addStatement: function( statement ) {
		this._statementGroupSet.addStatement( statement );
	},

	/**
	 * @param {wikibase.datamodel.Statement} statement
	 */
	removeStatement: function( statement ) {
		this._statementGroupSet.removeStatement( statement );
	},

	/**
	 * @return {boolean}
	 */
	isEmpty: function() {
		return this._entityTerms.isEmpty() && this._statementGroupSet.isEmpty();
	},

	/**
	 * @param {*} property
	 * @return {boolean}
	 */
	equals: function( property ) {
		return property === this
			|| property instanceof SELF
				&& this._id === property.getId()
				&& this._dataTypeId === property.getDataTypeId()
				&& this._entityTerms.equals( property.getEntityTerms() )
				&& this._statementGroupSet.equals( property.getStatements() );
	}
} );


/**
 * @inheritdoc
 * @property {string} [TYPE='property']
 * @static
 */
SELF.TYPE = 'property';

}( wikibase, util ) );
