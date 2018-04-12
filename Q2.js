"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var assert = require("assert");
var y = function (x) { return x + 2; }; //1.3.3
;
//TreePreArray definition
var TreePreArray = function (tree) {
    if (tree.right === undefined && tree.left != undefined) {
        return [tree.root].concat(TreePreArray(tree.left));
    }
    else if (tree.left === undefined && tree.right != undefined) {
        return [tree.root].concat(TreePreArray(tree.right));
    }
    else if (tree.right === undefined && tree.left === undefined) {
        return [tree.root];
    }
    else {
        return [tree.root].concat(TreePreArray(tree.left).concat(TreePreArray(tree.right)));
    }
};
//TreeInArray definition
var TreeInArray = function (tree) {
    if (tree.right === undefined && tree.left != undefined) {
        return TreeInArray(tree.left).concat(tree.root);
    }
    else if (tree.left === undefined && tree.right != undefined) {
        return [tree.root].concat(TreePreArray(tree.right));
    }
    else if (tree.right === undefined && tree.left === undefined) {
        return [tree.root];
    }
    else {
        return TreeInArray(tree.left).concat(tree.root).concat(TreeInArray(tree.right));
    }
};
//TreePostArray definition
var TreePostArray = function (tree) {
    if (tree.right === undefined && tree.left != undefined) {
        return [tree.root].concat(TreePostArray(tree.left));
    }
    else if (tree.left === undefined && tree.right != undefined) {
        return TreePostArray(tree.right).concat(tree.root);
    }
    else if (tree.right === undefined && tree.left === undefined) {
        return [tree.root];
    }
    else {
        return TreePostArray(tree.right).concat(tree.root).concat(TreePostArray(tree.left));
    }
};
;
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.4 GBinTreePostArray
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
var GBinTreePreArray = function (tree) {
    if (tree.right === undefined && tree.left != undefined) {
        return [tree.root].concat(GBinTreePreArray(tree.left));
    }
    else if (tree.left === undefined && tree.right != undefined) {
        return [tree.root].concat(GBinTreePreArray(tree.right));
    }
    else if (tree.right === undefined && tree.left === undefined) {
        return [tree.root];
    }
    else {
        return [tree.root].concat(GBinTreePreArray(tree.left).concat(GBinTreePreArray(tree.right)));
    }
};
/**
 * ~~~~~~~~~~~~~~~~~~~~a~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.1.5 GBinTreeInArray
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
var GBinTreeInArray = function (tree) {
    if (tree.right === undefined && tree.left != undefined) {
        return GBinTreeInArray(tree.left).concat(tree.root);
    }
    else if (tree.left === undefined && tree.right != undefined) {
        return [tree.root].concat(GBinTreePreArray(tree.right));
    }
    else if (tree.right === undefined && tree.left === undefined) {
        return [tree.root];
    }
    else {
        return GBinTreePreArray(tree.left).concat(tree.root).concat(GBinTreePreArray(tree.right));
    }
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.1.6 GBinTreePostArray
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
var GBinTreePostArray = function (tree) {
    if (tree.right === undefined && tree.left != undefined) {
        return [tree.root].concat(GBinTreePreArray(tree.left));
    }
    else if (tree.left === undefined && tree.right != undefined) {
        return GBinTreePreArray(tree.right).concat(tree.root);
    }
    else if (tree.right === undefined && tree.left === undefined) {
        return [tree.root];
    }
    else {
        return GBinTreePreArray(tree.right).concat(tree.root).concat(GBinTreePreArray(tree.left));
    }
};
var KSubsets = function (elements, k) {
    return AllSubsets(elements).filter(function (value) { return value.length === k; });
};
var recAllsubsets = function (elements, index, accumulator) {
    if (index >= elements.length)
        return (accumulator);
    return (recAllsubsets(elements, index + 1, accumulator.concat(accumulator.map(function (x) { return x.concat([elements[index]]); }))));
};
var AllSubsets = function (elements) {
    return recAllsubsets(elements, 0, [[]]);
};
// console.log(KSubsets ([1,2,3,4,5],3) );
// console.log(AllSubsets([1,2,3,4]))
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.3.1 Flatmap Definition
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
var Flatmap = function (f, A) {
    return ramda_1.map(f, A).reduce(function (acc, curr) { return acc.concat(curr); });
};
var getBoxArts = function (list) {
    return Flatmap(function (x) { return x.videos; }, list).map(function (x) {
        return ({ id: x.id, title: x.title, boxart: x.boxarts.filter(function (y) { return y.height === 200 && y.width === 150; }).reduce(function (acc, curr) { return curr.url; }, {}) });
    });
};
/**
 *********************************************************************************************************************
 *********************************************************************************************************************
 *                                      TESTING PART
 *********************************************************************************************************************
 *********************************************************************************************************************
 * */
