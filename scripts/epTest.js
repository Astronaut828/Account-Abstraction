const hre = require("hardhat");

const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const ACCOUNT_ADDRESS = "0x75537828f2ce51be7289709686A69CbFDbB714F1"

async function main() {
  const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
  const count = await account.count();
  console.log(count);

  // const code = await hre.ethers.provider.getCode(EP_ADDRESS);
  // console.log(code);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
