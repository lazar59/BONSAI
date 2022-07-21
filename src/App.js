import './App.css';
import { useState, useEffect } from 'react';
import { Router, Location, Redirect, useLocation } from '@reach/router';
import ScrollToTopBtn from './components/menu/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './routes/Home';
import Presale from './routes/Presale';
import Swap from './routes/Swap';
import AdminICO from './routes/Admin/AdminICO';
import { loadWeb3 } from './core/web3';

export const ScrollTop = ({ children, location }) => {
  useEffect(() => window.scrollTo(0, 0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

const path_list = ['', 'dashboard', 'account', 'swap', 'presale', 'control/admin'];

function App() {
  const [navSelected, setNavSelected] = useState('');
  const location = useLocation();

  useEffect(() => {
    let path_name = location.pathname.replace('/', '');
    if (!path_list.includes(path_name))
      path_name = '';
    setNavSelected(path_name);
  }, [location]);

  useEffect(() => {
    const reloadWeb3 = async () => {
      await loadWeb3();
    }
    reloadWeb3();
  }, []);

  return (
    <div className='app-container relative min-h-screen md:flex'>
      {/* THIS IS OUR CONTENT PAGE */}
      <div
        className={`flex-1 text-white min-h-screen flex-col overflow-hidden ${navSelected !== '' ? '' : ''}`}

      >
        <PosedRouter>
          <ScrollTop path="/">
            <Home exact path="/" onSelected={setNavSelected}>
              <Redirect to="/" />
            </Home>
            <Presale path="presale" />
            <Swap path="swap" />
            <AdminICO path="control/admin" />
          </ScrollTop>
        </PosedRouter>
      </div>
      <ScrollToTopBtn />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
