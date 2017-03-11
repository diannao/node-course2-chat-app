const expect = require('expect');
const {generateMessage} = require('./message');
const {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'fred';
    var text = 'Hey';
    var responseMessage = generateMessage(from, text);

    expect(responseMessage).toInclude({from, text});
    expect(responseMessage.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location message object', () => {
    var from = 'fred';
    var latitude = '35.741829700000004';
    var longitude = '-78.713608'
    var url = 'https://www.google.com/maps?q=35.741829700000004,-78.713608';
    var responseMessage = generateLocationMessage(from, latitude, longitude);

    expect(responseMessage).toInclude({from, url});
    expect(responseMessage.createdAt).toBeA('number');
  });
});
