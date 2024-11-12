const typeDefs=`#graphql
type assignment:{
    rollno:ID!,
    title:String!,
    subject:String!,
    assignmentDate:String!
    dueDate:String!,
    marks:Int!
    postedBy:String!
}
type Query{
    getAllAssignments: [assignment!]!,
    getAssignmentByRollno(rollno:ID!):assignment
}
type Mutation{
    addGame[game:addGameInput!]:Game
    deleteGame[id:ID!]:[assignment!]
}
input addGameInput{
    title:String!,
    
}`

module.exports=typeDefs