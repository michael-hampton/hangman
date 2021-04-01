import React from 'react'

const AttemptsLeft = (props) => {
    return (
        <div className="AttemptsLeft">
        <span>Retries left: <span className="AttemptsLeft-Number">
            {props.attempts}
          </span>
        </span>
        </div>
    );
}

export default AttemptsLeft