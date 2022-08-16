# Mock server for NFT API

This is a simple mock server for load testing

## Install

```
npm i
```

## Run

```
npm run mocks
```

## Routes

### "/:address(0x[0-9A-Fa-f]{40})/nft/:all?"

- Any valid address that match the regex will works. 'all' can be anything and will send large result set (100+)
- Will return all NFT for a given EOA

### "/nft/:address":

- Any address will works
- Will return all NFT for a given Collection

### "/nft/:address/:tokenId"

- Any address will works
- Any tokenId will works
- Will return the metadata associated with an NFT

### "/nft/:address/metadata"

- Any address will works
- Will return the metadata associated with a collection
