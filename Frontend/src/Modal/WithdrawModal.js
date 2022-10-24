import React, { useEffect, useState, useRef } from "react";

function WithdrawModal({closeModal, signer, address, contract3, myLevel, myRank}) {

    const [isPending, setPending] = useState(false);
    
    const withdrawUSDT = async () => {
        let withdrawFunction;
        try {
            withdrawFunction = contract3.connect(signer)["withdraw"];
        } catch (err) {
            console.log(err);
        }

        setPending(true);

        try {
            let withdrawn = await withdrawFunction({
                from: address
            });
            await withdrawn.wait();
        } catch (err) {
            console.log(err);
        }

        setPending(false);
    }


    return (
        <div className="outer-modal">
            <button className="close-button cursorPointer t-black fs-40 bold" onClick={closeModal}>&times;</button>
            <div className="withdraw-modal alignCenter marginAuto">
                <div className="withdraw-letter t-family mt-20 mb-20 fs-22 bold">WITHDRAW</div>
                <div>
                    <div className="withdraw-rank-level">
                        <p className="rank-level-title alignRight t-family mt-0 mb-0 fs-16 bold pr-5">Current Rank : </p>
                        <p className="rank-level-content alignLeft t-family mt-0 mb-0 fs-14 bold">{myRank}</p>
                    </div>
                    <div className="withdraw-rank-level">
                        <p className="rank-level-title alignRight t-family mt-0 mb-0 fs-16 bold pr-5">Current Level : </p>
                        <p className="rank-level-content alignLeft t-family mt-0 mb-0 fs-14 bold">{myLevel}</p>
                    </div>
                    {/* <div>
                        <p className="usdt-letter t-family fs-16 bold mb-0">( USDT )</p>
                        <input className="input-div cursorPointer t-family t-black fs-16 bold"></input>
                    </div> */}
                    <button className="common-button cursorPointer marginAuto t-family t-black fs-16 mt-20 mb-35" onClick={withdrawUSDT} disabled={isPending}>CONFIRM</button>
                </div>
            </div>
        </div>
    );
}

export default WithdrawModal;