var fullTree = {
    root: 1,
    left: { root: 2, left: { root: 3 }, right: { root: 5 } },
    right: { root: 4, left: { root: 6 }, right: { root: 7 } }
};
var leftBranch = {
    root: 1,
    left: { root: 2,
        left: { root: 3,
            left: { root: 4,
                left: { root: 5 } } } }
};
var rightBranch = {
    root: 1,
    right: { root: 2,
        right: { root: 3,
            right: { root: 4,
                right: { root: 5 } } } }
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.1 TreePreArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(TreePreArray(fullTree)) == JSON.stringify([1, 2, 3, 5, 4, 6, 7]), "TreePreArray fulltree issue");
assert.ok(JSON.stringify(TreePreArray(leftBranch)) == JSON.stringify([1, 2, 3, 4, 5]), "TreePreArray leftBranch issue");
assert.ok(JSON.stringify(TreePreArray(rightBranch)) == JSON.stringify([1, 2, 3, 4, 5]), "TreePreArray leftBranch issue");
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.1 TreeInArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(TreeInArray(fullTree)) == JSON.stringify([3, 2, 5, 1, 6, 4, 7]), "TreeInArray fulltree issue");
assert.ok(JSON.stringify(TreeInArray(leftBranch)) == JSON.stringify([5, 4, 3, 2, 1]), "TreeInArray leftBranch issue");
assert.ok(JSON.stringify(TreeInArray(rightBranch)) == JSON.stringify([1, 2, 3, 4, 5]), "TreeInArray leftBranch issue");
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.1 TreePostArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(TreePostArray(fullTree)) == JSON.stringify([3, 5, 2, 6, 7, 4, 1]), "TreePostArray fulltree issue");
assert.ok(JSON.stringify(TreePostArray(leftBranch)) == JSON.stringify([5, 4, 3, 2, 1]), "TreePostArray leftBranch issue");
assert.ok(JSON.stringify(TreePostArray(rightBranch)) == JSON.stringify([5, 4, 3, 2, 1]), "TreePostArray leftBranch issue");
var fullStringTree = {
    root: "1",
    left: { root: "2", left: { root: "3" }, right: { root: "5" } },
    right: { root: "4", left: { root: "6" }, right: { root: "7" } }
};
var NumberArrayleftBranch = {
    root: [1],
    left: { root: [2],
        left: { root: [3],
            left: { root: [4],
                left: { root: [5] } } } }
};
var NumberArrayrightBranch = {
    root: 1,
    right: { root: 2,
        right: { root: 3,
            right: { root: 4,
                right: { root: 5 } } } }
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.1.4 GBinTreePreArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(GBinTreePreArray(fullStringTree)) == JSON.stringify(['1', '2', '3', '5', '4', '6', '7']), "GBinTreePreArray fullStringTree issue");
assert.ok(JSON.stringify(GBinTreePreArray(NumberArrayleftBranch)) == JSON.stringify([[1], [2], [3], [4], [5]]), "GBinTreePreArray NumberArrayleftBranch issue");
assert.ok(JSON.stringify(GBinTreePreArray(NumberArrayrightBranch)) == JSON.stringify([1, 2, 3, 4, 5]), "GBinTreePreArray NumberArrayrightBranch issue");
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.1.5 GBinTreeInArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(GBinTreeInArray(fullStringTree)) == JSON.stringify(['3', '2', '5', '1', '6', '4', '7']), "GBinTreeInArray fullStringTree issue");
assert.ok(JSON.stringify(GBinTreeInArray(NumberArrayleftBranch)) == JSON.stringify([[[5], [4], [3], [2], [1]]]), "GBinTreeInArray NumberArrayleftBranch issue");
assert.ok(JSON.stringify(GBinTreeInArray(NumberArrayrightBranch)) == JSON.stringify([1, 2, 3, 4, 5]), "GBinTreeInArray NumberArrayrightBranch issue");
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.1.6 GBinTreePostArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(GBinTreePostArray(fullStringTree)) == JSON.stringify(['3', '5', '2', '6', '7', '4', '1']), "GBinTreePostArray fullStringTree issue");
assert.ok(JSON.stringify(GBinTreePostArray(NumberArrayleftBranch)) == JSON.stringify([[5], [4], [3], [2], [1]]), "GBinTreePostArray NumberArrayleftBranch issue");
assert.ok(JSON.stringify(GBinTreePostArray(NumberArrayrightBranch)) == JSON.stringify([5, 4, 3, 2, 1]), "GBinTreePostArray NumberArrayrightBranch issue");
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.3.1 Flatmap testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
//TODO test flatmap
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.3.2 Using Flatmap testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
//TODO test getBoxArts()
var mylist = [
    {
        name: "Instant Queue",
        videos: [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "New Releases",
        videos: [
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
];
