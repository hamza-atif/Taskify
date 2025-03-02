import React from 'react';
import { format } from 'date-fns';
import { Activity, User } from '../types';
import {
  CheckCircle,
  Clock,
  MessageSquare,
  UserPlus,
  AlertCircle,
  Activity as ActivityIcon
} from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
  users: User[];
}

export default function ActivityFeed({ activities, users }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'task_created':
        return <ActivityIcon className="w-5 h-5 text-blue-500" />;
      case 'task_updated':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'comment_added':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'member_joined':
        return <UserPlus className="w-5 h-5 text-purple-500" />;
      case 'status_changed':
        return <CheckCircle className="w-5 h-5 text-indigo-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityDescription = (activity: Activity) => {
    const user = users.find(u => u.id === activity.userId);
    const userName = user ? user.name : 'Someone';

    switch (activity.type) {
      case 'task_created':
        return `${userName} created task "${activity.details.taskTitle}"`;
      case 'task_updated':
        return `${userName} updated task "${activity.details.taskTitle}"`;
      case 'comment_added':
        return `${userName} commented on "${activity.details.taskTitle}"`;
      case 'member_joined':
        return `${userName} joined the workspace`;
      case 'status_changed':
        return `${userName} changed status of "${activity.details.taskTitle}" to ${activity.details.newStatus}`;
      default:
        return 'Unknown activity';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Activity Feed</h2>
      </div>
      <div className="divide-y">
        {activities.map(activity => (
          <div key={activity.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  {getActivityDescription(activity)}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {format(new Date(activity.createdAt), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}