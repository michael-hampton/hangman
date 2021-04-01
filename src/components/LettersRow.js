import react from 'react'

const LettersRow = ( props) => {
    return (
        <div className="LettersRow">
            {props.children}
        </div>
    );
}

export default LettersRow