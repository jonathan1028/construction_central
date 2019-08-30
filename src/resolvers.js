import gql from 'graphql-tag';

export const typeDefs = gql`
  type TestItem {
    id: ID!
    text: String!
    done: Boolean!
  }
`;

const todoItemsQuery = gql`
  {
    todoItems @client {
      id
      text
      done
    }
  }
`;

export const ITEM_CREATE_MODAL_STATE_QUERY = gql`
  {
    itemCreateModalState @client 
  }
`;


const resolvers = {
    Mutation: {
        toggleItemCreateModal: (_, { }, { cache }) => {
            const data = cache.readQuery({ query: ITEM_CREATE_MODAL_STATE_QUERY })
            data.itemCreateModalState = !data.itemCreateModalState
            // const currentItem = data.todoItems.find(item => item.id === id);
            // currentItem.done = !currentItem.done;
            cache.writeQuery({ query: ITEM_CREATE_MODAL_STATE_QUERY, data })
            return data.itemCreateModalState;
        }
    }
}