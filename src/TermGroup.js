/**
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( wb, $ ) {
'use strict';

/**
 * Ordered set of texts for one language.
 * @constructor
 * @since 0.4
 *
 * @param {string} languageCode
 * @param {string[]} texts
 */
var SELF = wb.datamodel.TermGroup = function WbDataModelTermGroup( languageCode, texts ) {
	if( languageCode === undefined || !$.isArray( texts ) ) {
		throw new Error( 'Required parameter(s) not specified' );
	}

	this._languageCode = languageCode;
	this._texts = texts;
};

$.extend( SELF.prototype, {
	/**
	 * @type {string}
	 */
	_languageCode: null,

	/**
	 * @type {string[]}
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
		return $.merge( [], this._texts );
	},

	/**
	 * @param {*} termGroup
	 * @return {boolean}
	 */
	equals: function( termGroup ) {
		if( !( termGroup instanceof SELF ) ) {
			return false;
		}

		if( this._languageCode !== termGroup.getLanguageCode() ) {
			return false;
		}

		var otherTexts = termGroup.getTexts();

		if( this._texts.length !== otherTexts.length ) {
			return false;
		}

		for( var i = 0; i < this._texts.length; i++ ) {
			if( $.inArray( this._texts[i], otherTexts ) === -1 ) {
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