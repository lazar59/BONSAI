import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import Reveal from 'react-awesome-reveal';
import "react-circular-progressbar/dist/styles.css";

import MainHeader from '../components/menu/MainHeader';
import BlankBox from '../components/Landing/BlankBox';
import Footer from '../components/menu/footer';
import Sidebar from '../components/App/Sidebar';
import { fadeInUp } from '../components/utils';

const GlobalStyles = createGlobalStyle`
  .nfts-container {
    position: relative;
    padding: 20px;
    padding-top: 100px;
  }

  .nfts-header {
    padding: 20px;
    margin-left: 80px;
    color: black;
    min-height: 500px;
    .nfts-title {
      font-size: 46px;
      font-family: "PoetsenOne";
    }
    .nfts-desc {
      width: 100%;
      font-size: 20px;
    }
    .nfts-banner-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: -1;
    }
    @media only screen and (max-width: 991px) {
      margin: 0px;
      min-height: 400px;
    }
    @media only screen and (max-width: 767px) {
      min-height: 600px;
    }
  }
  .banner_image {
    position: relative;
    height: 100%;
    img {
      position: absolute;
    }
    .banner-img-1 {
      left: 0;
      top: 0;
      width: 400px;
    }
    .banner-img-2 {
      right: 0;
      top: 170px;
      width: 300px;
    }
    @media only screen and (max-width: 991px) {
      .banner-img-1 {
        width: 300px;
      }
      .banner-img-2 {
        width: 200px;
      }
    }
  }
  .nfts-content {
    .nfts-content-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .nfts-content-title {
        font-size: 46px;
        font-family: "PoetsenOne";
        color: black;
        text-align: left;
      }
    }
    .nfts-content-body {
      min-height: 500px;
      display: grid;
      grid-template-columns: repeat(3, 30%);
      justify-content: space-between;
      padding: 50px 0;
      row-gap: 20px;
      @media only screen and (max-width: 1199px) {
        grid-template-columns: repeat(2, 49%);
      }
      @media only screen and (max-width: 767px) {
        grid-template-columns: repeat(1, 100%);
      }
      .nfts-card {
        background: #101C0A;
        border: 1px solid #C7F373;
        box-shadow: 0px 9px 20px #96BF49;
        border-radius: 30px;
        padding: 20px;
      }
      .nfts-card-header {
        display: flex;
        gap: 10px;
        background: #FFFFFF;
        box-shadow: 0px 1px 2px #96BF49;
        border-radius: 20px;
        color: black;
        padding: 15px 20px;
      }
      .nfts-card-body-title {
        display: flex;
        justify-content: space-between;
        align-items: end;
        margin-top: 20px;
      }
      .nfts-card-content {
        display: grid;
        grid-template-columns: repeat(2, 49%);
        justify-content: space-between;
        padding: 10px;
        row-gap: 5px;
        @media only screen and (max-width: 1399px) {
          grid-template-columns: repeat(1, 100%);
        }
        @media only screen and (max-width: 1199px) {
          grid-template-columns: repeat(2, 49%);
        }
        @media only screen and (max-width: 991px) {
          grid-template-columns: repeat(1, 100%);
        }
        @media only screen and (max-width: 767px) {
          grid-template-columns: repeat(2, 49%);
        }
        @media only screen and (max-width: 399px) {
          grid-template-columns: repeat(1, 100%);
        }
        .nfts-item {
          display: flex;
          flex-direction: row;
          background: #101C0A;
          height: 75px;
          border: 1px solid #C7F373;
          border-radius: 20px;
          align-items: end;
          text-align: left;
          padding: 5px 0px;
        }
      }
    }
  }
`;

