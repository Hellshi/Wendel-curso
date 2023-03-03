import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDbStrategy from "./src/strategies/mongoDbStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStrategy.js"

const postgresConnectionString = "postgres://hell:senha123@localhost:5432/heroes"

const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDbConnectionString = "mongodb://hell:senhaadmin@localhost:27017/heroes"
const mongoDbContext = new ContextStrategy(new MongoDbStrategy(mongoDbConnectionString))
await mongoDbContext.connect()

const data = [
    {
        name: 'erickWendel',
        type: 'transaction'

    },
    {
        name: 'mariaSilva',
        type: 'activityLog'
    },
]

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDbContext
}

for(const { type, name } of data) {
    const context = contextTypes[type]
    await context.create({ name: name + Date.now() })

    console.log(type, context.dbStrategy.constructor.name)
    console.log(await context.read())
}