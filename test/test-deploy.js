const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

//describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    // let SimpleStorageFactory
    // let simpleStorage
    let SimpleStorageFactory, simpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert
        // expect
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Adding people and their favorite number to Mapping", async function () {
        const expectedPerson = {
            name: "Bilge Kaan Gençdoğan",
            favoriteNumber: "7",
        }

        // Call the addPerson function
        await addPerson(expectedPerson.name, expectedPerson.favoriteNumber)

        // Retrieve the favorite number for the added person
        const favoriteNumber = await simpleStorage.nameToFavoriteNumber(
            expectedPerson.name,
        )

        // Assert that the favorite number matches the expected value
        assert.equal(favoriteNumber.toString(), expectedPerson.favoriteNumber)

        // Retrieve the person's details from the contract
        const person = await getPerson(expectedPerson.name)

        // Assert that the retrieved person's details match the expected values
        assert.equal(person.name, expectedPerson.name)
        assert.equal(
            person.favoriteNumber.toString(),
            expectedPerson.favoriteNumber,
        )
    })

    // Function to add a person
    async function addPerson(name, favoriteNumber) {
        const transaction = await simpleStorage.addPerson(name, favoriteNumber)
        await transaction.wait()
        console.log("Person added successfully.")
    }

    // Function to retrieve a person's details from the contract
    async function getPerson(name) {
        const favoriteNumber = await simpleStorage.nameToFavoriteNumber(name)
        return { name, favoriteNumber }
    }
})
