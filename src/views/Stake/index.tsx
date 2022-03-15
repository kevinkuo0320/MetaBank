import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import RebaseTimer from "../../components/RebaseTimer";
import { trim, shorten } from "../../helpers";
import { changeStake, changeApproval } from "../../store/slices/stake-thunk";
import "./stake.scss";
import { useWeb3Context, useAddress } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import classnames from "classnames";
import { warning } from "../../store/slices/messages-slice";
import Background from "../Landing/components/Background";
import Header from "../Home/components/Header";
import { Link } from "@material-ui/core";

function Stake() {
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();
    const walletAddress = useAddress();

    const [view, setView] = useState(0); // 0 is for stake, 1 is for unstake
    const [quantity, setQuantity] = useState<string>("");

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const currentIndex = useSelector<IReduxState, string>(state => {
        return state.app.currentIndex;
    });
    const fiveDayRate = useSelector<IReduxState, number>(state => {
        return state.app.fiveDayRate;
    });
    const timeBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.time;
    });
    const memoBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.memo;
    });
    const stakeAllowance = useSelector<IReduxState, number>(state => {
        return state.account.staking && state.account.staking.time;
    });
    const unstakeAllowance = useSelector<IReduxState, number>(state => {
        return state.account.staking && state.account.staking.memo;
    });
    const stakingRebase = useSelector<IReduxState, number>(state => {
        return state.app.stakingRebase;
    });
    const stakingAPY = useSelector<IReduxState, number>(state => {
        return state.app.stakingAPY;
    });
    const getLarryBalance = useSelector<IReduxState, string>(state => {
        return state.app.larryBalance;
    });

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    console.log("test100", getLarryBalance);

    const setMax = () => {
        if (view === 0) {
            setQuantity(timeBalance);
        } else {
            setQuantity(memoBalance);
        }
    };

    const onSeekApproval = async (token: string) => {
        if (await checkWrongNetwork()) return;

        await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
    };

    const onChangeStake = async (action: string) => {
        if (await checkWrongNetwork()) return;
        if (quantity === "" || parseFloat(quantity) === 0) {
            dispatch(warning({ text: action === "stake" ? messages.before_stake : messages.before_unstake }));
        } else {
            await dispatch(changeStake({ address, action, value: String(quantity), provider, networkID: chainID }));
            setQuantity("");
        }
    };

    const hasAllowance = useCallback(
        token => {
            if (token === "time") return stakeAllowance > 0;
            if (token === "memo") return unstakeAllowance > 0;
            return 0;
        },
        [stakeAllowance],
    );

    const changeView = (newView: number) => () => {
        setView(newView);
        setQuantity("");
    };

    const trimmedMemoBalance = trim(Number(memoBalance), 6);
    const trimmedStakingAPY = trim(stakingAPY * 100, 1);
    const stakingRebasePercentage = trim(stakingRebase * 100, 4);
    const nextRewardValue = trim((Number(stakingRebasePercentage) / 100) * Number(trimmedMemoBalance), 6);

    return (
        <div className="stake-view">
            <Zoom in={true}>
                <div className="stake-card">
                    <Grid className="stake-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="stake-card-header">
                                <p className="stake-card-header-title">Metabank LP Staking Pool</p>
                            </div>

                            <div
                                className="data-row"
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <p className="data-row-name" style={{ textDecoration: "underline" }}>
                                    Current APR : {isAppLoading ? <Skeleton width="80px" /> : <> 100000 % </>}
                                </p>
                            </div>
                        </Grid>

                        <div className="stake-card-area" style={{ marginTop: "-20px" }}>
                            {!address && (
                                <div className="stake-card-wallet-notification">
                                    <div className="stake-card-wallet-connect-btn" onClick={connect}>
                                        <p>Connect Wallet</p>
                                    </div>
                                    <p className="stake-card-wallet-desc-text">Connect your wallet to stake LP tokens!</p>
                                </div>
                            )}
                            {address && (
                                <div>
                                    <div className="stake-card-action-area">
                                        <div className="stake-card-action-stage-btns-wrap">
                                            <div onClick={changeView(0)} className={classnames("stake-card-action-stage-btn", { active: !view })}>
                                                <p>Stake</p>
                                            </div>
                                            <div onClick={changeView(1)} className={classnames("stake-card-action-stage-btn", { active: view })}>
                                                <p>Unstake</p>
                                            </div>
                                        </div>

                                        <div className="stake-card-action-row">
                                            <OutlinedInput
                                                type="number"
                                                placeholder="Amount"
                                                className="stake-card-action-input"
                                                value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                                labelWidth={0}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <div onClick={setMax} className="stake-card-action-input-btn">
                                                            <p>Max</p>
                                                        </div>
                                                    </InputAdornment>
                                                }
                                            />

                                            {view === 0 && (
                                                <div className="stake-card-tab-panel">
                                                    {address && hasAllowance("time") ? (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "staking")) return;
                                                                onChangeStake("stake");
                                                            }}
                                                            style={{ backgroundColor: "#c9333c" }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "staking", "Stake LP")}</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_staking")) return;
                                                                onSeekApproval("time");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "approve_staking", "Approve")}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {view === 1 && (
                                                <div className="stake-card-tab-panel">
                                                    {address && hasAllowance("memo") ? (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "unstaking")) return;
                                                                onChangeStake("unstake");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "unstaking", "Unstake LP")}</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_unstaking")) return;
                                                                onSeekApproval("memo");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "approve_unstaking", "Approve")}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="stake-user-data">
                                        {/*<div className="data-row">
                                            <p className="data-row-name">Your Balance</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{trim(Number(timeBalance), 4)} MB</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">Your Staked Balance</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{trimmedMemoBalance} MB</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">Next Reward Amount</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{nextRewardValue} MBs</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">Next Reward Yield</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{stakingRebasePercentage}%</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">ROI (5-Day Rate)</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{trim(Number(fiveDayRate) * 100, 4)}%</>}</p>
                                        </div>*/}

                                        <div
                                            className="data-row"
                                            style={{
                                                background: "rgba(255, 255, 255, 0.2)",
                                                boxShadow: "0px 0px 10px rgba(44, 39, 109, 0.1)",
                                                borderRadius: "10px",
                                                padding: "14px 0px",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                minHeight: "80px",
                                            }}
                                        >
                                            <p
                                                className="data-row-name"
                                                style={{
                                                    fontSize: "20px",
                                                }}
                                            >
                                                Wallet address : {address}
                                            </p>
                                        </div>

                                        <div
                                            className="data-row"
                                            style={{
                                                background: "rgba(255, 255, 255, 0.2)",
                                                boxShadow: "0px 0px 10px rgba(44, 39, 109, 0.1)",
                                                borderRadius: "10px",
                                                padding: "14px 0px",
                                                alignItems: "center",
                                                minHeight: "80px",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <p
                                                className="data-row-name"
                                                style={{
                                                    fontSize: "20px",
                                                }}
                                            >
                                                Your LP staked : {isAppLoading ? <Skeleton width="200px" /> : <>0 LP</>}
                                                {/* {trimmedMemoBalance}*/}
                                            </p>
                                        </div>

                                        <div
                                            className="data-row"
                                            /*style={{
                                                background: "rgba(255, 255, 255, 0.2)",
                                                boxShadow: "0px 0px 10px rgba(44, 39, 109, 0.1)",
                                                borderRadius: "10px",
                                                padding: "14px 0px",
                                                alignItems: "center",
                                                minHeight: "80px",
                                                justifyContent: "center",
                                            }}*/
                                        >
                                            <div
                                                className="data-row-rewards"
                                                style={{
                                                    fontSize: "20px",
                                                    background: "rgba(255, 255, 255, 0.2)",
                                                    boxShadow: "0px 0px 10px rgba(44, 39, 109, 0.1)",
                                                    borderRadius: "10px",
                                                    padding: "30px 0px",
                                                    alignItems: "center",
                                                    minHeight: "80px",
                                                    justifyContent: "center",
                                                    width: "70%",
                                                }}
                                            >
                                                <p className="data-row-name" style={{ marginLeft: "50px" }}>
                                                    Unclaimed MB Rewards : {isAppLoading ? <Skeleton width="80px" /> : <>0 MB</>}
                                                    {/*{stakingRebasePercentage}*/}
                                                </p>
                                            </div>
                                            <button
                                                style={{
                                                    fontSize: "20px",
                                                    backgroundColor: "#c9333c",
                                                    boxShadow: "0px 0px 10px rgba(44, 39, 109, 0.1)",
                                                    borderRadius: "10px",
                                                    padding: "30px 0px",
                                                    alignItems: "center",
                                                    minHeight: "80px",
                                                    justifyContent: "center",
                                                    width: "27%",
                                                }}
                                            >
                                                <p className="data-row-name" style={{ fontWeight: "bold" }}>
                                                    Claim
                                                </p>
                                            </button>
                                        </div>

                                        <div
                                            className="data-row-sub"
                                            style={{
                                                background: "rgba(255, 255, 255, 0.2)",
                                                boxShadow: "0px 0px 10px rgba(44, 39, 109, 0.1)",
                                                borderRadius: "10px",
                                                padding: "14px 0px",
                                                alignItems: "center",
                                                minHeight: "80px",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <div
                                                className="data-row"
                                                style={{
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <p
                                                    className="data-row-name"
                                                    style={{
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    Your LP Balance in wallet : {isAppLoading ? <Skeleton width="80px" /> : <>0 LP</>} {/*{trim(Number(timeBalance), 4)}*/}
                                                </p>
                                            </div>

                                            <div
                                                className="data-row"
                                                style={{
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <p className="data-row-name">MB Price : {isAppLoading ? <Skeleton width="80px" /> : <>0 USD</>}</p>
                                                {/*{nextRewardValue} replace USD there*/}
                                            </div>

                                            <div
                                                className="data-row"
                                                style={{
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <p className="data-row-name">Daily Rewards : {isAppLoading ? <Skeleton width="80px" /> : <> 0 MB</>}</p>
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

export default Stake;
