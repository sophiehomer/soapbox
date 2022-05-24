const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID 
        username: String
        friendCount: Int
        posts: [Post]
        friends: [User]
    }

    type Post {
        _id: ID
        postText: String
        createdAt: String
        username: String
        comments: [Comment]
        likes: Int
        dislikes: Int
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
        likes: Int
        dislikes: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        posts(username: String): [Post]
        post(_id: ID!): Post
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postText: String!): Post
        addComment(postId: ID!, commentBody: String!): Post 
        addFriend(friendId: ID!): User
        addLike(postId: ID!): Post
        addDislike(postId: ID!): Post

    }
`

module.exports = typeDefs;