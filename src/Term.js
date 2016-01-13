( function( wb, $ ) {
'use strict';

/**
 * Combination of a language code and a text string.
 * @class wikibase.datamodel.Term
 * @since 1.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 *
 * @param {string} languageCode
 * @param {string} text
 *
 * @throws {Error} if language code is not a string or empty.
 * @throws {Error} if text is not a string.
 */
var SELF = wb.datamodel.Term = function WbDataModelTerm( languageCode, text ) {
	if( typeof languageCode !== 'string' || languageCode === '' ) {
		throw new Error( 'Language code has to be a non-empty string' );
	}
	if( typeof text !== 'string' ) {
		throw new Error( 'Text needs to be a string' );
	}

	this._languageCode = languageCode;
	this._text = text;
};

/**
 * @class wikibase.datamodel.Term
 */
$.extend( SELF.prototype, {
	/**
	 * @property {string}
	 * @private
	 */
	_languageCode: null,

	/**
	 * @property {string}
	 * @private
	 */
	_text: null,

	/**
	 * @return {string}
	 */
	getLanguageCode: function() {
		return this._languageCode;
	},

	/**
	 * @return {string}
	 */
	getText: function() {
		return this._text;
	},

	/**
	 * @param {*} term
	 * @return {boolean}
	 */
	equals: function( term ) {
		return term === this
			|| term instanceof SELF
				&& this._languageCode === term.getLanguageCode()
				&& this._text === term.getText();
	}

} );

}( wikibase, jQuery ) );
