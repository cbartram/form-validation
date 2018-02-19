'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function Util() {
    _classCallCheck(this, Util);
};

Util.isBetween = function (value, min, max) {
    min = parseInt(min);
    max = parseInt(max);

    if (value > max) {
        return false;
    }

    if (value < min) {
        return false;
    }

    return !(value === max || value === min);
};

Util.isNullOrUndefined = function (value) {
    return typeof value === 'undefined' || value === null || value.length === 0;
};

Util.hasDuplicates = function (array) {
    return new Set(array).size !== array.length;
};

exports.default = Util;