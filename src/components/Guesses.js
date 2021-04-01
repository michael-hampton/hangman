import react from 'react'

const Guesses = (props) => {
return (
    <div className="wrong-letters-container">
        <div>
            {props.wrongLetters.length > 0 && <p>Wrong</p>}
            {props.wrongLetters.map((letter, index) => <span key={index}>{letter}</span>)
                .reduce((previous, current) => previous === null ? [current] : [previous, ', ', current], null)}
        </div>
    </div>
)
}

export default Guesses