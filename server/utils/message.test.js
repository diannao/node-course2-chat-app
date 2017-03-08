const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'fred';
    var text = 'Hey';
    var responseMessage = generateMessage(from, text);

    expect(responseMessage).toInclude({from, text});
    expect(responseMessage.createdAt).toBeA('number');
  });
});
