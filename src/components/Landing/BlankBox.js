import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Reveal from 'react-awesome-reveal';
import "react-circular-progressbar/dist/styles.css";
import { fadeIn } from '../../components/utils';

const GlobalStyles = createGlobalStyle`
  .blank-box {
    position: relative;
    height: 400px;
  }
  .line-bg {
    position: absolute;
    top: -200px;
    width: 100%;
    height: 600px;
    background: url("/img/line-bg.png") no-repeat;
    background-size: 100% 100%;
    z-index: -1;
  }
  .shape-bg {
    position: absolute;
    top: -150px;
    right: 0;
    width: 300px;
    z-index: -1;
    img {
      width: 100%;
    }
    @media only screen and (max-width: 992px) {
      width: 150px;
      top: -70px;
    }
  }
`;
const blankbox = () => (
  <div className='container blank-box'>
    <GlobalStyles />
    <div className='line-bg'></div>
    <Reveal className='shape-bg onStep' keyframes={fadeIn} delay={300} duration={2000} triggerOnce>
      <img src="/img/shape-right.png" alt=""></img>
    </Reveal>
  </div >
);
export default blankbox;