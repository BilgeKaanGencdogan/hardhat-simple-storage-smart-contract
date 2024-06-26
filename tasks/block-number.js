const { task } = require("hardhat/config")
// there is no difference between script and task
// difference : task is for plugins, scripts are for local development environment

task("block-number", "Prints the current block number").setAction(
    //cost blockTask = async function() => {}
    //async function blockTask()
    //async (taskArgs, hre) -> anynmous function on js ; These 3 are the same
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current Block Number: ${blockNumber}`)
    },
)

module.exports = {}
