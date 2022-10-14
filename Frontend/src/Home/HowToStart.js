import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import BigNumber from "bignumber.js";


function HowToStart({currentTime, signer, address, balanceOf, allowance, getBalance, totalDeposits, totalWithdraws, usersInfo, contract1, contract2, contract1_addr, contract2_addr}) {

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
            <div className="howtostart-section">
                <button className="other-button cursorPointer t-family t-black fs-40 marginAuto">HOW TO START?</button>
                <div className="dashed-line2"></div>
                <div className="non-ellipse-icon-section alignCenter mt-60 mb-50">
                    <div className="non-ellipse-div alignCenter">
                        <div className="non-ellipse-icon marginAuto">
                            <img src="/assets/images/enrol.png" width="40" height="40" />
                        </div>
                        <p className="t-family t-black fs-22 bold">ENROL</p>
                    </div>
                    <div className="non-ellipse-div alignCenter">
                        <div className="non-ellipse-icon marginAuto">
                            <img src="/assets/images/connect.png" width="40" height="40" />
                        </div>
                        <p className="t-family t-black fs-22 bold">CONNCET</p>
                    </div>
                    <div className="non-ellipse-div alignCenter">
                        <div className="non-ellipse-icon marginAuto">
                            <img src="/assets/images/participate.png" width="40" height="40" />
                        </div>
                        <p className="t-family t-black fs-22 bold">PARTICIPATE</p>
                    </div>
                </div>
            </div>
            <div className="yielding-section">
                <div>
                    <p className="bottom-letter t-family t-black fs-24 bold">START YIELDING UPTO 55% MONTHLY RETURNS</p>
                    <button className="common-button cursorPointer t-family t-black fs-18">JOIN NOW</button>
                </div>
                <div className="yielding-img-section">
                    <img src="/assets/images/yiedling-img.png" width="250" height="250" />
                </div>
            </div>
        </div>
    )
}

export default HowToStart;