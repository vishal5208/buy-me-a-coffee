// scripts/deploy.js

const { ethers } = require("hardhat");

async function main() {
  // We get the contract to deploy.
  const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  await buyMeACoffee.deployed();

  console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);

  console.log("verifying.... ");
  if (network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY) {
    // wait few blocks before verifying your contract
    console.log("Waiting for block confirmations...");
    await buyMeACoffee.deployTransaction.wait(2);
    await verify(buyMeACoffee.address, []);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!!!");
    } else {
      console.log(e);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
