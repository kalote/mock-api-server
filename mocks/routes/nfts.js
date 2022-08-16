// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

const {
  CHAIN_NAME,
  NFTS,
  baseCollectionMetadata,
  baseNftMetadata,
  baseObject,
  NFTSCollection,
} = require("../data");

module.exports = [
  {
    id: "NFT", // route id
    url: "/:address(0x[0-9A-Fa-f]{40})/nft/:all?", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "eoa", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const netId = req.body.chain ?? "eth";
            const address = req.params.address;
            const all = req.params.all || false;
            const result = Object.assign({}, baseObject);
            result.account = address;
            result.network = `${CHAIN_NAME[netId]}`;
            result.total = all ? NFTS.length : 4;
            result.assets = all ? NFTS : NFTS.slice(1, 5);
            res.status(200).send(result);
          },
        },
      },
    ],
  },
  {
    id: "collectionNFT",
    url: "/nft/:address", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "collection", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const netId = req.body.chain ?? "eth";
            const address = req.params.address;
            const result = baseObject;
            result.account = address;
            result.network = `${CHAIN_NAME[netId]}`;
            result.total = NFTSCollection.length;
            result.assets = NFTSCollection.slice(1, 5);
            res.status(200).send(result);
          },
        },
      },
    ],
  },
  {
    id: "tokenMetadata",
    url: "/nft/:address/:tokenId",
    method: "GET",
    variants: [
      {
        id: "success", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res, next) => {
            const address = req.params.address;
            const tokenId = req.params.tokenId;
            if (tokenId == "metadata") return next();
            else {
              const result = baseNftMetadata;
              result.contract = address;
              result.tokenId = tokenId;
              res.status(200).send(result);
            }
          },
        },
      },
    ],
  },
  {
    id: "collectionMetadata",
    url: "/nft/:address/metadata",
    method: "GET",
    variants: [
      {
        id: "success", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const address = req.params.address;
            const result = baseCollectionMetadata;
            result.contract = address;
            res.status(200).send(result);
          },
        },
      },
    ],
  },
];
