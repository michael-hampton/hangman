import react from 'react'

const Word = (props) => {
    return (
        <div>
            <div className="word">
                {props.selectedWord.split('').map((letter, index) => {
                    return <span className="letter" key={index}>
                    {props.correctLetters.includes(letter) ? letter : ''}
                </span>
                })}
            </div>

            <p>{props.display_hint ? props.selectedClue : <a href="#" onClick={props.showHint}>show hint (you will lose 2 lives) </a>}</p>
        </div>

    )
}

export default Word
