// Import the Hardhat Runtime Environment (HRE) for accessing Ethereum network functionalities. 
// This setup allows for transactions, account management, and contract compilation, enabling standalone script execution or through Hardhat commands.
const hre = require("hardhat");

// Constants definition: Assign deployment-specific variables, including addresses and the starting nonce for contract deployment.
const FACTORY_NONCE = 1; // Note: Contract nonces start at 1, indicating the first transaction from an account.
const FACTORY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const EP_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const PM_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

// Main Function Definition: The core asynchronous function where deployment and interaction operations are executed.
async function main() {
  // Establish connection with the EntryPoint contract for subsequent interactions.
  const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

  // Compute the expected address for a new contract deployed by the factory using a specific nonce.
  const sender = await hre.ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE,
  });

  // Instantiate the AccountFactory contract, allowing for the creation of new account contracts.
  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
  // Retrieve signers from the hardhat environment, representing Ethereum accounts with associated private keys.
  const [signer0, signer1] = await hre.ethers.getSigners(); // signer1 is used for testing purposes.
  // Obtain the Ethereum address of the first signer for use in contract interactions.
  const address0 = await signer0.getAddress();
  // Define initialization code for the Account contract deployment, using encoded function data for contract creation.
  // createAccount function will not be called if initCode is "0x". 
  const initCode = // "0x";
  // On multiple deployments, we can use "0x" as the initCode, so it does not reinitialize the contract.
  // The initialization code combines the deployer's address with the encoded account creation function.
    FACTORY_ADDRESS + AccountFactory.interface
    .encodeFunctionData("createAccount", [address0])
    .slice(2); 
 
  // Deposit Ether to the Paymaster contract, ensuring it has funds to cover transaction fees for the first deployment.
    await entryPoint.depositTo(PM_ADDRESS, {
      value: hre.ethers.parseEther("100"),
    }); 

  // Prepare the Account contract for deployment through the factory.
  const Account = await hre.ethers.getContractFactory("Account");

  // User operation (userOP) struct preparation for transaction execution.
  // This includes details like the sender address, nonce, and parameters for the transaction call.
  const userOP = {
    sender, // The address expected to result from the contract deployment.
    nonce: await entryPoint.getNonce(sender, 0), // Unique nonce for operation verification to prevent replay attacks.
    initCode, // Constructor code for account contract creation, supporting multiple deployments without reinitialization.
    callData: Account.interface.encodeFunctionData("execute"), // Encoded bytecode for method execution within the deployed account.
    callGasLimit: 400_000, // Gas limit for the execution call.
    verificationGasLimit: 400_000, // Gas allocated for operation verification.
    preVerificationGas: 100_000, // Additional gas for pre-verification steps.
    maxFeePerGas: hre.ethers.parseUnits("10", "gwei"), // EIP-1559 transaction fee parameter.
    maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"), // EIP-1559 priority fee parameter.
    paymasterAndData: PM_ADDRESS, // Paymaster contract details, covering transaction fees.
    signature: "0x" // Placeholder for the digitally signed operation hash, to be completed later.
  };

  // Generate a hash of the user operation for signing, ensuring integrity and authenticity of the transaction request.
  const userOpHash = await entryPoint.getUserOpHash(userOP);
  // Sign the hash with the signer's private key, providing verification of the operation's originator.
  userOP.signature = signer0.signMessage(hre.ethers.getBytes(userOpHash));

  // Execute the prepared user operation via the EntryPoint contract, handling the operation and its effects.
  const tx = await entryPoint.handleOps([userOP], address0);
  // Await transaction completion, retrieving the receipt for confirmation and logging.
  const receipt = await tx.wait();
  console.log("Transaction receipt:", receipt);
}

// Error handling pattern for async/await to catch and display errors properly.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
