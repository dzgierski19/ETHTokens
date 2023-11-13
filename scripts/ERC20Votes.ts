import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

const MINT_VALUE = ethers.parseUnits("1");

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

  //added minting
  const mintTx = await contract.mint(acc1.address, MINT_VALUE);
  await mintTx.wait();
  console.log(
    `Minted ${MINT_VALUE.toString()} decimal units to account ${acc1.address}\n`
  );
  const balanceBN = await contract.balanceOf(acc1.address);
  console.log(
    `Account ${
      acc1.address
    } has ${balanceBN.toString()} decimal units of MyToken\n`
  );
  // added votes
  const votes = await contract.getVotes(acc1.address);
  console.log(
    `Account ${
      acc1.address
    } has ${votes.toString()} units of voting power before self delegating\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

//czym jest target
