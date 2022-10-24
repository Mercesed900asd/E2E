import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import BigNumber from "bignumber.js";


function EnrolToEarn({ currentTime, signer, address, loadWeb3Modal, usdtBalanceOf, usdtAllowance, e2eBalanceOf, e2eAllowance, usersInfo, contract1, contract2, contract3, contract4, contract1_addr, contract2_addr, contract3_addr, contract4_addr }) {


    return (
        <div className="">
            <div className="e2e-section">
                <div className="headline mt-60 mb-60">
                    <h1 className="t-family fs-50">ENROL TO EARN</h1>
                    <p className="t-family fs-22 bold">Participate and earn upto 55% returns per month</p>
                    <div className="e2e-button-section">
                        <button className="common-button cursorPointer t-family t-black fs-18" onClick={loadWeb3Modal}>JOIN NOW</button>
                        <a href="#" target="_blank"><button className="common-button cursorPointer t-family t-black fs-18">READ DOCS</button></a>
                    </div>
                </div>
                <div className="e2e-img-section">
                    <img src="/assets/images/e2e-img.png" width="350" height="350" />
                </div>
            </div>
            <div className="fixed-profit-section alignCenter mt-40 mb-60">
                <p className="t-family t-black fs-35 bold mt-10 mb-0">{"FIXED PROFIT PER CYCLE (7 DAYS)"}</p>
                <span className="percent-letter fs-55 bold">{"11.75%"}</span>
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