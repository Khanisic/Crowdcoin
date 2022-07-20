import React, { useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';
export const CampaignContext = React.createContext();
import { MarketAddress, CampaignFactoryABI, CampaignAbi, RecordsABI, RecordsAddress } from './constants';
import { useRouter } from 'next/router';

export const CampaignProvider = ({ children }) => {
    const [campaignsList, setCampaignsList] = useState([]);
    const [currentAccount, setCurrentAccount] = useState('');
    const [campaignDetails, setCampaignDetails] = useState([]);
    const [listOfRequests, setListOfRequests] = useState({})
    const [totalMoney, setTotalMoney] = useState()
    const [totalContributers, setTotalContributers] = useState([])
    const [transactions, setTransactions] = useState([])
    const [walletConnected, setWalletConnected] = useState(false);

    const router = useRouter();
    const connectWallet = async () => {
        if (!window.ethereum) return alert('Please install MetaMask.');

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        //change network

        setCurrentAccount(accounts[0]);
        window.location.reload();
    };

    const checkIfWalletIsConnect = async () => {
        if (!window.ethereum) return alert('Please install MetaMask.');

        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            const networkVersion = window.ethereum.networkVersion;

            if (networkVersion != 5) return alert(' Kindly connect to goerli test network');

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                return alert(' Kindly connect your metamask');
            }
            return true;
        }
        catch (error) {
            return false;
        }

    };

    const createCampaign = async (e, amount, title, setIsLoading, setLoaderText) => {
        setIsLoading(true);
        setLoaderText("Getting confirmation from Metamask")
        e.preventDefault();
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(
                MarketAddress,
                CampaignFactoryABI,
                signer
            );

            const create = await contract.createCampaign(
                parseInt(amount),
                title,
            );
            setLoaderText("Waiting for transaction to  complete")
            await create.wait();
            setIsLoading(false);
            setLoaderText(null)
            router.push('/');
        } catch (error) {
            if ( error.code == 'INVALID_ARGUMENT'){
                setLoaderText("Enter all the fields")
            }
            else{
                setLoaderText("User denied transaction signature")
            }
            setIsLoading(false);
        }

    }

    const createRequest = async (e, recepient, description, value, campaignAddress, setIsLoading, setLoaderText) => {
        e.preventDefault();
        setIsLoading(true);
        setLoaderText("Getting confirmation from Metamask")
        try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
            campaignAddress,
            CampaignAbi,
            signer
        );
        setLoaderText("Waiting for transaction to  complete")
        const create = await contract.createRequest(
            description,
            parseInt(value),
            recepient
        );
        setIsLoading(false);
        setLoaderText(null)
        router.back();
        await create.wait();  
        } catch (error) {
            console.log(error.code)
            if (error.code == 'UNPREDICTABLE_GAS_LIMIT') {
                setLoaderText("You are not the manager")
            }
            else if ( error.code == 'INVALID_ARGUMENT'){
                setLoaderText("Enter all the fields correctly")
            }
            else {
                setLoaderText("User denied signature")
            }
            setIsLoading(false)
        }
        

    }


    const getCampaigns = async () => {
        const provider = new ethers.providers.AlchemyProvider('goerli', 'qZz8MvOW7-08qEpCLL-yISEDnp8yv3vP');
        const contract = new ethers.Contract(
            MarketAddress,
            CampaignFactoryABI,
            provider
        );

        const listOfCampaigns = await contract.getDeployedCampaigns();
        setCampaignsList(listOfCampaigns)
    }
    const getThisCampaignsDetails = async (campaignAddress) => {


        try {
            const provider = new ethers.providers.AlchemyProvider('goerli', 'qZz8MvOW7-08qEpCLL-yISEDnp8yv3vP');
            const contract = new ethers.Contract(
                campaignAddress,
                CampaignAbi,
                provider
            );

            const thisCampaignDetails = await contract.getSummary();

            setCampaignDetails({
                address: router.query.address,
                minimumContribution: router.query.minimumContribution,
                title: router.query.title,
                balance: ethers.utils.formatUnits(thisCampaignDetails[1]._hex.toString(), 'wei'),
                requests: ethers.utils.formatUnits(thisCampaignDetails[2]._hex.toString(), 'wei'),
                approvers: ethers.utils.formatUnits(thisCampaignDetails[3]._hex.toString(), 'wei'),
                managersAddress: thisCampaignDetails[4]
            })
        } catch (error) {
            console.log(error)
        }

    }

    const contributeToCampaign = async (campaignAddress, amount, setLoading, setLoaderText) => {
        setLoading(true)
        setLoaderText("Getting confirmation from Metamask")
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(
                campaignAddress,
                CampaignAbi,
                signer
            );


            const transaction = await contract.contribute({ value: amount });
            setLoaderText("Waiting for transaction to  complete")
            await transaction.wait();
            setLoaderText("Transaction Completed")
            setLoading(false)
        } catch (error) {
            console.log(error.code)
            if (error.code == 'UNPREDICTABLE_GAS_LIMIT') {
                setLoaderText("Please contribute the minimum amount")
            }
            else {
                setLoaderText("User denied signature")
            }
            setLoading(false)
        }

    }

    const getRequests = async (campaignAddress) => {
        try {
            const provider = new ethers.providers.AlchemyProvider('goerli', 'qZz8MvOW7-08qEpCLL-yISEDnp8yv3vP');
            const contract = new ethers.Contract(
                campaignAddress,
                CampaignAbi,
                provider
            );

            const requestsList = await contract.getRequests();

            setListOfRequests(requestsList)
        } catch (error) {
            console.log(error)
        }

    }

    const getTransactions = async () => {
        const provider = new ethers.providers.AlchemyProvider('goerli', 'qZz8MvOW7-08qEpCLL-yISEDnp8yv3vP');
        const contract = new ethers.Contract(
            RecordsAddress,
            RecordsABI,
            provider
        );

        const transactionsList = await contract.getTransactions();
        setTransactions(transactionsList)
    }
    const getTotalMoney = async () => {
        const provider = new ethers.providers.AlchemyProvider('goerli', 'qZz8MvOW7-08qEpCLL-yISEDnp8yv3vP');
        const contract = new ethers.Contract(
            RecordsAddress,
            RecordsABI,
            provider
        );

        const transactions = await contract.getTotalMoney();
        setTotalMoney(transactions);
    }
    const getContributers = async () => {
        const provider = new ethers.providers.AlchemyProvider('goerli', 'qZz8MvOW7-08qEpCLL-yISEDnp8yv3vP');
        const contract = new ethers.Contract(
            RecordsAddress,
            RecordsABI,
            provider
        );

        const contributers = await contract.getNoOfContributers();
        setTotalContributers(contributers)
    }
    const approveRequest = async (e, campaignAddress, index, setLoading, setLoaderText) => {
        setLoading(true)
        setLoaderText("Getting confirmation from Metamask")
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(
                campaignAddress,
                CampaignAbi,
                signer
            );

            const transaction = await contract.approveRequest(index);
            setLoaderText("Waiting for transaction to  complete")
            await transaction.wait();
            setLoaderText("Transaction Completed")
            setLoading(false)
            router.reload();
        } catch (error) {
            console.log(error.code)
            if (error.code == 'UNPREDICTABLE_GAS_LIMIT') {
                setLoaderText("Please contribute the minimum amount")
            }
            else {
                setLoaderText("User denied signature")
            }
            setLoading(false)
        }

    }
    const finalizeRequest = async (e, campaignAddress, index) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
            campaignAddress,
            CampaignAbi,
            signer
        );

        const transaction = await contract.finalizeRequest(index);
        await transaction.wait();
        router.reload()
    }

    useEffect(async () => {
        await checkIfWalletIsConnect().then((ans) => {
            setWalletConnected(ans);
        })
    }, []);


    return (
        <CampaignContext.Provider
            value={{
                connectWallet,
                createCampaign,
                getCampaigns,
                campaignsList,
                getThisCampaignsDetails,
                campaignDetails,
                currentAccount,
                contributeToCampaign,
                createRequest,
                getRequests,
                listOfRequests,
                getTotalMoney,
                getContributers,
                totalMoney,
                totalContributers,
                approveRequest,
                finalizeRequest,
                transactions,
                getTransactions,
                walletConnected
            }}
        >
            {children}
        </CampaignContext.Provider>
    );
};