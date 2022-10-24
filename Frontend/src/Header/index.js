import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';


function Header({ address, loadWeb3Modal, web3Modal, logoutOfWeb3Modal }) {

    return (
        <div className="header">
            <div className="navbar marginAuto pt-15 pb-15">
                <div className="logo-banner">
                    <Link to="/" className="logo">
                        <div className="logo-section">
                            <img className="logo-img" src="/assets/images/e2e.png" alt="logo" width="190" height="90" onClick={logoutOfWeb3Modal} />
                        </div>
                    </Link>
                </div>
                <div className="right-banner">
                    {
                        web3Modal && web3Modal.cachedProvider ?
                            <div className="wallet-connect alignCenter">
                                <button className="common-button cursorPointer t-family t-black fs-18" onClick={logoutOfWeb3Modal}> {address && address.slice(0, 5)}...{address && address.slice(-4)} </button>
                            </div>
                            :
                            <div className="wallet-connect alignCenter">
                                <button className="common-button cursorPointer t-family t-black fs-20" onClick={loadWeb3Modal}>Connect</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;