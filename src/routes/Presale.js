import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useMediaQuery } from 'react-responsive';
import Reveal from 'react-awesome-reveal';
import "react-circular-progressbar/dist/styles.css";
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import MainHeader from '../components/menu/MainHeader';
import Sidebar from '../components/App/Sidebar';
import Clock from '../components/Presale/Clock';
import SelectCoin from '../components/Presale/SelectCoin';
import * as selectors from '../store/selectors';
import { fadeIn, fadeInUp, getUTCNow, getUTCDate, numberWithCommas, LoadingSkeleton, isEmpty } from '../components/utils';
import {
  getTotalPresaleAmount,
  getMaxPresaleCap,
  getMinPresaleCap,
  getpTokenPriceForUSDC,
  getAVAXForUSDC,
  getUSDCForAVAX,
  getUserPaidUSDC,
  getStartPresaleTime,
  getEndPresaleTime,
  buy_pToken
} from '../core/web3';
import { config, def_config } from '../core/config';
import Swal from 'sweetalert2';

const GlobalStyles = createGlobalStyle`
  .ico-container {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    color: black;
    padding-top: 100px;
    .ico-header {
      max-width: 900px;
      padding: 20px;
      margin: auto;
      .ico-title {
        font-size: 46px;
        font-family: "PoetsenOne";
        text-align: center;
      }
      .ico-desc {
        font-size: 20px;
      }
    }
    @media only screen and (max-width: 1400px) {
      flex-direction: column;
    }
    @media only screen and (max-width: 1199px) {
      padding-top: 0px;
    }
    @media only screen and (max-width: 768px) {
      padding: 10px;
      .ico-header {
        padding: 20px;
        .ico-title {
          font-size: 28px;
        }
        .ico-desc {
          font-size: 18px;
        }
      }
    }
    @media only screen and (max-width: 576px) {
      .ico-header {
        .ico-title {
          font-size: 24px;
        }
        .ico-desc {
          font-size: 16px;
        }
      }
    }
  }

  .input-token-panel {
    display: flex;
    background-color: transparent;
    flex-direction: column;
    text-align: left;
    gap: 10px;
    width: 45%;
    .input-box {
      position: relative;
      border: solid 1px #44BF01;
      border-radius: 100px;
      @media only screen and (max-width: 576px) {
        span {
          font-size: 15px !important;
        }
      }
      &.style-2 {
        border: none;
        background: linear-gradient(#FF4336, #FDC800);
        padding: 1px;
        .input-box-inner {
          background: #262e50;
          border-radius: 100px;
        }
      }
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
    .token-bg {
      position: absolute;
      width: 140px;
      height: 100%;
      right: 0;
      background: rgba(229, 229, 229, 0.5);
      border-radius: 0px 100px 100px 150px;
      z-index: 1;
      &.style-2 {
        background: linear-gradient(180deg, rgba(255, 67, 54, 0.5) 0%, rgba(254, 198, 1, 0.5) 100%);
        border-radius: 150px 100px 100px 0px;
      }
    }
  }

  .input-token {
    width: 50%;
    background: transparent;
    outline: none;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #44BF01;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    span {
      font-size: 18px;
      font-weight: normal;
    }
  }

  .email_input {
    max-width: 300px;
  }

  .presale-content {
    width: 900px;
    padding: 0;
    @media only screen and (max-width: 1200px) {
      width: 800px;
    }
    @media only screen and (max-width: 1024px) {
      width: 100%;
    }
  }

  .presale-inner {
    border-radius: 12px;
    padding: 40px;
    position: relative;
    color: black;
    h3 {
      line-height: 2;
      margin-bottom: 0;
    }
    @media only screen and (max-width: 1024px) {
      padding: 60px 40px 40px;
    }
    @media only screen and (max-width: 768px) {
      padding: 0px 10px 40px;
    }
  }

  .presale-bg {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 76px;
  }

  .presale-back, .buy-back {
    border: 2px solid #96BF49;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.17);
    border-radius: 46px;
    padding: 20px;
  }

  .end-content {
    background: #2d81e2;
    padding: 16px;
    border-radius: 40px;
    width: 80%;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .buy_content {
    color: #395B2F;
  }

  .progress-bg {
    @media only screen and (max-width: 576px) {
      width: 60%;
    }
  }

  .inverstors {
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
  }

  .amount_bar_text {
    display: flex;
    justify-content: space-between;
  }

  .progress {
    height: 1.5rem;
    background-color: #a9a9a9;
  }

  .progress-bar {
    background-color: #7621ff;
  }

  .MuiLoadingButton-root {
    transition: all 0.5s ease;
    
    &.Mui-disabled {
      background-image: none;
      background: #626262b3 !important;
    }
  }

  .MuiLoadingButton-loading {
    padding-right: 40px;
    background: linear-gradient(90deg, #aa2d78 -3.88%, #a657ae 100%);
    color: rgb(255 255 255 / 50%) !important;
    transition: all 0.5s ease;
  }
  .swal2-popup {
    border-radius: 20px;
    background: #2f2179;
    color: white;
  }
  .swal2-styled.swal2-confirm {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .backdrop-loading {
  }
  
  .btn-change {
    width: 40px;
    height: 40px;
    background-color: #8b86a4 !important;
    border-radius: 50%;
    margin-bottom: 8px !important;
    color: white !important;
    &:hover {
      background-color: #8b86a4 !important;
    }
  }

  .presale-input {
    align-items: end;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
    }
  }
`;


