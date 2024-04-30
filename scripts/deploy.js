//imports
// there is no difference between script and task

// difference : task is for plugins, scripts are for local development environment
const { ethers, run, network } = require("hardhat")
//async main func
async function main() {
    const nameToFavoriteNumber = {}

    // Struct equivalent
    class People {
        constructor(favoriteNumber, name) {
            this.favoriteNumber = favoriteNumber
            this.name = name
        }
    }

    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()

    console.log(`Deployed contract to ${simpleStorage.target}`)
    //what happens when we deploy to our hardhat network? it is meaningles to verify that contract

    console.log(network.config)

    //4 == 4 -> true
    //4 == "4" -> true
    //4 === "4" -> false

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        // on etherscan all these block explorers; instantly deployed contract, instantly we sent the contract
        // etherscan might not know about transaction yet, it might take a time etherscan to be up to speed
        // where the blockchain is
        // to wait few block to be mined until your verification process comes is good practice
        await simpleStorage.deploymentTransaction().wait(6) // wait 6 blocks then werification comes

        await verify(simpleStorage.target, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value: ${currentValue}`)

    // update current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value: ${updatedValue}`)

    console.log("Adding person...")
    await addPerson(simpleStorage, "Bilge Kaan Gençdoğan", 7)

    async function addPerson(contract, name, favoriteNumber) {
        const transaction = await contract.addPerson(name, favoriteNumber)
        await transaction.wait()
        console.log("Person added successfully.")
    }
}

//async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e)
        }
    }
}
//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
