"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.neq = exports.eq = exports.gte = exports.gt = exports.lte = exports.lt = exports.BinaryRelationalOperator = void 0;
var ResultValue_1 = require("./ResultValue");
var util_1 = require("./util");
var BinaryRelationalOperator;
(function (BinaryRelationalOperator) {
    BinaryRelationalOperator[BinaryRelationalOperator["LESS"] = 0] = "LESS";
    BinaryRelationalOperator[BinaryRelationalOperator["LESSEQ"] = 1] = "LESSEQ";
    BinaryRelationalOperator[BinaryRelationalOperator["GREATER"] = 2] = "GREATER";
    BinaryRelationalOperator[BinaryRelationalOperator["GREATEREQ"] = 3] = "GREATEREQ";
    BinaryRelationalOperator[BinaryRelationalOperator["EQUAL"] = 4] = "EQUAL";
    BinaryRelationalOperator[BinaryRelationalOperator["NOTEQ"] = 5] = "NOTEQ";
})(BinaryRelationalOperator = exports.BinaryRelationalOperator || (exports.BinaryRelationalOperator = {}));
var BinaryRelationalPredicate = (function () {
    function BinaryRelationalPredicate(left, right, operator) {
        this.left = left;
        this.right = right;
        this.op = operator;
    }
    BinaryRelationalPredicate.prototype.eval = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var lEval, rEval, lVal, rVal, val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.left.eval(options)];
                    case 1:
                        lEval = _a.sent();
                        return [4, this.right.eval(options)];
                    case 2:
                        rEval = _a.sent();
                        if (lEval.isError || rEval.isError) {
                            return [2, (0, ResultValue_1.error)("Error evaluating Relational Binary Expression: " +
                                    lEval.errorMessage +
                                    " " +
                                    rEval.errorMessage)];
                        }
                        lVal = lEval.value;
                        rVal = rEval.value;
                        if (typeof lVal !== typeof rVal) {
                            return [2, (0, ResultValue_1.error)("Error evaluating Relational Binary Expression: Left and Right operands are not of the same type. Left type is " +
                                    typeof lVal +
                                    " and Right type is " +
                                    typeof rVal)];
                        }
                        if (typeof lVal === "string" &&
                            this.op !== BinaryRelationalOperator.EQUAL &&
                            this.op !== BinaryRelationalOperator.NOTEQ) {
                            return [2, (0, ResultValue_1.error)("Error evaluating Relational Binary Expression: Left and Right operands are strings. Operator " +
                                    this.op +
                                    " is not supported")];
                        }
                        switch (this.op) {
                            case BinaryRelationalOperator.LESS:
                                val = lVal < rVal;
                                break;
                            case BinaryRelationalOperator.LESSEQ:
                                val = lVal <= rVal;
                                break;
                            case BinaryRelationalOperator.GREATER:
                                val = lVal > rVal;
                                break;
                            case BinaryRelationalOperator.GREATEREQ:
                                val = lVal >= rVal;
                                break;
                            case BinaryRelationalOperator.EQUAL:
                                val = lVal === rVal;
                                break;
                            case BinaryRelationalOperator.NOTEQ:
                                val = lVal !== rVal;
                                break;
                        }
                        if (val === undefined) {
                            return [2, (0, ResultValue_1.error)("Error evaluating Relational Binary Expression: Invalid binary relational operator " +
                                    this.op)];
                        }
                        return [2, (0, ResultValue_1.value)(val)];
                }
            });
        });
    };
    BinaryRelationalPredicate.prototype.equals = function (other) {
        if (other instanceof BinaryRelationalPredicate) {
            return (this.left.equals(other.left) &&
                this.right.equals(other.right) &&
                this.op === other.op);
        }
        return false;
    };
    return BinaryRelationalPredicate;
}());
function lt(left, right) {
    return (0, util_1.numberFunction)(left, right, function (l, r) { return new BinaryRelationalPredicate(l, r, BinaryRelationalOperator.LESS); });
}
exports.lt = lt;
function lte(left, right) {
    return (0, util_1.numberFunction)(left, right, function (l, r) {
        return new BinaryRelationalPredicate(l, r, BinaryRelationalOperator.LESSEQ);
    });
}
exports.lte = lte;
function gt(left, right) {
    return (0, util_1.numberFunction)(left, right, function (l, r) {
        return new BinaryRelationalPredicate(l, r, BinaryRelationalOperator.GREATER);
    });
}
exports.gt = gt;
function gte(left, right) {
    return (0, util_1.numberFunction)(left, right, function (l, r) {
        return new BinaryRelationalPredicate(l, r, BinaryRelationalOperator.GREATEREQ);
    });
}
exports.gte = gte;
function eq(left, right) {
    return (0, util_1.attrValueFunction)(left, right, function (l, r) {
        return new BinaryRelationalPredicate(l, r, BinaryRelationalOperator.EQUAL);
    });
}
exports.eq = eq;
function neq(left, right) {
    return (0, util_1.attrValueFunction)(left, right, function (l, r) {
        return new BinaryRelationalPredicate(l, r, BinaryRelationalOperator.NOTEQ);
    });
}
exports.neq = neq;
