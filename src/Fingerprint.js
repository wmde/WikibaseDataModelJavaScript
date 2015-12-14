( function( wb, $ ) {
'use strict';

/**
 * Container for sets of labels, descriptions and aliases.
 * @class wikibase.datamodel.Fingerprint
 * @since 1.0
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 * @author Bene* < benestar.wikimedia@gmail.com >
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
	 * @param {wikibase.datamodel.Term} label
	 * @return {boolean}
	 */
	hasLabel: function( label ) {
		return this._labels.hasItem( label.getLanguageCode(), label );
	},

	/**
	 * @param {string} languageCode
	 * @return {boolean}
	 */
	hasLabelFor: function( languageCode ) {
		return this._labels.hasItemForKey( languageCode );
	},

	/**
	 * @param {wikibase.datamodel.Term} label
	 */
	setLabel: function( label ) {
		if ( label.getText() === '' ) {
			this._labels.removeItemByKey( label.getLanguageCode() );
		} else {
			this._labels.setItem( label.getLanguageCode(), label );
		}
	},

	/**
	 * @param {wikibase.datamodel.Term} label
	 */
	removeLabel: function( label ) {
		this._labels.removeItem( label.getLanguageCode(), label );
	},

	/**
	 * @param {string} languageCode
	 */
	removeLabelFor: function( languageCode ) {
		this._labels.removeItemByKey( languageCode );
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
	 * @param {wikibase.datamodel.Term} description
	 * @return {boolean}
	 */
	hasDescription: function( description ) {
		return this._descriptions.hasItem( description.getLanguageCode(), description );
	},

	/**
	 * @param {string} languageCode
	 * @return {boolean}
	 */
	hasDescriptionFor: function( languageCode ) {
		return this._descriptions.hasItemForKey( languageCode );
	},

	/**
	 * @param {wikibase.datamodel.Term} description
	 */
	setDescription: function( description ) {
		if ( description.getText() === '' ) {
			this._descriptions.removeItemByKey( description.getLanguageCode() );
		} else {
			this._descriptions.setItem( description.getLanguageCode(), description );
		}
	},

	/**
	 * @param {wikibase.datamodel.Term} description
	 */
	removeDescription: function( description ) {
		this._descriptions.removeItem( description.getLanguageCode(), description );
	},

	/**
	 * @param {string} languageCode
	 */
	removeDescriptionFor: function( languageCode ) {
		this._descriptions.removeItemByKey( languageCode );
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
	 * @param {wikibase.datamodel.MultiTerm} aliases
	 * @return {boolean}
	 */
	hasAliases: function( aliases ) {
		return this._aliases.hasItem( aliases.getLanguageCode(), aliases );
	},

	/**
	 * @param {string} languageCode
	 * @return {boolean}
	 */
	hasAliasesFor: function( languageCode ) {
		return this._aliases.hasItemForKey( languageCode );
	},

	/**
	 * @param {wikibase.datamodel.MultiTerm|wikibase.datamodel.MultiTermMap} aliases
	 */
	setAliases: function( aliases ) {
		if( aliases instanceof wb.datamodel.MultiTermMap ) {
			this._aliases = aliases;
		} else if ( aliases.isEmpty() ) {
			this._aliases.removeItemByKey( aliases.getLanguageCode() );
		} else {
			this._aliases.setItem( aliases.getLanguageCode(), aliases );
		}
	},

	/**
	 * @param {wikibase.datamodel.MultiTerm} aliases
	 */
	removeAliases: function( aliases ) {
		this._aliases.removeItem( aliases.getLanguageCode(), aliases );
	},

	/**
	 * @param {string} languageCode
	 */
	removeAliasesFor: function( languageCode ) {
		this._aliases.removeItemByKey( languageCode );
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
