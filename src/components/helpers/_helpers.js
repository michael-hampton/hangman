export function showNotification ( setter ) {
    setter ( true )
    setTimeout ( () => {
        setter ( false )
    }, 2000 )
}

export function checkWin ( correct, wrong, word, hint_enabled ) {

    let status = 'win'
    const allowed_count = hint_enabled === true ? 4 : 6

    word.split ( '' ).forEach ( letter => {
        if ( !correct.includes ( letter ) && letter !== ' ' ) {
            status = ''
        }
    } )

    if ( wrong.length === allowed_count ) {
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

        found = !chosenWords.length || !chosenWords.includes ( selectedWord.name.toLowerCase () )

    } while ( found === false )

    return selectedWord
}