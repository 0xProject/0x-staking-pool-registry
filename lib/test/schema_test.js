"use strict";
exports.__esModule = true;
var chai = require("chai");
var _ = require("lodash");
var isValidUUID = require("uuid-validate");
var dirtyChai = require("dirty-chai");
var json_schemas_1 = require("@0xproject/json-schemas");
require("mocha");
var schemas_1 = require("../schemas");
var poolsMetadata = require("../../pool_metadata.json");
var stakingPools = require("../../staking_pools.json");
chai.config.includeStack = true;
chai.use(dirtyChai);
var SUPPORTED_CHAINS = ['1', '3', '4', '42', '1337'];
var schemaValidator = new json_schemas_1.SchemaValidator();
schemaValidator.addSchema(schemas_1.poolMetadataSchema);
schemaValidator.addSchema(schemas_1.poolsMetadataSchema);
var validateAgainstMetadataSchema = function (metadata, schema, shouldFail) {
    if (shouldFail === void 0) { shouldFail = false; }
    _.each(metadata, function (metadata, uuid) {
        if (!isValidUUID(uuid)) {
            throw new Error('Make sure your UUID was generated using the `npm run generate:uuid` command');
        }
        var validationResult = schemaValidator.validate(metadata, schema);
        var hasErrors = validationResult.errors.length !== 0;
        if (shouldFail && !hasErrors) {
            throw new Error("Expected testCase: " + JSON.stringify(metadata, null, '\t') + " to fail and it didn't.");
        }
        else if (!shouldFail && hasErrors) {
            throw new Error(JSON.stringify(validationResult.errors, null, '\t'));
        }
    });
};
var validatePools = function (chains) {
    _.each(chains, function (pool, chainId) {
        if (!SUPPORTED_CHAINS.includes(chainId)) {
            throw new Error('Unsupported chains in staking pools file');
        }
        _.each(pool, function (pool, poolId) {
            if (!isValidUUID(pool)) {
                throw new Error('Make sure your UUID was generated using the `npm run generate:uuid` command');
            }
            if (!Number.isInteger(Number(poolId))) {
                throw new Error('Invalid Pool ID');
            }
        });
    });
};
describe('Staking Pool Metadata Schema', function () {
    it('should validate valid Staking Pools', function () {
        validateAgainstMetadataSchema({
            '56b7d109-6982-472e-b272-501d4d690c71': {
                name: 'Sample Staking Pool 1',
                bio: 'A short bio',
                verified: true,
                website_url: 'https://asamplewebsite.com',
                logo_img: 'staking_pool_1_logo.png',
                location: 'somewhere'
            },
            'a1d617d7-465c-44c9-9908-4de6aabc8dd3': {
                name: 'Sample Staking Pool 2',
                bio: 'Another short bio',
                verified: true,
                website_url: 'https://asamplewebsite2.com',
                logo_img: 'staking_pool_2_logo.png'
            }
        }, schemas_1.poolMetadataSchema);
    });
    it('should fail invalid Staking Pools', function () {
        validateAgainstMetadataSchema({
            '0964ed09-81c3-446a-bf47-6b3e1ff551cc': {
                url: 'https://asamplewebsite.com',
                logo: 'sample_fail.png'
            },
            'f964ed09-81c3-446a-bf47-6b3e1ff551cc': {
                name: 'a failing staking pool',
                url: 'https://asamplewebsite.com',
                logo: 'sample_fail.png'
            },
            'a1d617d7-465c-44c9-9908-4de6aabc8dd3': {
                name: 'failing staking pool',
                verified: true,
                website_url: 5
            }
        }, schemas_1.poolMetadataSchema, true);
    });
});
describe('Staking Pool Metadata', function () {
    it('should only contain valid Staking Pool Metadata Entries', function () {
        validateAgainstMetadataSchema(poolsMetadata, schemas_1.poolMetadataSchema);
    });
});
describe('Staking Pool Registry', function () {
    it('should only contain valid registry entries', function () {
        validatePools(stakingPools);
    });
});
