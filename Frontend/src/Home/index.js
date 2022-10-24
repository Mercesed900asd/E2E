import React, {useEffect, useState} from "react";
import '../Style/style.css';
import EnrolToEarn from './EnrolToEarn.js';
import HowToStart from './HowToStart.js';
import BasicInfo from './BasicInfo.js';
import OtherInfo from './OtherInfo.js';


function Home({signer, address, loadWeb3Modal, usdtBalanceOf, usdtAllowance, e2eBalanceOf, e2eAllowance, getCurrentTime, totalInfo, totalRaffleUsers, depositAddrs, getBalance, totalDeposits, totalWithdraws, usersInfo, contract1, contract2, contract3, contract4, contract1_addr, contract2_addr, contract3_addr, contract4_addr}) {

  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
          setCurrentTime(new Date().getTime());
      }, 60000)

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
              usdtBalanceOf={usdtBalanceOf} 
              usdtAllowance={usdtAllowance} 
              e2eBalanceOf={e2eBalanceOf} 
              e2eAllowance={e2eAllowance} 
              totalInfo={totalInfo} 
              totalRaffleUsers={totalRaffleUsers} 
              depositAddrs={depositAddrs} 
              getBalance={getBalance} 
              totalDeposits={totalDeposits} 
              totalWithdraws={totalWithdraws} 
              usersInfo={usersInfo} 
              contract1={contract1} 
              contract2={contract2} 
              contract3={contract3} 
              contract4={contract4} 
              contract1_addr={contract1_addr} 
              contract2_addr={contract2_addr} 
              contract3_addr={contract3_addr} 
              contract4_addr={contract4_addr} 
            />
            <OtherInfo 
              currentTime={currentTime} 
              signer={signer} 
              address={address} 
              usdtBalanceOf={usdtBalanceOf} 
              usdtAllowance={usdtAllowance} 
              e2eBalanceOf={e2eBalanceOf} 
              e2eAllowance={e2eAllowance} 
              totalInfo={totalInfo} 
              totalRaffleUsers={totalRaffleUsers} 
              depositAddrs={depositAddrs} 
              getBalance={getBalance} 
              totalDeposits={totalDeposits} 
              totalWithdraws={totalWithdraws} 
              usersInfo={usersInfo} 
              contract1={contract1} 
              contract2={contract2} 
              contract3={contract3} 
              contract4={contract4} 
              contract1_addr={contract1_addr} 
              contract2_addr={contract2_addr} 
              contract3_addr={contract3_addr} 
              contract4_addr={contract4_addr} 
            />
          </>) : (
          <>
            <EnrolToEarn 
              currentTime={currentTime} 
              signer={signer} 
              address={address} 
              loadWeb3Modal={loadWeb3Modal} 
              usdtBalanceOf={usdtBalanceOf} 
              usdtAllowance={usdtAllowance} 
              e2eBalanceOf={e2eBalanceOf} 
              e2eAllowance={e2eAllowance} 
              getBalance={getBalance} 
              totalDeposits={totalDeposits} 
              totalWithdraws={totalWithdraws} 
              usersInfo={usersInfo} 
              contract1={contract1} 
              contract2={contract2} 
              contract3={contract3} 
              contract4={contract4} 
              contract1_addr={contract1_addr} 
              contract2_addr={contract2_addr} 
              contract3_addr={contract3_addr} 
              contract4_addr={contract4_addr} 
            />
            <HowToStart 
              currentTime={currentTime} 
              signer={signer} 
              address={address} 
              loadWeb3Modal={loadWeb3Modal} 
              usdtBalanceOf={usdtBalanceOf} 
              usdtAllowance={usdtAllowance} 
              e2eBalanceOf={e2eBalanceOf} 
              e2eAllowance={e2eAllowance} 
              getBalance={getBalance} 
              totalDeposits={totalDeposits} 
              totalWithdraws={totalWithdraws} 
              usersInfo={usersInfo} 
              contract1={contract1} 
              contract2={contract2} 
              contract3={contract3} 
              contract4={contract4} 
              contract1_addr={contract1_addr} 
              contract2_addr={contract2_addr} 
              contract3_addr={contract3_addr} 
              contract4_addr={contract4_addr} 
            />
          </>)
        }
      </div>
    </>
  );
}

export default Home;
