# Account Abstraction / EIP 4337 implementation (Alchemy Course)

Learning Account Abstraction, understand the EIP 4337 implementation and deployment on Arbitrum.


1) yarn hardhat run scripts/deployEP.js
- update const EP_ADDRESS = "0x0000" on epTest.js if necessary

2) yarn hardhat run scripts/deployAF.js
- update const FACTORY_ADDRESS = "0x0000" on execute.js if necessary

3) On the first execution of execute.js, uncomment lines 26 - 30:

//On multiple deployments, we can use "0x" as the initCode, so it does not reinitialize the contract.
// FACTORY_ADDRESS +
// AccountFactory.interface
//   .encodeFunctionData("createAccount", [address0])
//   .slice(2);

- After the first execution, comment the lines again and use "0x".

Also, on the first execution, the contract will need some funds. 
Uncomment lines 34 - 37:

//Prefund only on the first deployment
// await entryPoint.depositTo(sender, {
//   value: hre.ethers.parseEther("100"),
// });

- After the first execution, comment the lines again.

4) Run yarn hardhat run scripts/execute.js, then run yarn hardhat run scripts/epTest.js to ensure the count is increasing (2n, 3n, 4, ...).

This step verifies that the deployment and execution processes are functioning correctly.
