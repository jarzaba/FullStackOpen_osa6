// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

import anecdoteService from '../services/anecdoteService';

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data);
    case 'INIT_ANECDOTES':
      return action.data;
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVote = state.find((n) => n.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((note) => (note.id !== id ? note : votedAnecdote));
    default:
      return state;
  }
};

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(data);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const addVote = (id) => {
  return async (dispatch) => {
    const updateVote = await anecdoteService.updateVote(id);

    dispatch({
      type: 'VOTE',
      data: updateVote,
    });
  };
};

export default anecdoteReducer;
