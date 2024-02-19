# Account Abstraction / EIP 4337 implementation (Alchemy Course)

Learning Account Abstraction, understand the EIP 4337 implementation and deployment on Arbitrum.

1. yarn hardhat run scripts/deploy.js

2. On the first execution of execute.js, comment out "0x"; on line 25 and uncomment lines 26 - 30:

//On multiple deployments, we can use "0x" as the initCode, so it does not reinitialize the contract.
// FACTORY_ADDRESS +
// AccountFactory.interface
// .encodeFunctionData("createAccount", [address0])
// .slice(2);

- After the first execution, comment the lines again and use "0x".

Also, on the first execution, the contract will need some funds.
Uncomment lines 34 - 37:

//Prefund only on the first deployment
// await entryPoint.depositTo(sender, {
// value: hre.ethers.parseEther("100"),
// });

- After the first execution, comment the lines again.

3. Run yarn hardhat run scripts/execute.js and update the sender address that is logged out in the test script. Then run yarn hardhat run scripts/epTest.js to ensure the count is increasing (execute / test = 2n, 3n, 4, ...).

This step verifies that the deployment and execution processes are functioning correctly.
