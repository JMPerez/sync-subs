var utils = require('../src/js/utils'),
    expect = require('expect.js');

describe('Tests the formatter', function() {
  it('should format numbers in the right way', function() {
    expect(utils.formatTime(263.095)).to.equal('00:04:23,095');
    expect(utils.formatTime(0.743)).to.equal('00:00:00,743');
    expect(utils.formatTime(70.743)).to.equal('00:01:10,743');
    expect(utils.formatTime(3600.743)).to.equal('01:00:00,743');
    expect(utils.formatTime(-1.546)).to.equal('-00:00:01,546');
  });
});
