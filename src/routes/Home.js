import React from 'react';
import MainHeader from '../components/menu/MainHeader';
import SliderMain from '../components/Landing/SliderMain';
import InfoBox from '../components/Landing/InfoBox';
import BlankBox from '../components/Landing/BlankBox';
import Footer from '../components/menu/footer';

const Home = (props) => {
  return (
    <div className='home'>
      <MainHeader showMenu={true} />
      <section className="jumbotron no-bg home-box">
        <SliderMain />
      </section>

      <section className='info-container'>
        <InfoBox />
      </section>

      <section className='blank-container p-0'>
        <BlankBox />
      </section>

      <section className='p-0'>
        <Footer />
      </section>
    </div >
  )
};
export default Home;