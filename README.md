# 0x Staking Pool Registry

A collection of metadata about [0x](https://0x.org/) staking pools.

Addition to this repository is not a requirement to use the 0x Protocol. It's intended to make it easier for potential ZRX stakers to discover additional information about staking pools.

## Usage

Option A. Clone this repo and import `staking_pools.json` and `pool_metadata.json` into your own project or  
Option B. Get the latest version by fetching it directly from this repo

`$ curl -i -H "Accept: application/json" https://api.github.com/repos/0xProject/0x-staking-pool-registry/contents/staking_pools.json?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}`

`$ curl -i -H "Accept: application/json" https://api.github.com/repos/0xProject/0x-staking-pool-registry/contents/pool_metadata.json?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}`

To get metadata for a particular chain and pool ID (if it exists), you can do the following in Javascript. The example below grabs metadata for pool ID "1" on chain 42 (Kovan).

```javascript
metadata = require('./pool_metadata.json');
pools = require('./staking_pools.json');

data = metadata[pools[42][1]];
```

## Submission Process

1.  Fork this repository.
2.  Add your logo image in a web-safe format (GIF, JPEG, or PNG) to the `logos` folder.
3.  Install [yarn](https://yarnpkg.com) and run `yarn install`
4.  Generate a UUID for your relayer by running `yarn generate:uuid`.
5.  Add an entry to `staking_pools.json` for each of your pools under the correct Chain ID. The outermost keys are Chain IDs, and the correct format for nested entries is "<pool ID>": uuid.
6.  Add an entry to `pool_metadata.json` that complies with the metadata JSON schema in [`schemas.ts`](./schemas.ts)
7.  Run `yarn test` to verify that your entries pass schema validation.
8.  Submit PR for approval

A sample submission:

In `staking_pools.json`, add a mapping of your on-chain pool IDs to your generated UUID. The outermost numbers are chain IDs (1-mainnet ethereum, 3-Ropsten, etc.). In this example, "149d3c10-d7a4-49e4-90f2-527fd4f727f1" is pool 1 on all chains.
```json
{
    "1": {
        "1": "149d3c10-d7a4-49e4-90f2-527fd4f727f1"
    },
    "3": {
        "1": "149d3c10-d7a4-49e4-90f2-527fd4f727f1"
    },
    "4": {
        "1": "149d3c10-d7a4-49e4-90f2-527fd4f727f1"
    },
    "42": {
        "1": "149d3c10-d7a4-49e4-90f2-527fd4f727f1"
    },
    "1337": {
        "1": "149d3c10-d7a4-49e4-90f2-527fd4f727f1"
    }
}

```

In pool_metadata.json, add your generated UUID and metadata about your pool:
```json
"149d3c10-d7a4-49e4-90f2-527fd4f727f1": {
    "name": "Test Pool",
    "bio": "All your stake are belong to us",
    "verified": true,
    "website_url": "http://0x.org",
    "logo_img": "0x.png",
    "location": "San Francisco, CA",
}
```
