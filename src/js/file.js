/* global URL */

function read (file, callback) {
  var reader = new FileReader();
  reader.onload = function (fileEvent) {
    callback(fileEvent.target.result);
  };
  reader.readAsText(file);
}

// saveAs from https://gist.github.com/MrSwitch/3552985
var saveAs = window.saveAs || (window.navigator.msSaveBlob ? function (b, n) {
    return window.navigator.msSaveBlob(b, n);
  } : false) || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs || (function () {

    // URL's
    window.URL = window.URL || window.webkitURL;

    if (!window.URL) {
      return false;
    }

    return function (blob, name) {
      var url = URL.createObjectURL(blob);

      // Test for download link support
      if ("download" in document.createElement('a')) {

        var a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', name);

        // Create Click event
        var clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click", true, true, window, 0,
          event.screenX, event.screenY, event.clientX, event.clientY,
          event.ctrlKey, event.altKey, event.shiftKey, event.metaKey,
          0, null);

        // dispatch click event to simulate download
        a.dispatchEvent(clickEvent);

      } else {
        // fallover, open resource in new tab.
        window.open(url, '_blank', '');
      }
    };
  })();

function save (text, fileName) {
  var blob = new Blob([text], {
    type: 'text/plain'
  });
  saveAs(blob, fileName || 'subtitle.srt');
}

var File = {
	read: read,
  save: save
};

module.exports = File;