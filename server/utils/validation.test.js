const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var value = 43;
    var response = isRealString(value);
    expect(response).toBe(false);

    value = { text: 'this is a string' };
    var response = isRealString(value);
    expect(response).toBe(false);

    value = true;
    var response = isRealString(value);
    expect(response).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var value = '      ';
    var response = isRealString(value);
    expect(response).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var value = '  f    ';
    var response = isRealString(value);
    expect(response).toBe(true);
  });

});
