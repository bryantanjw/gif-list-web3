import { useState } from "react";
/*
* This function holds the logic for deciding if a Phantom Wallet is
* connected or not
*/

export const CheckIfWalletIsConnected = async (setWalletAddress) => {
    // State
    // const [setWalletAddress] = useState(null);

    try {
        const { solana } = window;

        if (solana) {
            if (solana.isPhantom) {
                console.log('Phantom wallet found!');

                /*
                * The solana object gives us a function that will allow us to connect
                * directly with the user's wallet!
                */
                const response = await solana.connect({ onlyIfTrusted: true });
                console.log(
                'Connected with Public Key:',
                response.publicKey.toString()
                );

                /*
                * Set the user's publicKey in state to be used later!
                */
                setWalletAddress(response.publicKey.toString());
                return response.publicKey.toString()
            }
        } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
        }
    } catch (error) {
        console.error(error);
    }
};