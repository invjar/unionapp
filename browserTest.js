/*jshint esversion: 8 */

fetch('http://localhost:3000/posts')
.then(result => {
    console.log(result);
});