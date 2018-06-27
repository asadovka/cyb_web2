#!/usr/bin/env node


const program = require('commander');

const IPFS = require('ipfs-api');

const ipfs = new IPFS({ host: 'localhost', port: 5001, protocol: 'http' });

const fs = require('fs');
const path = require('path');
const request = require('superagent');

// const dirName = path.join(__dirname, process.argv[2]);
// const appName = process.argv[3];

// console.log('>>');

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

		// console.log(files)


		ipfs.add(files, function(e, r) {
			if (e) {
				console.log(e);
				return;
			}
			//console.log(' r ', r);
			const hash = r[r.length - 1].hash
			console.log('put folder in IPFS: ', hash);
			//console.log(r);
			// ipfs.name.publish(hash, { key: appName }, function (err, res) {
			// 	if (err) {
			// 		console.log(err)
			// 	}
			// 	console.log(res);
			// })

			// ipfs.key.gen(appName, {
			//     type: 'rsa',
			//     size: 2048
			// }, (err, key) => console.log(err, key))

			const publish = () => {
				// ipfs.name.publish(hash, function (err, res) {
				// 	console.log('sdf ')
				// 	if (err) {
				// 		console.log(err)
				// 	}
					// console.log(res);
					request
					.post(nodeUrl + '/txs')
					.send({ type: 'search', keyword: appName })
					.end((err, res) => {
						if (err) {
							console.log(err)
						} else {
							request
							.post(nodeUrl + '/txs')
							.send({ type: 'link', keyword: appName, hash: hash })
							.end((err, res) => {
								if (err) {
									console.log(err)
								} else {
									console.log('update cyberd index for: ', appName, hash, ' >> ', nodeUrl);
								}
							})					
						}
					})
				// })
			}

			ipfs.key.list((err, keys) => {
				console.log(keys)
				if (!keys.some(x => x.name === appName)) {
					ipfs.key.gen(appName, {
					    type: 'rsa',
					    size: 2048
					}, (err, key) => {
						publish();
					})
				} else {
				
					publish();
				}
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



