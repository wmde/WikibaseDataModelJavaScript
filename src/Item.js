/**
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( wb, util ) {
	'use strict';

var PARENT = wb.datamodel.Entity;

/**
 * Represents a Wikibase Item.
 * @constructor
 * @extends wikibase.datamodel.Entity
 * @since 0.4
 *
 * @param {string} entityId
 * @param {wikibase.datamodel.Fingerprint|null} [fingerprint]
 * @param {wikibase.datamodel.StatementGroupSet|null} [statementGroupSet]
 * @param {wikibase.datamodel.SiteLinkSet|null} [siteLinkSet]
 */
var SELF = wb.datamodel.Item = util.inherit(
	'WbItem',
	PARENT,
	function( entityId, fingerprint, statementGroupSet, siteLinkSet ) {
		fingerprint = fingerprint || new wb.datamodel.Fingerprint();
		statementGroupSet = statementGroupSet || new wb.datamodel.StatementGroupSet();
		siteLinkSet = siteLinkSet || new wb.datamodel.SiteLinkSet();

		if(
			typeof entityId !== 'string'
			|| !( fingerprint instanceof wb.datamodel.Fingerprint )
			|| !( siteLinkSet instanceof wb.datamodel.SiteLinkSet )
			|| !( statementGroupSet instanceof wb.datamodel.StatementGroupSet )
		) {
			throw new Error( 'Required parameter(s) missing or not defined properly' );
		}

		this._id = entityId;
		this._fingerprint = fingerprint;
		this._siteLinkSet = siteLinkSet;
		this._statementGroupSet = statementGroupSet;
	},
{
	/**
	 * @type {wikibase.datamodel.SiteLinkSet}
	 */
	_siteLinkSet: null,

	/**
	 * @type {wikibase.datamodel.StatementGroupSet}
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
		return this._fingerprint.isEmpty()
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
				&& this._fingerprint.equals( item.getFingerprint() )
				&& this._siteLinkSet.equals( item.getSiteLinks() )
				&& this._statementGroupSet.equals( item.getStatements() );
	}
} );

/**
 * @see wikibase.datamodel.Entity.TYPE
 */
SELF.TYPE = 'item';

}( wikibase, util ) );