function CapBackGradientSVG() {
  const gradientTransform = `rotate(0)`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={"capBack"} gradientTransform={gradientTransform}>
          <stop offset="0%" stopColor="rgba(236, 0, 140, 0.5)" />
          <stop offset="90%" stopColor="rgba(252, 103, 103, 0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CapGradientSVG() {
  const gradientTransform = `rotate(0)`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={"cap"} gradientTransform={gradientTransform}>
          <stop offset="0%" stopColor="#EC008C" />
          <stop offset="100%" stopColor="#FC6767" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AmountBackGradientSVG() {
  const gradientTransform = `rotate(0)`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={"amountBack"} gradientTransform={gradientTransform}>
          <stop offset="0%" stopColor="rgba(155, 198, 182, 0)" />
          <stop offset="100%" stopColor="rgba(255, 247, 48, 0.5)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AmountGradientSVG() {
  const gradientTransform = `rotate(0)`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={"amount"} gradientTransform={gradientTransform}>
          <stop offset="0%" stopColor="#90B579" />
          <stop offset="80%" stopColor="#11861C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const MagicICO = (props) => {
  const LAUNCH_DATE = 1651795235;
  const max_token_amount = def_config.MAX_PRESALE_AMOUNT;
  const balance = useSelector(selectors.userBalance);
  const wallet = useSelector(selectors.userWallet);
  const web3 = useSelector(selectors.web3State);
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const [amountPercent, setAmountPercent] = useState(0);
  const [curPresale, setCurPresale] = useState('');
  const [capPercent, setCapPercent] = useState('');
  const [usdcPrice, setUsdcPrice] = useState('');
  const [maxCap, setMaxCap] = useState(0); // USDC
  const [minCap, setMinCap] = useState(0); // USDC
  const [maxTotalCap, setMaxTotalCap] = useState(''); // USDC
  const [leftCap, setLeftCap] = useState('');
  const [paidUSDC, setPaidUSDC] = useState(0); // USDC
  const [pMagicAmount, setPMagicAmount] = useState(0);
  const [toAvaxPrice, setToAVAXPrice] = useState(0);
  const [maxAvaxCap, setMaxAvaxCap] = useState('');
  const [coinType, setCoinType] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [startLine, setStartLine] = useState(0);
  const [deadLine, setDeadLine] = useState(0);
  const [startPresale, setStartPresale] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);

  const [tokenAmountA, setTokenAmountA] = useState('');
  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);
  const [ended, setEnded] = useState(false);

  const initialize = useCallback(async () => {
    console.log('[Wallet] = ', wallet);
    if (!web3) {
      return;
    }
    setLoading(true);
    let tempUsdcPrice = 0;
    let totalMaxCap = 0;
    let tempPaidUSDC = 0;
    let tempCurPresale = 0;
    let tempLeftCap = 0;

    let start_time = 0;
    let end_time = 0;
    let result = await getStartPresaleTime();
    if (result.success) {
      start_time = Number(result.start_time);
      setStartTime(start_time);
      if (start_time * 1000 > getUTCNow()) {
        setStartLine(LAUNCH_DATE);
        setDeadLine(start_time);
      } else {
        setStartLine(start_time);
      }
    } else {
      return;
    }
    result = await getEndPresaleTime();
    if (result.success) {
      end_time = Number(result.end_time);
      setEndTime(end_time);
      if (end_time * 1000 > getUTCNow() && start_time * 1000 < getUTCNow()) {
        setDeadLine(end_time);
      }
    }

    result = await getpTokenPriceForUSDC();
    if (result.success) {
      setUsdcPrice(result.usdcPrice);
      tempUsdcPrice = Number(result.usdcPrice);
    }
    result = await getTotalPresaleAmount();
    if (result.success) {
      const percent = ((max_token_amount - Number(result.presaleAmount)) * 100) / max_token_amount;
      console.log('[Amount Percent] = ', percent);
      setAmountPercent(percent);
      tempCurPresale = (max_token_amount - Number(result.presaleAmount)) * tempUsdcPrice;
      setCurPresale(tempCurPresale);
      tempLeftCap = max_token_amount * tempUsdcPrice - tempCurPresale;
      setLeftCap(tempLeftCap);
    }
    result = await getUserPaidUSDC();
    if (result.success) {
      tempPaidUSDC = Number(result.paidUSDC);
      setPaidUSDC(tempPaidUSDC);
    }

    result = await getMaxPresaleCap();
    if (result.success) {
      totalMaxCap = Number(result.maxCap);
      setMaxTotalCap(totalMaxCap);
      const percent = (Number(tempPaidUSDC) * 100) / totalMaxCap;
      setCapPercent(percent);
      if (percent >= 0) {
        let tempMaxCap = totalMaxCap - tempPaidUSDC;
        if (tempMaxCap < 1) {
          tempMaxCap = 0;
          setCapPercent(100);
        }

        if (tempLeftCap < tempMaxCap) {
          tempMaxCap = tempLeftCap;
        }
        if (tempMaxCap < 1) {
          tempLeftCap = 0;
          setLeftCap(tempLeftCap);
        }

        setMaxCap(tempMaxCap);
        if (tempMaxCap > 0) {
          result = await getAVAXForUSDC(tempMaxCap);
          if (result.success) {
            setMaxAvaxCap(Number(result.value))
          }
        } else {
          setMaxAvaxCap(0)
        }
      }
    }

    if (start_time > 0 && start_time * 1000 > getUTCNow()) {
      setStartPresale(false);
    } else if (start_time > 0 && end_time > 0 && start_time * 1000 < getUTCNow() && end_time * 1000 > getUTCNow()) {
      setStartPresale(true);
    }

    // Condition - how much did the user pay and check the left max cap
    if (totalMaxCap <= tempPaidUSDC || tempLeftCap <= 0) {
      setLoading(false);
      return;
    }
    result = await getMinPresaleCap();
    if (result.success) {
      let resMinCap = Number(result.minCap);
      setMinCap(resMinCap);
    }
    setLoading(false);
  }, [web3, max_token_amount, wallet]);

  const handleSelectCoin = async (value) => {
    setCoinType(value);

    const fromToken = Number(tokenAmountA);
    if (fromToken === 0) {
      return;
    }
    if (value === 0) {
      const result = await getUSDCForAVAX(fromToken);
      if (result.success) {
        setToAVAXPrice(result.value);
        setPMagicAmount(Number(result.value) / usdcPrice);
      }
    } else {
      setPMagicAmount(fromToken / usdcPrice);
    }
  }

  const handleChange = async (event) => {
    const value = Number(event.target.value);
    setTokenAmountA(event.target.value);
    if (value === 0) {
      setPMagicAmount(0);
      setToAVAXPrice(0);
      return;
    }
    if (coinType === 0) {
      const result = await getUSDCForAVAX(value);
      if (result.success) {
        setToAVAXPrice(result.value);
        setPMagicAmount(Number(result.value) / usdcPrice);
      }
    } else {
      setPMagicAmount(value / usdcPrice);
    }
  }

  const validate = () => {
    if (isEmpty(tokenAmountA) || Number(tokenAmountA) === 0) {
      toast.error("Please enter a valid amount for purchase.");
      return;
    }
    const purchasePrice = (Number(pMagicAmount) + Number(balance.magicBalance)) * Number(usdcPrice);
    if (purchasePrice < Number(minCap)) {
      toast.error('Please enter a valid amount for purchase. The minimum amount you can buy is $200 and the maximum is $3,000 during Presale.');
      return;
    }

    if (purchasePrice > Number(maxCap)) {
      toast.error('Please enter a valid amount for purchase. The minimum amount you can buy is $200 and the maximum is $3,000 during Presale.');
      return;
    }

    if ((coinType === 0 && Number(balance.avaxBalance) < Number(tokenAmountA)) || (coinType === 1 && Number(balance.usdcBalance) < Number(tokenAmountA))) {
      toast.error("You have insufficient amount to buy BONSAI.");
      return false;
    }
    if (Number(startTime) * 1000 > getUTCNow()) {
      toast.error("Presale has not started yet.");
      return false;
    } else if (Number(endTime) * 1000 < getUTCNow()) {
      toast.error("Presale has ended.");
      return false;
    }
    return true;
  }

  const handleMax = async () => {
    const value = coinType === 0 ? Number(balance.avaxBalance) : Number(balance.usdcBalance);
    setTokenAmountA(value);
    if (value === 0) {
      setPMagicAmount(0);
      setToAVAXPrice(0);
      return;
    }
    if (coinType === 0) {
      const result = await getUSDCForAVAX(value);
      if (result.success) {
        setToAVAXPrice(result.value);
        setPMagicAmount(Number(result.value) / usdcPrice);
      }
    } else {
      setPMagicAmount(value / usdcPrice);
    }
  }

  const handleBuy = async () => {
    if (!validate()) return;
    setPending(true);
    try {
      const coinAmount = tokenAmountA;
      const result = await buy_pToken(coinAmount, pMagicAmount, coinType);
      if (result.success) {
        initialize();
        Swal.fire({
          icon: 'success',
          title: ' Success',
          text: 'You have bought BONSAI for presale successfully.'
        });
      } else {
        toast.error("Transaction has been failed. " + result.error);
      }
    } catch (error) {
      toast.error("Transaction has been failed. " + error);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const checkCoinType = async () => {
      if (coinType === 0) {
        setFromBalance(balance.avaxBalance);
      } else {
        setFromBalance(balance.usdcBalance);
      }
      setToBalance(balance.magicBalance);
    }
    checkCoinType();
  }, [balance, coinType]);

  // useEffect(() => {
  //   const myBalance = coinType === 0 ? Number(balance.avaxBalance) : Number(balance.usdcBalance);
  //   if (isEmpty(tokenAmountA) || Number(tokenAmountA) <= 0 || Number(tokenAmountA) > Number(myBalance)) {
  //     setDisabled(true);
  //   } else {
  //     setDisabled(false);
  //   }
  // }, [coinType, tokenAmountA]);

  useEffect(() => {
    const checkEndPresale = async () => {
      const result = await getEndPresaleTime();
      if (result.success) {
        setEndTime(result.end_time);
      }
    }
    if (ended) {
      checkEndPresale();
    }
  }, [ended]);

  const addTokenCallback = useCallback(async () => {
    const tokenAddress = config.MagicAddress;
    const tokenSymbol = 'BONSAI';
    const tokenDecimals = 18;
    const tokenImage = `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${config.MagicAddress}/logo.png`;

    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log('Adding BONSAI token');
      } else {
        console.log('BONSAI token has been added to you wallet!')
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <>
      <MainHeader showMenu={false} />
      <div className='container text-center ico-container relative'>
        <Sidebar />
        <GlobalStyles />
        <div className='ico-header'>
          <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
            <p className='ico-title'>WELCOME TO OUR<br />PRESALE</p>
          </Reveal>
        </div>
        {(
          <>
            <Reveal className='presale-content onStep' keyframes={fadeIn} delay={800} duration={800} triggerOnce>
              <div className='presale-inner py-4'>
                <div className="row text-center">
                  <div className='col-md-12 align-self-center'>
                    {(leftCap === 0 || (endTime > 0 && endTime * 1000 < getUTCNow())) && (
                      <h3 className='fs-24 uppercase color'>Presale has ended!</h3>
                    )}
                    {leftCap > 0 && startTime > 0 && startTime * 1000 > getUTCNow() && (
                      <h3 className='fs-24 uppercase color'>Presale will be started soon!</h3>
                    )}
                    {leftCap > 0 && startTime > 0 && endTime > 0 && startTime * 1000 < getUTCNow() && endTime * 1000 > getUTCNow() && (
                      <h3 className='fs-24 uppercase color'>TIME REMAINING TO PARTICIPATE IN PRESALE</h3>
                    )}
                  </div>
                  <div className="col-md-12 align-self-center">
                    <Clock
                      startTime={startLine * 1000}
                      deadline={deadLine * 1000}
                      startPresale={startPresale}
                      setEnded={(value) => setEnded(value)}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal className='presale-content main mt-3 onStep' keyframes={fadeIn} delay={800} duration={800} triggerOnce>
              <div className='presale-inner py-4'>
                <div className='fs-20 fs-sm-16 color_more'>
                  {/* <span>Presale Term - <strong>{startTime === 0 ? <LoadingSkeleton /> : getUTCDate(startTime)} ~ {endTime === 0 ? <LoadingSkeleton /> : getUTCDate(endTime)}</strong></span><br /> */}
                  <span>Presale Term - <strong>Aug 1st, 12:00 UTC ~ Aug 3rd, 12:00 UTC</strong></span><br />
                  {/* <span>(We reach our goal of <strong>{usdcPrice === '' ? <LoadingSkeleton /> : numberWithCommas(max_token_amount * Number(usdcPrice)) + ' BUSD'}</strong>)</span><br /> */}
                  <span>(We reach our goal of <strong>$100,000</strong>)</span><br />
                  {/* <span>Powered by BNB. You can participate using BNB or BUSD</span><br /> */}
                  <span>Our minimum limit will be <strong>$2,000 </strong> and a max of <strong>$5,000 </strong>.</span><br />
                </div>
              </div>
            </Reveal>
            <Reveal className='presale-content main mt-3 onStep' keyframes={fadeIn} delay={800} duration={800} triggerOnce>
              <div className='presale-inner'>
                <div className="row justify-center presale-back">
                  <div className="col-md-6 col-sm-6 mt-1">
                    <div className="amount_bar px-3">
                      <h3 className='color_more'>Presale Amount received</h3>
                      <div className='progress-bg m-auto'>
                        <AmountBackGradientSVG />
                        <AmountGradientSVG />
                        <CircularProgressbar
                          value={amountPercent}
                          text={`${numberWithCommas(amountPercent, 2)}%`}
                          styles={buildStyles({
                            pathColor: `url(#amount)`,
                            textColor: '#00DB8B',
                            strokeLinecap: "butt",
                            trailColor: `url(#amountBack)`
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 mt-1">
                    <div className="amount_bar px-3">
                      <h3 className='color_more'>Your Hard Cap Amount</h3>
                      <div className='progress-bg m-auto'>
                        <CapBackGradientSVG />
                        <CapGradientSVG />
                        <CircularProgressbar
                          value={capPercent}
                          text={`${numberWithCommas(capPercent, 2)}%`}
                          styles={buildStyles({
                            pathColor: `url(#cap)`,
                            textColor: '#EF1485',
                            strokeLinecap: "butt",
                            trailColor: `url(#capBack)`
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-12 mt-3'>
                    <p className='fs-20 mb-1 color_more'>Presale Amount received <strong className='bright-green'>$12,000</strong></p>
                    <p className='fs-20 mb-1 color_more'>Maximum Presale Amount Allocated <strong className='bright-green'>$100,000</strong></p>
                    <p className='fs-20 mb-1 color_more'>BONSAI Price <strong className='bright-green'>$0.001</strong></p>
                    {/* {isMobile ? (
                    <>
                      <p className='fs-20 mb-1 color_more'>Presale Amount received <br /><strong className='bright-green'>{curPresale === '' ? <LoadingSkeleton /> : '$' + numberWithCommas(curPresale) + ' BUSD'}</strong></p>
                      <p className='fs-20 mb-1 color_more'>Maximum Presale Amount Allocated <br /><strong className='bright-green'>{usdcPrice === '' ? <LoadingSkeleton /> : '$' + numberWithCommas(max_token_amount * Number(usdcPrice)) + ' BUSD'}</strong></p>
                      <p className='fs-20 mb-1 color_more'>BONSAI Price <br /><strong className='bright-green'>{usdcPrice === '' ? <LoadingSkeleton /> : '$' + numberWithCommas(Number(usdcPrice)) + ' BUSD'}</strong></p>
                    </>
                  ) : (
                    <>
                      <p className='fs-20 mb-1 color_more'>Presale Amount received : <strong className='bright-green'>{curPresale === '' ? <LoadingSkeleton /> : '$' + numberWithCommas(curPresale) + ' BUSD'}</strong></p>
                      <p className='fs-20 mb-1 color_more'>Maximum Presale Amount Allocated : <strong className='bright-green'>{usdcPrice === '' ? <LoadingSkeleton /> : '$' + numberWithCommas(max_token_amount * Number(usdcPrice)) + ' BUSD'}</strong></p>
                      <p className='fs-20 mb-1 color_more'>BONSAI Price : <strong className='bright-green'>{usdcPrice === '' ? <LoadingSkeleton /> : '$' + numberWithCommas(Number(usdcPrice)) + ' BUSD'}</strong></p>
                    </>
                  )} */}
                  </div>
                </div>
                <div className='row buy-back mt-5'>
                  {(/*startPresale && */leftCap >= 0) && (
                    <>
                      <div className='col-md-12 mt-3'>
                        <div className='buy_content'>
                          <div className='row'>
                            <div className='col-md-12'>
                              <p className='fs-20'>Please enter the BNB amount you'd like to deposit</p>
                              <div className='presale-input flex justify-center'>
                                <div className="input-token-panel">
                                  <div className="d-flex justify-content-between input-box">
                                    <input type="number" className="input-token" name="input_from" placeholder='0.0' value={tokenAmountA} onChange={handleChange}></input>
                                    <button className='btn-max swap-color' onClick={handleMax}>MAX</button>
                                    <SelectCoin className='select-coin' value={coinType} onChange={handleSelectCoin} />
                                  </div>
                                  <div className='flex justify-center'>
                                    <span className='fs-20'>Balance: {numberWithCommas(Number(fromBalance))}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-12 mt-3'>
                              {/* <p className='fs-20'>BONSAI remaining for your wallet limit: {maxCap === '' || usdcPrice === '' ? <LoadingSkeleton /> : numberWithCommas(maxCap / Number(usdcPrice))}
                                {coinType === 0 ? ` (${numberWithCommas(maxAvaxCap)} BNB)` : ` ($${numberWithCommas(maxCap)} BUSD)`}</p> */}
                              <LoadingButton
                                onClick={handleBuy}
                                endIcon={<></>}
                                loading={pending}
                                loadingPosition="end"
                                variant="contained"
                                className="btn-main m-auto fs-20"
                              >
                                DEPOSIT
                              </LoadingButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          </>
        )}
      </div >
    </>
  );
};

export default MagicICO;    