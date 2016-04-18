'use strict';

var React = require('react');
var shallow = require('enzyme').shallow;

var Footer = require('./footer');

describe('Footer', function () {
  it('should be a footer', function () {
    expect(shallow(<Footer/>).is('footer')).toBe(true);
  });
});
