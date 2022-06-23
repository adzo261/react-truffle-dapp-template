import './LandingPage.css';
import {useState} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import ChainAccess from "../../api/chain-access.js";
import YourContract from "../../contracts/YourContract.json";


const LandingPage = () => {

    const [web3, setWeb3] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const [connectClicked, setConnectClicked] = useState(false);

    const connectToMetaMask = async () => {
        
        setConnectClicked(true);
        const provider = await detectEthereumProvider();

        if (provider) {
            // If the provider returned by detectEthereumProvider is not the same as
            // window.ethereum, something is overwriting it, perhaps another wallet.
            if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
            }
            // Access the decentralized web!
            try {
            //Request to select account from MetaMask
            const accounts = await provider.request({
                method: "eth_requestAccounts",
            });
            //create web3 instance
            const web3 = new Web3(provider);

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = YourContract.networks[networkId];
                const instance = new web3.eth.Contract(
                    YourContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
            // Set web3, accounts, and contract to the state
            setWeb3(web3);
            window.ethereum.on('accountsChanged', function (accounts) {
                setAccounts(accounts);
                ChainAccess.setChainAddressState(accounts[0]);
            });
            setAccounts(accounts);
            setContract(instance);
            ChainAccess.setChainState(web3, accounts[0], instance);

            //We are now connected to metamask
            setIsConnected(true);

           
            } catch(error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
            }
        } else {
            console.log('Please install MetaMask!');
        }
    };

    return (
        <div>Welcome to Landing Page</div>
    );
}

export default LandingPage;
