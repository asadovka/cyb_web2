#!/usr/bin/env node

const program = require('commander');

const IPFS = require('ipfs-api');
const minimatch = require('minimatch')
const mkdirp = require('mkdirp')

const ipfs = new IPFS({host: 'localhost', port: 5001, protocol: 'http'});

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

function copyTemplate(from, to) {
    write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'))
}

/**
 * Copy multiple files from template directory.
 */

function copyTemplateMulti(fromDir, toDir, nameGlob) {
    fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
        .filter(minimatch.filter(nameGlob, {matchBase: true}))
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

function mkdir(base, dir) {
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

function write(file, str, mode) {
    fs.writeFileSync(file, str, {mode: mode || MODE_0666})
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


        ipfs.add(files, function (e, r) {
            if (e) {
                console.log(e);
                return;
            }
            //console.log(' r ', r);
            const hash = r[r.length - 1].hash
            console.log('put folder in IPFS: ', hash);
            // console.log(r);
            ipfs.name.publish(hash, {key: appName}, function (err, res) {
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
                ipfs.name.publish(hash, {key: appName}, function (err, res) {
                    // 	console.log('sdf ')
                    // 	if (err) {
                    // 		console.log(err)
                    // 	}
                    console.log(res);
                    request
                        .post(nodeUrl + '/txs')
                        .send({type: 'search', keyword: appName})
                        .end((err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                request
                                    .post(nodeUrl + '/txs')
                                    .send({type: 'link', keyword: appName, hash: hash})
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

        mkdir(appName, '');
        mkdir(appName, 'app');
        mkdir(appName, 'app/src');
        mkdir(appName, 'app/src/containers');

        copyTemplateMulti('', appName, '*.*');
        copyTemplateMulti('app', path.join(appName, 'app'), '*.*');
        copyTemplateMulti('app/src', path.join(appName, 'app/src'), '*.*');
        copyTemplateMulti('app/src/containers', path.join(appName, 'app/src/containers'), '*.*');

        var pkg = {
            "name": appName,
            "version": "0.0.1",
            "main": "app/src/main.jsx",
            "author": "author",
            "dependencies": {
                "argparse": "1.0.10",
                "axios": "0.16.2",
                "babel-polyfill": "6.26.0",
                "bignumber.js": "^5.0.0",
                "boom": "7.2.0",
                "classnames": "2.2.5",
                "copy-webpack-plugin": "4.2.3",
                "history": "3.0.0",
                "json-loader": "0.5.7",
                "jsx-loader": "0.13.2",
                "lodash": "4.17.4",
                "react": "15.6.1",
                "react-dom": "15.6.1"
            },
            "devDependencies": {
                "autoprefixer": "7.1.4",
                "babel": "6.23.0",
                "babel-core": "6.26.0",
                "babel-loader": "7.1.2",
                "babel-plugin-transform-class-properties": "6.24.1",
                "babel-plugin-transform-decorators-legacy": "1.3.4",
                "babel-polyfill": "6.26.0",
                "babel-preset-env": "1.6.1",
                "babel-preset-es2015": "6.24.1",
                "babel-preset-react": "6.24.1",
                "babel-preset-stage-2": "6.24.1",
                "css-loader": "0.28.7",
                "file-loader": "0.11.2",
                "html-webpack-plugin": "2.30.1",
                "less": "2.7.2",
                "less-loader": "4.0.5",
                "node-sass": "4.5.3",
                "postcss-loader": "2.0.6",
                "raw-loader": "0.5.1",
                "sass-loader": "6.0.6",
                "serve": "10.0.1",
                "style-loader": "0.18.2",
                "uglifyjs-webpack-plugin": "1.2.2",
                "url-loader": "0.5.9",
                "webpack": "3.6.0",
                "webpack-dev-server": "2.8.2"
            },
            "scripts": {
                "prestart": "npm install",
                "start": "webpack-dev-server",
                "build": "webpack --env.NODE_ENV production --env.SOURCE_MAP source-map",
                "serve": "serve -s distribution"
            },
            "description": "",
            "keywords": [],
            "license": "MIT"
        };

        write(path.join(appName, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')
    });


program.parse(process.argv);
