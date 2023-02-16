const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require("../compile.js");

let accounts;
let inbox;
const INITIAL_MSG = "Hello Web3.0";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Deploying a contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: [INITIAL_MSG] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("Deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("Has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MSG);
  });

  it("Can change the message", async () => {
    await inbox.methods
      .setMsg("Hello Blockchain")
      .send({ from: accounts[0], gas: "1000000" });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hello Blockchain");
  });
});
