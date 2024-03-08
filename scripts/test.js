const hre = require("hardhat");

const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ACCOUNT_ADDRESS = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
const PM_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
  const count = await account.count();
  console.log(count);

  // const code = await hre.ethers.provider.getCode(EP_ADDRESS);
  // console.log(code);

  console.log(
    "Account balance:",
    await hre.ethers.provider.getBalance(ACCOUNT_ADDRESS)
  );
  const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
  console.log("Account balance on EP:", await ep.balanceOf(ACCOUNT_ADDRESS));
  console.log("Account balance on PM:", await ep.balanceOf(PM_ADDRESS));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