const NFTs = (props) => {
  return (
    <>
      <MainHeader showMenu={false} />
      <div className='container text-center nfts-container relative'>
        <Sidebar />
        <GlobalStyles />
        <div className='nfts-header'>
          <img className='nfts-banner-img' src="./img/line-bg-2.png" alt=""></img>
          <div className='row'>
            <div className="col-md-6 text-left">
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={800} triggerOnce cascade>
                <p className='nfts-title'>BONSAI NFT</p>
                <span className="nfts-desc">Bonsai NFT which will help people to save the environment,  charity for planting trees, cleaning, ocean trash etc.  </span>
              </Reveal>
            </div>
            <div className='col-md-6'>
              <div className='banner_image'>
                <Reveal className='onStep' keyframes={fadeInUp} delay={400} duration={800} triggerOnce cascade>
                  <img src="./img/nfts/nft_1.png" alt="" className='banner-img-1' />
                  <img src="./img/nfts/nft_2.png" alt="" className='banner-img-2' />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
        <div className='nfts-content'>
          <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={1000} triggerOnce cascade>
            <div className='nfts-content-header'>
              <span className='nfts-content-title fs-sm-36'>BONSAI NFT<br />OWNERS</span>
              <div className='self-end'>
                <button className='btn-main'>BUY & SELL</button>
              </div>
            </div>
            <div className='nfts-content-body'>
              <div className='nfts-card'>
                <div className='nfts-card-header'>
                  <img src="./img/nfts/avatar.png" alt="" className="nfts-card-avatar"></img>
                  <div className='flex flex-column'>
                    <span>VANNE GRAPHICS</span>
                    <span>ID: 12ASDJKLXN...</span>
                  </div>
                </div>
                <div className='nfts-card-body'>
                  <div className='nfts-card-body-title'>
                    <span className='fs-30 f-poetsen'>NFTs</span>
                    <span>Total: 100/10000NFTs</span>
                  </div>
                  <Scrollbars style={{ height: '260px', background: '#EFFFD2', border: '1px solid #96BF49', boxShadow: '0px 4px 12px #96BF49', borderRadius: '20px' }}>
                    <div className='nfts-card-content'>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                    </div>
                  </Scrollbars>
                </div>
              </div>
              <div className='nfts-card'>
                <div className='nfts-card-header'>
                  <img src="./img/nfts/avatar.png" alt="" className="nfts-card-avatar"></img>
                  <div className='flex flex-column'>
                    <span>VANNE GRAPHICS</span>
                    <span>ID: 12ASDJKLXN...</span>
                  </div>
                </div>
                <div className='nfts-card-body'>
                  <div className='nfts-card-body-title'>
                    <span className='fs-30 f-poetsen'>NFTs</span>
                    <span>Total: 100/10000NFTs</span>
                  </div>
                  <Scrollbars style={{ height: '260px', background: '#EFFFD2', border: '1px solid #96BF49', boxShadow: '0px 4px 12px #96BF49', borderRadius: '20px' }}>
                    <div className='nfts-card-content'>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                    </div>
                  </Scrollbars>
                </div>
              </div>
              <div className='nfts-card'>
                <div className='nfts-card-header'>
                  <img src="./img/nfts/avatar.png" alt="" className="nfts-card-avatar"></img>
                  <div className='flex flex-column'>
                    <span>VANNE GRAPHICS</span>
                    <span>ID: 12ASDJKLXN...</span>
                  </div>
                </div>
                <div className='nfts-card-body'>
                  <div className='nfts-card-body-title'>
                    <span className='fs-30 f-poetsen'>NFTs</span>
                    <span>Total: 100/10000NFTs</span>
                  </div>
                  <Scrollbars autoHide style={{ height: '260px', background: '#EFFFD2', border: '1px solid #96BF49', boxShadow: '0px 4px 12px #96BF49', borderRadius: '20px' }}>
                    <div className='nfts-card-content'>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                      <div className='nfts-item'>
                        <img src="./img/nfts/item.png" alt="" className='nfts-item-img'></img>
                        <div className='flex flex-column'>
                          <span className='fs-18'>BONSAI</span>
                          <span className='fs-16'>$166.7</span>
                        </div>
                      </div>
                    </div>
                  </Scrollbars>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div >
      <section className='blank-container p-0'>
        <BlankBox />
      </section>
      <section className='p-0'>
        <Footer />
      </section>
    </>
  );
};

export default NFTs;