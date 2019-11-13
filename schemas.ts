  
export const stakingPoolSchema = {
    id: '/StakingPool',
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
        bio: {
            type: 'string',
        },
        verified: {
            type: 'boolean',
        },
        website_url: {
            type: 'string',
            format: 'uri',
            description: 'url that points to a marketing / informational website',
        },
        logo_img: {
            type: 'string',
        },
        location: {
            type: 'string',
        },
        chains: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                properties: {
                    chain_id: {
                        type: 'integer',
                    },
                    pool_id: {
                        type: 'string',
                    },
                },
            },
        },
    },
    required: ['name', 'chains'],
};

export const stakingPoolsSchema = {
    id: '/StakingPools',
    title: 'Staking Pools',
    type: 'object',
    additionalProperties: {
        $ref: '/StakingPool',
    },
};
