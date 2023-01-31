import TerminalController from "./terminalController.js" 
import database from '../database.json' assert { type: "json" };
import { save } from './repository.js'
import Person from "./person.js";

const DEFAULT_LANG = "pt-BR"
const STOP_TERM = ":q"

const terminalController = new TerminalController()


terminalController.initializeTable(database, DEFAULT_LANG)

async function mainLoop() {
    try {
        const answer = await terminalController.question('Type the entries: Id, vehicle, km traveled, from, to')
        if(answer === STOP_TERM) {
            terminalController.closeTerminal()
            console.log("Process killed")
            return;
        }
        //TEST_VALUES: 2 Bike,aviao,navio 200000000 2000-01-01 2002-02-01
        const person = Person.generateInstanceFromString(answer)
        console.log(person.formatted(DEFAULT_LANG))
        terminalController.updateTable(person.formatted(DEFAULT_LANG))
        await save(person)
        return mainLoop()

    } catch(error) {
        console.error("Deu Ruim", error)
        return mainLoop()
    }
}

await mainLoop()

