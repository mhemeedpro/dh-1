//var phantom = require('node-phantom');

//var sleep = require('sleep');
var express = require('express');
var http = require('http');
const fs = require('fs');


module.exports = new yaf();
var configTestForum = {
  loginUrl: "http://testforum.yetanotherforum.net/login",
  loginFormDetail: {
    usernameBox: 'forum_ctl03_Login1_UserName', // dom element ID
    passwordBox: 'forum_ctl03_Login1_Password',
    submitButton: 'forum_ctl03_Login1_LoginButton'
  },
  loginInfo: {
    username: 'testbot',
    password: 'testbot123'
  }
};
console.log("hi test file ")

var config = configTestForum;