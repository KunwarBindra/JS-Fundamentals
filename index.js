var a = 100;
function abc(param) {          // higher order function - takes a callback function as argument, also returns a function
  a = 75;                      //
  return function (innerParam) //
  {                            //
    console.log(innerParam);   // closure
    param();                   //
  };                           //
}

var c = abc(function () {  // callback function
  console.log("I am a callback function!");
});
c(a);

var x = 100;
if (true) {
  //   console.log(a); // temporal dead zone
  let a = 100;        // block scoped
}
if (true) {
  //   console.log(a); // temporal dead zone
  const a = 100;       // block scoped
}

const radiusArr = [3, 5, 1, 2]
function calculateArea (radiusArr) {   // function declaration or function statement
    const areaArr = []
    for (let i=0; i<radiusArr.length; i++) {
        const circleArea = Math.PI * radiusArr[i] * radiusArr[i]
        areaArr.push(circleArea)
    }
    return areaArr
}

const circleAreaArr = calculateArea(radiusArr)
console.log(circleAreaArr)

function cb(param) {
    document.getElementById('test-cb').addEventListener('click', function(){  // callback function
        console.log('cb called!', param)
    })
}

cb(a);

// function expression
var k = function() {
    console.log('function expression')
}
k()

// A Promise is an object representing the eventual completion or failure of an asynchronous operation.
const p1 = new Promise(function(resolve, reject){
  setTimeout(() => {
    resolve("Promise 1 resolved!")
  }, 10000)
})

const p2 = new Promise(function(resolve, reject){
  setTimeout(() => {
    resolve("Promise 2 resolved!")
  }, 5000)
})

const p3 = new Promise(function(resolve, reject){
  setTimeout(() => {
    reject(new Error("Promise 3 rejected!"))
  }, 2000)
})

console.log(p1)
console.log(p2)

async function promiseShowcase() {
  console.log('hello world')
  const val1 = await p1
  console.log('namaste world')
  console.log(val1)
  const val2 = await p2
  console.log(val2)
  console.log('hola world')
}

Promise.all([p1, p2]).then(function(res) {
  console.log(res)
})

Promise.allSettled([p1, p2, p3]).then(function(res) {
  console.log(res)
})

Promise.race([p1, p2, p3]).then(function(res) {
  console.log(res)
}).catch(function(res) {
  console.log(res.message)
})

Promise.any([p1, p2, p3]).then(function(res) {
  console.log(res)
})


// 'use strict'
console.log(this)

function thisValue1(param1, param2) {
  console.log(param1)
  console.log(param2)
  console.log(this) // in non-strict mode, this will refer to global object
}
thisValue1()
// this substitution - if the value of this is null or undefined, it will be replaced by global object

window.thisValue1()

const obj1 = {
  a: 1
}

const obj2 = {
  b: 1
}

thisValue1.call(obj1, 'hello world1', '!')
thisValue1.call(obj2, 'hello world1', '!')

thisValue1.apply(obj1, ['hello world2', '!'])
thisValue1.apply(obj2, ['hello world2', '!'])

let thisValueCopy1 = thisValue1.bind(obj1)
thisValueCopy1('testing', 'bind1')

let thisValueCopy2 = thisValue1.bind(obj2)
thisValueCopy2('testing', 'bind2')

const obj3 = {
  a: 1,
  b: function() {
    console.log(this.a)
    const c = 1
    function inner() {
      console.log(this) // will be undefined in strict mode while in non-strict mode, will refer to window
    }
    inner() // it is called as a standalone function, not as a method of an object. Hence, 'this' inside inner() refers to the global object or 'undefined'
  }
}

obj3.b()

const obj4 = {
  a: 1,
  b: function() {
    console.log(this)
  }
}

setTimeout(obj4.b, 5000) // function will be copied inside setTimeout and it will no longer have access to the object, so this will point to window object.

const obj4Fixed = {
  a: 1,
  b: function() {
    console.log(this)
  }
}

setTimeout(function() {
  obj4Fixed.b()
}, 5000)

const obj5 = {
  a: 1,
  b: () => {
    console.log(this) // in case of arrow function, 'this' inherits its value from the normal parent function. 
                      // Since there is no normal parent function involved here, so this points to window.
  }
}

obj5.b()

const obj6 = {
  a: 1,
  b: function() {
    console.log(this)
    const arrowFunc = () => {
      console.log(this) // 'this' here inherits its value from the parent function
    }
    arrowFunc()
  }
}

obj6.b()

function makeUser() {
  return {
    a: 1,
    b: this
  }
}

console.log(makeUser()) // when we are calling makeUser() here, parent object is window, so this will point to window

function makeUserFixed() {
  return {
    a: 1,
    b: function() {
      console.log(this.a)
    }
  }
}

makeUserFixed().b()

var length = 4
function callback() {
  console.log(this.length) // 'this' will point to the arguments array
}

const obj7 = {
  length: 5,
  method() {
    console.log(arguments)
    arguments[0]()
  }
}

obj7.method(callback, 2, 3)

