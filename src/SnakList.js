( function( wb, $ ) {
'use strict';

var PARENT = wb.datamodel.List;

/**
 * List of Snak objects.
 * @class wikibase.datamodel.SnakList
 * @extends wikibase.datamodel.List
 * @abstract
 * @since 0.3
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 *
 * @param {wikibase.datamodel.Snak[]} [snaks=[]]
 */
wb.datamodel.SnakList = util.inherit( 'WbDataModelSnakList', PARENT, function( snaks ) {
	PARENT.call( this, wikibase.datamodel.Snak, snaks );
}, {
	/**
	 * Returns a SnakList with the snaks featuring a specific property id.
	 *
	 * @param {string} propertyId
	 * @return {wikibase.datamodel.SnakList}
	 * @private
	 */
	getFilteredSnakList: function( propertyId ) {
		if( !propertyId ) {
			throw new Error( 'Can not filter with no propertyId.' );
		}

		var filteredSnaks = [];

		this.each( function( i, snak ) {
			if( snak.getPropertyId() === propertyId ) {
				filteredSnaks.push( snak );
			}
		} );

		return new wb.datamodel.SnakList( filteredSnaks );
	},

	/**
	 * Returns a list of SnakList objects, each of them grouped by the property used by the snaks.
	 *
	 * @return {wikibase.datamodel.SnakList[]}
	 */
	getGroupedSnakLists: function() {
		var groupedSnakLists = [],
			propertyIds = this.getPropertyOrder();

		for( var i = 0; i < propertyIds.length; i++ ) {
			groupedSnakLists.push( this.getFilteredSnakList( propertyIds[i] ) );
		}

		return groupedSnakLists;
	},

	/**
	 * Returns a list of property ids representing the order of the Snaks grouped by property.
	 *
	 * @return {string[]}
	 */
	getPropertyOrder: function() {
		var propertyIds = [];

		this.each( function( i, snak ) {
			var propertyId = snak.getPropertyId();

			if( $.inArray( propertyId, propertyIds ) === -1 ) {
				propertyIds.push( propertyId );
			}
		} );

		return propertyIds;
	}
} );

}( wikibase, jQuery ) );
