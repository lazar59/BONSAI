import Web3Modal from 'web3modal';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from 'ethers';
import { config } from "./config";
import store from "../store";
import { setChainID, setWalletAddr, setBalance, setWeb3 } from '../store/actions';
import { parseErrorMsg } from '../components/utils';
const FNFTFactoryABI = config.FNFTFactoryABI;
const FNFTFactory = config.FNFTFactory;

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "testnet", // optional
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: config.INFURA_ID, // required
          rpc: {
            // 56: config.mainNetUrl,
            97: config.testNetUrl,
          },
        },
      },
    } // required
  });
}

export let provider = null;
export let web3Provider = null;

export const loadWeb3 = async () => {
  try {
    // await web3Modal.updateTheme({
    //   background: "rgb(39, 49, 56)",
    //   main: "rgb(199, 199, 199)",
    //   secondary: "rgb(136, 136, 136)",
    //   border: "rgba(195, 195, 195, 0.14)",
    //   hover: "rgb(16, 26, 32)"
    // });
    // await web3Modal.clearCachedProvider();
    let web3 = new Web3(config.testNetUrl);
    store.dispatch(setWeb3(web3));

    provider = await web3Modal.connect();
    web3 = new Web3(provider);
    store.dispatch(setWeb3(web3));

    web3Provider = new providers.Web3Provider(provider);
    const network = await web3Provider.getNetwork();
    store.dispatch(setChainID(network.chainId));

    const signer = web3Provider.getSigner();
    const account = await signer.getAddress();
    store.dispatch(setWalletAddr(account));

    await getBalanceOfAccount();
    provider.on("accountsChanged", async function (accounts) {
      if (accounts[0] !== undefined) {
        store.dispatch(setWalletAddr(accounts[0]));
        await getBalanceOfAccount();
      } else {
        store.dispatch(setWalletAddr(''));
      }
    });

    provider.on('chainChanged', function (chainId) {
      store.dispatch(setChainID(chainId));
    });

    provider.on('disconnect', function (error) {
      store.dispatch(setWalletAddr(''));
    });
  } catch (error) {
    console.log('[Load Web3 error] = ', error);
  }
}

export const disconnect = async () => {
  await web3Modal.clearCachedProvider();
  const web3 = new Web3(config.mainNetUrl);
  store.dispatch(setWeb3(web3));
  store.dispatch(setChainID(''));
  store.dispatch(setWalletAddr(''));
  store.dispatch(setBalance({
    BNBBalance: '',
    usdcBalance: '',
    BONSAIBalance: ''
  }));
}

export const checkNetwork = async () => {
  if (web3Provider) {
    const network = await web3Provider.getNetwork();
    store.dispatch(setChainID(network.chainId));
    return checkNetworkById(network.chainId);
  }
}

export const checkNetworkById = async (chainId) => {
  const web3 = store.getState().auth.web3;
  if (!web3) return { success: false }
  if (web3.utils.toHex(chainId) !== web3.utils.toHex(config.chainId)) {
    await changeNetwork();
    return false;
  } else {
    return true;
  }
}

const changeNetwork = async () => {
  const web3 = store.getState().auth.web3;
  if (!web3) return;
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: web3.utils.toHex(config.chainId) }],
    });
    await getBalanceOfAccount();
  }
  catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: web3.utils.toHex(config.chainId),
              chainName: 'BSC',
              rpcUrls: [config.testNetUrl] /* ... */,
            },
          ],
        });
        return {
          success: true,
          message: "switching succeed"
        }
      } catch (addError) {
        return {
          success: false,
          message: "Switching failed." + addError.message
        }
      }
    }
  }
}

export const connectWallet = async () => {
  try {
    provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    store.dispatch(setWeb3(web3));
    web3Provider = new providers.Web3Provider(provider);

    await checkNetwork();
    const signer = web3Provider.getSigner();
    const account = await signer.getAddress();

    if (account !== undefined) {
      store.dispatch(setWalletAddr(account));
    }

    await getBalanceOfAccount();
    return {
      success: true
    }
  } catch (err) {
    return {
      success: false,
      address: "",
      status: "Something went wrong: " + err.message,
    };
  }
};

export const getBalanceOfAccount = async () => {
  const web3 = store.getState().auth.web3;
  if (!web3) return { success: false }
  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) return { success: false }
    let BNBBalance = await web3.eth.getBalance(accounts[0]);
    BNBBalance = web3.utils.fromWei(BNBBalance);

    // const BONSAIContract = new web3.eth.Contract(BONSAIABI, BONSAIAddress);
    let BONSAIBalance = 0; //await BONSAIContract.methods.balanceOf(accounts[0]).call();
    // BONSAIBalance = web3.utils.fromWei(BONSAIBalance);

    store.dispatch(setBalance({
      BNBBalance,
      BONSAIBalance
    }));
    return {
      success: true,
      BNBBalance,
      BONSAIBalance
    }
  } catch (error) {
    console.log('[Get Balance] = ', error);
    return {
      success: false,
      result: "Something went wrong: "
    }
  }
}

export const compareWalllet = (first, second) => {
  if (!first || !second) {
    return false;
  }
  if (first.toUpperCase() === second.toUpperCase()) {
    return true;
  }
  return false;
}

export const depositBNB = async(amount) => {
  const web3 = store.getState().auth.web3;
  if (!web3) return { success: false }
  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) return { success: false }
    const PresaleContract = new web3.eth.Contract(FNFTFactoryABI, FNFTFactory);
    const bnbAmount = web3.utils.toWei(amount.toString());
    const estimate = PresaleContract.methods.depositBNB();
    await estimate.estimateGas({ from: accounts[0], value: bnbAmount });
    await estimate.send({ from: accounts[0], value: bnbAmount });
    return {
      success: true
    }
  } catch (error) {
    console.log('[Deposit Error] = ', error);
    return {
      success: false,
      error: parseErrorMsg(error.message)
    }
  }
}


export const getTotalPresaleAmount = async () => {
  const web3 = store.getState().auth.web3;
  if (!web3) return { success: false }
  try {
    let presaleAmount = await web3.eth.getBalance(FNFTFactory);
    presaleAmount = web3.utils.fromWei(presaleAmount);
    return {
      success: true,
      presaleAmount
    }
  } catch (error) {
    console.log('[TOTAL Error] = ', error);
    return {
      success: false,
      result: "Something went wrong "
    }
  }
}

export const getInitialBNB = async () => {
  const web3 = store.getState().auth.web3;
  if (!web3) return { success: false }
  try {
    const PresaleContract = new web3.eth.Contract(FNFTFactoryABI, FNFTFactory);
    let minCap = await PresaleContract.methods._initialBNB().call();
    minCap = web3.utils.fromWei(minCap.toString());
    return {
      success: true,
      minCap
    }
  } catch (error) {
    console.log('[BNB Error] = ', error);
    return {
      success: false,
      error: parseErrorMsg(error.message)
    }
  }
}

export const getFounderInfo = async () => {
  const web3 = store.getState().auth.web3;
  if (!web3) return { success: false }
  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) return { success: false }
    const PresaleContract = new web3.eth.Contract(FNFTFactoryABI, FNFTFactory);
    const info = await PresaleContract.methods.getFounderInfo(accounts[0]).call();
    return {
      success: true,
      amountBNB: web3.utils.fromWei(info.amountBNB),
      numberOfFNFT: Number(info.numberOfFNFT)
    }
  } catch (error) {
    console.log('[Deposit Error] = ', error);
    return {
      success: false,
      error: parseErrorMsg(error.message)
    }
  }
}