(function () {
  'use strict';
  var previewOrig = document.getElementById('preview-orig'),
      previewAfter = document.getElementById('preview-after'),
      timeShift = document.getElementById('time-shift'),
      download = document.getElementById('download'),
      filedrag = document.getElementById('filedrag'),
      fileselect = document.getElementById('fileselect');

  function init() {

    // file select
    fileselect.addEventListener('change', fileSelectHandler, false);

    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // file drop
      filedrag.addEventListener('dragover', fileDragHover, false);
      filedrag.addEventListener('dragleave', fileDragHover, false);
      filedrag.addEventListener('drop', fileSelectHandler, false);
      filedrag.style.display = 'block';
    } else {
      filedrag.style.display = 'none';
    }

    timeShift.addEventListener('change', function () {
      update();
    }, false);

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

    download.addEventListener('click', function () {
      if (parsedData !== null) {
        var parsedDataCopy = parsedData;

        var text = '';
        var ts = +timeShift.value;
        parsedDataCopy.forEach(function (s) {
          var shifted = applyTimeShift(s.subtitle, ts);
          text += shifted.id + '\n';
          text += formatTime(shifted.start) + ' --> ' + formatTime(shifted.end) + '\n';
          text += shifted.text.replace( /<br \/>/gi, '\n') + '\n' + '\n';
        });

        var blob = new Blob([text], {
          type: 'text/plain'
        });
        saveAs(blob, fileName || 'subtitle.srt');
      }
    }, false);

  }

  document.getElementById('select-file').addEventListener('click', function () {
    fileselect.click();
  });

  // file drag hover
  function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type === 'dragover' ? 'hover' : '');
  }

  // file selection
  function fileSelectHandler(e) {
    // cancel event and hover styling
    fileDragHover(e);

    var droppedFiles = e.target.files || e.dataTransfer.files;

    var reader = new FileReader();

    reader.onload = function (fileEvent) {
      var data = {
        text: fileEvent.target.result
      };
      parsedData = SyncSubs.parserSRT(data).data;

      document.querySelector('.preview-section').style.display = 'block';
      update();
    };
    fileName = droppedFiles[0].name;
    reader.readAsText(droppedFiles[0]);
  }

  // time shift

  var parsedData = null,
      fileName = null;

  function toTwoNumbers(number) {
    var str = number + "";
    if (str.length === 1) {
      return "0" + str;
    } else {
      return str;
    }
  }

  function formatTime(time) {
    //ie 0.743 => 00:00:00,743
    var milliseconds = 0,
      seconds = 0,
      minutes = 0,
      hours = 0,
      positive = time >= 0,
      remain = Math.abs(time);

    milliseconds = Math.round(remain % 1 * 1000);
    remain = remain - milliseconds / 1000;
    seconds = Math.round(remain % 60);
    remain = remain - seconds;
    minutes = Math.round((remain / 60) % 60);
    remain = remain - minutes * 60;
    hours = Math.round(remain / 3600);

    return (positive ? "" : "-") + toTwoNumbers(hours) + ':' + toTwoNumbers(minutes) + ':' + toTwoNumbers(seconds) + ',' + milliseconds;
  }

  function previewSubtitle(subtitle) {
    return [subtitle.id, formatTime(subtitle.start) + '-->' + formatTime(subtitle.end), subtitle.text].join('<br/>');
  }

  function applyTimeShift(subtitle, timeShift) {
    return {
      id: subtitle.id,
      start: subtitle.start + timeShift,
      end: subtitle.end + timeShift,
      text: subtitle.text
    };
  }

  function update() {
    if (parsedData === null) {
      previewOrig.innerHTML = 'Please, select a SRT file';
    } else {
      previewOrig.innerHTML = previewSubtitle(parsedData[0].subtitle) + previewSubtitle(parsedData[1].subtitle);
      var ts = +timeShift.value;
      previewAfter.innerHTML = previewSubtitle(applyTimeShift(parsedData[0].subtitle, ts)) + previewSubtitle(applyTimeShift(parsedData[1].subtitle, ts));
    }
  }

  // call initialization file
  if (window.File && window.FileList && window.FileReader) {
    init();
  } else {
    alert('Your browser does not support File');
  }

})();