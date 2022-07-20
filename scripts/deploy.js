const hre = require('hardhat');

async function main() {
    const CampaignFactory = await hre.ethers.getContractFactory('CampaignFactory');
   const campaignFactory = await CampaignFactory.deploy();
 // const CoinRecord = await hre.ethers.getContractFactory('CoinRecord');
  //const coinRecord = await CoinRecord.deploy();
   await campaignFactory.deployed();
//  await coinRecord.deployed();

  console.log('Market deployed to:', campaignFactory.address);
  //  console.log('Records deployed to:', coinRecord.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
