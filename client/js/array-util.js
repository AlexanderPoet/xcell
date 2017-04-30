const getRange = (fromNum, toNum) => {
    return Array.from({length: toNum - fromNum + 1}, (undef, index) => index + fromNum)
}

const getLetterRange = (firstletter = 'A', numLetters) => {
    const rangeStart = firstletter.charCodeAt(0);
    const rangeEnd = rangeStart + numLetters - 1;
    return getRange(rangeStart, rangeEnd)
           .map((char) => String.fromCharCode(char)); 
}

module.exports = {
    getRange: getRange,
    getLetterRange: getLetterRange
}