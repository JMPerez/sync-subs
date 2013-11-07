/*global describe, it, expect */
(function() {
'use strict';
  var transform = SyncSubs.Transform;
  describe('Tests the subtitles transformation', function() {
    var subtitle = {
      id: 1,
      start: 2.4,
      end: 3.731,
      text: '<i>MAN [ON COMPUTER]:<br />Oh, my God...</i>'
    };
    it('should apply time shift', function() {
      expect(
        JSON.stringify(transform.applyTimeShift(subtitle, 10)))
        .to.equal(
        JSON.stringify({
          id: subtitle.id,
          start: subtitle.start + 10,
          end: subtitle.end + 10,
          text: subtitle.text
        })
      );
    });

    it('should return the right HTML', function() {
      expect(transform.toHTML(subtitle))
      .to.equal('1<br/>00:00:02,400-->00:00:03,731<br/><i>MAN [ON COMPUTER]:<br />Oh, my God...</i>');
    });

    it('should return the right format for an SRT file', function() {
      expect(transform.toFileContents(subtitle))
      .to.equal('1\n00:00:02,400 --> 00:00:03,731\n<i>MAN [ON COMPUTER]:\nOh, my God...</i>\n\n');
    });
  });
})();