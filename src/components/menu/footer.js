import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Reveal from 'react-awesome-reveal';
import { fadeInUp } from '../utils';

const GlobalStyles = createGlobalStyle`
  .footer-img {
    position: absolute;
    bottom: 0;
    z-index: -1;
  }
  .single-line {
    width: 100%;
    height: 1px;
    background: #919191;
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;
const footer = ({ title = false }) => (
  <footer className="footer-light p-0">
    <GlobalStyles />
    <div className="container">
      <div className='footer-box'>
        <div className='row'>
          <Reveal keyframes={fadeInUp} className='col-md-5 onStep relative' delay={300} duration={600} triggerOnce style={{ zIndex: '-1'}}>
            <img className='footer-img' src="/img/plant.png" alt=""></img>
          </Reveal>
          <div className='col-md-7'>
            <div className='footer-content'>
              {title && (
                <Reveal keyframes={fadeInUp} className='onStep' delay={800} duration={600} triggerOnce>
                  <span>Ready to be part of bonsai?</span>
                  <h2 className='text-black m-0'>Let's see if Bonsai is</h2>
                  <h2 className='text-black m-0'>right for you</h2>
                </Reveal>
              )}
              <div className='single-line' />
              <span className='bold color'>Follow us on:</span>
              <div className='flex flex-row gap-3'>
                <a href="#" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" target="_blank" rel="noreferrer"><i className="fa-brands fa-discord"></i></a>
                <a href="#" target="_blank" rel="noreferrer"><i className="fa-brands fa-telegram"></i></a>
              </div>
              <div className='w-100 text-right'>
                <span className='text-black'>&copy; Copyright 2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default footer;