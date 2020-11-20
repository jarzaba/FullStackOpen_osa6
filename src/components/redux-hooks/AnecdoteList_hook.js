import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeMessage } from '../../reducers/notificationReducer';
import { addVote } from '../../reducers/anecdoteReducer_hook';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  });
  const dispatch = useDispatch();
  const vote = (id, content) => {
    const selectedAnecdote = {
      type: 'VOTE',
      data: { id },
    };
    dispatch(addVote(id, selectedAnecdote));
    const msg = `You voted for: "${content}"`;
    dispatch(makeMessage(msg, 3));
  };

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>
            vote
          </button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
