"use strict";

var assert = require("assert"),
	path = require("path"),
	fs = require("fs"),
	fileUtil = require("../index").file;

assert.strictEqual(fileUtil.existsSync(path.join(__dirname, "file.js")), true);
assert.strictEqual(fileUtil.existsSync(path.join(__dirname, "FILE_DOES_NOT_EXIST")), false);

fileUtil.exists(path.join(__dirname, "file.js"), function(err, exists)
{
	assert(!err);
	assert.strictEqual(exists, true);
});

fileUtil.exists(path.join(__dirname, "FILE_DOES_NOT_EXIST"), function(err, exists)
{
	assert(!err);
	assert.strictEqual(exists, false);
});

var DIR_TEST_PATH = "/tmp/file.js_dir_test_removal";
var FILE_TEST_PATH = "/tmp/file.js_file_test_removal";

fs.mkdirSync(DIR_TEST_PATH);
fs.writeFileSync(FILE_TEST_PATH, "hello", {encoding:"utf8"});
assert.strictEqual(fileUtil.existsSync(DIR_TEST_PATH), true);
assert.strictEqual(fileUtil.existsSync(FILE_TEST_PATH), true);
fileUtil.unlink(DIR_TEST_PATH, function(err)
{
	assert(!err);
	assert.strictEqual(fileUtil.existsSync(DIR_TEST_PATH), false);
});

fileUtil.unlink(FILE_TEST_PATH, function(err)
{
	assert(!err);
	assert.strictEqual(fileUtil.existsSync(FILE_TEST_PATH), false);
});
