
class ChainAccess {

    static setChainState(web3, address, contract) {
        this.web3 = web3;
        this.address = address;
        this.contract = contract;
    }
}


export default ChainAccess;