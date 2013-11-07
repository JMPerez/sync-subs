/* global alert */

(function() {
  'use strict';

  var SyncSubs = window.SyncSubs;

  var previewOrig = document.getElementById('preview-orig'),
      previewAfter = document.getElementById('preview-after'),
      timeShift = document.getElementById('time-shift'),
      download = document.getElementById('download'),
      filedrag = document.getElementById('filedrag'),
      fileselect = document.getElementById('fileselect'),
      fileName = null;

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

    download.addEventListener('click', function () {
      if (parsedData !== null) {
        var parsedDataCopy = parsedData;

        var text = '';
        var ts = +timeShift.value;
        parsedDataCopy.forEach(function (s) {
          var transformed = SyncSubs.Transform.applyTimeShift(s.subtitle, ts);
          text += SyncSubs.Transform.toFileContents(transformed);
        });

        SyncSubs.File.save(text, fileName || 'subtitle.srt');
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

    filedrag.innerHTML = 'Dropped!';

    var droppedFiles = e.target.files || e.dataTransfer.files;

    var file = droppedFiles[0];
    fileName = file.name;

    SyncSubs.File.read(file, function(contents) {
      var data = {
        text: contents
      };
      parsedData = SyncSubs.Parser.SRT(data).data;
      document.querySelector('.preview-section').style.display = 'block';
      update();
    });
  }

  // time shift

  var parsedData = null;

  function update() {
    if (parsedData === null) {
      previewOrig.innerHTML = 'Please, select a SRT file';
    } else {
      previewOrig.innerHTML = SyncSubs.Transform.toHTML(parsedData[0].subtitle) + SyncSubs.Transform.toHTML(parsedData[1].subtitle);
      var ts = +timeShift.value;
      previewAfter.innerHTML = SyncSubs.Transform.toHTML(SyncSubs.Transform.applyTimeShift(parsedData[0].subtitle, ts)) + SyncSubs.Transform.toHTML(SyncSubs.Transform.applyTimeShift(parsedData[1].subtitle, ts));
    }
  }

  // call initialization file
  if (window.File && window.FileList && window.FileReader) {
    init();
  } else {
    alert('Your browser does not support File');
  }

})();