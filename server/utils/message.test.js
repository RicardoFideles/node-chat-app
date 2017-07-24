const expect = require('expect');
var {generateMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Ricardo Fideles';
        var text = 'hello';
        var res = generateMessage(from, text);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, text} );
        expect(res.text).toBe(text);
        expect(res.from).toBe(from);
    });
});