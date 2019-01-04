# timeline-gif
Extract the screenshots stored in Chrome Devtool timeline files into gifs

original code is from @pmdartus see also [code](https://github.com/pmdartus/snapline)

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

## API

## License

MIT. See `/LICENSE`

## Owner

Justin Verkuijl - [@djusv](https://github.com/djusv)