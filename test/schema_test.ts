import * as chai from 'chai';
import * as _ from 'lodash';
import * as isValidUUID from 'uuid-validate';
import * as dirtyChai from 'dirty-chai';
import { SchemaValidator } from '@0xproject/json-schemas';
import 'mocha';

import { poolMetadataSchema, poolsMetadataSchema } from '../schemas';
import * as poolsMetadata from '../../pool_metadata.json';
import * as stakingPools from '../../staking_pools.json';

chai.config.includeStack = true;
chai.use(dirtyChai);

const SUPPORTED_CHAINS = ['1','3','4','42','1337'];

const schemaValidator = new SchemaValidator();
schemaValidator.addSchema(poolMetadataSchema);
schemaValidator.addSchema(poolsMetadataSchema);
const validateAgainstMetadataSchema = (metadata: { [uuid: string]: any }, schema: any, shouldFail = false) => {
    _.each(metadata, (metadata, uuid) => {
        if (!isValidUUID(uuid)) {
            throw new Error('Make sure your UUID was generated using the `npm run generate:uuid` command');
        }
        const validationResult = schemaValidator.validate(metadata, schema);
        const hasErrors = validationResult.errors.length !== 0;
        if (shouldFail && !hasErrors) {
            throw new Error(`Expected testCase: ${JSON.stringify(metadata, null, '\t')} to fail and it didn't.`);
        } else if (!shouldFail && hasErrors) {
            throw new Error(JSON.stringify(validationResult.errors, null, '\t'));
        }
    });
};
const validatePools = (chains: { [chainId: string]: { [ poolId: string ]: string } }) => {
    _.each(chains, (pool, chainId) => {
        if (!SUPPORTED_CHAINS.includes(chainId)) {
            throw new Error('Unsupported chains in staking pools file');
        }

        _.each(pool, (pool, poolId) => {
            if (!isValidUUID(pool)) {
                throw new Error('Make sure your UUID was generated using the `npm run generate:uuid` command');
            }

            if (!Number.isInteger(Number(poolId))) {
                throw new Error ('Invalid Pool ID');
            }
        });
        
    });
};

describe('Staking Pool Metadata Schema', () => {
    it('should validate valid Staking Pools', () => {
        validateAgainstMetadataSchema(
            {
                '56b7d109-6982-472e-b272-501d4d690c71': {
                    name: 'Sample Staking Pool 1',
                    bio: 'A short bio',
                    verified: true,
                    website_url: 'https://asamplewebsite.com',
                    logo_img: 'staking_pool_1_logo.png',
                    location: 'somewhere',
                },
                'a1d617d7-465c-44c9-9908-4de6aabc8dd3': {
                    name: 'Sample Staking Pool 2',
                    bio: 'Another short bio',
                    verified: true,
                    website_url: 'https://asamplewebsite2.com',
                    logo_img: 'staking_pool_2_logo.png',
                },
            },
            poolMetadataSchema,
        );
    });
    it('should fail invalid Staking Pools', () => {
        validateAgainstMetadataSchema(
            {
                '0964ed09-81c3-446a-bf47-6b3e1ff551cc': {
                    url: 'https://asamplewebsite.com',
                    logo: 'sample_fail.png',
                },
            },
            poolMetadataSchema,
            true,
        );
    });
});
describe('Staking Pool Metadata', () => {
    it('should only contain valid Staking Pool Metadata Entries', () => {
        validateAgainstMetadataSchema(poolsMetadata, poolMetadataSchema);
    });
});
describe('Staking Pool Registry', () => {
    it('should only contain valid registry entries', () => {
        validatePools(stakingPools);
    });
});
