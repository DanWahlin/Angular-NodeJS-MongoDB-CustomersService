'use strict';

var fse = require('fs-extra'),
    request = require('request'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    AdmZip = require('adm-zip');

function copyIntoDirectories(srcDir, startDir, copyToSubFolderName, dirsToIgnore, overlayFolder) {
    //Iterate through directories
    fse.readdirSync(startDir).forEach(function (dir) {
        var directory = startDir + '/' + dir,
            stat = fse.lstatSync(directory);

        if (stat.isDirectory()) {
            if (dirsToIgnore.indexOf(dir) === -1) { //Make sure the ignoreDirs aren't involved in the copy operations
                copyIntoDirectory(srcDir, directory, copyToSubFolderName, overlayFolder);
            }
        }
    });
}

function copyIntoDirectory(srcDir, startDir, copyToSubFolderName, overlayFolder) {
    var targetDir = startDir + '/' + copyToSubFolderName, //Target directory src should be copied to
        overlayFolder = (overlayFolder) ? overlayFolder : 'files',
        filesOverlaySrc = startDir + '/' + overlayFolder, //If no srcDir is provided then we're overlaying lab files into the targetDir
        finalSrc = (srcDir) ? srcDir : filesOverlaySrc;

    if (fse.existsSync(finalSrc)) {
        fse.copySync(finalSrc, targetDir);
        console.log('Copied ' + finalSrc + ' to ' + targetDir);
    }
}

function downloadAndExtractProjects(callback) {
    var repos = [{ name: '', url: '' } ];

    let pending = repos.length;
    //if (!pending) { return callback(new Error('No files found to download')); }

    repos.forEach(function(repo) {
        var filePath = './' + repo.name + '.zip';
        request(repo.url).pipe(
            fse.createWriteStream(filePath).addListener('finish', function() {
                console.log('Extracting: ' + filePath);
                var zip = new AdmZip(filePath);
                zip.extractAllTo('./', true);
                fse.unlink(filePath,function(err) {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } 
                    if (!--pending) { callback(null); }
                });
            })
        );
    });
}

var beginFolder = 'begin',
    endFolder = 'end',
    beginFiles = 'files/beginFiles',
    endFiles = 'files/endFiles',
    dirsToIgnore = [ 'node_modules', 'module1', 'module8'];


//Copy src folder into begin folder of each module
console.log(`Copying ../src into modules`);
copyIntoDirectories('../src', '.', beginFolder, dirsToIgnore, beginFiles);

//Overlay files over begin folder
console.log(`Overlaying code`);
copyIntoDirectories(null, '.', beginFolder, dirsToIgnore, beginFiles);



