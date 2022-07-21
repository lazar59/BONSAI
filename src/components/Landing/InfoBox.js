import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Reveal from 'react-awesome-reveal';
import { fadeInUp } from '../utils';

const GlobalStyles = createGlobalStyle`
  .info-card:hover {
    .info-img-1 {
      background: url("/img/info/icon_1_.png") no-repeat;
    }
    .info-img-2 {
      background: url("/img/info/icon_2_.png") no-repeat;
    }
    .info-img-3 {
      background: url("/img/info/icon_3_.png") no-repeat;
    }
    .info-img-4 {
      background: url("/img/info/icon_4_.png") no-repeat;
    }
    .info-img-5 {
      background: url("/img/info/icon_5_.png") no-repeat;
    }
  }
  .info-img-preload-1 {
    width: 0;
    background: url("/img/info/icon_1_.png") no-repeat;    
  }
  .info-img-preload-2 {
    width: 0;
    background: url("/img/info/icon_2_.png") no-repeat;
  }
  .info-img-preload-3 {
    width: 0;
    background: url("/img/info/icon_3_.png") no-repeat;
  }
  .info-img-preload-4 {
    width: 0;
    background: url("/img/info/icon_4_.png") no-repeat;
  }
  .info-img-preload-5 {
    width: 0;
    background: url("/img/info/icon_5_.png") no-repeat;
  }
  .info-img-card {
    width: 80px;
    height: 80px;
    margin: auto;
    .info-img {
      width: 100%;
      height: 100%;
    }
  }
  .info-img-1 {
    display: inline-block;
    background: url("/img/info/icon_1.png") no-repeat;
  }
  .info-img-2 {
    display: inline-block;
    background: url("/img/info/icon_2.png") no-repeat;
  }
  .info-img-3 {
    display: inline-block;
    background: url("/img/info/icon_3.png") no-repeat;
  }
  .info-img-4 {
    display: inline-block;
    background: url("/img/info/icon_4.png") no-repeat;
  }
  .info-img-5 {
    display: inline-block;
    background: url("/img/info/icon_5.png") no-repeat;
  }
`;
const infobox = () => (
  <div className='container'>
    <GlobalStyles />
    <div className='info-content'>
      <div className='info-card'>
        <div className='info-img-card'>
          <div className='info-img info-img-1'></div>
          <div className='info-img-preload-1'></div>
        </div>
        <span>marketing and continuing the development of new products</span>
      </div>
      <div className='info-card'>
        <div className='info-img-card'>
          <div className='info-img info-img-2'></div>
          <div className='info-img-preload-2'></div>
        </div>
        <span>we will pick one random winner each that has purchased 100 coins</span>
      </div>
      <div className='info-card'>
        <div className='info-img-card'>
          <div className='info-img info-img-3'></div>
          <div className='info-img-preload-3'></div>
        </div>
        <span>Burning Bonsai weekly</span>
      </div>
      <div className='info-card'>
        <div className='info-img-card'>
          <div className='info-img info-img-4'></div>
          <div className='info-img-preload-4'></div>
        </div>
        <span>Each week all funds will be converted to BUSD</span>
      </div>
      <div className='info-card'>
        <div className='info-img-card'>
          <div className='info-img info-img-5'></div>
          <div className='info-img-preload-5'></div>
        </div>
        <span>Burning coins of different project</span>
      </div>
    </div>
  </div >
);
export default infobox;