const { testRegex } = require("../models/user");

console.log(testRegex("http://url-without-www-subdomain.com/"));
console.log(testRegex("http://example.com/"));
console.log(testRegex("https://www.example.com/"));
console.log(testRegex("http://1-example.com"));
console.log(testRegex("http://example.com/go/even/deeper/"));
console.log(testRegex("http://example-example-example.com"));
console.log(
  testRegex(
    "https://uploads-ssl.webflow.com/5d7e8885cad5174a2fcb98d7/5eddd950e5cf1ec1fa5c2d83_virtual-influencer-john-pork.jpg",
  ),
);
console.log(testRegex("WHAT?"));
console.log(testRegex("not an url"));
console.log(
  testRegex(
    "https://lh3.googleusercontent.com/a/ACg8ocLjHwLvoLN88jnPGrYk3mfN6z_tOkvph9iK4F47dW23BX0=s288-c-no",
  ),
);
