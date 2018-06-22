( function( wb, $ ) {
'use strict';

/**
 * Container for sets of labels, descriptions and aliases.
 * @class wikibase.datamodel.Fingerprint
 * @since 1.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 *
 * @param {wikibase.datamodel.TermMap|null} [labels=new wikibase.datamodel.TermMap()]
 * @param {wikibase.datamodel.TermMap|null} [descriptions=new wikibase.datamodel.TermMap()]
 * @param {wikibase.datamodel.MultiTermMap|null} [aliases=new wikibase.datamodel.MultiTermMap()]
 *
 * @throws {Error} if a required parameter is not specified properly.
 */
var SELF
	= wb.datamodel.Fingerprint
	= function WbDataModelFingerprint( labels, descriptions, aliases ) {
		labels = labels || new wb.datamodel.TermMap();
		descriptions = descriptions || new wb.datamodel.TermMap();
		aliases = aliases || new wb.datamodel.MultiTermMap();

		if(
			!( labels instanceof wb.datamodel.TermMap )
			|| !( descriptions instanceof wb.datamodel.TermMap )
			|| !( aliases instanceof wb.datamodel.MultiTermMap )
		) {
			throw new Error( 'Required parameter(s) not specified or not defined properly' );
		}

		this._labels = labels;
		this._descriptions = descriptions;
		this._aliases = aliases;
	};

/**
 * @class wikibase.datamodel.Fingerprint
 */
$.extend( SELF.prototype, {
	/**
	 * @property {wikibase.datamodel.TermMap}
	 * @private
	 */
	_labels: null,

	/**
	 * @property {wikibase.datamodel.TermMap}
	 * @private
	 */
	_descriptions: null,

	/**
	 * @property {wikibase.datamodel.MultiTermMap}
	 * @private
	 */
	_aliases: null,

	/**
	 * @return {wikibase.datamodel.TermMap}
	 */
	getLabels: function() {
		return this._labels;
	},

	/**
	 * @param {string} languageCode
	 * @return {wikibase.datamodel.Term|null}
	 */
	getLabelFor: function( languageCode ) {
		return this._labels.getItemByKey( languageCode );
	},

	/**
	 * @param {string} languageCode
	 * @param {wikibase.datamodel.Term} label
	 * @return {boolean}
	 */
	hasLabel: function( languageCode, label ) {
		return this._labels.hasItem( languageCode, label );
	},

	/**
	 * @param {string} languageCode
	 * @return {boolean}
	 */
	hasLabelFor: function( languageCode ) {
		return this._labels.hasItemForKey( languageCode );
	},

	/**
	 * @return {wikibase.datamodel.TermMap}
	 */
	getDescriptions: function() {
		return this._descriptions;
	},

	/**
	 * @param {string} languageCode
	 * @return {wikibase.datamodel.Term|null}
	 */
	getDescriptionFor: function( languageCode ) {
		return this._descriptions.getItemByKey( languageCode );
	},

	/**
	 * @param {string} languageCode
	 * @param {wikibase.datamodel.Term} description
	 * @return {boolean}
	 */
	hasDescription: function( languageCode, description ) {
		return this._descriptions.hasItem( languageCode, description );
	},

	/**
	 * @param {string} languageCode
	 * @return {boolean}
	 */
	hasDescriptionFor: function( languageCode ) {
		return this._descriptions.hasItemForKey( languageCode );
	},

	/**
	 * @return {wikibase.datamodel.MultiTermMap}
	 */
	getAliases: function() {
		return this._aliases;
	},

	/**
	 * @param {string} languageCode
	 * @return {wikibase.datamodel.MultiTerm|null}
	 */
	getAliasesFor: function( languageCode ) {
		return this._aliases.getItemByKey( languageCode );
	},

	/**
	 * @param {string} languageCode
	 * @param {wikibase.datamodel.MultiTerm} aliases
	 * @return {boolean}
	 */
	hasAliases: function( languageCode, aliases ) {
		return this._aliases.hasItem( languageCode, aliases );
	},

	/**
	 * @param {string} languageCode
	 * @return {boolean}
	 */
	hasAliasesFor: function( languageCode ) {
		return this._aliases.hasItemForKey( languageCode );
	},

	/**
	 * @return {boolean}
	 */
	isEmpty: function() {
		return this._labels.isEmpty()
			&& this._descriptions.isEmpty()
			&& this._aliases.isEmpty();
	},

	/**
	 * @param {*} fingerprint
	 * @return {boolean}
	 */
	equals: function( fingerprint ) {
		return fingerprint === this
			|| fingerprint instanceof SELF
				&& this._labels.equals( fingerprint.getLabels() )
				&& this._descriptions.equals( fingerprint.getDescriptions() )
				&& this._aliases.equals( fingerprint.getAliases() );
	}

} );

}( wikibase, jQuery ) );
