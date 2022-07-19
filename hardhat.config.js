const fs = require('fs');
require('@nomiclabs/hardhat-waffle');

const privatekey = fs.readFileSync('.secret').toString().trim();
const goerliUrl = fs.readFileSync('.goerliUrl').toString().trim();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: goerliUrl,
      accounts: [
        privatekey,
      ],
    },
  },
  solidity: '0.8.15',
};
