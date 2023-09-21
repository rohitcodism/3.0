// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Test {
  uint x = 10;

  function Getter() public view returns(uint){
    return x;
  }
}
