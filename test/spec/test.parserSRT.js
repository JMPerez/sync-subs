/*global describe, it, expect */
(function() {
'use strict';
  describe('Tests the parser', function() {
    it('should parse in the right way', function(done) {
      var expectedSubs = [
        {
          id: 1,
          start: 2.4,
          end: 5.2,
          text: "[Background Music Playing]"
        },
        {
          id: 2,
          start: 15.712,
          end: 17.399,
          text: "Oh my god, Watch out!<br />It's coming!!"
        },
        {
          id: 3,
          start: 25.712,
          end: 30.399,
          text: "[Bird noises]"
        },
        {
          id: 4,
          start: 31,
          end: 31.999,
          text: 'This text is <font color="red">RED</font> and has not been positioned.'
        },
        {
          id: 5,
          start: 32,
          end: 32.999,
          text: "This is a<br />new line, as is<br />this"
        },
        {
          id: 6,
          start: 33,
          end: 33.999,
          text: "This contains nested <b>bold, <i>italic, <u>underline</u> and <s>strike-through</s></u></i></b> HTML tags"
        },
        {
          id: 7,
          start: 34,
          end: 34.999,
          text: "Unclosed but <b>supported HTML tags are left in,  SSA italics aren't"
        },
        {
          id: 8,
          start: 35,
          end: 35.999,
          text: "&lt;ggg&gt;Unsupported&lt;/ggg&gt; HTML tags are escaped and left in, even if &lt;hhh&gt;not closed."
        },
        {
          id: 9,
          start: 36,
          end: 36.999,
          text: "Multiple SSA tags are stripped"
        },
        {
          id: 10,
          start: 37,
          end: 37.999,
          text: "Greater than (&lt;) and less than (&gt;) are shown"
        }
      ];
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (req.readyState == 4) {
          var subs = req.responseText;
          var parsedData = SyncSubs.Parser.SRT({text: subs}).data;
          var i = 0;
          parsedData.forEach(function(pd) {
            expect(expectedSubs[i].id).to.equal(pd.subtitle.id);
            expect(expectedSubs[i].start).to.equal(pd.subtitle.start);
            expect(expectedSubs[i].end).to.equal(pd.subtitle.end);
            expect(expectedSubs[i].text).to.equal(pd.subtitle.text);
            i++;
          });

          expect(parsedData.length).to.equal(expectedSubs.length);
          done();
        }
      };
      req.open('get', '../test/data/unit.srt', true);
      req.send();
    });
  });
})();