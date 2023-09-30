const { event } = require("../build/contracts/eventContract.json");

module.exports = (_deployer) => {
  _deployer.deploy(event);
};