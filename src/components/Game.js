import React, { Component } from 'react'
import Hangman from "./Hangman";
import Guesses from "./Guesses";
import Word from "./Word";
import { checkWin, findWord, showNotification } from './helpers/_helpers'
import Notification from "./Notification";
import Popup from "./Popup";
import Keyboard from "./Keyboard";
import AttemptsLeft from "./AttemptsLeft";
import { countries, words } from "../random";

export default class Game extends Component {
    constructor ( props ) {
        super ( props );

        //this.words = words
        this.country_json = countries

        this.settings = {
            easy: {
                min: 5,
                max: 8
            },

            medium: {
                min: 8,
                max: 10
            },

            hard: {
                min: 10,
                max: 12
            }
        }

        this.state = {
            correctLetters: [],
            wrongLetters: [],
            chosenWords: [],
            //selectedWord: this.countries[ 5 ][ Math.floor ( Math.random () * this.countries[ 5 ].length ) ].answer.toLowerCase(),
            //selectedClue: this.countries[ 5 ][ Math.floor ( Math.random () * this.countries[ 5 ].length ) ].clue,
            playable: true,
            show_error: false,
            win: null,
            attempts: 6,
            difficulty: null,
            show_hint: false,
        }
    }

    componentDidMount () {
        window.addEventListener ( 'keydown', this.handleKeypress );
    }

    componentWillUnmount () {
        window.removeEventListener ( 'keydown', this.handleKeypress );
    }

    handleClick = ( event ) => {
        const letter = event.toLowerCase ()
        this.checkLetter ( letter )
    }

    checkLetter = ( letter ) => {
        let { selectedWord, correctLetters, wrongLetters, attempts, show_hint } = this.state

        if ( selectedWord.includes ( letter ) ) {
            if ( !correctLetters.includes ( letter ) ) {
                const correct = [...correctLetters]
                correct.push ( letter )
                const win = checkWin ( correct, wrongLetters, selectedWord, show_hint )
                const playable = win !== 'win' && win !== 'lose'

                this.setState ( { correctLetters: correct, win: win, playable: playable } )
            } else {
                showNotification ( ( e ) => {
                    this.setState ( { show_error: !this.state.show_error } )
                } )
            }
        } else {
            if ( !wrongLetters.includes ( letter ) ) {
                const wrong = [...wrongLetters]
                wrong.push ( letter )
                const win = checkWin ( correctLetters, wrong, selectedWord, show_hint )
                const playable = win !== 'win' && win !== 'lose'

                this.setState ( { wrongLetters: wrong, win: win, attempts: attempts - 1, playable: playable } )
            } else {
                showNotification ( ( e ) => {
                    this.setState ( { show_error: !this.state.show_error } )
                } )
            }
        }
    }

    showHint = () => {
        this.setState({ attempts: this.state.attempts - 2, show_hint: true })
    }

    reset = (difficulty) => {
        const level = this.matchDifficultyToLength ( difficulty )
        
        const setting = this.settings[difficulty]

        // countries of a certain length are chosen depending on level of difficulty (easy, medium, hard)
        const countries = this.country_json.filter(country => {
            return country.name.length >= setting.min && country.name.length <= setting.max
        })

        console.log('countries', countries)

        // get random country from filtered list that hasnt been used
        const wordObject = findWord(countries, this.state.chosenWords)

        // get hint
        const selectedClue = difficulty === 'easy' ? wordObject.iso : wordObject.iso3

        // get country name
        const country_name = wordObject.name.toLowerCase()

        // add new country to chosen array so it doesnt get shown again
        const chosen = this.state.chosenWords
        chosen.push(country_name)

        // get letters to reveal
        const correctLetters = []

        const wordsArray = country_name.split('')

        correctLetters.push(wordsArray[2], wordsArray[4])

        if(country_name.length >= 8) {
            correctLetters.push(wordsArray[8])
        }

        this.setState ( {
            difficulty: difficulty,
            playable: true,
            correctLetters: correctLetters,
            wrongLetters: [],
            selectedWord: country_name,
            selectedClue: selectedClue,
            chosenWords: chosen,
            win: null,
            attempts: 6,
            show_hint: false,
        } )
    }

    playAgain = () => {
        this.reset(this.state.difficulty)
    }

    changeDifficulty = ( event ) => {
        const difficulty = event.target.dataset.level

        this.reset(difficulty)

    }

    matchDifficultyToLength = ( difficulty ) => {

        switch ( difficulty ) {
            case 'easy':
                return 5

            case 'medium':
                return 8

            case 'hard':
                return 10
            default:
                return 5
        }
    }

    handleKeypress = ( event ) => {
        const { key, keyCode } = event
        const { playable } = this.state

        if ( playable && keyCode >= 65 && keyCode <= 90 ) {
            const letter = key.toLowerCase ()

            this.checkLetter ( letter )

        }
    }

    render () {
        const { correctLetters, selectedWord, selectedClue, wrongLetters, show_error, win, attempts, difficulty, show_hint } = this.state
        const show_popup = win === 'win' || (win === 'lose' && attempts === 0)

        const difficultySelector = <div>
            <span className="difficulty-level" data-level="easy" onClick={this.changeDifficulty}>Easy</span>
            <span className="difficulty-level" data-level="medium" onClick={this.changeDifficulty}>Medium</span>
            <span className="difficulty-level" data-level="hard" onClick={this.changeDifficulty}>Hard</span>
        </div>

        return difficulty === null ? difficultySelector : <div style={{ width: '100%' }}>
            <div style={{ width: '30%', float: 'left' }}>{difficultySelector}</div>
            <div style={{ width: '50%', float: 'left' }}>
                <div className="game-container">
                    <h2>{difficulty}</h2>
                    <Hangman attempts={attempts} wrongLetters={wrongLetters}/>
                    <Guesses wrongLetters={wrongLetters}/>
                    <AttemptsLeft attempts={attempts}/>
                </div>
                <Word attempts={attempts} showHint={this.showHint} display_hint={show_hint} selectedWord={selectedWord} selectedClue={selectedClue} correctLetters={correctLetters}/>

                <Keyboard onClick={this.handleClick} excluded={wrongLetters}/></div>

            <Notification showNotification={show_error}/>
            {show_popup ? <Popup playAgain={this.playAgain} win={win} attempts={this.state.attempts}
                                 correctLetters={this.state.correctLetters} wrongLetters={this.state.wrongLetters}
                                 selectedWord={this.state.selectedWord} setPlayable={( e ) => {
                this.setState ( { playable: false } )
            }}/> : null}
        </div>

    }
}
