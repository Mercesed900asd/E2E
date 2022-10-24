import React, { useEffect, useState, useRef, useMemo } from "react";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import ReactModal from 'react-modal';
import DepositModal from '../Modal/DepositModal.js';
import WithdrawModal from '../Modal/WithdrawModal.js';
import UpgradeModal from '../Modal/UpgradeModal.js';
import useMediaQuery from "@mui/material/useMediaQuery";
import BigNumber from "bignumber.js";


function BasicInfo({ currentTime, signer, address, usdtBalanceOf, usdtAllowance, e2eBalanceOf, e2eAllowance, totalInfo, totalRaffleUsers, depositAddrs, usersInfo, contract1, contract2, contract3, contract4, contract1_addr, contract2_addr, contract3_addr, contract4_addr }) {

    const currentMilliseconds = 1666544550000;
    const currentDays = Number(((currentTime - currentMilliseconds) / 86400000).toFixed(0)) + 42;
    
    const referEndpoint = "https://enroltoearn.com/invite/";
    const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (date == 0) {
            return "0000:00:00";
        }

        return [year, month, day].join(':');
    }

    const myLevel = useMemo(() => {
        if (usersInfo.levelStatus?.upgraded5) {
            return 5;
        } else if (usersInfo.levelStatus?.upgraded4) {
            return 4;
        } else if (usersInfo.levelStatus?.upgraded3) {
            return 3;
        } else if (usersInfo.levelStatus?.upgraded2) {
            return 2;
        } else if (usersInfo.levelStatus?.deposited) {
            return 1;
        } else
            return 0;
    }, [JSON.stringify(usersInfo)]);

    const myRank = useMemo(() => {
        if (usersInfo.levelStatus?.upgraded5) {
            return "3 Star";
        } else if (usersInfo.levelStatus?.upgraded4) {
            return "2 Star";
        } else if (usersInfo.levelStatus?.upgraded3) {
            return "2 Star";
        } else if (usersInfo.levelStatus?.upgraded2) {
            return "1 Star";
        } else if (usersInfo.levelStatus?.deposited) {
            return "ROOKIE";
        } else
            return "NULL";
    }, [JSON.stringify(usersInfo)]);

    const [isDepositModal, setIsDepositModal] = useState(false);
    const [isWithdrawModal, setIsWithdrawModal] = useState(false);
    const [isUpgradeModal, setIsUpgradeModal] = useState(false);

    function closeModal() {
        setIsDepositModal(false);
        setIsWithdrawModal(false);
        setIsUpgradeModal(false);
    }

    function openDepositModal() {
        setIsDepositModal(true);
    }

    function openWithdrawModal() {
        setIsWithdrawModal(true);
    }

    function openUpgradeModal() {
        setIsUpgradeModal(true);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "transparent",
            border: 'none',
            overflow: 'hidden',
        },
    };


    return (
        <div className="">
            <div className="info-section mt-20">
                <div className="info-letter-section t-family t-black fs-20 bold">
                    <p className="info-letter1 alignRight pr-20">Contract address:</p>
                    <p className="info-letter2">{contract3_addr}</p>
                </div>
                <div className="info-letter-section t-family t-black fs-20 bold">
                    <p className="info-letter1 alignRight pr-20">Platform running time:</p>
                    {/* <p className="info-letter2">{(new Date(currentTime)).toUTCString()}</p> */}
                    <p className="info-letter2">{currentDays} days</p>
                </div>
                <div className="info-letter-section t-family t-black fs-20 bold">
                    <p className="info-letter1 alignRight pr-20">Income:</p>
                    <p className="info-letter2">11.75% FOR 7 DAYS</p>
                </div>
                <div className="info-letter-section t-family t-black fs-20 bold">
                    <p className="info-letter1 alignRight pr-20">Deposit period:</p>
                    <p className="info-letter2">{formatDate(Number(usersInfo?.lastTime))}</p>
                </div>
            </div>
            <div className="basic-button-section alignCenter mt-60 mb-60">
                <div className="deposit-div">
                    <div className="deposit-icon p-20">
                        <img src="/assets/images/deposit.png" width="70" height="70" />
                    </div>
                    <button className="deposit-button cursorPointer t-family t-white fs-22 bold" onClick={openDepositModal}>DEPOSIT</button>
                </div>
                <div className="withdraw-div">
                    <div className="withdraw-icon p-20">
                        <img src="/assets/images/withdraw.png" width="70" height="70" />
                    </div>
                    <button className="withdraw-button cursorPointer t-family t-white fs-22 bold" onClick={openWithdrawModal}>WITHDRAW</button>
                </div>
                <div className="upgrade-div">
                    <div className="upgrade-icon p-20">
                        <img src="/assets/images/upgrade.png" width="70" height="70" />
                    </div>
                    <button className="upgrade-button cursorPointer t-family t-white fs-22 bold" onClick={openUpgradeModal}>UPGRADE</button>
                </div>
            </div>

            <ReactModal isOpen={isDepositModal} onRequestClose={() => closeModal()} style={customStyles} ariaHideApp={false} htmlOpenClassName="modalBody">
                <DepositModal closeModal={closeModal} signer={signer} address={address} contract1={contract1} contract3={contract3} contract3_addr={contract3_addr} />
            </ReactModal>
            <ReactModal isOpen={isWithdrawModal} onRequestClose={() => closeModal()} style={customStyles} ariaHideApp={false} htmlOpenClassName="modalBody">
                <WithdrawModal closeModal={closeModal} signer={signer} address={address} contract3={contract3} myLevel={myLevel} myRank={myRank} />
            </ReactModal>
            <ReactModal isOpen={isUpgradeModal} onRequestClose={() => closeModal()} style={customStyles} ariaHideApp={false} htmlOpenClassName="modalBody">
                <UpgradeModal closeModal={closeModal} signer={signer} address={address} contract3={contract3} myLevel={myLevel} myRank={myRank} />
            </ReactModal>

            <div className="info-section">
                <div className="info-letter-section t-family t-black fs-20 bold">
                    <p className="info-letter1 alignRight pr-20">My Level:</p>
                    <p className="info-letter2">{myLevel}</p>
                </div>
                <div className="info-letter-section t-family t-black fs-20 bold">
                    <p className="info-letter1 alignRight pr-20">My Rank:</p>
                    <p className="info-letter2">{myRank}</p>
                </div>
                <div className="info-letter-section t-family t-black fs-20 bold">
                    <p className="info-letter1 alignRight pr-20">My Address:</p>
                    <p className="info-letter2">{address}</p>
                </div>
                <div className="info-letter-section t-family t-black fs-20 bold">
                    <p className="info-letter1 alignRight pr-20">E2E Balance:</p>
                    <p className="info-letter2">{Number(new BigNumber(e2eBalanceOf).dividedBy(10 ** 18))}</p>
                </div>
                <div className="info-letter-section t-family t-black fs-20 bold">
                    <p className="info-letter1 alignRight pr-20">USDT Balance:</p>
                    <p className="info-letter2">{Number(new BigNumber(usdtBalanceOf).dividedBy(10 ** 6))}</p>
                </div>
                <div className="info-letter-section t-family fs-20 bold">
                    <p className="info-letter1 t-black alignRight pr-20">Referral link:</p>
                    <div className="info-letter2">
                        <span className="t-blue">{referEndpoint}{address}</span>
                        {address && window.localStorage.getItem('CONNECTKEY') ? 
                            <img src="/assets/images/copyicon4.svg" width="25" height="25" className="ml-10 cursorPointer" onClick={() => {
                                if (navigator.clipboard) {
                                    navigator.clipboard.writeText(`${referEndpoint}${address}`);
                                    setIsTooltipDisplayed(true);
                                    setTimeout(() => {
                                    setIsTooltipDisplayed(false);
                                    }, 1000);
                                }
                                }} /> : 
                            <span></span>
                        }
                        <span className={isTooltipDisplayed ? "visibility-block" : "visibility-hidden"}> Copied </span>
                    </div>
                </div>
            </div>
            <div className="four-status-section alignCenter mt-60 mb-80">
                <div className="four-status-div1">
                    <div className="t-family t-white fs-20 bold">PLAYERS</div>
                    {/* <div className="t-family t-black fs-18 bold p-5 b-white">{Number(totalInfo?.totalUsers)}</div> */}
                    <div className="t-family t-black fs-20 bold b-white">78</div>
                </div>
                <div className="four-status-div2">
                    <div className="t-family t-white fs-20 bold">HIGHEST ROI</div>
                    <div className="t-family t-black fs-20 bold b-white">97.00%</div>
                </div>
                <div className="four-status-div3">
                    <div className="t-family t-white fs-20 bold">RAFFLE PLAYERS</div>
                    <div className="t-family t-black fs-20 bold b-white">{totalRaffleUsers}</div>
                </div>
                <div className="four-status-div4">
                    <div className="t-family t-white fs-20 bold">PROFIT PER CYCLE</div>
                    <div className="t-family t-black fs-20 bold b-white">11.75%</div>
                </div>
            </div>
            <div className="latest-info-section">
                <div className="latest-deposits alignCenter">
                    <div className="latest-deposit-title t-family t-white fs-20 bold p-5">LATEST DEPOSITS</div>
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
                    <div className="latest-withdrawl-title t-family t-white fs-20 bold p-5">LATEST WITHDRAWALS</div>
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