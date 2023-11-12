import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

async function main() {
  const accounts = await ethers.getSigners();
  const tokenContractFactory = new MyToken__factory(accounts[0]);
  const tokenContract = await tokenContractFactory.deploy();
  await tokenContract.waitForDeployment();
  const tokenContractAddress = await tokenContract.getAddress();
  console.log(`Contract deployed at ${tokenContractAddress}`);
  const initialSupply = await tokenContract.totalSupply();
  console.log(
    `The initial supply of this token is ${initialSupply.toString()} decimals units`
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
