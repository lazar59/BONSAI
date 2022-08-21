import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { createGlobalStyle } from 'styled-components';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Reveal from 'react-awesome-reveal';
import "react-circular-progressbar/dist/styles.css";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import MainHeader from '../components/menu/MainHeader';
import Sidebar from '../components/App/Sidebar';
import Clock from '../components/Presale/Clock';
import * as selectors from '../store/selectors';
import { fadeIn, fadeInUp, getUTCNow, getUTCDate, numberWithCommas, isEmpty } from '../components/utils';
import { depositBNB, getFounderInfo, getInitialBNB, getTotalPresaleAmount, connectWallet } from '../core/web3';
import { getBNBPrice } from '../core/axios';
import { showLoader, hideLoader } from "../store/actions";
import { def_config } from '../core/config';

const GlobalStyles = createGlobalStyle`
  .ico-container {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    color: black;
    padding-top: 100px;
    position: relative;
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
      .nfts-banner-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
      }
    }
    @media only screen and (max-width: 1400px) {
      flex-direction: column;
    }
    @media only screen and (max-width: 768px) {
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
    padding: 20px;
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
      width: 170px;
    }
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
    font-size: 18px !important;
    line-height: 2 !important;

    &.Mui-disabled {
      background-image: none;
      background: #626262b3 !important;
    }
  }

  .MuiLoadingButton-loading {
    padding-right: 40px !important;
    background: linear-gradient(90deg, #aa2d78 -3.88%, #a657ae 100%) !important;
    color: rgb(255 255 255 / 50%) !important;
    transition: all 0.5s ease !important;
  }
  .swal2-popup {
    border-radius: 20px;
  }
  .swal2-styled.swal2-confirm {
    padding-left: 2rem;
    padding-right: 2rem;
    background-color: #96BF49 !important;
  }
  .backdrop-loading {
  }
  
  .presale-input {
    align-items: end;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
    }
  }

  .presale__card {
    height: 100%;
    border: 2px solid #96BF49;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 17%);
    border-radius: 45px;
    padding: 20px;
  }

  .deposit__item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    border: 2px solid #96BF49;
    border-radius: 45px;
    padding: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.17);
  }

  .btn-deposit {
    min-width: 180px !important;
  }

  .banner-shape {
    position: absolute;
    right: 0px;
    top: 160px;
    z-index: -1;
    width: 300px;
    img {
      width: 100%;
    }
    @media only screen and (max-width: 992px) {
      width: 150px;
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

const BONSAIICO = (props) => {
  const slickRef = useRef(null);
  const balance = useSelector(selectors.userBalance);
  const wallet = useSelector(selectors.userWallet);
  const web3 = useSelector(selectors.web3State);
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const START_DATE = def_config.START_TIME;
  const END_DATE = def_config.START_TIME + def_config.PRESALE_PERIOD * 3600 * 24;
  const DEF_SLIDES = ["1", "2", "3", "4", "5"];
  const [slides, setSlides] = useState(["1", "2", "3", "4", "5"]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [bnbPrice, setBNBPrice] = useState(0);
  const [bnbAmount, setBNBAmount] = useState(0);
  const [bnbBalance, setBNBBalance] = useState(0);
  const [presaleAmount, setPresaleAmount] = useState(0);
  const [amountPercent, setAmountPercent] = useState(0);
  const [capPercent, setCapPercent] = useState(0);
  const [nftPrice, setNFTPrice] = useState(0);
  const [userCap, setUserCap] = useState(0);
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();

  const initialize = useCallback(async () => {
    if (!web3) {
      return;
    }
    if (START_DATE * 1000 > getUTCNow()) {
      setEndTime(START_DATE);
    } else {
      setStartTime(START_DATE);
      setEndTime(END_DATE);
    }
    let result = await getBNBPrice();
    if (result.success) {
      setBNBPrice(result.price);
    }
    result = await getInitialBNB();
    if (result.success) {
      setNFTPrice(result.minCap);
      setBNBAmount(result.minCap);
    }
    result = await getTotalPresaleAmount();
    if (result.success) {
      const percent = (Number(result.presaleAmount) * 100) / def_config.MAX_PRESALE_AMOUNT;
      setPresaleAmount(Number(result.presaleAmount));
      setAmountPercent(percent);
    }
  }, [web3, START_DATE, END_DATE]);

  const fetchFounderInfo = useCallback(async () => {
    console.log('[Wallet] = ', wallet);
    if (isEmpty(wallet)) {
      return;
    }
    setBNBBalance(balance.BNBBalance);
    if (nftPrice <= 0) return;
    const result = await getFounderInfo();
    if (result.success) {
      const percent = (Number(result.amountBNB) * 100) / Number(nftPrice * 5);
      setCapPercent(percent);
      setUserCap(result.amountBNB);
      const temp_slides = DEF_SLIDES;
      const numberOfFNFT = result.numberOfFNFT;
      console.log('[NumberOfNFT] = ', numberOfFNFT);
      temp_slides.splice(5 - numberOfFNFT, numberOfFNFT);
      setSlides(temp_slides);
    }
  }, [balance.BNBBalance, nftPrice, wallet]);

  const fetchBNBPrice = async () => {
    const result = await getBNBPrice();
    if (result.success) {
      setBNBPrice(result.price);
    }
  }

  useEffect(() => {
    initialize();
    fetchFounderInfo();
    const timerId = setInterval(() => fetchBNBPrice(), 2 * 60 * 1000);
    return () => {
      clearInterval(timerId);
    }
  }, [fetchFounderInfo, initialize]);

  const handleSlide = (currentSlide) => {
    const amount = nftPrice * (currentSlide + 1);
    setBNBAmount(amount);
  }

  const validate = useCallback(() => {
    if (isEmpty(bnbAmount) || Number(bnbAmount) === 0) {
      toast.error("Please enter a valid amount for purchase.");
      return;
    }
    if (Number(bnbBalance) < Number(bnbAmount)) {
      toast.error("You have insufficient amount to deposit.");
      return false;
    }
    if (Number(START_DATE) * 1000 > getUTCNow()) {
      toast.error("Presale has not started yet.");
      return false;
    } else if (Number(END_DATE) * 1000 < getUTCNow()) {
      toast.error("Presale has ended.");
      return false;
    }
    return true;
  }, [bnbAmount, bnbBalance, START_DATE, END_DATE]);

  const handleBuy = useCallback(async () => {
    if (isEmpty(wallet)) {
      await connectWallet();
      return;
    }
    if (!validate()) return;
    dispatch(showLoader());
    setPending(true);
    try {
      const result = await depositBNB(bnbAmount);
      if (result.success) {
        initialize();
        fetchFounderInfo();
        Swal.fire({
          icon: 'success',
          title: ' Success',
          text: 'Successfully deposited for presale.'
        });
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(hideLoader());
      setPending(false);
    }
  }, [bnbAmount, dispatch, fetchFounderInfo, initialize, validate, wallet]);

  return (
    <>
      <MainHeader showMenu={false} />
      <div className='container text-center ico-container relative'>
        <Sidebar />
        <GlobalStyles />
        <div className='ico-header'>
          <img className='nfts-banner-img' src="./img/line-bg-2.png" alt=""></img>
          <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
            <p className='ico-title'>WELCOME TO OUR<br />PRESALE</p>
          </Reveal>
        </div>
        {(
          <>
            <Reveal className='presale-content onStep' keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
              <div className='presale-inner py-4'>
                <div className="row text-center">
                  <div className='col-md-12 align-self-center'>
                    {(END_DATE * 1000 < getUTCNow()) && (
                      <h3 className='fs-24 uppercase color'>PRESALE HAS ENDED!</h3>
                    )}
                    {START_DATE * 1000 > getUTCNow() && (
                      <h3 className='fs-24 uppercase color'>PRESALE WILL BE STARTED SOON!</h3>
                    )}
                    {START_DATE * 1000 < getUTCNow() && END_DATE * 1000 > getUTCNow() && (
                      <h3 className='fs-24 uppercase color'>TIME REMAINING TO PARTICIPATE IN PRESALE</h3>
                    )}
                  </div>
                  <div className="col-md-12 align-self-center">
                    <Clock
                      startTime={startTime * 1000}
                      deadline={endTime * 1000}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal className='banner-shape onStep' keyframes={fadeIn} delay={500} duration={2000} triggerOnce>
              <img src="/img/shape-right.png" alt=""></img>
            </Reveal>
            <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
              <div className='row my-5 gap-4 gap-md-0 w-100'>
                <div className='col-md-7 col-sm-12 align-items-stretch'>
                  <div className='flex flex-column h-100 gap-3'>
                    <div className='presale__card py-5'>
                      <div className='fs-20 fs-sm-16 color_more'>
                        <span className="color">Presale Term  {isMobile ? <br /> : '-'} <strong className="color_more">{getUTCDate(START_DATE)} ~ {getUTCDate(END_DATE)}</strong></span><br />
                        <span className="color">(We reach our goal of {isMobile ? <br /> : ''} <strong className="color_more">${numberWithCommas(def_config.MAX_PRESALE_AMOUNT)}</strong>)</span><br />
                        <span className="color">Our minimum limit will be {isMobile ? <br /> : ''} <strong className='color_more'>{nftPrice} BNB</strong> {isMobile ? <br /> : ''} and a max of {isMobile ? <br /> : ''} <strong className='color_more'>{nftPrice * 5} BNB</strong></span><br />
                      </div>
                    </div>
                    <div className='presale__card'>
                      <div className="row justify-center">
                        <div className="col-md-6 col-sm-6 mt-1">
                          <div className="amount_bar px-3">
                            <span className='fs-20 fs-sm-16 color_more font-bold'>Presale Amount Received</span>
                            <div className='progress-bg m-auto mt-3'>
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
                            <span className='fs-20 fs-sm-16 color_more font-bold'>Your Hard Cap Amount</span>
                            <div className='progress-bg m-auto mt-3'>
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
                          <p className='fs-20 fs-sm-16 mb-1 color_more'>Presale Amount Received {isMobile ? <br /> : ':'} <strong className='bright-green'>${numberWithCommas(Number(presaleAmount) * Number(bnbPrice))} ({numberWithCommas(presaleAmount)} BNB)</strong></p>
                          <p className='fs-20 fs-sm-16 mb-1 color_more'>User Amount Deposited {isMobile ? <br /> : ':'} <strong className='bright-green'>${numberWithCommas(Number(userCap) * Number(bnbPrice))} ({numberWithCommas(userCap)} BNB)</strong></p>
                          <p className='fs-20 fs-sm-16 mb-1 color_more'>Maximum Presale Amount Allocated {isMobile ? <br /> : ':'} <strong className='bright-green'>${numberWithCommas(nftPrice * 5 * bnbPrice)} ({nftPrice * 5} BNB)</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-5 col-sm-12 align-items-stretch'>
                  <div className='presale__card'>
                    <div className="flex h-100 flex-column justify-between gap-1">
                      <p className='fs-20 fs-sm-16 px-md-5'>Please select the FNFT amount you'd like to deposit</p>
                      <div className="deposit__item">
                        <img
                          loading="lazy"
                          width="50"
                          src={'/img/icons/bnb.png'}
                          alt={'BNB'}
                        />
                        <div className='flex flex-column'>
                          <span className='fs-22 fs-sm-20'>BNB Price</span>
                          <span className='fs-20 fs-sm-18 font-bold bright-green'>${numberWithCommas(bnbPrice)}</span>
                        </div>
                      </div>
                      <div className='presale-input flex justify-center flex-column'>
                        <div className="nft_counter mb-1">
                          <Slider
                            centerMode={true}
                            swipe={false}
                            focusOnSelect={false}
                            infinite={false}
                            ref={slickRef}
                            slidesToShow={1}
                            slidesToScroll={1}
                            vertical={true}
                            afterChange={(value) => handleSlide(value)}
                          >
                            {slides.map((slide) => (
                              <div key={slide} className="counter_num">
                                {slide}
                              </div>
                            ))}
                          </Slider>
                        </div>
                      </div>
                      <div className="deposit__item">
                        <img
                          loading="lazy"
                          width="50"
                          src={'/img/icons/nft.png'}
                          alt={'NFT'}
                        />
                        <div className='flex flex-column'>
                          <span className='fs-22 fs-sm-20'>FNFT Price</span>
                          <span className='fs-20 fs-sm-18 font-bold bright-green'>{numberWithCommas(nftPrice)} BNB</span>
                        </div>
                      </div>
                      <div className='flex flex-column justify-center gap-2 py-3'>
                        <span className='fs-20 fs-sm-16'>Amount: <strong>${numberWithCommas(Number(bnbPrice) * Number(bnbAmount))} ({bnbAmount} BNB)</strong></span>
                        <span className='fs-20 fs-sm-16'>Balance: <strong>{numberWithCommas(bnbBalance)} BNB</strong></span>
                      </div>
                      <LoadingButton
                        onClick={handleBuy}
                        endIcon={<></>}
                        loading={pending}
                        loadingPosition="end"
                        variant="contained"
                        className="btn-main m-auto btn-deposit"
                        disabled={!(START_DATE * 1000 < getUTCNow() && END_DATE * 1000 > getUTCNow())}
                      >
                        {isEmpty(wallet) ? 'CONNECT' : 'DEPOSIT'}
                      </LoadingButton>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </>
        )}
      </div >
    </>
  );
};

export default BONSAIICO;