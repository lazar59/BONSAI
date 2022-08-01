import { useState, useEffect } from 'react';
import { Link, useLocation } from '@reach/router';
import { useMediaQuery } from 'react-responsive';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .my-navbar {
    position: absolute;
    width: 70px;
    height: auto;
    top: 0;
    left: 0;
    opacity: 1;
    background: #96BF49;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
    overflow-x: hidden;
    .logo-img {
      min-width: 290px;
      min-height: 130px;
    }
  }
  .navbar-content {
    width: 70px;
  }
`;

const path_list = ['', 'swap', 'presale', 'nfts', 'control/admin'];

const Sidebar = (props) => {
  const [navSelected, setNavSelected] = useState('');
  const isMobile = useMediaQuery({ maxWidth: '1024px' });
  const location = useLocation();

  useEffect(() => {
    let path_name = location.pathname.replace('/', '');
    if (!path_list.includes(path_name))
      path_name = '';
    setNavSelected(path_name);
  }, [location]);

  return (
    <>
      <GlobalStyles />
      <div
        className={`my-navbar flex-col justify-center z-50 ${(isMobile && !props.isOpen) && 'hide-nav'} ${isMobile ? 'mobile my-border-color border-end border-2' : 'non-mobile'}`}
      >
        <div className="navbar-content">
          <nav>
            <div className='blank-menu-item' />
            <div className='menu-line' />
            <Link
              to='/'
              className={`menu-item ${navSelected === ''
                ? 'menu-active-item transition duration-200'
                : 'transition duration-200'
                }`}
            >
              <div className='flex justify-center align-items-center'>
                <i className="fa-solid fa-house-chimney fs-20"></i>
              </div>
            </Link>
            <Link
              to='/presale'
              className={`menu-item ${navSelected === 'presale'
                ? 'menu-active-item transition duration-200'
                : 'transition duration-200'
                }`}
            >
              <div className='flex justify-center align-items-center'>
                <i className="fa-solid fa-rocket-launch fs-20"></i>
              </div>
            </Link>
            <Link
              to='/swap'
              className={`menu-item ${navSelected === 'swap'
                ? 'menu-active-item transition duration-200'
                : 'transition duration-200'
                }`}
            >
              <div className='flex justify-center align-items-center'>
                <i className="fa-solid fa-shuffle fs-20"></i>
              </div>
            </Link>
            <Link
              to='/nfts'
              className={`menu-item ${navSelected === 'nfts'
                ? 'menu-active-item transition duration-200'
                : 'transition duration-200'
                }`}
            >
              <div className='flex justify-center align-items-center'>
                <i className="fa-solid fa-sun-plant-wilt fs-20"></i>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
