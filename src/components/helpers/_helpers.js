export function showNotification ( setter ) {
    setter ( true )
    setTimeout ( () => {
        setter ( false )
    }, 2000 )
}

export function checkWin ( correct, wrong, word ) {

    let status = 'win'

    word.split ( '' ).forEach ( letter => {
        if ( !correct.includes ( letter ) && letter !== '-' ) {
            status = ''
        }
    } )

    if ( wrong.length === 6 ) {
        status = 'lose'
    }

    return status
}

export function findWord ( words, chosenWords ) {
    let found = false
    let selectedWord = null

    if ( words.length === chosenWords.length ) {
        chosenWords = []
        console.warn ( 'resetting' )
    }

    do {
        const random = Math.floor ( Math.random () * words.length )
        selectedWord = words[ random ]

        found = !chosenWords.length || !chosenWords.includes ( selectedWord.answer.toLowerCase () )

    } while ( found === false )

    return selectedWord
}