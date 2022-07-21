import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { Link } from '@reach/router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import Popover from '@mui/material/Popover';
// import LogoAnim from './Logo';
import { connectWallet, disconnect } from "../../core/web3";
import * as selectors from '../../store/selectors';
import { config } from "../../core/config";
import { isMdScreen } from "../utils";

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);

const Header = function ({ showMenu = false }) {
  const userWalletState = useSelector(selectors.userWallet);
  const web3 = useSelector(selectors.web3State);
  const pending = useSelector(selectors.loadingState);
  const chainId = useSelector(selectors.authChainID);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onConnect = async () => {
    await connectWallet();
  }

  const onDisconnect = async () => {
    await disconnect();
  }

  useEffect(() => {
    if (web3 !== null && chainId !== '' && web3.utils.toHex(chainId) !== web3.utils.toHex(config.chainId)) {
      toast.error('Please change the network to BSC mainnet!');
    }
  }, [web3, chainId]);

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (!isMdScreen()) {
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
          totop.classList.add("show");

        } else {
          header.classList.remove("sticky");
          totop.classList.remove("show");
        } if (window.pageYOffset > sticky) {
        }
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header id="myHeader" className='navbar white'>
      <div className='container'>
        <div className='logo'>
          <div className='navbar-title navbar-item'>
            <NavLink to="/">
              <h2 className="logo-icon">BONSAI COIN</h2>
            </NavLink>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3">
          {showMenu && (
            <>
              <BreakpointProvider>
                <Breakpoint l down>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    disableScrollLock={true}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}>
                    <div className='navbar-item'>
                      <NavLink to="/" onClick={handleClose}>
                        Home
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/presale" onClick={handleClose}>
                        PRESALE
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/swap" onClick={handleClose}>
                        SWAP
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/" onClick={handleClose}>
                        NFTs
                      </NavLink>
                    </div>
                  </Popover>
                </Breakpoint>

                <Breakpoint xl>
                  <div className='menu'>
                    <div className='navbar-item'>
                      <NavLink to="/">
                        Home
                        <span className='lines'></span>
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/presale">
                        PRESALE
                        <span className='lines'></span>
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/swap">
                        SWAP
                        <span className='lines'></span>
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/">
                        NFTs
                        <span className='lines'></span>
                      </NavLink>
                    </div>
                  </div>
                </Breakpoint>
              </BreakpointProvider>
            </>
          )}

          <div className='mainside d-flex align-items-center'>
            {web3 !== null && chainId !== '' && web3.utils.toHex(chainId) !== web3.utils.toHex(config.chainId) ? (
              <div className='connect-wal'>
                <button className="btn-main text-error" onClick={onConnect}>Switch Network</button>
              </div>
            ) : (chainId === '' || userWalletState === '' || userWalletState === 0 ? (
              <div className='connect-wal'>
                <button className='btn-main' onClick={onConnect}>Connect</button>
              </div>
            ) : (
              <>
                {
                  pending ? (
                    <div className='connect-wal'>
                      <div className="flex gap-1 align-items-center" >
                        <ReactLoading type={'spin'} width="25px" height="25px" color="#fff" />
                        <span className="text-gray">Pending...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div className="flex flex-column">
                        <div className="connect-wal flex-column">
                          <div className="flex">
                            <span className="text-black">{userWalletState && (userWalletState.slice(0, 4) + "..." + userWalletState.slice(38))}</span>
                          </div>
                          <button className="btn-disconnect fs-12" onClick={onDisconnect}>Disconnect</button>
                        </div>
                      </div>
                    </div>
                  )}
              </>
            ))}
          </div>
        </div>

        <button className="nav-icon" onClick={handleClick}>
          <div className="menu-line text-black"></div>
          <div className="menu-line1 text-black"></div>
          <div className="menu-line2 text-black"></div>
        </button>

      </div>
    </header>
  );
}
export default Header;