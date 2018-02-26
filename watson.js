//var watson = require('watson-developer-cloud');
var VisualRecognitionV3 = require('./node_modules/watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');

var visualRecognition = new VisualRecognitionV3({
  api_key: '2cd9a7d2ba1456bb8cd4094d0e64561579c2fc69',
  version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
});

exports.watsonSpeechToText = function (audioFile) {

  return new Promise(function (resolve, reject) {
    var recordingFile = fs.createWriteStream("results.json");
    for (var i = 1; i < 5; i++) {
      var imgFile="./images/tn_"+i+".png"
      var params = {
        images_file: fs.createReadStream(imgFile)
      };

      visualRecognition.classify(params, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          recordingFile.write(JSON.stringify(res) + ",");
        }
      })
    }
  })
};