/**
 * @licence GNU GPL v2+
 * @author Daniel Werner < daniel.werner@wikimedia.de >
 */
( function( wb, dv, $ ) {
'use strict';

/**
 * Represents a Wikibase Snak.
 * @constructor
 * @abstract
 * @since 0.3
 *
 * @param {String} propertyId
 */
var SELF = wb.datamodel.Snak = function WbSnak( propertyId ) {
	// check whether the Snak has a type, doesn't make sense to create an instance of wb.datamodel.Snak!
	if( !this.constructor.TYPE ) {
		throw new Error( 'Can not create abstract Snak of no specific type' );
	}
	if( !propertyId ) {
		throw new Error( 'Property ID is required for constructing new Snak' );
	}
	this._propertyId = propertyId;
};

/**
 * String to identify this type of Snak
 * @type String
 */
SELF.TYPE = null;

$.extend( SELF.prototype, {
	/**
	 * @type Number
	 */
	_propertyId: null,

	/**
	 * Returns what type of Snak this is.
	 *
	 * @return String
	 */
	getType: function() {
		return this.constructor.TYPE;
	},

	/**
	 * Returns the ID of the property entity the Snak relates to.
	 *
	 * @return string
	 */
	getPropertyId: function() {
		return this._propertyId;
	},

	/**
	 * Returns whether this Snak is equal to another Snak. This means that their property and type
	 * are the same, as well as any other attributes they might have depending on their Snak type.
	 *
	 * @param {wb.datamodel.Snak|*} that
	 * @return {Boolean}
	 */
	equals: function( that ) {
		if( !( that instanceof this.constructor ) ) {
			return false;
		}

		return that === this
			|| (
				this.getPropertyId() === that.getPropertyId()
				&& this.getType() === that.getType()
			);
	},

	/**
	 * Returns a simple JSON structure representing this Snak.
	 *
	 * TODO: implement this as a wb.datamodel.serialization.Serializer
	 *
	 * @return Object
	 */
	toJSON: function() {
		return this.toMap();
	},

	/**
	 * Returns a plain Object representing this Snak. Similar to toJSON(), containing the same
	 * fields but the values within the fields will not be serialized to JSON in the Object returned
	 * by this function.
	 *
	 * @return {Object} Object with 'snaktype' and 'property' fields and possibly others, depending
	 *         on the Snak type.
	 */
	toMap: function() {
		return {
			snaktype: this.getType(),
			property: this.getPropertyId()
		};
	}
} );

// TODO: make newFromJSON and newFromMap abstract factories with registration for new Snak types!
/**
 * Creates a new Snak Object from a given JSON structure.
 *
 * @param {String} json
 * @return wb.datamodel.Snak|null
 */
SELF.newFromJSON = function( json ) {
	// don't alter given Object in case of 'value' Snak by copying structure into new Object
	var map = $.extend( {}, json );

	if( json.snaktype === 'value' ) {
		var type = json.datavalue.type,
			value = json.datavalue.value;
		try{
			map.datavalue = dv.newDataValue( type, value );
		} catch( e ) {
			map.datavalue = new dv.UnUnserializableValue( value, type, e );
		}
	}
	return SELF.newFromMap( map );
};

/**
 * Creates a new Snak Object from a given Object with certain keys and values, what an actual Snak
 * would return when calling its toMap().
 *
 * @param {Object} map Requires at least 'snaktype' and 'property' fields.
 * @return wb.datamodel.Snak|null
 */
SELF.newFromMap = function( map ) {
	switch( map.snaktype ) {
		case 'value':
			return new wb.datamodel.PropertyValueSnak( map.property, map.datavalue );
		case 'novalue':
			return new wb.datamodel.PropertyNoValueSnak( map.property );
		case 'somevalue':
			return new wb.datamodel.PropertySomeValueSnak( map.property );
		default:
			return null;
	}
};

}( wikibase, dataValues, jQuery ) );
