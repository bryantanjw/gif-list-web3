import idl from "../idl.json";
import { getProvider } from '../../utils/getProvider';
import { Program } from "@project-serum/anchor";
import { getGifList } from "./getGifList";


export const sendGif = async (
  inputValue,
  gifList,
  setGifList,
  setInputValue,
  programID,
  baseAccount) => {
    if (inputValue.length === 0) {
      console.log("No gif link given!")
      return;
    }
    setInputValue("");
    console.log('Gif link:', inputValue);
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
  
      await program.rpc.addGif(inputValue, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("GIF successfully sent to program", inputValue)
  
      await getGifList(programID, baseAccount, setGifList);
    } catch (error) {
      console.log("Error sending GIF:", error)
    }
};