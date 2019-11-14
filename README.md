# 0x Staking Pool Registry

A collection of metadata about [0x](https://0x.org/) staking pools.

Addition to this repository is not a requirement to use the 0x Protocol. It's intended to make it easier for potential ZRX stakers to discover additional information about staking pools.

## Usage

Option A. Clone this repo and import `staking_pools.json` into your own project or  
Option B. Get the latest version by fetching it directly from this repo
`$ curl -i -H "Accept: application/json" https://api.github.com/repos/0xProject/0x-staking-pool-registry/contents/staking_pools.json?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}`

## Submission Process

1.  Fork this repository.
2.  Add your logo image in a web-safe format (GIF, JPEG, or PNG) to the `logos` folder.
3.  Install [yarn](https://yarnpkg.com) and run `yarn install`
4.  Generate a UUID for your relayer by running `yarn generate:uuid`.
5.  Add an entry to `staking_pools.json` that complies with the staking pool JSON schema in [`schemas.ts`](./schemas.ts)
6.  Run `yarn test` to verify that the updated `staking_pools.json` file passes schema validation.
7.  Submit PR for approval

A sample submission:

```json
"149d3c10-d7a4-49e4-90f2-527fd4f727f1": {
    "name": "Test Pool",
    "bio": "All your stake are belong to us",
    "verified": true,
    "website_url": "http://0x.org",
    "logo_img": "0x.png",
    "location": "San Francisco, CA",
    "chains": [
        {
            "chain_id": 42,
            "pool_id": "1"
        }
    ]
}
```
