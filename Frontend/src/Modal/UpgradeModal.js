import React, { useEffect, useState, useRef } from "react";

function UpgradeModal({closeModal, signer, address, contract3, myLevel, myRank}) {

    const [isPending, setPending] = useState(false);
    
    const upgradeUSDT = async () => {
        let upgradeFunction;
        try {
            upgradeFunction = contract3.connect(signer)["upgrade"];
        } catch (err) {
            console.log(err);
        }

        setPending(true);

        try {
            let upgraded = await upgradeFunction({
                from: address
            });
            await upgraded.wait();
        } catch (err) {
            console.log(err);
        }

        setPending(false);
    }


    return (
        <div className="outer-modal">
            <button className="close-button cursorPointer t-black fs-40 bold" onClick={closeModal}>&times;</button>
            <div className="upgrade-modal alignCenter marginAuto">
                <div className="upgrade-letter t-family mt-20 mb-20 fs-22 bold">UPGRADE</div>
                <div>
                    <div>
                        <div className="upgrade-rank-available">
                            <p className="rank-available-title alignRight t-family mt-0 mb-0 fs-16 bold pr-5">Current Rank : </p>
                            <p className="rank-available-content alignLeft t-family mt-0 mb-0 fs-14 bold">{myRank}</p>
                        </div>
                        <div className="upgrade-rank-available">
                            <p className="rank-available-title alignRight t-family mt-0 mb-0 fs-16 bold pr-5">Upgrade Available : </p>
                            <p className="rank-available-content alignLeft t-family mt-0 mb-0 fs-14 bold">{myLevel + 1}</p>
                        </div>
                        <button className="common-button cursorPointer marginAuto t-family t-black fs-16 mt-20 mb-35" onClick={upgradeUSDT} disabled={isPending}>UPGRADE</button>
                    </div>
                    <div>
                        <p className="t-family mt-20 mb-0 fs-12 bold">Read our documentation to understand the upgradation structure</p>
                        <a href="#" target="_blank"><button className="common-button cursorPointer marginAuto t-family t-black fs-16 mt-20 mb-35">READ DOCS</button></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpgradeModal;