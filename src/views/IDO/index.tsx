import { useState, useCallback, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import { changeStake, changeApproval } from "../../store/slices/stake-thunk";
import "./ido.scss";
import { trim, shorten, getTokenUrl } from "../../helpers";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import { warning } from "../../store/slices/messages-slice";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { MetaTokenSaleContract } from "./contract";
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction, useApiContract } from "react-moralis";
import { Alert } from "@mui/material";
import { MetaAirdrop } from "../../abi";

function IDO() {
    /*const SALE_ADDRESS = "0xa633677cBbb8b296B93DaFB0Ffb36DD3d442ce7E";
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();*/

    //const saleContract = new ethers.Contract(SALE_ADDRESS, MetaTokenSaleContract, signer);
    //const sold = saleContract.sold();
    //const userAddress = signer.getAddress();

    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();
    const { Moralis, web3 } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    let options = {
        chain: "avalanche testnet" as "avalanche testnet",
        subdomain: undefined,
        providerUrl: undefined,
        addresses: ["0x938906904973341a545299db1f8bA2c7B95b82c5"],
    };
    const fetchNativeBalance = async () => {
        const data = await Web3Api.token.getTokenMetadata(options);
        console.log(data);
    };

    const abi = [
        {
            inputs: [
                {
                    internalType: "address",
                    name: "newBuyer_",
                    type: "address",
                },
            ],
            name: "approveBuyer",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address[]",
                    name: "newBuyers_",
                    type: "address[]",
                },
            ],
            name: "approveBuyers",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "buyTokens",
            outputs: [],
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                },
            ],
            name: "setAmountBuyablePreSale",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_presaleTimestamp",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "pRate",
                    type: "uint256",
                },
                {
                    internalType: "address payable",
                    name: "pWallet",
                    type: "address",
                },
                {
                    internalType: "contract IERC20",
                    name: "pToken",
                    type: "address",
                },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "previousOwner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "time",
                    type: "uint256",
                },
            ],
            name: "resetTime",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                },
            ],
            name: "setAmountBuyablePublicSale",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "publicRate",
                    type: "uint256",
                },
            ],
            name: "setRate",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            stateMutability: "payable",
            type: "receive",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "buyer",
                    type: "address",
                },
            ],
            name: "amountBuyable",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            name: "approvedBuyers",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            name: "invested",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "isEndSale",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "isPresale",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "isPublicSale",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "MAX_PRESALE_PER_ACCOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "MAX_SALE_PER_ACCOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "sold",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
    ];

    const contractProcessor = useWeb3ExecuteFunction();

    const sendEth = async () => {
        try {
            await Moralis.Web3.enableWeb3();
            const result = await Moralis.Web3.transfer({
                type: "native",
                amount: Moralis.Units.ETH("0.1"),
                receiver: "0x0000000000000000000000000000000000000000",
            });
            console.log(result);
            alert("Transfer of funds succeeded!");
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    const { runContractFunction, data } = useApiContract({
        address: "0x7720A369BC7b818616b8D6f0D0015bD1C8eba954",
        functionName: "balanceOf",
        chain: "avalanche",
        abi,
        params: { address: address },
    });

    async function Fetch() {
        runContractFunction();
    }

    let theoptions = {
        contractAddress: "0xCE2209c4e27bA5EFF9f882c460C63c38f4C056E3",
        functionName: "buyTokens",
        abi: abi,
        msgValue: Moralis.Units.ETH("0.1"),
        params: {
            beneficiary: "0xEaE204Fe72C0F4394C4590283DCC0a3E89A69388",
        },
    };

    async function buy(val) {
        if (quantity == "" || val <= 0) {
            warning({ text: messages.before_ido });
            alert("please input a valid number!!");
        } else {
            const web3 = await Moralis.enableWeb3();
            const transaction = await Moralis.executeFunction({
                contractAddress: "0x39fCC8A42d85cfdfc25a7cD983A57196035e022b",
                functionName: "buyTokens",
                abi: abi,
                msgValue: Moralis.Units.ETH(val),
                params: {},
            });
            const receipt = await transaction;
            console.log(receipt);
        }
    }

    async function claim() {
        const web3 = await Moralis.enableWeb3();
        const transaction = await Moralis.executeFunction({
            contractAddress: "0xec96Be4E758f4359b3F74F8ee9F37A3451f1eBcD",
            functionName: "claim",
            abi: MetaAirdrop,
            params: {},
        });
        const receipt = await transaction;
        console.log(receipt);
    }

    const [balance, setBalance] = useState(0);

    const [allowance, setAllowance] = useState(0);

    const [quantity, setQuantity] = useState<string>("");

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);

    const isWhiteListed = useSelector<IReduxState, boolean>(state => {
        return state.app.isWhitelisted;
    });

    const isPreSale = useSelector<IReduxState, boolean>(state => {
        return state.app.isPreSale;
    });

    const isPublicSale = useSelector<IReduxState, boolean>(state => {
        return state.app.isPublicSale;
    });

    console.log(isPreSale, isPublicSale);

    const metaBalance = useSelector<IReduxState, number>(state => {
        return state.app.metaBalance;
    });

    /*const amountBuyable = useSelector<IReduxState, number>(state => {
        return state.app.canBuyAmount;
    });*/

    const theBalance = parseInt(trim(Number(metaBalance))) / 1000000000000000000;

    const publicPrice = 0.125;
    const prePrice = 0.1;
    const theprice = isPreSale ? prePrice : publicPrice;
    const amount = isWhiteListed && isPreSale ? 700 : 500;

    const addTokenToWallet = (tokenSymbol: string, tokenAddress: string) => async () => {
        const tokenImage = getTokenUrl(tokenSymbol.toLowerCase());

        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: "wallet_watchAsset",
                    params: {
                        type: "ERC20",
                        options: {
                            address: "0x40Ac18C3E7c969aeDC8bc753D1F257c5911C4aD0",
                            symbol: "MB",
                            decimals: 18,
                            image: tokenImage,
                        },
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="stake-view">
            <Zoom in={true}>
                <div className="stake-card">
                    <Grid className="stake-card-grid" container direction="column" spacing={2}>
                        <div className="stake-card-header">
                            <p className="stake-card-header-title">IDO Early Bird Pool </p>
                        </div>
                        <div className="stake-card-header">
                            <p className=" stake-card-header-title">Are you whitelisted? {isWhiteListed ? <>Yes</> : <>No</>}</p>
                        </div>
                        <div className="stake-card-header">
                            <p className=" stake-card-header-title">
                                {isAppLoading ? (
                                    <>checking your balance...please wait</>
                                ) : (
                                    <>
                                        {" "}
                                        You have {theBalance} MB, and you can buy {amount - theBalance} MB{" "}
                                    </>
                                )}
                            </p>
                        </div>

                        <div className="stake-card-area">
                            {!address && (
                                <div className="stake-card-wallet-notification">
                                    <div className="stake-card-wallet-connect-btn" onClick={connect}>
                                        <p>Connect Wallet</p>
                                    </div>
                                    <p className="stake-card-wallet-desc-text">Connect your wallet on launch date to deposit for the IDO Pool</p>
                                </div>
                            )}
                            {address && (
                                <div>
                                    <div className="stake-card-action-area">
                                        <div className="stake-card-action-row">
                                            <OutlinedInput
                                                type="number"
                                                placeholder="Enter Metabank Token Amount"
                                                className="stake-card-action-input"
                                                value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                                labelWidth={0}
                                                endAdornment={<InputAdornment position="end"></InputAdornment>}
                                            />

                                            <div className="stake-card-tab-panel">
                                                <div
                                                    className="stake-card-tab-panel-btn"
                                                    onClick={() => {
                                                        buy(parseInt(quantity) * theprice);
                                                    }}
                                                >
                                                    <p>Buy Token </p>
                                                </div>
                                            </div>
                                            <div className="stake-card-tab-panel">
                                                <div className="stake-card-tab-panel-btn" onClick={addTokenToWallet("MEMO", "")}>
                                                    <p>Add MB to Wallet </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stake-card-action-row" style={{ justifyContent: "center" }}>
                                            <div className="stake-card-tab-panel">
                                                <div
                                                    className="stake-card-tab-panel-btn"
                                                    onClick={() => {
                                                        claim();
                                                    }}
                                                >
                                                    <p>Claim Airdrop </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default IDO;
