import { connectWallet } from "./connectWallet";
/*
* We want to render this UI when the user hasn't connected
* their wallet to our app yet.
*/
export const renderNotConnectedContainer = (setWalletAddress) => (
  <button
    className="cta-button connect-wallet-button"
    onClick={() => connectWallet(setWalletAddress)}
  >
    Connect to Wallet
  </button>
);