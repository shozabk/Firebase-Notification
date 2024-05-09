// React Imports
import React from 'react';

// Firebase Imports
import { database } from '../utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const NotificationButtons: React.FC = () => {
  /**
   * FUnction to send a notification everytime a button is clicked
   *
   * @param buttonLabel The name of the button clicked.
   * @returns A Promise that resolves with no value (void) upon successful update, or rejects with an error.
   */

  const sendNotification = async (buttonLabel: string): Promise<void> => {
    try {
      // Adding a new document to the 'notifications' collection in Firestore
      await addDoc(collection(database, 'notifications'), {
        message: `You have received a ${buttonLabel} notification`, // Notification message
        read: false,
        timestamp: new Date(),
      });
    } catch (error) {
      // Catching errors
      console.error('Error sending notification:', error);
    }
  };

  // Component renders three buttons each with different notification type
  return (
    <div>
      {/* Sends 'Button 1' notification */}
      <button
        className="button button-1"
        onClick={() => {
          sendNotification('Button 1').catch(console.error);
        }}
      >
        Button 1
      </button>
      {/* Sends 'Button 2' notification */}
      <button
        className="button button-2"
        onClick={() => {
          sendNotification('Button 2').catch(console.error);
        }}
      >
        Button 2
      </button>
      {/* Sends 'Button 3' notification */}
      <button
        className="button button-3"
        onClick={() => {
          sendNotification('Button 3').catch(console.error);
        }}
      >
        Button 3
      </button>
    </div>
  );
};

export default NotificationButtons;
