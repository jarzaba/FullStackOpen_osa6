import React from 'react';
import { useSelector } from 'react-redux';
//import { makeMessage } from '../reducers/notificationReducer';

const Notification = () => {
  // const dispatch = useDispatch();

  // dispatch(makeMessage('error', 'jotain muuta'));
  const notification = useSelector(({ notification }) => notification);
  console.log('style: ', notification.style);

  let style = {};
  notification.style === 'info' &&
    (style = {
      border: 'solid',
      padding: 10,
      borderWidth: 3,
      borderColor: 'blue',
      marginTop: 10,
      marginBottom: 10,
    });

  console.log(notification);

  return <div style={style}> {notification.info}</div>;
};

export default Notification;
