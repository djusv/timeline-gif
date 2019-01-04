#! /usr/bin/env node

'use strict'

const yargs = require('yargs')
const timelineGif = require('..')

function exitOnError (message) {
  console.error(message)
  process.exit(1)
}

const argv = yargs
  .usage('Usage: $0 <timeline> [options]')
  .help()
  .demand(1)
  .option('o', {
    alias: 'output',
    default: 'timeline.gif',
    describe: 'Output file name',
    type: 'string'
  })
  .option('f', {
    alias: 'fps',
    default: '10',
    describe: 'Number of frames per seconds',
    type: 'number'
  })
  .option('q', {
    alias: 'quality',
    default: '20',
    describe: 'The quality of the gif',
    type: 'number'
  })
  .argv

timelineGif.toGif(argv._[0], argv).catch((err) => exitOnError(err));
