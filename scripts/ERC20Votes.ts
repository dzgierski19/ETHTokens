import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

async function main() {
  const [deployer, acc1, acc2] = await ethers.getSigners();
  //deployer = accounts[0]
  //acc1 = accounts[1]
  //acc2 = accounts[2]
  const contractFactory = new MyToken__factory(deployer);
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log(`Token contract deployed at ${contractAddress}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

//czym jest target
