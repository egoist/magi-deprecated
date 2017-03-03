#!/usr/bin/env node
import { join } from 'path'
import yargs from 'yargs'
import pkg from '../../package' // eslint-disable import/no-unresolved

yargs // eslint-disable-line no-unused-expressions
  .commandDir(join(__dirname, 'cmd'))
  .version(pkg.version)
  .alias('v', 'version')
  .alias('h', 'help')
  .help()
  .argv
