var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage()', () => {
    it('Should Generate Correct Message Object', () => {
        var from = 'Tester';
        var text = 'Test Message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});        
    });
});