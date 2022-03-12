import { createGifAccount } from "./createGifAccount";
import { sendGif } from "./sendGif";
import { upvoteGif } from "./upvoteGif";


// const upvote = async (id) => {
//     console.log('Upvoting GifID: ', id);
//     upvoteGif(id);
// };

export const RenderConnectedContainer = ({
    inputValue,
    setInputValue,
    gifList,
    setGifList,
    programID,
    baseAccount,
}) => {

    // If we hit this, it means the program account hasn't been initialized.
    if (gifList === null) {
        return (
        <div className="connected-container">
            <button className="cta-button submit-gif-button" onClick={() => createGifAccount(programID, baseAccount, setGifList)}>
            Do One-Time Initialization For GIF Program Account
            </button>
        </div>
        )
    } 
    // Otherwise, we're good! Account exists. User can submit GIFs.
    else {
        return(
        <div className="connected-container">
            <form
            onSubmit={(event) => {
                event.preventDefault();
                sendGif(inputValue.value, gifList, setGifList, setInputValue, programID, baseAccount);
            }}
            >
            <input
                type="text"
                placeholder="Enter gif link!"
                value={inputValue.value || ""}
                onChange={(event) => {
                    setInputValue({ value: event.target.value })
                }}
            />
            <button type="submit" className="cta-button submit-gif-button">
                Submit
            </button>
            </form>
            <div className="gif-grid">
                {/* We use index as the key instead, also, the src is now item.gifLink */}
                {gifList.map((item, index) => (
                    <div className="gif-item" key={index}>
                        <img src={item.gifLink} alt={item.gifLink}/>
                        <button 
                            type="submit" 
                            className="cta-button upvote-gif-button"
                            data={item.id}
                            onClick={() => upvoteGif(programID, baseAccount, setGifList, item.id)}
                        >
                        {item.votes.toString()} 👍
                        </button>
                    </div>
                ))}
            </div>
        </div>
        )
    }
};