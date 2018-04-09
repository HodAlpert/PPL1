import { map } from 'ramda'
import {filter} from 'ramda'
import {reduce} from 'ramda'
import assert = require('assert')
import { currentId } from 'async_hooks';


interface T1{
    name:string
}
interface T2{
    age: number
}
type T3=T1|T2
interface v2{
    children:T3[]
}
interface child{
    children:({name:string}|{age:number})[]
}
const t:child={children: [{name: "jhon"},{age:12},{name:"dfasgdfjka"}]}

type f=(x:number)=>number
let y:f=(x)=>x+2//1.3.3
console.log(y(5))

type v4 = (f:Function, l:any[]) => any[];//1.3.3

console.log(t)
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//2.1
interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
};

const TreePreArray= function(tree: BinTree):number[]{
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
interface GBinTree<T> {
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};

let bn : GBinTree<string> = {
    root: "1",
    left: { root: "2" },
    right: { root: "3", 
             right: { root: "4"}
    }
}
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
}
console.log(GBinTreePreArray<string>(bn))
const recAllsubsets = function(elements:any[],index:number,accumulator:any[][]):any[][]{
    if (index>=elements.length)
        return (accumulator)
    return (recAllsubsets(elements,index+1,accumulator.concat(accumulator.map((x)=>x.concat([elements[index]])))))
}
const AllSubsets = function(elements:any[]):any[][]{
    return recAllsubsets(elements,0,[[]])
}
const KSubsets = function(elements: any[],k:number):any[][]{
    return AllSubsets(elements).filter((value: any[])=>value.length===k)
}
const isKlength = function(element: any[],k: number):boolean{
    return element.length===k
}
console.log(KSubsets ([1,2,3,4,5],3) )
// console.log(AllSubsets([1,2,3,4]))



const Flatmap:<T,R> (f:(x:T)=>R[],A:T[])=>R[]=(f,A)=>{
    return map(f,A).reduce((acc,curr)=>acc.concat(curr))
}

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

const getBoxArts:(list: movieList[])=>boxartVideo[]=(list)=>{
    return Flatmap<movieList,video>((x)=>x.videos,list).map((x)=> 
    <boxartVideo>{id:x.id,title:x.title, boxart:x.boxarts.filter((y:boxart)=>y.height===200&&y.width===150).reduce((acc,curr)=>curr.url,{})})
        
}


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
console.log(getBoxArts(mylist))