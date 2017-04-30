const { getRange, getLetterRange } = require('../array-util.js');

describe('array-util', () => {

    describe('getRange()' , () => {
        it('produces a range from 0 to 5', () => {
            expect(getRange(0,5)).toEqual([0,1,2,3,4,5])
        });
        it('produces a range from 1 to 5', () => {
            expect(getRange(1,5)).toEqual([1,2,3,4,5])
        });
        it('produces a range from with neg number', () => {
            expect(getRange(-5,-1)).toEqual([-5,-4,-3,-2,-1])
        });
    });
    
    describe('getLetterRange()' , () => {
        it('produces a range from A to E', () => {
            expect(getLetterRange('A',5)).toEqual(['A','B','C','D','E'])
        });
        it('produces a single letter', () => {
            expect(getLetterRange('Z',1)).toEqual(['Z']);
        });
    });
});
