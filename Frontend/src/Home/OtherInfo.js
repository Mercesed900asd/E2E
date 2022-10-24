import React, { useEffect, useState, useRef, useMemo } from "react";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import BigNumber from "bignumber.js";


function OtherInfo({currentTime, signer, address, usdtBalanceOf, usdtAllowance, e2eBalanceOf, e2eAllowance, totalInfo, totalRaffleUsers, depositAddrs, usersInfo, contract1, contract2, contract3, contract4, contract1_addr, contract2_addr, contract3_addr, contract4_addr}) {


    return (
        <div className="">
            <div className="my-team-section mt-50 mb-50">
                <div className="my-team t-family t-white fs-40 alignCenter bold">MY TEAM</div>
                <div className="three-status-section alignCenter mt-50 mb-20">
                    <div className="three-status-div1">
                        <div className="t-family t-white fs-20 bold p-5">TOTAL SALES</div>
                        <div className="t-family t-black fs-20 bold p-5 b-white">{Number(totalInfo?.totalDeposits)}</div>
                    </div>
                    <div className="three-status-div2">
                        <div className="t-family t-white fs-20 bold p-5">TOTAL DOWNLINES</div>
                        <div className="t-family t-black fs-20 bold p-5 b-white">{Number(totalInfo?.totalDownlinks)}</div>
                    </div>
                    <div className="three-status-div3">
                        <div className="t-family t-white fs-20 bold p-5">REFERRAL EARNINGS</div>
                        <div className="t-family t-black fs-20 bold p-5 b-white">{Number(totalInfo?.totalReferEarnings)}</div>
                    </div>
                </div>
                <div className="bottom-letter t-family fs-26 bold alignCenter marginAuto">
                    <p>DOWNLINE UPGRADATION HISTORY</p>
                </div>
                <div>
                    <table className="level-table marginAuto alignCenter">
                        <tr>
                            <th className="fs-14 p-5 bold">LEVEL</th>
                            <th className="fs-14 p-5 bold">NO. OF UPGRADES</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>{Number(totalInfo?.totalDepositNum)}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>{Number(totalInfo?.totalUpgrade2Num)}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>{Number(totalInfo?.totalUpgrade3Num)}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>{Number(totalInfo?.totalUpgrade4Num)}</td> 
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>{Number(totalInfo?.totalUpgrade5Num)}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="tx-history-section">
                <div className="tx-history t-family t-white fs-40 alignCenter bold">TRANSACTION HISTORY</div>
                <div className="tx-history-table mt-50 mb-50">
                    <table className="deposit-table alignCenter">
                        <thead>
                            <tr>
                                <th className="fs-16 p-5 bold" colSpan={5}>DEPOSIT DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>AMOUNT</td>
                                <td>DATE</td>
                                <td>RELEASE DATE</td>
                                <td>REWARD</td>
                                <td>STATUS</td>
                            </tr>
                        </tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <table className="withdrawal-table alignCenter">
                        <thead>
                            <tr>
                                <th className="fs-16 p-5 bold" colSpan={3}>WITHDRAWAL DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>AMOUNT</td>
                                <td>DATE</td>
                                <td>STATUS</td>
                            </tr>
                        </tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OtherInfo;