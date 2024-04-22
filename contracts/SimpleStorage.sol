// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

//EVM, Ethereum Virtual Machine -> standard of how to deploy smart contracts to ethereum like blockchanis
// Avalanche, Fantom, Polygon -> EVM compatible blockchains

contract SimpleStorage {
    uint256 favoriteNumber; //storage variable
    mapping(string => uint256) public nameToFavoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    // in order for one funtion to be overridable, it should be virtual function
    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
        /* retrieve();  if a gas calling function calls a view or pure function 
                       - only then will it cost gas
        */
    }

    // View and pure functions, when called alone, do not spend gas
    // View and pure functions disallow modification of state
    // Pure functions additionally disallow you to read from blockchain state
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // calldata and memory -> exists tempororaily
    // storage -> exists even outside the function execution
    //calldata -> temproray variables that can not be modified
    //memory   -> temprorary variables that can be modified
    // storage -> permament variables that can be modified

    //structs, mappings and arrays(string is also array) need to be given "memory" or "calldata"
    //when adding them into functions as a parameter
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        People memory NewPerson = People({
            favoriteNumber: _favoriteNumber,
            name: _name
        });
        people.push(NewPerson);
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}

//0xd9145CCE52D386f254917e481eB44e9943F39138
