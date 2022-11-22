var getBSD = [];
var highGPA = [];
var AllStudents = [];
const fs = require('fs');

exports.initialize = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile('./data/students.json', (err, data) => {
      if (err) {
        reject('Failure to read file students.json!');
      } else {
        getBSD = JSON.parse(data);
        AllStudents = JSON.parse(data);
        highGPA = JSON.parse(data[4]);
        resolve(getBSD);
      }
    });
  });
};

module.exports.getStudents = function () {
  return new Promise((resolve, reject) => {
    if (getBSD.length === 0) reject('no results returned');
    else resolve(getBSD);
  });
};

module.exports.highGPA = function () {
  return new Promise((resolve, reject) => {
    if (highGPA.length === 0) reject('no results returned');
    else resolve(highGPA);
  });
};
module.exports.AllStudents = function () {
  return new Promise((resolve, reject) => {
    if (AllStudents.length === 0) reject('no results returned');
    else resolve(AllStudents);
  });
};
