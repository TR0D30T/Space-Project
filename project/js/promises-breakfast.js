const order = false;

const breakfastPromise = new Promise( (resolve, reject ) => {
    setTimeout(() => {
       if ( order ) {
           resolve(' Your order is ready')
       } else {
           reject( Error (' Your order could not be made'));
       }
    }, 3000)
})


//to call methods on the Promise object, like then() and catch()
console.log(breakfastPromise);
breakfastPromise
//When the status of a promise changes to resolved, the function passed to then() gets called
.then( value => console.log(value) )
//When the status changes to rejected, the function passed to catch() is invoked
//It's best to specify a rejection reason and call catch() on a promise – if you don’t, the promise will silently fail
.catch( err => console.log(err) );