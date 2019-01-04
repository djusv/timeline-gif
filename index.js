'use strict'

const fse = require('fs-extra');
const toGif = require('./src/toGif');
const toImages = require('./src/toImages');
const timeline = require('./src/timeline');

/**
 * Convert timeline to a gif
 * @param  {timelineEntry[]} entries  timeline to convert
 * @param  {Object} opts export options
 * @return {Promise} resolved with the gif path
 */
function timelineEntriesToGif(entries, opts) {
  opts = Object.assign({
    output: `timeline-${+new Date()}.gif`,
    tmp: './tmp-screenshots',
    fps: 10,
    quality: 20
  }, opts)

  const toImagesOpts = {
    fps: opts.fps,
    output: opts.tmp
  }

  const toGifOpts = {
    fps: opts.fps,
    quality: opts.quality,
    output: opts.output
  }

  return fse.emptyDir(opts.tmp)
    .then(() => toImages.toImages(entries, toImagesOpts))
    .then(() => toGif.convertFolderToGif(opts.tmp, toGifOpts))
}

/**
 * Get the timeline entries from a given file
 * @param  {string} file  timeline to convert
 * @return {Promise<timelineEntry[]>} screenshot entries timeline
 */
function getTimelineEntries(file, fps) {
  return timeline.getScreenshotEntries(file, fps);
}

module.exports = {
  timelineEntriesToGif,
  getTimelineEntries
}