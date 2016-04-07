( function( wb, $ ) {
'use strict';

var PARENT = wb.datamodel.List;

/**
 * List of Claim objects.
 * @class wikibase.datamodel.ClaimList
 * @since 1.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 *
 * @param {wikibase.datamodel.Claim[]} [claims=[]]
 */
wb.datamodel.ClaimList = util.inherit( 'WbDataModelClaimList', PARENT, function( claims ) {
	PARENT.call( this, wikibase.datamodel.Claim, claims );
}, {
	/**
	 * @return {string[]}
	 */
	getPropertyIds: function() {
		var propertyIds = [];

		for( var i = 0; i < this._items.length; i++ ) {
			var propertyId = this._items[i].getMainSnak().getPropertyId();
			if( $.inArray( propertyId, propertyIds ) === -1 ) {
				propertyIds.push( propertyId );
			}
		}

		return propertyIds;
	},

	/**
	 * @param {wikibase.datamodel.Claim} claim
	 * @return {string}
	 */
	getItemKey: function( claim ) {
		return claim.getMainSnak().getPropertyId();
	}
} );

}( wikibase, jQuery ) );
