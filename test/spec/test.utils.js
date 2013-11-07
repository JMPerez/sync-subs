/*global describe, it, expect */
(function() {
'use strict';
  var utils = SyncSubs.Utils;
  describe('Tests the formatter', function() {
    it('should format numbers in the right way', function() {
      expect(utils.formatTime(0.743)).to.equal('00:00:00,743');
      expect(utils.formatTime(60.743)).to.equal('00:01:00,743');
      expect(utils.formatTime(3600.743)).to.equal('01:00:00,743');
      expect(utils.formatTime(-1.546)).to.equal('-00:00:01,546');
    });
  });
})();