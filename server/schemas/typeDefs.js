const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
    allProjects: [Project]
    oneProject(_id: ID!): Project
    userProjects(projectUser: ID): [Project]
    projectTasks(taskProject: ID): [Task]
  }

  type User {
    _id: ID
    username: String
    email: String
    projects: [Project]
  }

  type Project {
    _id: ID
    title: String
    description: String
    complete: Boolean
    projectUser: ID
  }

  type Task {
  _id: ID
  taskText: String
  complete: Boolean
  taskProject: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addProject(projectUser: ID, title: String!, description: String!): Project
    updateProject(projectId: ID, title: String!, description: String!): Project
    removeProject(projectId: ID): Project
    addTask(taskProject: ID, taskText: String!): Task
  }
`;

module.exports = typeDefs;
