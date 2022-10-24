import React, { useEffect, useState, useRef } from "react";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";


function DepositModal({closeModal, signer, address, contract1, contract3, contract3_addr}) {

    const referral_addr = window.location.href.slice(30, 72).length === 42 ? window.location.href.slice(30, 72) : "0x0000000000000000000000000000000000000000";
    // console.log(referral_addr);

    const maxUint = new BigNumber(Number(ethers.constants.MaxUint256)).dividedBy(10 ** 6).toFixed(0);
    const [isPending, setPending] = useState(false);
    
    // const [selectedAmt, setSelectedAmt] = useState(25);

    // const handleSelectAmt = (value) => {
    //     setSelectedAmt(value);
    // }

    const depositUSDT = async () => {
        let approveFunction;
        let depositFunction;
        try {
            approveFunction = contract1.connect(signer)["approve"];
            depositFunction = contract3.connect(signer)["deposit"];
        } catch (err) {
            console.log(err);
        }

        setPending(true);

        try {
            let approved = await approveFunction(contract3_addr, maxUint, {
                from: address
            });
            await approved.wait();
        } catch (err) {
            console.log(err);
        }

        try {
            let deposited = await depositFunction(referral_addr, {
                from: address
            });
            await deposited.wait();
        } catch (err) {
            console.log(err);
        }

        setPending(false);
    }


    return (
        <div className="outer-modal">
            <button className="close-button cursorPointer t-black fs-40 bold" onClick={closeModal}>&times;</button>
            <div className="deposit-modal alignCenter marginAuto">
                <div className="deposit-letter t-family mt-20 fs-22 bold">DEPOSIT</div>
                <div>
                    <p className="amount-letter t-family mt-20 mb-0 fs-24 bold">AMOUNT</p>
                    <div>
                        <p className="usdt-letter t-family fs-16 bold mb-0">( USDT )</p>
                        <div className="amount-div marginAuto t-family t-black fs-16 bold">$25</div>
                        {/* <div><button className={selectedAmt === 25 ? "amount-div cursorPointer t-family t-black fs-16 bold active" : "amount-div cursorPointer t-family t-black fs-16 bold"} onClick={() => handleSelectAmt(25)}>$25</button></div>
                        <div><button className={selectedAmt === 50 ? "amount-div cursorPointer t-family t-black fs-16 bold active" : "amount-div cursorPointer t-family t-black fs-16 bold"} onClick={() => handleSelectAmt(50)}>$50</button></div>
                        <div><button className={selectedAmt === 100 ? "amount-div cursorPointer t-family t-black fs-16 bold active" : "amount-div cursorPointer t-family t-black fs-16 bold"} onClick={() => handleSelectAmt(100)}>$100</button></div>
                        <div><button className={selectedAmt === 200 ? "amount-div cursorPointer t-family t-black fs-16 bold active" : "amount-div cursorPointer t-family t-black fs-16 bold"} onClick={() => handleSelectAmt(200)}>$200</button></div>
                        <div><button className={selectedAmt === 400 ? "amount-div cursorPointer t-family t-black fs-16 bold active" : "amount-div cursorPointer t-family t-black fs-16 bold"} onClick={() => handleSelectAmt(400)}>$400</button></div> */}
                    </div>
                    <button className="common-button cursorPointer marginAuto t-family t-black fs-16 mt-20 mb-35" onClick={depositUSDT} disabled={isPending}>CONFIRM</button>
                </div>
            </div>
        </div>
    );
}

export default DepositModal;