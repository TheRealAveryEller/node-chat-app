var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage()', () => {
    it('Should Generate Correct Message Object', () => {
        var from = 'Tester';
        var text = 'Test Message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});        
    });
});

describe('generateLocationMessage()', () => {
    it('Should Generate Correct Location Object', () => {
        var from = 'Tester'
        var long = 15;
        var lat = 19;
        var url = `https://www.google.com/maps?q=15,19`;

        var message = generateLocationMessage(from, long, lat);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});