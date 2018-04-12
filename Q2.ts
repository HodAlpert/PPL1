
import { map } from 'ramda'
import {filter} from 'ramda'
import {reduce} from 'ramda'
import assert = require('assert')

interface v1{//type for q 1.3.1
    name: string,
    age: number
}

interface child{//type for q 1.3.2
    children:({name:string}|{age:number})[]
}

type f=(x:number)=>number//type for q 1.3.3
let y:f=(x)=>x+2//1.3.3

type v4 = (f:Function, l:any[]) => any[];//type for q 1.3.4

/**
 *********************************************************************************************************************
 *********************************************************************************************************************
 *                                      PROGRAMMING PART
 *********************************************************************************************************************
 *********************************************************************************************************************
 * */

interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.1 TreePreArray
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
//TreePreArray type
type TreePreArrayType=(tree: BinTree)=>number[];
//TreePreArray definition
const TreePreArray:TreePreArrayType= (tree)=>{
    if(tree.right===undefined&&tree.left!=undefined){
        return [tree.root].concat(TreePreArray(tree.left))
    }
    else if (tree.left===undefined&&tree.right!=undefined){
        return [tree.root].concat(TreePreArray(tree.right))
    }
    else if(tree.right===undefined&&tree.left===undefined){
        return [tree.root]
    }
    else{
        return [tree.root].concat(TreePreArray(tree.left).concat(TreePreArray(tree.right)))

    }
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.2 TreeInArray
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
//TreeInArray type
type TreeInArrayType=(tree: BinTree)=>number[];
//TreeInArray definition
const TreeInArray:TreePreArrayType= (tree)=>{
    if(tree.right===undefined&&tree.left!=undefined){
        return TreeInArray(tree.left).concat(tree.root)
    }
    else if (tree.left===undefined&&tree.right!=undefined){
        return [tree.root].concat(TreePreArray(tree.right))
    }
    else if(tree.right===undefined&&tree.left===undefined){
        return [tree.root]
    }
    else{
        return TreeInArray(tree.left).concat(tree.root).concat(TreeInArray(tree.right))
    }
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.3 TreePostArray
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
//TreePostArray type
type TreePostArrayType=(tree: BinTree)=>number[];
//TreePostArray definition
const TreePostArray:TreePostArrayType= (tree)=>{
    if(tree.right===undefined&&tree.left!=undefined){
        return [tree.root].concat(TreePostArray(tree.left))
    }
    else if (tree.left===undefined&&tree.right!=undefined){
        return TreePostArray(tree.right).concat(tree.root)
    }
    else if(tree.right===undefined&&tree.left===undefined){
        return [tree.root]
    }
    else{
        return   TreePostArray(tree.right).concat(tree.root).concat(TreePostArray(tree.left))
    }
};

interface GBinTree<T> {
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.4 GBinTreePostArray
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */

const GBinTreePreArray:<T> (tree: GBinTree<T>)=>T[]=(tree)=>{
    if(tree.right===undefined&&tree.left!=undefined){
        return [tree.root].concat(GBinTreePreArray(tree.left))
    }
    else if (tree.left===undefined&&tree.right!=undefined){
        return [tree.root].concat(GBinTreePreArray(tree.right))
    }
    else if(tree.right===undefined&&tree.left===undefined){
        return [tree.root]
    }
    else{
        return [tree.root].concat(GBinTreePreArray(tree.left).concat(GBinTreePreArray(tree.right)))
    }
};
/**
 * ~~~~~~~~~~~~~~~~~~~~a~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.1.5 GBinTreeInArray
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
const GBinTreeInArray:<T> (tree: GBinTree<T>)=>T[]=(tree)=>{
    if(tree.right===undefined&&tree.left!=undefined){
        return GBinTreeInArray(tree.left).concat(tree.root)
    }
    else if (tree.left===undefined&&tree.right!=undefined){
        return [tree.root].concat(GBinTreePreArray(tree.right))
    }
    else if(tree.right===undefined&&tree.left===undefined){
        return [tree.root]
    }
    else{
        return GBinTreePreArray(tree.left).concat(tree.root).concat(GBinTreePreArray(tree.right))
    }
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.1.6 GBinTreePostArray
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
const GBinTreePostArray:<T> (tree: GBinTree<T>)=>T[]=(tree)=>{
    if(tree.right===undefined&&tree.left!=undefined){
        return [tree.root].concat(GBinTreePreArray(tree.left))
    }
    else if (tree.left===undefined&&tree.right!=undefined){
        return GBinTreePreArray(tree.right).concat(tree.root)
    }
    else if(tree.right===undefined&&tree.left===undefined){
        return [tree.root]
    }
    else{
        return GBinTreePreArray(tree.right).concat(tree.root).concat(GBinTreePreArray(tree.left))
    }
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.2.1 KSubsets
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
type KSubsetsType=(elements:any[], k:number)=>any[][]//KSubsets type
const KSubsets:KSubsetsType = (elements,k)=>{//KSubsets definition
    return AllSubsets(elements).filter((value: any[])=>value.length===k)
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.2.2 AllSubsets
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
type AllSubsetsType = (elements:any[])=>any[]//AllSubsets type
const recAllsubsets = function(elements:any[],index:number,accumulator:any[][]):any[][]{
    if (index>=elements.length)
        return (accumulator);
    return (recAllsubsets(elements,index+1,accumulator.concat(accumulator.map((x)=>x.concat([elements[index]])))))
};

const AllSubsets:AllSubsetsType = (elements)=>{//AllSubsets definition
    return recAllsubsets(elements,0,[[]])
};
// console.log(KSubsets ([1,2,3,4,5],3) );
// console.log(AllSubsets([1,2,3,4]))
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.3.1 Flatmap Definition
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
const Flatmap:<T,R> (f:(x:T)=>R[],A:T[])=>R[]=(f,A)=>{
    return map(f,A).reduce((acc,curr)=>acc.concat(curr))
};

/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.3.2 Using Flatmap
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
// console.log(Flatmap((x)=>x[0], [[[1,2], [3,4]], [[5,6], [7,8]]]) )
interface boxart{
    width: number, height: number, url:string;
}
interface bookmark{
    id: number, time:number;
}
interface video{
    id:number,
    title: string,
    boxarts: boxart[],
    url: string,
    rating: number,
    bookmark: bookmark[]
}
interface movieList{
    name: string,
    videos: video[]
}
interface boxartVideo{
    id: number,
    title: string,
    boxart: string,
}
type getBoxArtsType = (list: movieList[])=>boxartVideo[]
const getBoxArts:getBoxArtsType=(list)=>{
    return Flatmap<movieList,video>((x)=>x.videos,list).map((x)=>
        <boxartVideo>{id:x.id,title:x.title, boxart:x.boxarts.filter((y:boxart)=>y.height===200&&y.width===150).reduce((acc,curr)=>curr.url,{})})

};

/**
 *********************************************************************************************************************
 *********************************************************************************************************************
 *                                      TESTING PART
 *********************************************************************************************************************
 *********************************************************************************************************************
 * */
const fullTree:BinTree = {
    root:1,
    left:{root:2, left: {root:3},right: {root:5}},
    right: {root:4, left: {root:6},right:{root:7}}
};
const leftBranch:BinTree = {
    root:1,
    left:{root:2,
        left:{root:3,
            left:{root:4,
                left:{root:5}}}}
};
const rightBranch:BinTree= {
    root:1,
    right:{root:2,
        right:{root:3,
            right:{root:4,
                right:{root:5}}}}
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.1 TreePreArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(TreePreArray(fullTree))==JSON.stringify([ 1, 2, 3, 5, 4, 6, 7 ]),"TreePreArray fulltree issue");
assert.ok(JSON.stringify(TreePreArray(leftBranch))==JSON.stringify([ 1, 2, 3, 4, 5 ]),"TreePreArray leftBranch issue");
assert.ok(JSON.stringify(TreePreArray(rightBranch))==JSON.stringify([ 1, 2, 3, 4, 5 ]),"TreePreArray leftBranch issue");
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.1 TreeInArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(TreeInArray(fullTree))==JSON.stringify([ 3,2,5,1,6,4,7 ]),"TreeInArray fulltree issue");
assert.ok(JSON.stringify(TreeInArray(leftBranch))==JSON.stringify([ 5,4,3,2,1 ]),"TreeInArray leftBranch issue");
assert.ok(JSON.stringify(TreeInArray(rightBranch))==JSON.stringify([ 1, 2, 3, 4, 5 ]),"TreeInArray leftBranch issue");
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q.2.1.1 TreePostArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(TreePostArray(fullTree))==JSON.stringify([3,5,2,6,7,4,1]),"TreeInArray fulltree issue");
assert.ok(JSON.stringify(TreePostArray(leftBranch))==JSON.stringify([ 5,4,3,2,1 ]),"TreeInArray leftBranch issue");
assert.ok(JSON.stringify(TreePostArray(rightBranch))==JSON.stringify([ 5,4,3,2,1 ]),"TreeInArray leftBranch issue");
const fullStringTree:GBinTree<string> = {
    root:"1",
    left:{root:"2", left: {root:"3"},right: {root:"5"}},
    right: {root:"4", left: {root:"6"},right:{root:"7"}}
};
const NumberArrayleftBranch:GBinTree<number[]> = {
    root:[1],
    left:{root:[2],
        left:{root:[3],
            left:{root:[4],
                left:{root:[5]}}}}
};
const NumberArrayrightBranch:GBinTree<number>= {
    root:1,
    right:{root:2,
        right:{root:3,
            right:{root:4,
                right:{root:5}}}}
};
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.1.4 GBinTreePreArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(GBinTreePreArray<string>(fullStringTree))==JSON.stringify([ '1', '2', '3', '5', '4', '6', '7' ]),"GBinTreePreArray fullStringTree issue");
assert.ok(JSON.stringify(GBinTreePreArray<number[]>(NumberArrayleftBranch))==JSON.stringify([ [1], [2], [3], [4], [5] ]),"GBinTreePreArray NumberArrayleftBranch issue");
assert.ok(JSON.stringify(GBinTreePreArray<number>(NumberArrayrightBranch))==JSON.stringify([ 1, 2, 3, 4, 5 ]),"GBinTreePreArray NumberArrayrightBranch issue");
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.1.5 GBinTreeInArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(GBinTreeInArray<string>(fullStringTree))==JSON.stringify([ '3','2','5','1','6','4','7' ]),"GBinTreeInArray fullStringTree issue");
assert.ok(JSON.stringify(GBinTreeInArray<number[]>(NumberArrayleftBranch))==JSON.stringify([ [ [5],[4],[3],[2],[1] ] ]),"GBinTreeInArray NumberArrayleftBranch issue");
assert.ok(JSON.stringify(GBinTreeInArray<number>(NumberArrayrightBranch))==JSON.stringify([ 1, 2, 3, 4, 5 ]),"GBinTreeInArray NumberArrayrightBranch issue");
/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Q2.1.6 GBinTreePostArray testing
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
assert.ok(JSON.stringify(GBinTreePostArray<string>(fullStringTree))==JSON.stringify(['3','5','2','6','7','4','1']),"GBinTreePostArray fullStringTree issue");
assert.ok(JSON.stringify(GBinTreePostArray<number[]>(NumberArrayleftBranch))==JSON.stringify([ [5],[4],[3],[2],[1] ]),"GBinTreePostArray NumberArrayleftBranch issue");
assert.ok(JSON.stringify(GBinTreePostArray<number>(NumberArrayrightBranch))==JSON.stringify([ 5,4,3,2,1 ]),"GBinTreePostArray NumberArrayrightBranch issue");

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
let mylist: movieList[] = [
    {
        name: "Instant Queue",
        videos : [
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
]