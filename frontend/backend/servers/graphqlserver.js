/*let { ApolloServer } = require('@apollo/server')
let { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require('../models/assignments')
const resolvers={
    Query:{
        games(){
            return db.games()
        },

        reviews(){
            return db.reviews()
        },
        authors(){
            return db.authors()
        },
        assignments(_,args){
            console.log(args.id)
        }
    },
    Games:{
        games(parent,){

        }
    },
    Mutations:{
        addGame(_,args){
            let game={
                ...args.game,
                id:Math.floor(Math.random()*10000)
            }
            db.games.push(game)
        },
        deleteGame(_,args){

        }
    }
}
const server=new ApolloServer({
typeDefs,
resolvers
})
const {url}=await startStandaloneServer(server,{
    listen:{port:3001}
})
console.log("My server has started")
*/