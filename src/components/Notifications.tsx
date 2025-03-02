import React, { useState } from 'react';
import { Bell, Check, Clock, MessageSquare, UserPlus, AlertCircle } from 'lucide-react';
import { Notification, User } from '../types';

interface NotificationsProps {
  notifications: Notification[];
  users: User[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export default function Notifications({
  notifications,
  users,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll
}: NotificationsProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'mention':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'assignment':
        return <UserPlus className="w-5 h-5 text-purple-500" />;
      case 'due_soon':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'status_change':
        return <AlertCircle className="w-5 h-5 text-indigo-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationMessage = (notification: Notification) => {
    const user = users.find(u => u.id === notification.data.userId);
    const userName = user ? user.name : 'Someone';

    switch (notification.type) {
      case 'mention':
        return `${userName} mentioned you in "${notification.data.taskTitle}"`;
      case 'assignment':
        return `${userName} assigned you to "${notification.data.taskTitle}"`;
      case 'due_soon':
        return `Task "${notification.data.taskTitle}" is due in ${notification.data.daysLeft} days`;
      case 'comment':
        return `${userName} commented on "${notification.data.taskTitle}"`;
      case 'status_change':
        return `${userName} changed status of "${notification.data.taskTitle}" to ${notification.data.newStatus}`;
      default:
        return 'New notification';
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || (filter === 'unread' && !notification.read)
  );

  return (
    <div className="h-full">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="mt-2 text-sm text-gray-600">
              Stay updated with your team's activity
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All notifications</option>
              <option value="unread">Unread only</option>
            </select>
            <button
              onClick={onMarkAllAsRead}
              className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              Mark all as read
            </button>
            <button
              onClick={onClearAll}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm divide-y">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-indigo-50 hover:bg-indigo-100' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {getNotificationMessage(notification)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="flex-shrink-0 p-2 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}