var Utils = require('./utils');

function applyTimeShift(subtitle, timeShift) {
  return {
    id: subtitle.id,
    start: subtitle.start + timeShift,
    end: subtitle.end + timeShift,
    text: subtitle.text
  };
}

function toHTML(subtitle) {
  return [subtitle.id, Utils.formatTime(subtitle.start) + '-->' + Utils.formatTime(subtitle.end), subtitle.text].join('<br/>');
}

function toFileContents(subtitle) {
  var text = '';
  text += subtitle.id + '\n';
  text += Utils.formatTime(subtitle.start) + ' --> ' + Utils.formatTime(subtitle.end) + '\n';
  text += subtitle.text.replace( /<br \/>/gi, '\n') + '\n' + '\n';
  return text;
}

var Transform = {
  applyTimeShift: applyTimeShift,
  toHTML: toHTML,
  toFileContents: toFileContents
};

module.exports = Transform;
