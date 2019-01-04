'use strict'

const fse = require('fs-extra');
const gifHelper = require('./src/toGif');
const imagesHelper = require('./src/toImages');
const timelineHelper = require('./src/timeline');

/**
 * Convert timeline entries to a gif
 * @param  {timelineEntry[]} entries  timeline to convert
 * @param  {Object} opts export options
 * @return {Promise} resolved with the gif path
 */
function timelineEntriesToGif(entries, opts) {
  opts = Object.assign({
    output: `timeline.gif`,
    tmp: './tmp-screenshots',
    fps: 10,
    quality: 20
  }, opts)


  return fse.emptyDir(opts.tmp)
    .then(() => imagesHelper.saveEntries(entries, opts.tmp))
    .then(() => gifHelper.convertFolderToGif(opts.tmp, opts))
}

/**
 * Get the timeline entries from a given file
 * @param  {string} file  timeline to convert
 * @param  {number} fps frame per second
 * @return {Promise<timelineEntry[]>} screenshot entries timeline
 */
function getTimelineEntries(file, fps=10) {
  return timelineHelper.getScreenshotEntries(file, fps);
}

/**
 * Convert timeline to a gif
 * @param  {string} file the timeline to convert
 * @param  {Object} opts options
 * @return {Promise} resolved with the gif path
 */
function toGif(file, opts) {
  return getTimelineEntries(file, opts.fps)
    .then((entries) => timelineEntriesToGif(entries, opts));
}

module.exports = {
  timelineEntriesToGif,
  getTimelineEntries,
  toGif
}