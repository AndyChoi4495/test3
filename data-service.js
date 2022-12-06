var getBSD = [];

var studentList = [];
const fs = require('fs');

exports.initialize = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile('./data/students.json', (err, data) => {
      if (err) {
        reject('Failure to read file students.json!');
      } else {
        studentList = JSON.parse(data);
      }
    });
    return new Promise(function (resolve, reject) {
      console.log('prepare called');
      resolve('Data succesfully initialized!');
    });
  });
};

exports.getAllStudents = function () {
  return new Promise(function (resolve, reject) {
    console.log('getAllStudents called');

    resolve(studentList);
    reject(reason);
  });
};

exports.getBSDStudents = function () {
  return new Promise(function (resolve, reject) {
    console.log('getBSDStudents called');
    var bsdList = [];

    for (student of studentList) {
      if (student.program == 'BSD') {
        bsdList.push(student);
      }
    }

    resolve(bsdList);
    reject(reason);
  });
};

exports.getCPA = function () {
  return new Promise(function (resolve, reject) {
    console.log('getCPA called');

    resolve(studentList);
    reject(reason);
  });
};

exports.highGPA = function () {
  return new Promise(function (resolve, reject) {
    console.log('highGPA called');
    var highestStudent = {
      studId: 0,
      name: 'dummy',
      program: 'dummy',
      gpa: 0,
    };

    for (student of studentList) {
      if (student.gpa > highestStudent.gpa) {
        highestStudent = student;
      }
    }

    resolve(highestStudent);
    reject(reason);
  });
};
