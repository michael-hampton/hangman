import react from 'react'

const DifficultySelector = (props) => {

    return (
        <div className="popup-container" style={{display: 'flex'}}>
            <div className="popup">
                <h2>Select Level</h2>
                <span className="difficulty-level" data-level="easy" onClick={props.onClick}>Easy</span>
                <span className="difficulty-level" data-level="medium" onClick={props.onClick}>Medium</span>
                <span className="difficulty-level" data-level="hard" onClick={props.onClick}>Hard</span>
            </div>
        </div>)
}

export default DifficultySelector