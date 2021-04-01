import react from 'react'
import LetterBlock from "./LetterBlock";
import LettersRow from "./LettersRow";

const RowRenderer = ( props) => {
    const children = props.letters
        .filter(letter => props.excluded.indexOf(letter) === -1)
        .map(letter => (
            <LetterBlock
                value={letter}
                onClick={props.onClick.bind(null, letter)}
                key={`LetterBlock-${letter}`}
            />
        ));

    return (
        <LettersRow>
            {children}
        </LettersRow>
    );
}

export default RowRenderer