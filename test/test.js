'use strict';

var expect = require('chai').expect;
var sanitizeUrl = require('../').sanitizeUrl;

describe('sanitizeUrl', function () {
  it('replaces javascript urls with about:blank', function () {
    expect(sanitizeUrl('javascript:alert(document.domain)')).to.equal('about:blank');
  });

  it('disregards capitalization for JavaScript urls', function () {
    expect(sanitizeUrl('jAvasCrIPT:alert(document.domain)')).to.equal('about:blank');
  });

  it('ignores ctrl characters in javascript urls', function () {
    expect(sanitizeUrl(decodeURIComponent('JaVaScRiP%0at:alert(document.domain)'))).to.equal('about:blank');
  });

  it('replaces data urls with about:blank', function () {
    expect(sanitizeUrl('data:text/html;basfe64,PH%3Cscript%3Ealert(document.domain)%3C/script%3E')).to.equal('about:blank');
  });

  it('disregards capitalization for data urls', function () {
    expect(sanitizeUrl('dAtA:text/html;basfe64,PH%3Cscript%3Ealert(document.domain)%3C/script%3E')).to.equal('about:blank');
  });

  it('ignores ctrl characters in data urls', function () {
    expect(sanitizeUrl(decodeURIComponent('dat%0aa:text/html;basfe64,PH%3Cscript%3Ealert(document.domain)%3C/script%3E'))).to.equal('about:blank');
  });
});
