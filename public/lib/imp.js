"use strict";

var _child_process = _interopRequireDefault(require("child_process"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spawn = _child_process.default.spawn;
var ls = spawn('ls', ['-lh', '/usr']);
ls.stdout.on('data', function (data) {
  return console.log("stdout: ".concat(data));
});
ls.stderr.on('data', function (data) {
  return console.log("stderr: ".concat(data));
});
ls.on('close', function (code) {
  return code && console.log("child process exited with code ".concat(code, "."));
});