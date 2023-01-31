import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readLine from 'readline'
import Person from './person.js';

export default class TerminalController {
    constructor() {
        this.print = {}
        this.data = {}
        this.terminal = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        DraftLog(console).addLineListener(process.stdin)
    }
    
    initializeTerminal(database, language) {
        this.initializeTable(database, language)
    }

    updateTable(item) {
        this.data.push(item)
        this.print(chalkTable(this.getTableOptions, this.data))
    }

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        const table = chalkTable(this.getTableOptions(), data)
        
        this.print = console.draft(table)
        this.data = data
    }

    question(message='') {
        return new Promise(resolve => this.terminal.question(`${message} \n`, resolve))
    }

    closeTerminal() {
        this.terminal.close()
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("ID") },
                { field: "vehicles", name: chalk.magenta("Vehicles") },
                { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
                { field: "from", name: chalk.cyan("From") },
                { field: "to", name: chalk.cyan("To") },
            ]
        }
    }
}