function shuffle(array) {
    if([...array].length < 1) return [];
    let shuffledArray = [...array].sort(() => Math.random() - 0.5)
    return shuffledArray;
}

function isMatch(slotID,cardID) {
    const uidExchange = ['z','o','o','v','u']
    if(uidExchange[slotID-1] === uidExchange[cardID-1]) return true;
    return false
}

export {shuffle, isMatch};