import * as chai from 'chai';
import * as _ from 'lodash';
import * as isValidUUID from 'uuid-validate';
import * as dirtyChai from 'dirty-chai';
import { SchemaValidator } from '@0xproject/json-schemas';
import 'mocha';

import { stakingPoolSchema, stakingPoolsSchema } from '../schemas';
import * as stakingPools from '../../staking_pools.json';

chai.config.includeStack = true;
chai.use(dirtyChai);

const schemaValidator = new SchemaValidator();
schemaValidator.addSchema(stakingPoolSchema);
schemaValidator.addSchema(stakingPoolsSchema);
const validateAgainstSchema = (stakingPools: { [uuid: string]: any }, schema: any, shouldFail = false) => {
    _.each(stakingPools, (stakingPool, uuid) => {
        if (!isValidUUID(uuid)) {
            throw new Error('Make sure your UUID was generated using the `npm run generate:uuid` command');
        }
        const validationResult = schemaValidator.validate(stakingPool, schema);
        const hasErrors = validationResult.errors.length !== 0;
        if (shouldFail && !hasErrors) {
            throw new Error(`Expected testCase: ${JSON.stringify(stakingPool, null, '\t')} to fail and it didn't.`);
        } else if (!shouldFail && hasErrors) {
            throw new Error(JSON.stringify(validationResult.errors, null, '\t'));
        }
    });
};
describe('Staking Pool Schema', () => {
    it('should validate valid Staking Pools', () => {
        validateAgainstSchema(
            {
                '56b7d109-6982-472e-b272-501d4d690c71': {
                    name: 'Sample Staking Pool 1',
                    bio: 'A short bio',
                    verified: true,
                    website_url: 'https://asamplewebsite.com',
                    logo_img: 'staking_pool_1_logo.png',
                    location: 'somewhere',
                    chains: [
                        {
                            chain_id: 1,
                            pool_id: "1"
                        },
                    ],
                },
                'a1d617d7-465c-44c9-9908-4de6aabc8dd3': {
                    name: 'Sample Staking Pool 2',
                    bio: 'Another short bio',
                    verified: true,
                    website_url: 'https://asamplewebsite2.com',
                    logo_img: 'staking_pool_2_logo.png',
                    location: 'somewhere else',
                    chains: [
                        {
                            chain_id: 1,
                            pool_id: "2"
                        },
                    ],
                },
            },
            stakingPoolSchema,
        );
    });
    it('should fail invalid Staking Pools', () => {
        validateAgainstSchema(
            {
                '0964ed09-81c3-446a-bf47-6b3e1ff551cc': {
                    name: 'Sample Failed Staking pool',
                    url: 'https://asamplewebsite.com',
                    logo: 'sample_fail.png',
                },
                'dd2d1b3f-e7a3-4751-8c7e-7274f1c5038f': {
                    name: 'Sample Failed Staking Pool',
                    url: 'https://asamplewebsite.com',
                    logo: 'sample_fail.png',
                    networks: [],
                },
                'f65ab054-8b33-4f22-a94c-55e5f8768b57': {
                    name: 'Sample Failed Staking Pool',
                },
            },
            stakingPoolSchema,
            true,
        );
    });
});
describe('Staking Pool Registry', () => {
    it('should only contain valid Staking Pools', () => {
        validateAgainstSchema(stakingPools, stakingPoolSchema);
    });
});