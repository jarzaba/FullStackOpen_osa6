import React from 'react';
import { connect } from 'react-redux';
import { makeMessage } from '../reducers/notificationReducer';
import { addVote } from '../reducers/anecdoteReducer_hook';

const AnecdoteList = (props) => {
  const vote = (id, content) => {
    const selectedAnecdote = {
      type: 'VOTE',
      data: { id },
    };
    props.addVote(id, selectedAnecdote);
    const msg = `You voted for: "${content}"`;
    props.makeMessage(msg, 5);
  };

  const filteredAnecdotes = props.anecdotes.filter((anecdote) =>
    anecdote.content.includes(props.filter)
  );
  return filteredAnecdotes
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = { addVote, makeMessage };

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
