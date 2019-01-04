# timeline-gif

Extract the screenshots stored in Chrome Devtool timeline files into gifs

This code is based on code from @pmdartus [see also his repository](https://github.com/pmdartus/snapline)

## Features

* Convert timeline to gif
* Extract screenshots save in a timeline into a folder

## Install

ensure that your version of node is greater than `4.0`.

```shell
npm install -g timeline-gif
```

## CLI usage

```shell
> timeline-gif -h

Usage: timeline-gif <timeline> [options]

Options:
--help        Show help                                              [boolean]
-o, --output  Output file name              [string] [default: "timeline.gif"]
-f, --fps     Number of frames per seconds            [number] [default: "10"]
-q, --quality Set the quality                         [number] [default: "20"]
```

## Node usage

```javascript
const timelinegif = require('timeline-gif')
const timeline = require('./my-awesome-timeline.json')

const options = {
  fps: 10,
  quality, 20
}

timelinegif.toGif(timeline, options)
  .then(gifPath => console.log(`The gif(t) is ready: ${gifPath}!`))
```

## API

### `timelinegif.toGif(timeline[, options])`

* `file` <String> - The timeline file
* `options.output` <String> - path of the gif. default: `./timeline.gif`
* `options.fps` <Number> - Number of frames per seconds. default: `10`
* `options.quality` <Number> - Number of frames per seconds. default: `20`
* `options.tmp` <String> - path of the temporary folder for the screenshots. default: `./tmp-screenshots`

Returns a `Promise` that resolves with the path of the created gif

### `timelinegif.getTimelineEntries(file[, fps])`

* `file` <String> - The timeline file to convert
* `fps` <Number> - Number of frames per seconds. default: `10`

Returns a `Promise` that resolves with the screenshot entries read from the file

### `timelinegif.timelineEntriesToGif(entries[, options])`

* `entries` <timelineEntry[]> - The parsed JSON content of the timeline file
* `options.output` <String> - path of the gif. default: `./timeline.gif`
* `options.fps` <Number> - Number of frames per seconds. default: `10`
* `options.quality` <Number> - Number of frames per seconds. default: `20`
* `options.tmp` <String> - path of the temporary folder for the screenshots. default: `./tmp-screenshots`

Returns a `Promise` that resolves with the path of the path of the created directory

## License

MIT. See `/LICENSE`

## Owner

Justin Verkuijl - [@djusv](https://github.com/djusv)