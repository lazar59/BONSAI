import React, { useCallback, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import Reveal from 'react-awesome-reveal';
import { fadeInUp } from '../utils';
import { FlipDate } from './FlipDate';
import { getUTCNow, getUTCDateTime } from '../utils';
import { def_config } from '../../core/config';

const GlobalStyles = createGlobalStyle`
  .header-logo {
    position: absolute;
    top: 10px;
    left: 0;
    @media only screen and (max-width: 768px) {
      left: 20px;
      img {
        width: 60px;
      }
    }
  }
  .header-app {
    position: absolute;
    top: 40px;
    right: 0;
    @media only screen and (max-width: 768px) {
      right: 20px;
      a {
        padding: 0.6rem 1.3rem !important;
        font-size: 0.9rem !important;
      }
    }
  }
  .btn-purchase {
    @media only screen and (max-width: 768px) {
      right: 20px;
      padding: 0.6rem 1.3rem !important;
      font-size: 0.9rem !important;
    }
  }
  .banner-container {
    z-index: 9;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .banner-full-container {
    width: 100%;
    height: 100%;
  }
  .banner-content {
    z-index: 99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    position: relative;
    padding-left: 120px;
    @media only screen and (max-width: 992px) {
      padding-left: 0;
      text-align: center;
    }
  }
  .banner-logo {
    position: absolute;
    bottom: 10px;
    right: 0;
    width: 550px;
    @media only screen and (max-width: 992px) {
      position: relative;
      width: 400px;
    }
  }
  .banner-title {
    font-family: "PoetsenOne";
    color: black;
  }
  .banner-subtitle {
    font-family: 'Plus Jakarta Sans', sans-serif;
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 24px;
    color: black;
    @media only screen and (max-width: 992px) {
      margin-bottom: 30px;
      font-size: 20px;
    }
  }
  .home-header-btns {
    display: flex;
    justify-content: start;
    gap: 30px;
    @media only screen and (max-width: 1024px) {
      flex-direction: column;
      align-items: center;
    }
  }
  .logo-anim {
    width: 550px;
    position: absolute;
    right: 0;
  }
  .banner-bottom {
    display: flex;
    gap: 20px;
    @media only screen and (max-width: 992px) {
      justify-content: center;
    }
  }
  .banner-shape {
    position: absolute;
    left: -12px;
    bottom: -120px;
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

const Slidermain = () => {
  const [deadLine, setDeadLine] = useState(0);
  const START_DATE = def_config.START_TIME * 1000;
  const END_DATE = (def_config.START_TIME + def_config.PRESALE_PERIOD * 3600 * 24) * 1000;

  const initialize = useCallback(async () => {
    if (START_DATE > getUTCNow()) {
      setDeadLine(START_DATE);
    } else {
      setDeadLine(END_DATE);
    }
  }, [END_DATE, START_DATE]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className='full-container banner-full-container'>
      <div className="container banner-container">
        <GlobalStyles />
        <div className='row full-width'>
          <div className='col-lg-6 col-md-12'>
            <div className='banner-content'>
              <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={1000} triggerOnce>
                <h1 className='banner-title'>BONSAI</h1>
              </Reveal>
              <Reveal keyframes={fadeInUp} className='onStep' delay={300} duration={1000} triggerOnce>
                <span className='banner-subtitle'>A utility token of our  ecosystem which will help people to save the environment,  charity for planting trees, cleaning, ocean trash etc.</span>
              </Reveal>
              <div className="spacer-20"></div>
              {deadLine > 0 && (
                <Reveal keyframes={fadeInUp} className='onStep' delay={600} duration={1000} triggerOnce>
                  <>
                    {START_DATE > getUTCNow() && (
                      <p className='fs-22 fs-sm-20 f-semi-b uppercase color'>Presale will be started soon!</p>
                    )}
                    {START_DATE < getUTCNow() && END_DATE > getUTCNow() && (
                      <p className='fs-22 fs-sm-20 f-semi-b uppercase color'>Presale has started!</p>
                    )}
                    {END_DATE < getUTCNow() && (
                      <p className='fs-22 fs-sm-20 f-semi-b uppercase color'>Presale has ended!</p>
                    )}
                  </>
                </Reveal>
              )}
              {deadLine > 0 && (
                <Reveal keyframes={fadeInUp} className='onStep' delay={900} duration={800} triggerOnce>
                  <FlipDate value={getUTCDateTime(deadLine)} />
                </Reveal>
              )}

              {/* <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="3wRW3t1yQfs" onClose={() => setOpen(false)} /> */}
              <Reveal keyframes={fadeInUp} className='onStep' delay={1200} duration={800} triggerOnce>
                <div className='banner-bottom'>
                  <a href="/whitepaper.pdf" className='btn-main' target="_blank" rel="noreferrer">
                    WHITEPAPER
                  </a>
                </div>
              </Reveal>

              <div className='banner-shape'>
                <img src="/img/shape-left.png" alt=""></img>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-md-12 move-first flex align-items-center justify-center'>
            <img src="/img/banner.png" className="crypto-logo-img" alt="BONSAI" />
          </div>
        </div>
      </div>
    </div>
  )
};
export default Slidermain;