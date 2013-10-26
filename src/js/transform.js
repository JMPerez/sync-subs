(function(SyncSubs) {

	'use strict';

  function applyTimeShift(subtitle, timeShift) {
    return {
      id: subtitle.id,
      start: subtitle.start + timeShift,
      end: subtitle.end + timeShift,
      text: subtitle.text
    };
  }

  function toHTML(subtitle) {
    return [subtitle.id, SyncSubs.Utils.formatTime(subtitle.start) + '-->' + SyncSubs.Utils.formatTime(subtitle.end), subtitle.text].join('<br/>');
  }

  function toFileContents(subtitle) {
    var text = '';
    text += subtitle.id + '\n';
    text += SyncSubs.Utils.formatTime(subtitle.start) + ' --> ' + SyncSubs.Utils.formatTime(subtitle.end) + '\n';
    text += subtitle.text.replace( /<br \/>/gi, '\n') + '\n' + '\n';
    return text;
  }

	SyncSubs.Transform = {
		applyTimeShift: applyTimeShift,
    toHTML: toHTML,
    toFileContents: toFileContents
	};

})(window.SyncSubs = window.SyncSubs || {});