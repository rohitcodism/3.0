// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Test {
  uint x = 10;

  function Setter(uint256 _x) public {
    x = _x;
  }

  function Getter() public view returns(uint256){
    return x;
  }
}
