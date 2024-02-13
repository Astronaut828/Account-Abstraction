require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
<<<<<<< HEAD
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
=======
  solidity: "0.8.19",
>>>>>>> b6212fbccf28a23c53796f426dac72088c5180cd
};
