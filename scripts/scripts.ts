import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy our multi-sig wallet
  const Token = await ethers.getContractFactory("ERC20FromScratch");
  const token = await Token.deploy("CustomToken", "CTK", 18);
  await token.waitForDeployment();
  console.log(`Token deployed at: ${await token.getAddress()}`);
}

// Run the script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});