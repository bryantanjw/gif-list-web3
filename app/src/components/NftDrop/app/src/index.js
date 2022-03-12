import React, { useEffect, useState } from 'react';
import './styles.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';
import { CheckIfWalletIsConnected } from '../../../utils/checkIfWalletIsConnected';
import { renderNotConnectedContainer } from '../../../utils/renderNotConnectedContainer';
import Header from '../../../Header';

// Constants
const TWITTER_HANDLE = 'bryantanjw';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const NftDrop = () => {

  // State
  const [walletAddress, setWalletAddress] = useState(null);

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await CheckIfWalletIsConnected(setWalletAddress);
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="header-container">
          <p className="header header-nft">🍭 Generative NFTs of Taylor Swift Album Covers</p>
          <p className="sub-text">This is a collection of 10 NFTs. Each NFT is a combination of a circle
          and a triangle with a Taylor Swift album cover as the background.</p>
          {!walletAddress && renderNotConnectedContainer(setWalletAddress)}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default NftDrop;
