var test = artifacts.require("./Test.sol");

module.exports = function(deployer) {
    deployer.deploy(test);
};