// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

contract CoinRecord{

    struct Record{
        address from;
        address to;
        uint amount;
        uint txnID;
    }

    uint256 totalMoney = 0;

    mapping( address => bool ) contributers;
    uint noOfContributers;

    Record[] transactionLog;

    event TransactionHappened(address, address, uint);

    function addContributer( address _contributer ) external{
        if(contributers[_contributer] == false){
            contributers[_contributer] = true;
            noOfContributers+=1;
        }
    }

    function getNoOfContributers() public view returns ( uint ){
        return noOfContributers;
    }

    function addTransaction( address _from, address _to, uint _amount ) external{
        totalMoney += _amount;
        transactionLog.push( Record(_from, _to, _amount, transactionLog.length ) );
        emit TransactionHappened( _from, _to, _amount);
    }

    function getTotalMoney() public view returns ( uint ){
        return totalMoney;
    }

    function getTransactions() public view returns ( Record[] memory  ){
        return transactionLog;
    }
}