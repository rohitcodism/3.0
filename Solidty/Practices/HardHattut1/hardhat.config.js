/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "vuQEnypEgHUJXCJpBONUm2kCm2W_N4JI";

const SEPOLIA_PRIVATE_KEY = "386b47ccf0bf2ecf263125b5ba313980babe827262022b98f29ecc689339f1b7"
module.exports = {
  solidity: "0.8.19",

  networks:{
    sepolia:{
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
  }
};
