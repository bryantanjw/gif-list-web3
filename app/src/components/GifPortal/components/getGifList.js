import { useState } from 'react';
import idl from '../idl.json';
import { getProvider } from '../../utils/getProvider';
import { Program } from '@project-serum/anchor';

export const getGifList = async(programID, baseAccount, setGifList) => {
  try {
    console.log(">>>>", baseAccount)
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    
    console.log("Got the account", account)
    setGifList(account.gifList
                            .sort((a,b) => (b.votes > a.votes ? 1 : -1)))

  } catch (error) {
    console.log("Error in getGifList: ", error)
    setGifList(null);
  }
};
