import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import BigNumber from "bignumber.js";


function BasicInfo({currentTime, signer, address, balanceOf, allowance, getBalance, totalDeposits, totalWithdraws, usersInfo, contract1, contract2, contract1_addr, contract2_addr}) {

    const isMobile = useMediaQuery("(max-width: 920px)");
    const period = 604800;

    const userreferrerDeposits  = new BigNumber(Number(usersInfo.referrerDeposits)).dividedBy(10 ** 6).toFixed(2, 1);
    const userbonus = new BigNumber(Number(usersInfo.bonus)).dividedBy(10 ** 6).toFixed(2, 1);
    const userwithdrawsRef = new BigNumber(Number(usersInfo.withdrawsRef)).dividedBy(10 ** 6).toFixed(2, 1);

    const referEndpoint = `https://www.duop.finance?ref=`;
    const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);
    
    const [isPending, setPending] = useState(false);

    const [amount1, setAmount1] = useState(0);
    const [amount2, setAmount2] = useState(0);

    const notDepositNotify = () => toast.error(`Your referrers haven't deposited yet`);
    const withdrawNotify1 = () => toast.error(`You should wait a liitle longer to withdraw`);
    const withdrawNotify2 = () => toast.error(`You can't withdraw more than 28% of your referrers' deposits`);
    const withdrawNotify3 = () => toast.success(`You withdrawn successfully`);

    const withdrawBonus = async () => {
        let withdrawFunction;
        try {
            withdrawFunction = contract2.connect(signer)["withdrawRef"];
        } catch (err) {
            console.log(err);
        }

        setPending(true);
        try {
            if (Number(usersInfo.refLastTime) <= 0) {
                notDepositNotify();
            } else if ((currentTime / 1000 + 17) - Number(usersInfo.refLastTime) <= period) {
                withdrawNotify1();
            } else if (Number(usersInfo.withdrawsRef) >= Number(usersInfo.bonus)) {
                withdrawNotify2();
            } else {
                let withdrawn = await withdrawFunction({
                    from: address
                });
                await withdrawn.wait();
                withdrawNotify3();
            }
        } catch (err) {
            console.log(err);
        }

        setPending(false);
    }

    return (
        <div className="">
            <div className="info-section mt-10">
                <div className="info-letter-section t-family t-black fs-18 bold">
                    <p className="info-letter1 alignRight pr-20">Contract address:</p>
                    <p className="info-letter2">0x7F64fa657dB1944D48Ee672Bb2A0396fDCCE6378</p>
                </div>
                <div className="info-letter-section t-family t-black fs-18 bold">
                    <p className="info-letter1 alignRight pr-20">Platform running time:</p>
                    <p className="info-letter2">10:23:17:58</p>
                </div>
                <div className="info-letter-section t-family t-black fs-18 bold">
                    <p className="info-letter1 alignRight pr-20">Income:</p>
                    <p className="info-letter2">11.75% FOR 15 DAYS</p>
                </div>
                <div className="info-letter-section t-family t-black fs-18 bold">
                    <p className="info-letter1 alignRight pr-20">Deposit period:</p>
                    <p className="info-letter2">00:00:00</p>
                </div>
            </div>
            <div className="basic-button-section alignCenter mt-50 mb-50">
                <div className="deposit-div">
                    <div className="deposit-icon p-10">
                        <img src="/assets/images/deposit.png" width="70" height="70" />
                    </div>
                    <button className="deposit-button cursorPointer t-family t-white fs-20 bold">DEPOSIT</button>
                </div>
                <div className="withdraw-div">
                    <div className="withdraw-icon p-10">
                        <img src="/assets/images/withdraw.png" width="70" height="70" />
                    </div>
                    <button className="withdraw-button cursorPointer t-family t-white fs-20 bold">WITHDRAW</button>
                </div> 
                <div className="upgrade-div">
                    <div className="upgrade-icon p-10">
                        <img src="/assets/images/upgrade.png" width="70" height="70" />
                    </div>
                    <button className="upgrade-button cursorPointer t-family t-white fs-20 bold">UPGRADE</button>
                </div>
            </div>
            <div className="info-section">
                <div className="info-letter-section t-family t-black fs-18 bold">
                    <p className="info-letter1 alignRight pr-20">My Leverl:</p>
                    <p className="info-letter2">1</p>
                </div>
                <div className="info-letter-section t-family t-black fs-18 bold">
                    <p className="info-letter1 alignRight pr-20">My Rank:</p>
                    <p className="info-letter2">ROOKIE</p>
                </div>
                <div className="info-letter-section t-family t-black fs-18 bold">
                    <p className="info-letter1 alignRight pr-20">My Address:</p>
                    <p className="info-letter2">0x953ef0ac68622d6c1FD2F55121e8955AAB2f1496</p>
                </div>
                <div className="info-letter-section t-family t-black fs-18 bold">
                    <p className="info-letter1 alignRight pr-20">E2E Balance:</p>
                    <p className="info-letter2">100.214.0112</p>
                </div>
                <div className="info-letter-section t-family t-black fs-18 bold">
                    <p className="info-letter1 alignRight pr-20">USDT Balance:</p>
                    <p className="info-letter2">398.25</p>
                </div>
                <div className="info-letter-section t-family t-black fs-18 bold">
                    <p className="info-letter1 alignRight pr-20">Referral address:</p>
                    <p className="info-letter2">https://enroltoearn.com/invite/0x953ef0ac68622d6.....</p>
                </div>
            </div>
            <div className="four-status-section alignCenter mt-50 mb-70">
                <div className="four-status-div1">
                    <div className="t-family t-white fs-18 bold p-5">PLAYERS</div>
                    <div className="t-family t-black fs-18 bold p-5 b-white">9999</div>
                </div>
                <div className="four-status-div2">
                    <div className="t-family t-white fs-18 bold p-5">HIGHEST ROI</div>
                    <div className="t-family t-black fs-18 bold p-5 b-white">97.00%</div>
                </div>
                <div className="four-status-div3">
                    <div className="t-family t-white fs-18 bold p-5">RAFFLE PLAYERS</div>
                    <div className="t-family t-black fs-18 bold p-5 b-white">9999</div>
                </div>
                <div className="four-status-div4">
                    <div className="t-family t-white fs-18 bold p-5">PROFIT PER CYCLE</div>
                    <div className="t-family t-black fs-18 bold p-5 b-white">11.75%</div>
                </div>
            </div>
            <div className="latest-info-section">
                <div className="latest-deposits alignCenter">
                    <div className="latest-deposit-title t-family t-white fs-18 bold p-5">LATEST DEPOSITS</div>
                    <div className="latest-deposit-content">
                        <div className="deposit-addresses mb-5">
                            <p className="t-family t-black bold mt-0 mb-0">0x7fc66500c84a76ad...</p>
                            <div className="inr-section ml-30">
                                <img src="/assets/images/inr.png" width="28" height="25" />
                                <p className="t-family t-black bold mt-0 mb-0">16,000/-</p>
                            </div>
                        </div>
                        <div className="deposit-addresses mb-5">
                            <p className="t-family t-black bold mt-0 mb-0">0x7fc66500c84a76ad...</p>
                            <div className="inr-section ml-30">
                                <img src="/assets/images/inr.png" width="28" height="25" />
                                <p className="t-family t-black bold mt-0 mb-0">32,000/-</p>
                            </div>
                        </div>
                        <div className="deposit-addresses mb-5">
                            <p className="t-family t-black bold mt-0 mb-0">0x7fc66500c84a76ad...</p>
                            <div className="inr-section ml-30">
                                <img src="/assets/images/inr.png" width="28" height="25" />
                                <p className="t-family t-black bold mt-0 mb-0">2000/-</p>
                            </div>
                        </div>
                        <div className="deposit-addresses mb-5">
                            <p className="t-family t-black bold mt-0 mb-0">0x7fc66500c84a76ad...</p>
                            <div className="inr-section ml-30">
                                <img src="/assets/images/inr.png" width="28" height="25" />
                                <p className="t-family t-black bold mt-0 mb-0">8000/-</p>
                            </div>
                        </div>
                        <div className="deposit-addresses mb-5">
                            <p className="t-family t-black bold mt-0 mb-0">0x7fc66500c84a76ad...</p>
                            <div className="inr-section ml-30">
                                <img src="/assets/images/inr.png" width="28" height="25" />
                                <p className="t-family t-black bold mt-0 mb-0">32,000/-</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="latest-withdrawals alignCenter">
                    <div className="latest-withdrawl-title t-family t-white fs-18 bold p-5">LATEST WITHDRAWALS</div>
                    <div className="latest-withdrawl-content">
                        <div className="withdrawal-addresses mb-5">
                            <p className="t-family t-black bold mt-0 mb-0">0x580a84c73811e183...</p>
                            <div className="inr-section ml-30">
                                <img src="/assets/images/inr.png" width="28" height="25" />
                                <p className="t-family t-black bold mt-0 mb-0">51,520/-</p>
                            </div>
                        </div>
                        <div className="withdrawal-addresses mb-5">
                            <p className="t-family t-black bold mt-0 mb-0">0x580a84c73811e183...</p>
                            <div className="inr-section ml-30">
                                <img src="/assets/images/inr.png" width="28" height="25" />
                                <p className="t-family t-black bold mt-0 mb-0">3020/-</p>
                            </div>
                        </div>
                        <div className="withdrawal-addresses mb-5">
                            <p className="t-family t-black bold mt-0 mb-0">0x580a84c73811e183...</p>
                            <div className="inr-section ml-30">
                                <img src="/assets/images/inr.png" width="28" height="25" />
                                <p className="t-family t-black bold mt-0 mb-0">21,200/-</p>
                            </div>
                        </div>
                        <div className="withdrawal-addresses mb-5">
                            <p className="t-family t-black bold mt-0 mb-0">0x580a84c73811e183...</p>
                            <div className="inr-section ml-30">
                                <img src="/assets/images/inr.png" width="28" height="25" />
                                <p className="t-family t-black bold mt-0 mb-0">8320/-</p>
                            </div>
                        </div>
                        <div className="withdrawal-addresses mb-5">
                            <p className="t-family t-black bold mt-0 mb-0">0x580a84c73811e183...</p>
                            <div className="inr-section ml-30">
                                <img src="/assets/images/inr.png" width="28" height="25" />
                                <p className="t-family t-black bold mt-0 mb-0">16,000/-</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasicInfo;