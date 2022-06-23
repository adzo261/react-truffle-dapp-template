const YourContract = artifacts.require("YourContract");

contract('YourContract', async (accounts) => {
  const ERROR_MSG = "VM Exception while processing transaction: revert ";

  it('should change the greeter value', async () => {
    const yourContractInstance = await YourContract.new();
    let oldGreeter = await yourContractInstance.greeter();
    await yourContractInstance.setGreeter("New greeter");
    let newGreeter = await yourContractInstance.greeter();
    assert.equal(oldGreeter, "hello", "Old greeter mismatch");
    assert.equal(newGreeter, "New greeter", "New greeter mismatch");
  });
  
});
