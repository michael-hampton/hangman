import react from 'react'
import RowRenderer from "./RowRenderer";

const Keyboard = (props) => {
    return (
        <div style={{marginTop: '20px'}} className="VirtualKeyboard">
            <div key="First" className="VirtualKeyboard-FirstRow">
                {<RowRenderer letters={Keyboard.FIRST_ROW} onClick={props.onClick} excluded={props.excluded} />}
            </div>
            <div key="Second" className="VirtualKeyboard-SecondRow">
                {<RowRenderer letters={Keyboard.SECOND_ROW} onClick={props.onClick} excluded={props.excluded} />}
            </div>
            <div key="Third" className="VirtualKeyboard-ThirdRow">
                {<RowRenderer letters={Keyboard.THIRD_ROW} onClick={props.onClick} excluded={props.excluded} />}
            </div>
        </div>
    );
}

Keyboard.FIRST_ROW = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
Keyboard.SECOND_ROW = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
Keyboard.THIRD_ROW = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

export default Keyboard