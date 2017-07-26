const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


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

describe('generateLocationMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Ricardo Fideles';
        var latitude = '-22.909326';
        var longitude = '-43.177962';
        var url = `https://www.google.com.br/maps?q=${latitude},${longitude}`;
        var res = generateLocationMessage(from, latitude, longitude);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, url} );
        expect(res.from).toBe(from);
        expect(res.url).toBe(url);
    });
});