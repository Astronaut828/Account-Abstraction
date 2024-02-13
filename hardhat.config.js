require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  solidity: {
    version: "0.8.19",
    settings: {
      // Using Solidity optimizer to shrink the size of the contract
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};
