import { ApolloServer } from "apollo-server-micro"
import { schema } from "../../../backend/graphql/schema"
import { resolvers } from "../../../backend/graphql/resolvers"
import { createContext } from "../../../backend/graphql/context"
import Cors from "micro-cors"

const cors = Cors()
const apolloServer = new ApolloServer({ 
  schema, 
  resolvers, 
  context: createContext
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if(req.method === "OPTIONS"){
    res.end()
    return false
  }

  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false
  }
}