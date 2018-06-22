( function( wb, $ ) {
'use strict';

/**
 * List of texts for one language.
 * @class wikibase.datamodel.MultiTerm
 * @since 1.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 *
 * @param {string} languageCode
 * @param {string[]} texts
 *
 * @throws {Error} when the language code is not a string or empty.
 * @throws {Error} when texts is not an array.
 */
var SELF = wb.datamodel.MultiTerm = function WbDataModelMultiTerm( languageCode, texts ) {
	if( typeof languageCode !== 'string' || languageCode === '' ) {
		throw new Error( 'Language code has to be a non-empty string' );
	}
	if( !$.isArray( texts ) ) {
		throw new Error( 'texts needs to be an array of strings' );
	}

	this._languageCode = languageCode;
	this._texts = texts;
};

/**
 * @class wikibase.datamodel.MultiTerm
 */
$.extend( SELF.prototype, {
	/**
	 * @property {string}
	 * @private
	 */
	_languageCode: null,

	/**
	 * @property {string[]}
	 * @private
	 */
	_texts: null,

	/**
	 * @return {string}
	 */
	getLanguageCode: function() {
		return this._languageCode;
	},

	/**
	 * @return {string[]}
	 */
	getTexts: function() {
		return this._texts;
	},

	/**
	 * @param {*} multiTerm
	 * @return {boolean}
	 */
	equals: function( multiTerm ) {
		if( multiTerm === this ) {
			return true;
		} else if(
			!( multiTerm instanceof SELF )
			|| this._languageCode !== multiTerm.getLanguageCode()
		) {
			return false;
		}

		if( this._texts.length !== multiTerm._texts.length ) {
			return false;
		}

		for( var i = 0; i < this._texts.length; i++ ) {
			if( $.inArray( this._texts[i], multiTerm._texts ) === -1 ) {
				return false;
			}
		}

		return true;
	},

	/**
	 * @return {boolean}
	 */
	isEmpty: function() {
		return !this._texts.length;
	}

} );

}( wikibase, jQuery ) );
