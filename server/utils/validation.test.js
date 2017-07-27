const expect = require('expect');
var {isRealString} = require('./validation');

describe('validation', ()=> {
    it('should validate string', () => {
        var param = {
            name : 'Jhon Doug',
            room : 'Game of Thrones'
        };
        expect(isRealString(param.name)).toBe(true);
        expect(isRealString(param.room)).toBe(true);
        expect(isRealString('    ')).toBe(false);
        expect(isRealString(' 2 123 ')).toBe(true);
        expect(isRealString(null)).toBe(false);
        expect(isRealString(98)).toBe(false);
    });
});