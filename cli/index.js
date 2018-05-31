#!/usr/bin/env node


const program = require('commander');

const IPFS = require('ipfs-api');

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const fs = require('fs');
const path = require('path');
const request = require('superagent');

// const dirName = path.join(__dirname, process.argv[2]);
// const appName = process.argv[3];


program
  .version('0.0.4')
  .description('cli tool for add app in cyb env')


let nodeUrl = 'http://cyberd.network';

program
  .command('add <dirName> <appName>')
  .description('Add a app')
  .action((dirName, appName) => {
		const files = fs.readdirSync(dirName).map(file => ({
		  path: dirName.split('/')[dirName.split('/').length - 2] + '/' + file,
		  content: fs.readFileSync(path.join(dirName, file))
		}));



		ipfs.add(files, function(e, r) {
			const hash = r[r.length - 1].hash
			console.log('put folder in IPFS: ', hash);

		request
			.post(nodeUrl + '/txs')
			.send({ type: 'search', keyword: appName })
			.end((err, res) => {
				request
				.post(nodeUrl + '/txs')
				.send({ type: 'link', keyword: appName, hash: hash })
				.end((err, res) => {
					console.log('update cyberd index for: ', appName, hash, nodeUrl);
				})
			})
		})
  });

program
  .command('init <appName>')
  .description('Create scelete of app')
  .action((appName) => {
  	console.log('not implemented yet :-(')
  });


program.parse(process.argv);



