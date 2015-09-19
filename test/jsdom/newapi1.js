"use strict";
const jsdom = require("../../lib/newapi1");

exports["should have a window and a document"] = function (t) {
  const dom = jsdom();
  t.ok(dom.window);
  t.ok(dom.window.document);
  t.done();
};
