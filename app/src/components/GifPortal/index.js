/*
 * We are going to be using the useEffect hook!
 */
import React, { useEffect, useState } from 'react';
import twitterLogo from "../../assets/twitter-logo.svg";
import './styles.css';
import idl from './idl.json';
import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import kp from './keypair.json';
import { CheckIfWalletIsConnected } from '../utils/checkIfWalletIsConnected';
import { getGifList } from './components/getGifList';
import { renderNotConnectedContainer } from '../utils/renderNotConnectedContainer';
import { RenderConnectedContainer } from './components/renderConnectedContainer';

import Header from '../Header';

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the GIF data.
const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Change this up to be your Twitter if you want.
const TWITTER_HANDLE = 'bryantanjw';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
	'https://c.tenor.com/R9SJc2CDhXgAAAAM/taylor-swift.gif',
	'https://media4.giphy.com/media/YJ627bD1Jtl2E/200.gif',
	'https://media4.giphy.com/media/QZaOqI3JOYdnMTupXb/giphy.gif',
	'https://media0.giphy.com/media/3ohBVbUzyTH3sWw1eU/giphy.gif'
]


const GifPortal = () => {

  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState(null);

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
  
  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      getGifList(programID, baseAccount, setGifList)
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <Header />
      {/* This was solely added for some styling fanciness */}
			<div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 Solana GIF Portal (Taylor's Version)</p>
          <p className="sub-text">
            View the Taylor Swift GIF collection in the metaverse ✨
          </p>
          {/* Add the condition to show this only if we don't have a wallet address */}
          {!walletAddress && renderNotConnectedContainer(setWalletAddress)}
          {/* We just need to add the inverse here! */}
          {walletAddress && <RenderConnectedContainer inputValue={inputValue} setInputValue={setInputValue} gifList={gifList} setGifList={setGifList} programID={programID} baseAccount={baseAccount} />}
        </div>
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

export default GifPortal;