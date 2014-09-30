/**
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */
( function( wb, dv, util ) {
	'use strict';

	var PARENT = dv.DataValue;

	/**
	 * @constructor
	 * @since 0.3
	 *
	 * @param {String} entityType
	 * @param {Number} numericId
	 */
	var constructor = function( entityType, numericId ) {
		if( typeof entityType !== 'string' ) {
			throw new Error( 'entityType is required for constructing new EntityId and must be a string' );
		}

		if( typeof numericId !== 'number' ) {
			throw new Error( 'numericId is required for constructing new EntityId and must be a number' );
		}

		this._entityType = entityType;
		this._numericId = numericId;
	};

	wb.datamodel.EntityId = util.inherit( 'WbDataModelEntityId', PARENT, constructor, {

		/**
		 * @type String
		 */
		_entityType: null,

		/**
		 * @type Number
		 */
		_numericId: null,

		/**
		 * Returns the type of the entity.
		 *
		 * @return String
		 */
		getEntityType: function() {
			return this._entityType;
		},

		/**
		 * Returns the numeric ID of the entity.
		 *
		 * @return Number
		 */
		getNumericId: function() {
			return this._numericId;
		},

		/**
		 * Returns the prefixed ID of the entity. Requires a map for formatting the prefix.
		 *
		 * @param {Object} prefixMap Like { prefix: entityType }, e.g. { 'P': 'property' }
		 *        The same entity type can appear multiple times with different prefixes. If this is
		 *        the case, the first one will be taken.
		 * @return String
		 */
		getPrefixedId: function( prefixMap ) {
			var entityType = this._entityType;

			// find prefix of this entity ID's entity type
			for( var key in prefixMap ) {
				if( prefixMap[ key ] === entityType ) {
					return key + this.getNumericId();
				}
			}

			// can't output prefixed ID without knowing the prefix!
			throw new Error( 'The given prefix map does not contain a prefix for the entitytype "' +
				entityType + '"' );
		},

		/**
		 * @see dataValues.DataValue.equals
		 */
		equals: function( entityId ) {
			return entityId === this
				|| entityId instanceof this.constructor
					&& this.getEntityType() === entityId.getEntityType()
					&& this.getNumericId() === entityId.getNumericId();
		},

		/**
		 * @see dv.DataValue.getValue
		 *
		 * @return wb.datamodel.EntityId
		 */
		getValue: function() {
			return this;
		},

		/**
		 * @see dv.DataValue.getSortKey
		 *
		 * @return String|Number
		 */
		getSortKey: function() {
			return this._entityType + this._numericId;
		},

		/**
		 * @see dv.DataValue.toJSON
		 *
		 * @return Object
		 */
		toJSON: function() {
			return {
				'entity-type': this._entityType,
				'numeric-id': this._numericId
			};
		}

	} );

/**
 * @see dv.DataValue.newFromJSON
 */
wb.datamodel.EntityId.newFromJSON = function( json ) {
	return new wb.datamodel.EntityId( json['entity-type'], json['numeric-id'] );
};

wb.datamodel.EntityId.TYPE = 'wikibase-entityid';

dv.registerDataValue( wb.datamodel.EntityId );

}( wikibase, dataValues, util ) );
