import react from 'react'

const Popup = (props) => {
    let finalMessage = ''
    let finalMessageRevealWord = ''
    let playable = true

    if(props.win === 'win') {
        finalMessage = 'Congratulations! You Won'
        playable = false
    } else if (props.attempts === 0) {
        finalMessage = 'Unfortuantely you lose'
        finalMessageRevealWord = `the word was ${props.selectedWord}`
        playable = false
    }

    // if(playable === false) {
    //     props.setPlayable(playable)
    // }

    return (
        <div className="popup-container" style={{display: 'flex'}}>
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{finalMessageRevealWord}</h3>
                <button onClick={props.playAgain}>Play Again</button>
            </div>
        </div>)
}

export default Popup