var spawn = require('child_process').spawn;
var Promise = require('bluebird');
var ffmpeg = require('fluent-ffmpeg');
var path = require('path');

exports.getYouTubeAudio = function (videoId) {
  return new Promise(function (resolve, reject) {
    // Install youtube_dl locally: brew install youtube-dl
    youtube_dl = spawn('youtube-dl', ['-f', 'mp4', '-o', 'file.%(ext)s', videoId]);

    youtube_dl.stdout.on('data', function (data) {
      console.log(data.toString());
    });

    youtube_dl.stderr.on('data', function (data) {
      process.stderr.write(data);
    });
    var duration;
    // brew install ffmpeg
    youtube_dl.on('exit', function () {
      var mp3File = path.join(__dirname, 'file.mp4');
      var flacFile = path.join(__dirname, 'file.flac')
      ffmpeg.ffprobe(path.join(__dirname, 'file.mp4'), function (err, metadata) {
        duration=metadata.format.duration;
        console.log(duration);
      });
      new ffmpeg(mp3File)
        .takeScreenshots({
          count: parseInt(5),
        }, path.join(__dirname, 'images'), function (err) {
          console.log('screenshots were saved')
        })
        .on('end', function () {
          resolve();
        })
        .on('error', function (err) {
          reject(err);
        });
    });
  });
};
