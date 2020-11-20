import React from 'react';
import { connect } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = (props) => {
  //const dispatch = useDispatch();
  const handleChange = (event) => {
    props.filterChange(event.target.value);
    // input-kentän arvo muuttujassa event.target.value
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapdispatchToProps = { filterChange };

export default connect(null, mapdispatchToProps)(Filter);
