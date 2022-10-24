import logo from './logo.svg';
import React, { useCallback, useEffect, useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import { Alert, Button } from "antd";
import "antd/dist/antd.css";
import Web3Modal from "web3modal";
import { INFURA_ID, NETWORK, NETWORKS } from "./constants";


import './App.css';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import { useContractLoader, useContractReader, useUserProviderAndSigner } from "eth-hooks";
import deployedContracts from './abi/contracts.json';

import Portis from "@portis/web3";
import Fortmatic from "fortmatic";
import Authereum from "authereum";
//import Torus from "@toruslabs/torus-embed"


const { ethers, BigNumber } = require("ethers");

// Sorry for all the console logging
const DEBUG = true;
const NETWORKCHECK = true;
// const targetNetwork = NETWORKS.mainnet;
const targetNetwork = NETWORKS.mumbai;
// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mumbai Testnet");

// Getting "failed to meet quorum" errors? Check your INFURA_ID
// Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new ethers.providers.StaticJsonRpcProvider(localProviderUrlFromEnv);

// Coinbase walletLink init
const walletLink = new WalletLink({
  appName: "coinbase",
});

// WalletLink provider
// const walletLinkProvider = walletLink.makeWeb3Provider(`https://mainnet.infura.io/v3/${INFURA_ID}`, 1);
const walletLinkProvider = walletLink.makeWeb3Provider("https://polygon-rpc.com", 137);


// Portis ID: 6255fb2b-58c8-433b-a2c9-62098c05ddc9
/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
  network: "matic", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
  cacheProvider: true, // optional
  theme: "light", // optional. Change to "dark" for a dark theme.
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        bridge: "https://polygon.bridge.walletconnect.org",
        infuraId: INFURA_ID,
        rpc: {
          // 1: `https://mainnet.infura.io/v3/${INFURA_ID}`, // mainnet // For more WalletConnect providers: https://docs.walletconnect.org/quick-start/dapps/web3-provider#required
          137: "https://polygon-rpc.com", // matic // For more WalletConnect providers: https://docs.walletconnect.org/quick-start/dapps/web3-provider#required
          42: `https://kovan.infura.io/v3/${INFURA_ID}`,
          100: "https://dai.poa.network", // xDai
        },
      },
    },
    portis: {
      display: {
        logo: "https://user-images.githubusercontent.com/9419140/128913641-d025bc0c-e059-42de-a57b-422f196867ce.png",
        name: "Portis",
        description: "Connect to Portis App",
      },
      package: Portis,
      options: {
        id: "6255fb2b-58c8-433b-a2c9-62098c05ddc9",
      },
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: "pk_live_5A7C91B2FC585A17", // required
      },
    },
    // torus: {
    //   package: Torus,
    //   options: {
    //     networkParams: {
    //       host: "https://localhost:8545", // optional
    //       chainId: 1337, // optional
    //       networkId: 1337 // optional
    //     },
    //     config: {
    //       buildEnv: "development" // optional
    //     },
    //   },
    // },
    "custom-walletlink": {
      display: {
        logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
        name: "Coinbase",
        description: "Connect to Coinbase Wallet (not Coinbase App)",
      },
      package: walletLinkProvider,
      connector: async (provider, _options) => {
        await provider.enable();
        return provider;
      },
    },
    authereum: {
      package: Authereum, // required
    },
  },
});


