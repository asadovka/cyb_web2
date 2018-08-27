#!/usr/bin/env node

const program = require('commander');

const IPFS = require('ipfs-api');
const minimatch = require('minimatch')
const mkdirp = require('mkdirp')

const ipfs = new IPFS({ host: 'localhost', port: 5001, protocol: 'http' });

const fs = require('fs');
const path = require('path');
const request = require('superagent');

const cliPkg = require('./package.json')

var MODE_0666 = parseInt('0666', 8)
var MODE_0755 = parseInt('0755', 8)
var TEMPLATE_DIR = path.join(__dirname, 'template')

/**
 * Copy file from template directory.
 */

function copyTemplate (from, to) {
  write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'))
}

/**
 * Copy multiple files from template directory.
 */

function copyTemplateMulti (fromDir, toDir, nameGlob) {
  fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
    .filter(minimatch.filter(nameGlob, { matchBase: true }))
    .forEach(function (name) {
      copyTemplate(path.join(fromDir, name), path.join(toDir, name))
    })
}

/**
 * Make the given dir relative to base.
 *
 * @param {string} base
 * @param {string} dir
 */

function mkdir (base, dir) {
  var loc = path.join(base, dir)

  console.log('   \x1b[36mcreate\x1b[0m : ' + loc + path.sep)
  mkdirp.sync(loc, MODE_0755)
}

/**
 * echo str > file.
 *
 * @param {String} file
 * @param {String} str
 */

function write (file, str, mode) {
  fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
  console.log('   \x1b[36mcreate\x1b[0m : ' + file)
}

program
  .version(cliPkg.version)
  .description('cli tool for add app in cyb env')


let nodeUrl = 'http://cyberd.network';

program
  .command('add <dirName> <appName>')
  .description('Add a app')
  .action((dirName, appName) => {
  		// console.log(' sdf ')
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
			// console.log(r);
			ipfs.name.publish(hash, { key: appName }, function (err, res) {
				if (err) {
					console.log(err)
				}
				console.log(res);
			})

			// ipfs.key.gen(appName, {
			//     type: 'rsa',
			//     size: 2048
			// }, (err, key) => console.log(err, key))

			const publish = () => {
				// , { key: appName }
				ipfs.name.publish(hash, { key: appName }, function (err, res) {
				// 	console.log('sdf ')
				// 	if (err) {
				// 		console.log(err)
				// 	}
					console.log(res);
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
				})
			}

			publish();
			
			ipfs.key.list((err, keys) => {
				console.log(keys)
				// if (!keys.some(x => x.name === appName)) {
				// 	ipfs.key.gen(appName, {
				// 	    type: 'rsa',
				// 	    size: 2048
				// 	}, (err, key) => {
				// 		publish();
				// 	})
				// } else {
				
				// 	publish();
				// }
			})
			
			
		})
  });

program
  .command('init <appName>')
  .description('Create scelete of app')
  .action((appName) => {

  	mkdir(appName, '')
  	copyTemplateMulti('', appName, '*.*')

  	var pkg = {
	    name: appName,
	    version: '0.0.0',
	    private: true,
	    scripts: {
    		prestart: 'npm install',
    		start: 'node_modules/http-server/bin/http-server'
	    },
	    dependencies: {
	      'http-server': '0.11.1'
	    }

  	}

  	write(path.join(appName, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')
  });


program.parse(process.argv);