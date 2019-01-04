'use strict'

const fse = require('fs-extra');

/**
 * Return true if the passed entry is a screenshot
 * @param  {timelineEntry}  entry
 * @return {Boolean}
 */
function isScreenshotEntry(entry) {
  return entry.name === 'Screenshot'
}

/**
 * Get the start and end time stamps of the timeline
 * @param  {timelineEntry[]} timeline
 * @return {Object} containing the start and end timestamp
 */
function getTimeBoundaries(timeline) {
  const devToolTimestamps = timeline
    .filter(entry => entry.cat === 'devtools.timeline')
    .map(entry => entry.ts)
    .sort()

  return {
    start: devToolTimestamps[0],
    end: devToolTimestamps[devToolTimestamps.length - 1]
  }
}

/**
 * Get a list of entries at the right fps
 * @param  {timelineEntry[]} entries
 * @param  {Object} timeBoundaries object containing the start and end timestamps
 * @param  {Object} fps
 * @return {timelineEntry[]} updated entry list
 */
function adjustScreenshotsEntries(entries, timeBoundaries, fps) {
  const accumulator = []
  const tsStep = 1 / fps * Math.pow(10, 6)

  let tsRunner = timeBoundaries.start
  let entryPointer = 0

  while (tsRunner <= timeBoundaries.end) {
    while (entryPointer < entries.length - 1 &&
      tsRunner >= entries[entryPointer].ts) {
      entryPointer++
    }

    accumulator.push(entries[entryPointer])
    tsRunner += tsStep
  }

  return accumulator
}

/**
 * Get the timeline entries from a given file
 * @param  {string} file  timeline to convert
 * @return {Promise<timelineEntry[]>} entries  timeline to convert
 */
function getTimelineEntries(file) {
  return fse.readJson(file, { encoding: 'utf8' })
    .then((data) => {
      let entries;
      if (Array.isArray(data.traceEvents)) {
        entries = data.traceEvents;
      } else if (Array.isArray(data)) {
        entries = data
      }
      return entries;
    });
}

/**
 * Get the screenshot timeline entries from a given file
 * @param  {string} file  timeline to convert
 * @return {Promise} resolve with the all screenshot entries
 */
function getScreenshotEntries(file, fps=10) {
  return getTimelineEntries(file).then((entries) => {
    if (!Array.isArray(entries)) { throw new Error('No entries to convert'); }
    const screenshotsEntries = entries.filter(isScreenshotEntry);
    const timeBoundaries = getTimeBoundaries(entries);
    return adjustScreenshotsEntries(screenshotsEntries, timeBoundaries, fps);
  });
}

module.exports = {
  getScreenshotEntries
}