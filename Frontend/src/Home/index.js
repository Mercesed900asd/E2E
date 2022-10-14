import React, {useEffect, useState} from "react";
import '../Style/style.css';
import EnrolToEarn from './EnrolToEarn.js';
import HowToStart from './HowToStart.js';
import BasicInfo from './BasicInfo.js';
import OtherInfo from './OtherInfo.js';


function Home({signer, address, balanceOf, allowance, getCurrentTime, getBalance, totalDeposits, totalWithdraws, usersInfo, contract1, contract2, contract1_addr, contract2_addr}) {

  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
          setCurrentTime(new Date().getTime());
      }, 1000)

      return () => clearInterval(interval)
  }, [])
 
  return (
    <>
      <div className="">
        {address && window.localStorage.getItem('CONNECTKEY') ? (
          <>
            <BasicInfo 
              currentTime={currentTime} 
              signer={signer} 
              address={address} 
              balanceOf={balanceOf} 
              allowance={allowance} 
              getBalance={getBalance} 
              totalDeposits={totalDeposits} 
              totalWithdraws={totalWithdraws} 
              usersInfo={usersInfo} 
              contract1={contract1} 
              contract2={contract2} 
              contract1_addr={contract1_addr} 
              contract2_addr={contract2_addr}
            />
            <OtherInfo 
              currentTime={currentTime} 
              signer={signer} 
              address={address} 
              balanceOf={balanceOf} 
              allowance={allowance} 
              getBalance={getBalance} 
              totalDeposits={totalDeposits} 
              totalWithdraws={totalWithdraws} 
              usersInfo={usersInfo} 
              contract1={contract1} 
              contract2={contract2} 
              contract1_addr={contract1_addr} 
              contract2_addr={contract2_addr}
            />
          </>) : (
          <>
            <EnrolToEarn 
              currentTime={currentTime} 
              signer={signer} 
              address={address} 
              balanceOf={balanceOf} 
              allowance={allowance} 
              getBalance={getBalance} 
              totalDeposits={totalDeposits} 
              totalWithdraws={totalWithdraws} 
              usersInfo={usersInfo} 
              contract1={contract1} 
              contract2={contract2} 
              contract1_addr={contract1_addr} 
              contract2_addr={contract2_addr}
            />
            <HowToStart 
              currentTime={currentTime} 
              signer={signer} 
              address={address} 
              balanceOf={balanceOf} 
              allowance={allowance} 
              getBalance={getBalance} 
              totalDeposits={totalDeposits} 
              totalWithdraws={totalWithdraws} 
              usersInfo={usersInfo} 
              contract1={contract1} 
              contract2={contract2} 
              contract1_addr={contract1_addr} 
              contract2_addr={contract2_addr}
            />
          </>)
        }
      </div>
    </>
  );
}

export default Home;
