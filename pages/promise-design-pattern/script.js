console.log('promise-design-pattern works!!');

// A Promise producing function.
// let asyncFunction = function () {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () { resolve('asyncFunction resolved after 2000ms'); }, 2000)
//   });
// }

// A Promise producing function
// let asyncFunction2 = function () {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () { resolve('asyncFunction2 resolved after 3000ms'); }, 3000)
//   });
// }

// let promise = asyncFunction();
// console.log(promise);

// let promise2 = promise.then((data) => {
//   console.log(data);
//   return asyncFunction2();
// });

// promise2.then((data) => console.log(data));

// chaining example.
// asyncFunction().then((data) => {
//   // console.log(data);
//   return asyncFunction2();
// })
//   .then((data) => {
//     console.log(data);
//   });

// using APIs - fetch returns a promise.
// Its much easier to read 

// fetch('https://api.github.com/users/vivmagarwal')
//   .then(function (data) {
//     console.log(data);
//     return data.json(); // fetch provides us this json function. data.json returns a promise. that's why we return it here in order to chain another then.
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   })

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => {return response.json() }) // read response body and parse as JSON
  .then((data) => {console.log(data) })
  .catch((error) => {console.log(error)})

  /**
   * What if we need to fetch data of three blog posts?
   */

let blog_posts = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
]; 

/**
 * One of the ways could be to chin the then's
 */

// fetch(blog_posts[0])
//   .then((data) => {
//     console.log(data);
//     return fetch(blog_posts[1])
//   })
//   .then((data) => {
//     console.log(data);
//     return fetch(blog_posts[2])
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

/**
 * Promise.all
 * if We want many promises to execute in paralled and wait unitl all of them are ready.
 * it takes in an array (iterable) if promises and returns a new promise
 * the new promise resolves when all the listed promises are settled, and the array of thir result becomes its result. 
 * 
 * Promise.all rejects as a whole if any promise rejects which is useful for all or nothing cases.
 */

// Promise.all([
//   fetch(blog_posts[0]),
//   fetch(blog_posts[1]),
//   fetch(blog_posts[2])
// ])
//   .then((data) => {
//    console.log(data);
//   })
//   .catch((err) => {
//    console.log(err);
//   })
 
// Samething using map

let blog_posts_promise_objects = blog_posts.map((post) => fetch(post));

// Promise.all(blog_posts_promise_objects)
//   .then((data_array) => {
//     console.log(data_array);
//   })

  /**
   * if any of the promises is rejected, the promise returned by Promise.all 
   * immediately rejects with that error.
   */

// Promise.allSettled
/**
 * Promise.allSettled just waits for all promises to settle (regardless of the result)
 * resulting array looks something like:
 * [
 *   { status: "fullfiled", value: result},
 *   { status: "rejected", reason: error}
 * ]
 */

//  Promise.allSettled([
//   fetch(blog_posts[0]),
//   fetch(blog_posts[1]),
//   fetch(blog_posts[2])
// ])
//   .then((data) => {
//    console.log(data);
//   })
//   .catch((err) => {
//    console.log(err);
//   })

// Promise.allSettled(blog_posts_promise_objects)
//   .then((data_array) => {
//     console.log(data_array);
//   });


/**
 *  What if we need to spin up multiple promises and wait only for the first promise to settle (resolve or reject)
 *  the result of the fastest or the first settled promise wins the race
 *  So, Promise.race just waits for the fastest settled promise and get's its result or error.
 *  we are making a few promises race, and the one that wins is returned and rest a are ignored.
 */  

// Promise.race(blog_posts_promise_objects)
//   .then((data) => {
//     console.log(data);
//   });

// Promise.race([
//   fetch(blog_posts[0]),
//   fetch(blog_posts[1]),
//   fetch(blog_posts[2])
// ])
// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
// })

/**
 * What if we need to spinup multiple promises and get the first one that resolves?
 * The fastest fulfilled promise wins the race of any.
 * if all the promises are rejected, then the returned promise is rejected with AgreegateError. The error has an errors property which contains an array of errors.
 */

//  Promise.any(blog_posts_promise_objects)
//   .then((data) => {
//     console.log(data);
//   });

// Promise.any([
//   fetch(blog_posts[0]),
//   fetch(blog_posts[1]),
//   fetch(blog_posts[2])
// ])
// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
// })

/**
 * What if we want a function to guarentee to return promise.
 * Promise.resolve() method returns a settled promise object that is resolved with a given value.
 * Promise.reject() method returns a settled promise object that is rejected with a given value.
 */

// Promise.resolve("James") // returns a fulfilled promise object
//   .then((data) => console.log('data: ' + data),(error) => console.log('error: ' + error));

// Promise.reject("John") // returns a rejected promise object  
//   .then((data) => console.log('data: ' + data), (error) => console.log('error: ' + error))