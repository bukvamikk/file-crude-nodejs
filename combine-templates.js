#!/usr/bin/env node
let fs = require("fs");
const bodiesFolder = "./responder-bodies";
const header = fs.readFileSync("responder-header/header.html").toString();
const footer = fs.readFileSync("responder-foot/footer.html").toString();
fs.readdir(bodiesFolder, (err, files) => {
  files.forEach(file => {
    let body = fs.readFileSync(bodiesFolder + "/" + file).toString();
    let combined = header + body + footer;
    const path = "./responder-generated/" + file;
    if (fs.existsSync(path)) {
      console.log("DELETED: ", path);
      fs.unlink(path, err => {
        if (err) {
          return;
        }
      });
    }
    fs.appendFile(path, combined, function(err) {
      if (err) throw err;
      console.log("SAVED: ", path);
    });
  });
});
