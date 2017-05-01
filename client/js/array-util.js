const getRange = (fromNum, toNum) => {
    return Array.from({length: toNum - fromNum + 1}, (undef, index) => index + fromNum)
}

const getLetterRange = (firstletter = 'A', numLetters) => {
    const rangeStart = firstletter.charCodeAt(0);
    const rangeEnd = rangeStart + numLetters - 1;
    return getRange(rangeStart, rangeEnd)
           .map((char) => String.fromCharCode(char)); 
}

const sumOf = (arr) => {
        return arr.reduce(((total, x) => total+=x),0);
    }

const fishForNumbers = (arr) => {
        return arr.map(x => Number(x))
                  .filter(x => !(isNaN(x)));
    }

module.exports = {
    fishForNumbers: fishForNumbers,
    sumOf: sumOf,
    getRange: getRange,
    getLetterRange: getLetterRange
}