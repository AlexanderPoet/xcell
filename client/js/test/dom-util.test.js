const { createTH,
        createTR,
        createTD,
    removeChildren } = require('../dom-util.js');

describe('dom-util', () => {

    describe('DOM creation functions' , () => {
        describe('createTH()', () => {
            it('creates a TH element', () => {
                const ele = createTH();
                expect(ele.tagName).toBe('TH');
            })
            it('creates correct text info', () => {
                const text = "Hot Sauce in all of our Top Ramen ya bish";
                const ele = createTH(text);
                expect(ele.textContent).toEqual(text);
            })
        })
        describe('createTD()', () => {
            it('creates a TD element', () => {
                const ele = createTD();
                expect(ele.tagName).toBe('TD');
            })
        })
        describe('createTR()', () => {
            it('creates a TR element', () => {
                const ele = createTR();
                expect(ele.tagName).toBe('TR');
            })
        })
    });

    describe('removeChildren()' , () => {
        it('should remove one child', () => {
            const parent = document.createElement('DIV');
            const child = document.createElement('STRONG');

            parent.appendChild(child);

            expect(parent.childNodes.length).toBe(1);
            expect(parent.childNodes[0]).toBe(child);

            removeChildren(parent);
            expect(parent.childNodes.length).toBe(0);
        });
    });
});
