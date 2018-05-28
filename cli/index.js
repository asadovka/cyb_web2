const IPFS = require('ipfs-api');

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const fs = require('fs');
const path = require('path');


const dirName = path.join(__dirname, process.argv[2]);


console.log('>> ', dirName);



const files = fs.readdirSync(dirName).map(file => ({
  path: dirName.split('/')[dirName.split('/').length - 2] + '/' + file,
  content: fs.readFileSync(path.join(dirName, file))
}));

// console.log(files);

// const files = [
//   {
//     path: __dirname + '/builds/index.html',
//     content: fs.readFileSync(__dirname + '/builds/index.html')
//   },
//   {
//     path: __dirname + '/builds/app.js',
//     content: fs.readFileSync(__dirname + '/builds/app.js')
//   },
//   {
//     path: __dirname + '/builds/style.css',
//     content: fs.readFileSync(__dirname + '/builds/style.css')
//   }  
// ]

ipfs.add(files, function(e, r) {
	console.log('error: ', e);
	console.log('result: ', r[r.length - 1]);
})