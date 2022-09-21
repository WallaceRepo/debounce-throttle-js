
myQuerySelectorAll = function(selector) {
    var result = [];
    traverse(document.documentElement)
    return result;
}

function traverse(node) {
        if (node === null) return;

        if(isMatch(node, selector)) result.push(node);

        for(let child of node.children) {
          traverse(child)
        }
 }
 function isMatch(element, selector){
  return element.tagName === selector.toUpperCase() || element.classList.contains(selector)
 }

 

// Debounce() function. it's used for not to trigger on every single user input to call or dave data etc, I used before.
 


 function debounceFunc(func, wait, immediate) {
       var timeout;
        return function toExecute(){
           var context = this;
           var args = arguments;

           var later = function(){
            timeout = null;
            if ( !immediate) func.apply(context, args)
           }

           var CallNow = immediate && !timeout;

           clearTimeout(timeout);
            timeout = setTimeout(later, wait)

            if( CallNow) func.apply(context, args)

        }
 }
 // In Javascript, arguments is a local JavaScript object variable that is available in all non-arrow functions. arguments is an Array-like object accessible inside functions that contain the values of the arguments passed to that function.
 //Since the arguments object isn’t an array, we first have to convert it into an array using the Array.from method before we can use the reduce method.
 // The rest parameter provides an easier and cleaner way of working with an indefinite number of arguments. Let’s rewrite the above example with a rest parameter.
// Using the rest parameter, which is the same syntax as the spread operator, we can pass an indefinite number of parameters to our function.
// The main difference between rest parameters and the arguments object is:

// All the array methods like map, sort, and filter can be applied directly on the rest parameters array but not on the arguments object. To use Array methods on the arguments object, it must be converted to a real array first.
// The arguments object has additional functionality specific to itself (like the callee property).

 //es5 approach
function add() {
  //console.log(arguments);
  const args = Array.from(arguments);
  return args.reduce((acc, cur) => acc + cur);
}

//console.log(add(3, 4, 5, 6, 7, 8, 10, 40));   // 33

//es6 spread operator
function sum(...args){
  return args.reduce((acc, cur) => acc + cur);
}

console.log(sum(3, 4, 5, 6, 7, 8, 10, 40));  
// using this with query, it will make network reqeust for
// every single character entering to input tag. 
// Solution is to use Debounce func or Throttle func
// it waits for every single char I type in input.
// Then, if we pass wait time then the fucniton will be 
// called to send network request

 const input = document.getElementsByTagName("input")[0]
 const defaultText = document.getElementById("def");
 const debounce = document.getElementById('debounce')
 const throttle = document.getElementById("throttle")

input.addEventListener("input", e => {
    defaultText.innerText = e.target.value;
    updateDebounceText(e.target.value)
    updateThrottleText(e.target.value);
})
 

const updateDebounceText = Debounce(( text)=> {
   debounce.innerText = text
}, 250)



function Debounce(callback, delay = 1000) {
  let timeout
   
     return (...args) => {
     
      clearTimeout(timeout)
       timeout = setTimeout(()=> {
          callback(...args)
        }, delay)
     }
}
    
// Throttle function
// mouse moving, window resizing etc use this func

const updateThrottleText = Throttle(( text => {
  throttle.textContent = text
}))

// There are 2 main ways to create Throttle
// easier way
function Throttle(callback, delay=1000){
  let shouldWait = false
  let waitingArgs

  const timeoutFunc = ()=> {
     if(waitingArgs === null) {
             shouldWait = false
           } else {
            callback(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
           }
  }
   return (...args) => {

        if(shouldWait) {
           waitingArgs = args
           return
        }
         callback(...args)
         shouldWait = true
         setTimeout(timeoutFunc, delay)
    }
}

/// Throttle example

const input1 = document.getElementsByTagName("input")[1]
const defaultText1 = document.getElementById("def1");
const debounce1 = document.getElementById('debounce1')
const throttle1 = document.getElementById("throttle1")

input.addEventListener("input1", e => {
   defaultText1.innerText = e.target.value;
   updateDebounceText1(e.target.value)
   updateThrottleText1(e.target.value);
})

document.addEventListener("mousemove", e => {
    //  IncrementCount(def1)
    //  updateDebounceText1()
    //  updateThrottleText1()
})

function IncrementCount(element) {
  element.textContent = (parseInt(element.innerText) || 0) + 1
}

const updateDebounceText1 = Debounce(()=> {
    IncrementCount(debounce1)
})

const updateThrottleText1 = Throttle(()=> {
    IncrementCount(throttle1)
})