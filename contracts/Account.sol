// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// EntryPoint.sol
import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol"; // userOP
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


/** 
 * @title Account Contract
 * @dev Implements an account system with ownership and basic operation validation.
 * The Account contract keeps track of a `count` variable as a simplistic form of state
 * and allows for operations to be validated against the owner's signature.
 */
contract Account is IAccount {
    uint public count;
    address public owner;

    /**
     * @dev Sets the owner address upon contract creation.
     * @param _owner Address of the account owner.
     */
    constructor(address _owner) {
        owner = _owner;
    }

    /** 
     * @dev Validates a user operation based on the provided signature.
     * @param userOp The user operation to validate.
     * @param userOpHash The hash of the user operation.
     * @param validationData Additional data for validation (unused in this contract).
     * @return validationData Returns 0 if the operation is valid (signature matches the owner), otherwise returns 1.
     */
    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256) external view returns (uint256 validationData) {
        address recovered = ECDSA.recover(ECDSA.toEthSignedMessageHash(userOpHash), userOp.signature);
        
        // Validates the operation: returns 0 if valid, 1 if invalid
        return owner == recovered ? 0 : 1;
    }

    /**
     * @dev Increments the `count` state variable by one. Represents an execution operation.
     */
    function execute() external {
        count++;
    }
}

/** 
 * @title Account Factory
 * @dev Factory contract to create new Account contracts. Simplifies the process of deploying
 * new Account instances by encapsulating the deployment logic.
 */
contract AccountFactory {
    
    /**
     * @dev Creates a new Account contract instance.
     * @param owner The owner of the new account, which will be set upon contract creation.
     * @return The address of the newly created Account contract.
     */
    function createAccount(address owner) external returns (address) {
        Account acc = new Account(owner);
        return address(acc);
    }
}