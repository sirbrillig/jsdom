"use strict";
const jsdom = require("../../lib/newapi1");

// Basic functionality

exports["should have a window and a document"] = function (t) {
  const dom = jsdom();

  t.ok(dom.window);
  t.ok(dom.window.document);
  t.done();
};

exports["should have a document with documentElement HTML when no arguments are passed"] = function (t) {
  const document = jsdom().window.document;

  t.strictEqual(document.documentElement.nodeName, "HTML");
  t.done();
};

// Test first argument

exports["should populate the resulting document with the given HTML"] = function (t) {
  const document = jsdom(`<a id="test" href="#test">`).window.document;

  t.strictEqual(document.getElementById("test").getAttribute("href"), "#test");
  t.done();
};

exports["should give the same document innerHTML for empty and blank and omitted strings"] = function (t) {
  const document1 = jsdom().window.document;
  const document2 = jsdom(``).window.document;
  const document3 = jsdom(` `).window.document;

  t.strictEqual(document1.innerHTML, document2.innerHTML);
  t.strictEqual(document2.innerHTML, document3.innerHTML);
  t.done();
};

// Test options

//// referrer option

exports["should allow customizing document.referrer via the referrer option"] = function (t) {
  const document = jsdom(``, { referrer: "http://example.com/" }).window.document;

  t.strictEqual(document.referrer, "http://example.com/");
  t.done();
};

exports["should throw an error when passing an invalid absolute URL for referrer"] = function (t) {
  t.throws(() => jsdom(``, { referrer: "asdf" }));
  t.done();
};

exports["should canonicalize referrer URLs"] = function (t) {
  const document = jsdom(``, { referrer: "http:example.com" }).window.document;

  t.strictEqual(document.referrer, "http://example.com/");
  t.done();
};

exports["should have a default referrer URL of about:blank"] = function (t) {
  const document = jsdom().window.document;

  t.strictEqual(document.referrer, "about:blank");
  t.done();
};

//// url option

exports["should allow customizing document URL via the url option"] = function (t) {
  const document = jsdom(``, { url: "http://example.com/" }).window.document;

  t.strictEqual(document.URL, "http://example.com/");
  t.strictEqual(document.documentURI, "http://example.com/");
  t.done();
};

exports["should throw an error when passing an invalid absolute URL for url"] = function (t) {
  t.throws(() => jsdom(``, { url: "asdf" }));
  t.done();
};

exports["should canonicalize document URLs"] = function (t) {
  const document = jsdom(``, { url: "http:example.com" }).window.document;

  t.strictEqual(document.URL, "http://example.com/");
  t.strictEqual(document.documentURI, "http://example.com/");
  t.done();
};

exports["should have a default document URL of about:blank"] = function (t) {
  const document = jsdom().window.document;

  t.strictEqual(document.URL, "about:blank");
  t.strictEqual(document.documentURI, "about:blank");
  t.done();
};

//// contentType option

exports["should allow customizing document content type via the contentType option"] = function (t) {

};
