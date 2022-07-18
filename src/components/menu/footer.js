import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .footer-img {
    position: absolute;
    bottom: 0;
  }
  .single-line {
    width: 100%;
    height: 1px;
    background: #919191;
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;
const footer = () => (
  <footer className="footer-light p-0">
    <GlobalStyles />
    <div className="container">
      <div className='footer-box'>
        <div className='row'>
          <div className='col-md-5 relative'>
            <img className='footer-img' src="/img/plant.png" alt=""></img>
          </div>
          <div className='col-md-7'>
            <div className='footer-content'>
              <span>Ready to be part of bonsai?</span>
              <h2 className='text-black m-0'>Let's see if Bonsai is</h2>
              <h2 className='text-black m-0'>right for you</h2>
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