import react from 'react'

const LetterBlock = ( props) => {
    return (
        <div onClick={props.onClick} className="LetterBlock">
        <span>
          {props.value}
        </span>
        </div>
    );
}

export default LetterBlock