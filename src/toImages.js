'use strict'

const fse = require('fs-extra');
const path = require('path');

/**
 * Convert and save an array of screenshots to a gif
 * @param  {timelineEntry[]} screenshotEntries  timeline entries to convert
 * @param  {String} outputPath
 * @return {Promise} resolve with the all saved screenshots
 */
function saveEntries(screenshotEntries, outputPath='./screenshots') {
  const saveAll = screenshotEntries.map((entry, index) => {
    const fileName = `screenshot-${(index + '').padStart(4, '0')}.png`
    const filePath = path.resolve(outputPath, fileName)
    return saveEntry(entry, filePath);
  });
  return Promise.all(saveAll);
}

/**
 * Saves a screenshot entry on the disk
 * @param  {timelineEntry} entry
 * @param  {String} filePath
 * @return {Promise} resolving the file image path
 */
function saveEntry(entry, filePath) {
  const fileContent = entry.args.snapshot;
  return fse.outputFile(filePath, fileContent, 'base64');
}

module.exports = {
  saveEntries
}