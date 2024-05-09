// React Imports
import React, { FC } from 'react';

// Component Imports
import NotificationButtons from '../../components/NotificationButtons'; 
import NotificationsList from '../../components/NotificationList';

const Home: FC = () => {
  return (
  
    <div className='container'>
      <h1 className='headTxt'>Notification System</h1>
      <h4 className='subHeadTxt'>(Click on any of the buttons to receive a notification. Then, click on any notification to mark it as read.)</h4>
      <NotificationButtons />
      <NotificationsList />
    </div>
   
  );
};

export default Home;
