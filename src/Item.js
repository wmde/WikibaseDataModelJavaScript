( function( wb, util ) {
	'use strict';

var PARENT = wb.datamodel.Entity;

/**
 * Entity derivative featuring statements and site links.
 * @class wikibase.datamodel.Item
 * @extends wikibase.datamodel.Entity
 * @since 1.0
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 *
 * @param {string} entityId
 * @param {wikibase.datamodel.EntityTerms|null} [entityTerms=new wikibase.datamodel.EntityTerms()]
 * @param {wikibase.datamodel.StatementGroupSet|null} [statementGroupSet=new wikibase.datamodel.StatementGroupSet()]
 * @param {wikibase.datamodel.SiteLinkSet|null} [siteLinkSet=new wikibase.datamodel.SiteLinkSet()]
 *
 * @throws {Error} if a required parameter is not specified properly.
 */
var SELF = wb.datamodel.Item = util.inherit(
	'WbDataModelItem',
	PARENT,
	function( entityId, entityTerms, statementGroupSet, siteLinkSet ) {
		entityTerms = entityTerms || new wb.datamodel.EntityTerms();
		statementGroupSet = statementGroupSet || new wb.datamodel.StatementGroupSet();
		siteLinkSet = siteLinkSet || new wb.datamodel.SiteLinkSet();

		if(
			typeof entityId !== 'string'
			|| !( entityTerms instanceof wb.datamodel.EntityTerms )
			|| !( siteLinkSet instanceof wb.datamodel.SiteLinkSet )
			|| !( statementGroupSet instanceof wb.datamodel.StatementGroupSet )
		) {
			throw new Error( 'Required parameter(s) missing or not defined properly' );
		}

		this._id = entityId;
		this._entityTerms = entityTerms;
		this._siteLinkSet = siteLinkSet;
		this._statementGroupSet = statementGroupSet;
	},
{
	/**
	 * @property {wikibase.datamodel.SiteLinkSet}
	 * @private
	 */
	_siteLinkSet: null,

	/**
	 * @property {wikibase.datamodel.StatementGroupSet}
	 * @private
	 */
	_statementGroupSet: null,

	/**
	 * @return {wikibase.datamodel.SiteLinkSet}
	 */
	getSiteLinks: function() {
		return this._siteLinkSet;
	},

	/**
	 * @param {wikibase.datamodel.SiteLink} siteLink
	 */
	addSiteLink: function( siteLink ) {
		this._siteLinkSet.setSiteLink( siteLink );
	},

	/**
	 * @param {wikibase.datamodel.SiteLink} siteLink
	 */
	removeSiteLink: function( siteLink ) {
		this._siteLinkSet.removeSiteLink( siteLink );
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
		return this._entityTerms.isEmpty()
			&& this._siteLinkSet.isEmpty()
			&& this._statementGroupSet.isEmpty();
	},

	/**
	 * @param {*} item
	 * @return {boolean}
	 */
	equals: function( item ) {
		return item === this
			|| item instanceof SELF
				&& this._id === item.getId()
				&& this._entityTerms.equals( item.getEntityTerms() )
				&& this._siteLinkSet.equals( item.getSiteLinks() )
				&& this._statementGroupSet.equals( item.getStatements() );
	}
} );

/**
 * @inheritdoc
 * @property {string} [TYPE='item']
 * @static
 */
SELF.TYPE = 'item';

}( wikibase, util ) );