function App() {

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);

    if (window.localStorage.getItem('CONNECTKEY')) {
      window.localStorage.removeItem('CONNECTKEY');
    }
  };

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider);
  const userSigner = userProviderAndSigner.signer;

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId = userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  const contractConfig = { deployedContracts: deployedContracts || {} };
  const readContracts = useContractLoader(localProvider, contractConfig);
  const writeContracts = useContractLoader(userSigner, localProvider, localChainId);

  const contract1_addr = "0x029db60Fc3A780cA5D0B442115294c48279bE481";
  const contract2_addr = "0x7369A2a73BFb7a4d49B484a0E93090e2D0B8F10d";
  const contract3_addr = "0x7A28B51D53B24B97E1f9680cFC413692000562ba";
  const contract4_addr = "0x77480eA1bA300533D02c89504b36114e0B245673";

  const usdtBalanceof = useContractReader(readContracts, "USDT", "balanceOf", [address]);
  const usdtAllowanced = useContractReader(readContracts, "USDT", "allowance", [address, contract1_addr]);
  const e2eBalanceof = useContractReader(readContracts, "E2ECoin", "balanceOf", [address]);
  const e2eAllowanced = useContractReader(readContracts, "E2ECoin", "allowance", [address, contract2_addr]);

  const getcurrenttime = useContractReader(readContracts, "EarningCycle", "getCurrentTime");
  const totalinfo = useContractReader(readContracts, "EarningCycle", "totalInfo");
  const totalraffleusers = useContractReader(readContracts, "RaffleCampaign", "totalUsers");
  const depositaddrs = useContractReader(readContracts, "EarningCycle", "depositAddrs");
  const usersinfo = useContractReader(readContracts, "EarningCycle", "users", [address]);
 
  const [usdtBalanceOf, setUsdtBalanceOf] = useState(0);
  const [usdtAllowance, setUsdtAllowance] = useState(0);
  const [e2eBalanceOf, setE2eBalanceOf] = useState(0);
  const [e2eAllowance, setE2eAllowance] = useState(0);

  const [getCurrentTime, setGetCurrentTime] = useState(0);
  const [totalInfo, setTotalInfo] = useState({});
  const [totalRaffleUsers, setTotalRaffleUsers] = useState(0);

  const [usersInfo, setUsersInfo] = useState({});
  const [depositAddrs, setDepositAddrs] = useState([]);


  useEffect(() => {
    if (getcurrenttime) {
      setGetCurrentTime(Number(getcurrenttime));
    }
  }, [getcurrenttime]);

  useEffect(() => {
    if (totalinfo) {
      setTotalInfo(totalinfo);
    }
  }, [totalinfo]);

  useEffect(() => {
    if (totalraffleusers) {
      setTotalRaffleUsers(Number(totalraffleusers));
    }
  }, [totalraffleusers]);

  useEffect(() => {
    if (usdtBalanceof) {
      setUsdtBalanceOf(Number(usdtBalanceof));
    }
  }, [usdtBalanceof]);

  useEffect(() => {
    if (usdtAllowanced) {
      setUsdtAllowance(Number(usdtAllowanced));
    }
  }, [usdtAllowanced]);

  useEffect(() => {
    if (e2eBalanceof) {
      setE2eBalanceOf(Number(e2eBalanceof));
    }
  }, [e2eBalanceof]);

  useEffect(() => {
    if (e2eAllowanced) {
      setE2eAllowance(Number(e2eAllowanced));
    }
  }, [e2eAllowanced]);

  useEffect(() => {
    if (usersinfo) {
      setUsersInfo(usersinfo);
    }
  }, [usersinfo]);

  useEffect(() => {
    if (depositaddrs) {
      setDepositAddrs(depositaddrs);
    }
  }, [depositaddrs]);
  

  // console.log("@@@@@@@@@@@@@@@@", balanceOf);
  // console.log("@@@@@@@@@@@@@@@@", allowance);

  // console.log("@@@@@@@@@@@@@@@@", getCurrentTime);
  // console.log("@@@@@@@@@@@@@@@@", getBalance);
  // console.log("@@@@@@@@@@@@@@@@", totalDeposits);
  // console.log("@@@@@@@@@@@@@@@@", totalWithdraws);
  // console.log("@@@@@@@@@@@@@@@@", Number(usersInfo.deposits));
  // console.log("@@@@@@@@@@@@@@@@", usersInfo.referrer);


  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      address &&
      selectedChainId
    ) {
      console.log("🏠 localChainId", localChainId);
      console.log("👩‍💼 selected address:", address);
      console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
    }
  }, [
    address,
    selectedChainId,
  ]);


  let networkDisplay = "";
  if (NETWORKCHECK && localChainId && selectedChainId && localChainId !== selectedChainId) {
    const networkSelected = NETWORK(selectedChainId);
    const networkLocal = NETWORK(localChainId);
    if (selectedChainId === 1337 && localChainId === 31337) {
      networkDisplay = (
        <div style={{ zIndex: 10000, position: "fixed", right: 30, top: 84, padding: 15 }}>
          <Alert
            message="⚠️ Wrong Network ID"
            description={
              <div>
                You have <b>chain id 1337</b> for localhost and you need to change it to <b>31337</b> to work with
                HardHat.
                <div>(MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt; 31337)</div>
              </div>
            }
            type="error"
            closable={false}
          />
        </div>
      );
    } else {
      networkDisplay = (
        <div style={{ zIndex: 10000, position: "fixed", right: 30, top: 84, padding: 15 }}>
          <Alert
            message="⚠️ Wrong Network"
            description={
              <div>
                You have <b>{networkSelected && networkSelected.name}</b> selected and you need to be on {""}
                <Button
                  onClick={async () => {
                    const ethereum = window.ethereum;
                    const data = [
                      {
                        chainId: "0x" + targetNetwork.chainId.toString(16),
                        chainName: targetNetwork.name,
                        nativeCurrency: targetNetwork.nativeCurrency,
                        rpcUrls: [targetNetwork.rpcUrl],
                        blockExplorerUrls: [targetNetwork.blockExplorer],
                      },
                    ];
                    console.log("data", data);

                    let switchTx;
                    // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
                    try {
                      switchTx = await ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: data[0].chainId }],
                      });
                    } catch (switchError) {
                      // not checking specific error code, because maybe we're not using MetaMask
                      try {
                        switchTx = await ethereum.request({
                          method: "wallet_addEthereumChain",
                          params: data,
                        });
                      } catch (addError) {
                        // handle "add" error
                      }
                    }

                    if (switchTx) {
                      console.log(switchTx);
                    }
                  }}
                >
                  <b>{networkLocal && networkLocal.name}</b>
                </Button>
              </div>
            }
            type="error"
            closable={false}
          />
        </div>
      );
    }
  } else {
    networkDisplay = (""
      // <div style={{ zIndex: -1, position: "absolute", right: 154, top: 28, padding: 16, color: targetNetwork.color }}>
      //   {targetNetwork.name}
      // </div>
    );
  }

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      if (DEBUG) console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      if (DEBUG) console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      if (DEBUG) console.log(code, reason);
      logoutOfWeb3Modal();
    });

    localStorage.setItem('CONNECTKEY', 'connected');
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);


  return (
    <>
      <div className="total marginAuto">
        <Header
          address={address}
          loadWeb3Modal={loadWeb3Modal}
          web3Modal={web3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />
        <Home
          signer={userSigner} 
          address={address} 
          loadWeb3Modal={loadWeb3Modal} 
          usdtBalanceOf={usdtBalanceOf} 
          usdtAllowance={usdtAllowance} 
          e2eBalanceOf={e2eBalanceOf} 
          e2eAllowance={e2eAllowance} 
          getCurrentTime={getCurrentTime} 
          totalInfo={totalInfo} 
          totalRaffleUsers={totalRaffleUsers} 
          depositAddrs={depositAddrs} 
          usersInfo={usersInfo} 
          contract1={readContracts["USDT"]} 
          contract2={readContracts["E2ECoin"]} 
          contract3={readContracts["EarningCycle"]} 
          contract4={readContracts["RaffleCampaign"]} 
          contract1_addr={contract1_addr} 
          contract2_addr={contract2_addr} 
          contract3_addr={contract3_addr} 
          contract4_addr={contract4_addr} 
        />
        <Footer />
        {networkDisplay}
      </div>
    </>
  );
}

export default App;
