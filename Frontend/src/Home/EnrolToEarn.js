import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import BigNumber from "bignumber.js";


function EnrolToEarn({ currentTime, signer, address, balanceOf, allowance, getBalance, totalDeposits, totalWithdraws, usersInfo, contract1, contract2, contract1_addr, contract2_addr }) {

    const isMobile = useMediaQuery("(max-width: 920px)");
    const referral_addr = window.location.href.slice(30, 72).length === 42 ? window.location.href.slice(30, 72) : "0x0000000000000000000000000000000000000000";
    //console.log("referral_addr =>", referral_addr);

    const minUSDC = 2 * 1e7;
    const maxUSDC = 2 * 1e10;
    const period = 604800;

    const getbalance = new BigNumber(getBalance).dividedBy(10 ** 6).toFixed(2, 1);
    const totaldeposits = new BigNumber(totalDeposits).dividedBy(10 ** 6).toFixed(2, 1);
    const totalwithdraws = new BigNumber(totalWithdraws).dividedBy(10 ** 6).toFixed(2, 1);
    const userdeposits = new BigNumber(Number(usersInfo.deposits)).dividedBy(10 ** 6).toFixed(2, 1);
    const userwithdraws = new BigNumber(Number(usersInfo.withdraws)).dividedBy(10 ** 6).toFixed(2, 1);

    const [isPending, setPending] = useState(false);
    const [pended, setPended] = useState(false);
    
    const [amount, setAmount] = useState(0);
    const bigAmount = amount ? new BigNumber(amount).multipliedBy(10 ** 6) : 0;

    const approveNotify1 = () => toast.error(`Inputed amount should be greater than or equal to 20 USDC`);
    const approveNotify2 = () => toast.error(`Your deposited amount should be less than or equal to 20000 USDC`);
    const approveNotify3 = () => toast.success(`You approved successfully`);
    const insufficientNotify = () => toast.error(`Insufficient funds`);

    const depositNotify1 = () => toast.error(`Your allowed amount should be greater than or equal to 20 USDC`);
    const depositNotify2 = () => toast.error(`Your allowed amount is insufficient`);
    const depositNotify3 = () => toast.success(`You deposited successfully`);

    const compoundNotify = () => toast.success(`You compounded successfully`);
    const notDepositNotify = () => toast.error(`You haven't deposited yet`);

    const withdrawNotify1 = () => toast.error(`You should wait a liitle longer to withdraw`);
    const withdrawNotify2 = () => toast.error(`You can't withdraw more than 399% of your deposits`);
    const withdrawNotify3 = () => toast.success(`You withdrawn successfully`);

    const approveUSDC = async () => {
        let approveFunction;
        try {
            approveFunction = contract1.connect(signer)["approve"];
        } catch (err) {
            console.log(err);
        }

        setPending(true);
        setPended(true);
        try {
            if (Number(bigAmount) < minUSDC) {
                approveNotify1();
                setPended(false);
            } else if (Number(usersInfo.deposits) + Number(bigAmount) > maxUSDC) {
                approveNotify2();
                setPended(false);
            } else if (Number(bigAmount) > balanceOf) {
                insufficientNotify();
                setPended(false);
            } else {
                let approved = await approveFunction(contract2_addr, Number(bigAmount), {
                    from: address
                });
                await approved.wait();
                approveNotify3();
            }
        } catch (err) {
            console.log(err);
            setPended(false);
        }

        setPending(false);
    }

    const depositUSDC = async () => {
        let depositFunction;
        try {
            depositFunction = contract2.connect(signer)["deposit"];
        } catch (err) {
            console.log(err);
        }

        setPending(true);
        try {
            if (allowance < minUSDC) {
                depositNotify1();
            } else if (allowance < Number(bigAmount)) {
                depositNotify2();
            } else if (Number(bigAmount) < minUSDC) {
                approveNotify1();
            } else if (Number(usersInfo.deposits) + Number(bigAmount) > maxUSDC) {
                approveNotify2();
            } else if (Number(bigAmount) > balanceOf) {
                insufficientNotify();
            } else {
                let deposited = await depositFunction(referral_addr, Number(bigAmount), {
                    from: address
                });
                await deposited.wait();
                depositNotify3();
                setPended(false);
            }
        } catch (err) {
            console.log(err);
        }

        setPending(false);
    }

    const compoundUSDC = async () => {
        let compoundFunction;
        try {
            compoundFunction = contract2.connect(signer)["compound"];
        } catch (err) {
            console.log(err);
        }

        setPending(true);
        setPended(true);
        try {
            if (Number(usersInfo.lastTime) <= 0) {
                notDepositNotify();
            } else {
                let getRewardsSinceLastDeposit = contract2.connect(signer)["getRewardsSinceLastDeposit"];
                let rewardsSinceLastDeposit = await getRewardsSinceLastDeposit(address);
                console.log("rewardsSinceLastDeposit =>", Number(rewardsSinceLastDeposit));

                if (Number(usersInfo.deposits) + Number(rewardsSinceLastDeposit) > maxUSDC) {
                    approveNotify2();
                } else {
                    let compounded = await compoundFunction({
                        from: address
                    });
                    await compounded.wait();
                    compoundNotify();
                }
            }
        } catch (err) {
            console.log(err);
        }

        setPended(false);
        setPending(false);
    }

    const withdrawReward = async () => {
        let withdrawFunction;
        try {
            withdrawFunction = contract2.connect(signer)["withdraw"];
        } catch (err) {
            console.log(err);
        }

        setPending(true);
        setPended(true);
        try {
            if (Number(usersInfo.lastTime) <= 0) {
                notDepositNotify();
            } else if ((currentTime / 1000 + 17) - Number(usersInfo.lastTime) <= period) {
                withdrawNotify1();
            } else if (Number(usersInfo.withdraws) >= Number(usersInfo.deposits) * 3.99) {
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

        setPended(false);
        setPending(false);
    }

    const inputMax = async () => {
        try {
            const balance = new BigNumber(balanceOf).dividedBy(10 ** 6);
            setAmount(balance);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="">
            <div className="e2e-section">
                <div className="headline mt-60 mb-60">
                    <h1 className="t-family fs-40">ENROL TO EARN</h1>
                    <p className="t-family fs-20 bold">Participate and earn upto 55% returns per month</p>
                    <div className="e2e-button-section">
                        <button className="common-button cursorPointer t-family t-black fs-18">JOIN NOW</button>
                        <button className="common-button cursorPointer t-family t-black fs-18">READ DOCS</button>
                    </div>
                </div>
                <div className="e2e-img-section">
                    <img src="/assets/images/e2e-img.png" width="300" height="300" />
                </div>
            </div>
            <div className="fixed-profit-section alignCenter mt-40 mb-60">
                <p className="t-family t-black fs-35 bold mt-10 mb-0">{"FIXED PROFIT PER CYCLE (7 DAYS)"}</p>
                <span className="percent-letter fs-45 bold">{"11.75%"}</span>
                <p className="t-family t-black fs-24 bold mt-10 mb-10">{"( CALCULATED 1.67% DAILY )"}</p>
            </div>
            <div className="dashed-line1"></div>
            <div className="ellipse-icon-section mb-50">
                <div className="ellipse-div alignCenter">
                    <div className="ellipse-icon marginAuto">
                        <img src="/assets/images/completely.png" width="70" height="70" />
                    </div>
                    <p className="t-family t-black fs-20 bold mt-10">COMPLETELY DECENTRALISED</p>
                </div>
                <div className="ellipse-div alignCenter">
                    <div className="ellipse-icon marginAuto">
                        <img src="/assets/images/higher.png" width="70" height="70" />
                    </div>
                    <p className="t-family t-black fs-20 bold mt-10">HIGHER RATE OF RETURN</p>
                </div>
                <div className="ellipse-div alignCenter">
                    <div className="ellipse-icon marginAuto">
                        <img src="/assets/images/sustainability.png" width="70" height="70" />
                    </div>
                    <p className="t-family t-black fs-20 bold mt-10">SUSTAINABILITY & CONTINUITY</p>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default EnrolToEarn;