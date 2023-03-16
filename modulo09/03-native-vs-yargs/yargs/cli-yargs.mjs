#!/usr/bin/env
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() })
const { argv } = yargs(hideBin(process.argv))
    .command('createHero', 'create a hero', (builder) => {
        return builder
            .option('name', {
                alias: 'n',
                demandOption: true,
                describe: 'hero name',
                type: 'string'
            })
            .option('age', {
                alias: 'a',
                demandOption: true,
                describe: 'hero age',
                type: 'number'
            })
            .option('power', {
                alias: 'p',
                demandOption: true,
                describe: 'hero power',
                type: 'string'
            })
            .example('createHero --name Hell --age 23 --power programmer')
            .example('createHero -n Jão --a 23 --p Flutter testimony')
    })
    .epilog('Hello there')

console.log(hero(argv))