"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
server_1.server
    .listen(process.env.PORT || 3001, "0.0.0.0")
    .then(function () {
    return console.log("Server running on port " + (process.env.PORT || 3001));
})
    .catch(function (error) {
    console.log(error.message);
});
