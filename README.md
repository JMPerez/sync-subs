Sync Subs
=========

Using the File API it is possible to generate files on the fly and let the browser download them. It also uses [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) to provide offline support.

Tech
-----------

This subtitles synchronizer uses a number of open source projects to work properly:

* [SRT Parser from Popcorn](https://github.com/mozilla/popcorn-js/blob/master/parsers/parserSRT/popcorn.parserSRT.js) - a parser for SRT files.

Installation
--------------

Run grunt and open the `index.html` file in the `dist` folder.

Running Tests
-------------

Install mocha globally with `npm i mocha -g`. Then run `mocha`.

Status
--------------

[![Build Status](https://travis-ci.org/JMPerez/sync-subs.png)](https://travis-ci.org/JMPerez/sync-subs)

[![Coverage Status](https://coveralls.io/repos/JMPerez/sync-subs/badge.png?branch=master)](https://coveralls.io/r/JMPerez/sync-subs?branch=master) (only for Javascript code that can be run on node)

Authors
--------------

[@jmperezperez](https://twitter.com/jmperezperez)

License
--------------

MIT
