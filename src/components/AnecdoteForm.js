import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { makeMessage } from '../reducers/notificationReducer';

const NewAnecdote = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createAnecdote(content);
    const msg = `You added a new anecdote: "${content}"`;
    props.makeMessage(msg, 1);
  };

  return (
    <form onSubmit={addAnecdote}>
      <input name='anecdote' />
      <button type='submit'>add</button>
    </form>
  );
};

export default connect(null, { createAnecdote, makeMessage })(NewAnecdote);
