import { getProvider } from "../../utils/getProvider";
import idl from '../idl.json';
import { Program } from '@project-serum/anchor';
import { getGifList } from "./getGifList";

export const upvoteGif = async (programID, baseAccount, setGifList, id) => {
  try {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    console.log("GifID >>>", id);

    await program.rpc.upvoteGif(id, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    });
    await getGifList(programID, baseAccount, setGifList, id);
  } catch (error) {
    console.log('Error Upvoting GifID: ', id, error);
  }
};