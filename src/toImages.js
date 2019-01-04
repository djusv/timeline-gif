'use strict'

const fse = require('fs-extra');
const path = require('path');

/**
 * Convert and save an array of screenshots to a gif
 * @param  {timelineEntry[]} screenshotEntries  timeline entries to convert
 * @param  {Object} opts
 * @return {Promise} resolve with the all saved screenshots
 */
function toImages(screenshotEntries, opts) {
  opts = Object.assign({
    output: './screenshots',
    fps: 10
  }, opts)
  return saveImages(screenshotEntries, opts.output);
}

/**
 * Saves a screenshot entry on the disk
 * @param  {timelineEntry[]} screenshotEntries
 * @param  {String} output
 * @return {Promise} resolved with the image file paths
 */
function saveImages(screenshotEntries, output) {
  const saveAll = screenshotEntries.map((entry, index) => {
    const fileName = `screenshot-${(index + '').padStart(4, '0')}.png`
    const filePath = path.resolve(output, fileName)
    return saveScreenshotEntry(entry, filePath);
  });
  return Promise.all(saveAll);
}

/**
 * Saves a screenshot entry on the disk
 * @param  {timelineEntry} entry
 * @param  {String} filePath
 * @return {Promise} resolving the file image path
 */
function saveScreenshotEntry(entry, filePath) {
  const fileContent = entry.args.snapshot;
  return fse.outputFile(filePath, fileContent, 'base64');
}

module.exports = {
  toImages
}