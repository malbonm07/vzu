function shuffle(array) {
    if([...array].length < 1) return [];
    let shuffledArray = [...array].sort(() => Math.random() - 0.5)
    return shuffledArray;
}

function isMatch(slotID,cardID) {
    const matchsDictionary = {
        1: 'z',
        2: 'o',
        3: 'o',
        4: 'v',
        5: 'u',
    }
    if(matchsDictionary[slotID] === matchsDictionary[cardID]) return true;
    return false
}

export {shuffle, isMatch};