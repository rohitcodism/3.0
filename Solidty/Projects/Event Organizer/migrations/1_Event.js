var Event = artifacts.require("eventContract");

module.exports = (deployer) => {
  deployer.deploy(Event);
};