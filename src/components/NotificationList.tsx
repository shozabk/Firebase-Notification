// React Imports
import React, { useEffect, useState } from 'react';

// Firebase Imports
import { database } from '../utils/firebaseConfig';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';

// Notification interface
interface Notification {
  id: string;
  message: string;
  read: boolean;
}

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Create a query to fetch all notifications
    const q = query(collection(database, 'notifications'));
    // Set up a real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedNotifications: Notification[] = [];
      // Populate loadedNotifications
      querySnapshot.forEach((doc) => {
        loadedNotifications.push({
          id: doc.id,
          message: doc.data().message,
          read: doc.data().read,
        });
      });
      setNotifications(loadedNotifications);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * Marks a notification as read in the database.
   *
   * @param id The unique identifier of the notification to be marked as read.
   * @returns A Promise that resolves with no value (void) upon successful update, or rejects with an error.
   */
  const markAsRead = async (id: string): Promise<void> => {
    try {
      const notifDoc = doc(database, 'notifications', id); // Reference to the specific notification document
      await updateDoc(notifDoc, { read: true }); // Update the 'read' status to true
    } catch (error) {
      console.error('Error updating notification:', error); // Log errors if update fails
    }
  };

  // Render the list of notifications
  return (
    <div>
      {notifications.map((notif) => (
        // Render each notification with clickable behavior to mark as read
        <div
          key={notif.id}
          onClick={() => {void markAsRead(notif.id)}}
          style={{ cursor: 'pointer', backgroundColor: notif.read ? 'lightgray' : 'white' }}
        >
          <p>
            {notif.message} - {notif.read ? 'Read' : 'Unread'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
