import { ethers } from "hardhat";

async function main() {
  // const [owner] = await ethers.getSigners();

  const Hash = await ethers.getContractFactory("Hash");
  const hash = await Hash.deploy();

  await hash.deployed();

  console.log("Hash deployed to:", hash.address);

  let key = [];
  const arrayLength = 1270;
  for (let i = 0; i < arrayLength; i++) {
    key[i] = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("sampleHash" + i));
  }
  const startTime = Date.now();
  let insertHash = await hash.insertHash(key, key);
  const tx = await insertHash.wait();
  console.log("Tx time:", Date.now() - startTime, "ms");
  console.log(arrayLength, "Hash in array passed")
  const gasUsed = await tx.gasUsed;
  console.log("Gas used:", ethers.utils.formatEther(gasUsed), "BCTS");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
