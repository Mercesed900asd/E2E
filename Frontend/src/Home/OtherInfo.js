import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import BigNumber from "bignumber.js";


function OtherInfo({currentTime, signer, address, balanceOf, allowance, getBalance, totalDeposits, totalWithdraws, usersInfo, contract1, contract2, contract1_addr, contract2_addr}) {

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
            <div className="my-team-section mt-50 mb-50">
                <div className="my-team t-family t-white fs-35 alignCenter bold">MY TEAM</div>
                <div className="three-status-section alignCenter mt-50 mb-20">
                    <div className="three-status-div1">
                        <div className="t-family t-white fs-18 bold p-5">TOTAL SALES</div>
                        <div className="t-family t-black fs-18 bold p-5 b-white">999</div>
                    </div>
                    <div className="three-status-div2">
                        <div className="t-family t-white fs-18 bold p-5">TOTAL DOWNLINES</div>
                        <div className="t-family t-black fs-18 bold p-5 b-white">99</div>
                    </div>
                    <div className="three-status-div3">
                        <div className="t-family t-white fs-18 bold p-5">REFERRAL EARNINGS</div>
                        <div className="t-family t-black fs-18 bold p-5 b-white">999</div>
                    </div>
                </div>
                <div className="bottom-letter t-family fs-24 bold alignCenter marginAuto">
                    <p>DOWNLINE UPGRADATION HISTORY</p>
                </div>
                <div>
                    <table className="level-table marginAuto alignCenter">
                        <tr>
                            <th className="fs-14 p-5 bold">LEVEL</th>
                            <th className="fs-14 p-5 bold">NO. OF UPGRADES</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="tx-history-section">
                <div className="tx-history t-family t-white fs-35 alignCenter bold">TRANSACTION HISTORY</div>
                <div className="tx-history-table mt-40 mb-40">
                    <table className="deposit-table alignCenter">
                        <tr>
                            <th className="fs-14 p-5 bold" colSpan={5}>DEPOSIT DETAILS</th>
                        </tr>
                        <tr>
                            <td>AMOUNT</td>
                            <td>DATE</td>
                            <td>RELEASE DATE</td>
                            <td>REWARD</td>
                            <td>STATUS</td>
                        </tr>
                        <tr>
                            <td>2000/-</td>
                            <td>23-Aug</td>
                            <td>30-Aug</td>
                            <td>235/-</td>
                            <td>ACTIVE</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <table className="withdrawal-table alignCenter">
                        <tr>
                            <th className="fs-14 p-5 bold" colSpan={3}>WITHDRAWAL DETAILS</th>
                        </tr>
                        <tr>
                            <td>AMOUNT</td>
                            <td>DATE</td>
                            <td>STATUS</td>
                        </tr>
                        <tr>
                            <td>2235/-</td>
                            <td>23-Aug</td>
                            <td>SUCCESSFUL</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
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