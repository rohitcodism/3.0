// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Test {
  uint public x;
  uint public b;
  uint public c;

  function Setter(uint256 _x) public {
    x = _x;
  }

  function Getter() public view returns(uint256){
    return x;
  }
}
