"use strict";
exports.__esModule = true;
exports.poolMetadataSchema = {
    id: '/PoolMetadata',
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        bio: {
            type: 'string'
        },
        verified: {
            type: 'boolean'
        },
        website_url: {
            type: 'string',
            format: 'uri',
            description: 'url that points to a marketing / informational website'
        },
        logo_img: {
            type: 'string'
        },
        location: {
            type: 'string'
        }
    },
    required: ['name', 'verified']
};
exports.poolsMetadataSchema = {
    id: '/PoolsMetadata',
    title: 'Staking Pools Metadata',
    type: 'object',
    additionalProperties: {
        $ref: '/PoolMetadata'
    }
};
