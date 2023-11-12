import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const tokenContractFactory = await ethers.getContractFactory("MyToken");
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
