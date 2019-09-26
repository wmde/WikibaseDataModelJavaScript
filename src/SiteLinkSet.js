( function( wb ) {
'use strict';

var PARENT = wb.datamodel.Set,
	SiteLink = require( './SiteLink.js' );

/**
 * Set of SiteLink objects.
 * @class wikibase.datamodel.SiteLinkSet
 * @extends wikibase.datamodel.Set
 * @since 1.0
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 *
 * @param {SiteLink[]} [siteLinks=[]]
 */
module.exports = util.inherit( 'WbDataModelSiteLinkSet', PARENT, function( siteLinks ) {
	PARENT.call( this, SiteLink, 'getSiteId', siteLinks );
} );

}( wikibase ) );
