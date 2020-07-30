#!/usr/bin/env node
/*
 * Copyright (C) 2017 Anthony DeDominic <adedomin@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
'use strict';

var path = require('path'),
    fs = require('fs'),
    { argv } = require('yargs')
        .usage('usage: $0 [-d db dir] moose-name')
        .describe('d', 'path where moose.db resides')
        .alias('d', 'db')
        .help('h')
        .alias('h', 'help');

if (!fs.statSync(path.join(argv.d || process.cwd(), 'moose.db'))) {
    console.error('please provide the directory which contains a moose.db using the -d flag');
    process.exit(1);
}

if (!argv._[0]) {
    console.error('must give an exact moose name to delete');
    process.exit(1);
}

const { MooseDB } = require(
    path.join(__dirname, '../lib/db.js'),
);
let moosedb = new MooseDB(
    path.join(argv.d || process.cwd(), 'moose.db'),
);

moosedb.open(err => {
    if (err) throw err;
    moosedb.deleteMoose(argv._[0], err => {
        if (err) throw err;
        console.log(`Deleted Moose: ${argv._[0]}`); // eslint-disable-line
    });
});