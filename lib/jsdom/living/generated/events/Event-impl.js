"use strict";

const idlUtils = require("../util");

class EventImpl {
  constructor(type, eventInitDict) {
    this._initializedFlag = true;

    this.type = type;

    const wrapper = idlUtils.wrapperForImpl(this);
    for (let key in eventInitDict) {
      if (key in wrapper) {
        this[key] = eventInitDict[key];
      }
    }

    this.target = null;
    this.currentTarget = null;
    this.eventPhase = 0;

    this._stopPropagationFlag = false;
    this._stopImmediatePropagationFlag = false;
    this._canceledFlag = false;
    this._dispatchFlag = false;

    this.isTrusted = false;
    this.timeStamp = Date.now();
  }

  get defaultPrevented() {
    return this._canceledFlag;
  }

  stopPropagation() {
    this._stopPropagationFlag = true;
  }

  stopImmediatePropagation() {
    this._stopPropagationFlag = true;
    this._stopImmediatePropagation = true;
  }

  preventDefault() {
    if (this.cancelable) {
      this._canceledFlag = true;
    }
  }

  _initialize(type, bubbles, cancelable) {
    this._initializedFlag = true;

    this._stopPropagationFlag = false;
    this._stopImmediatePropagationFlag = false;
    this._canceledFlag = false;

    this.isTrusted = false;
    this.target = null;
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
  }

  initEvent(type, bubbles, cancelable) {
    if (this._dispatchFlag) {
      return;
    }

    this._initialize(type, bubbles, cancelable);
  }
}

module.exports = {
  implementation: EventImpl
};
