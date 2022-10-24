import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import BigNumber from "bignumber.js";


function HowToStart({currentTime, signer, address, loadWeb3Modal, usdtBalanceOf, usdtAllowance, e2eBalanceOf, e2eAllowance, usersInfo, contract1, contract2, contract3, contract4, contract1_addr, contract2_addr, contract3_addr, contract4_addr}) {


    return (
        <div className="">
            <div className="howtostart-section">
                <a href="#" target="_blank"><button className="other-button cursorPointer t-family t-black fs-40 marginAuto">HOW TO START?</button></a>
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
                    <p className="bottom-letter t-family t-black fs-30 bold">START YIELDING UPTO 55% MONTHLY RETURNS</p>
                    <button className="common-button cursorPointer t-family t-black fs-18" onClick={loadWeb3Modal}>JOIN NOW</button>
                </div>
                <div className="yielding-img-section">
                    <img src="/assets/images/yiedling-img.png" width="320" height="320" />
                </div>
            </div>
        </div>
    )
}

export default HowToStart;