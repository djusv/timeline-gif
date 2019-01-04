'use strict'

const fse = require('fs-extra')
const path = require('path');
const pixels = require('image-pixels');
const GifEncoder = require('gif-encoder');
const _cliProgress = require('cli-progress');

/**
 * Convert and save an array of screenshots to a gif
 * @param  {String} folderPath
 * @param  {Object} opts
 * @return {Promise} resolve with the path of the created gif
 */
async function convertFolderToGif(folderPath, opts) {
  opts = Object.assign({
    output: 'timeline.gif',
    fps: 10,
    quality: 20
  }, opts)
  const files = fse.readdirSync(folderPath).map((file) => path.resolve(folderPath, file));
  const { width, height } = await pixels(files[0]);
  const gif = new GifEncoder(width, height);
  await createGif(gif, files, opts);
  return opts.output;
}

async function createGif(gif, items, opts) {
  const progressBar = new _cliProgress.Bar();
  const gifFile = require('fs').createWriteStream(opts.output);
  gif.pipe(gifFile);
  gif.setFrameRate(opts.fps);
  gif.setRepeat(0);
  gif.setQuality(opts.quality);
  gif.writeHeader();
  let counter = 0;
  progressBar.start(items.length, counter);
  for (let item of items) {
    const { data } = await pixels(item);
    gif.addFrame(data);
    gif.read();
    counter++;
    progressBar.update(counter);
  }
  gif.finish();
  progressBar.stop();
}

module.exports = {
  convertFolderToGif
}