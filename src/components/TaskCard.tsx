import React from 'react';
import { Clock, Flag, Paperclip, CheckSquare, MessageSquare, Users } from 'lucide-react';
import { Task, User, Label } from '../types';

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const priorityIcons = {
  low: '🔽',
  medium: '➡️',
  high: '🔼',
};

interface TaskCardProps {
  task: Task;
  users: User[];
  labels: Label[];
  onClick: () => void;
  onAssigneeClick: (userId: string) => void;
}

export default function TaskCard({ task, users, labels, onClick, onAssigneeClick }: TaskCardProps) {
  const assignedUser = users.find(u => u.id === task.assignedTo);
  const taskLabels = labels.filter(l => task.labels.includes(l.id));
  const completedItems = task.checklist.filter(item => item.completed).length;
  const totalItems = task.checklist.length;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-indigo-200"
    >
      {/* Labels */}
      {taskLabels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {taskLabels.map(label => (
            <span
              key={label.id}
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${label.color}20`, color: label.color }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
      
      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      )}
      
      {/* Checklist Progress */}
      {totalItems > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>{completedItems}/{totalItems}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${(completedItems / totalItems) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Meta Information */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          {/* Priority */}
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${priorityColors[task.priority]}`}>
            <Flag className="w-3 h-3" />
            {priorityIcons[task.priority]}
          </span>

          {/* Attachments */}
          {task.attachments.length > 0 && (
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <Paperclip className="w-4 h-4" />
              {task.attachments.length}
            </span>
          )}

          {/* Comments */}
          <span className="text-gray-500 text-sm flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {task.watchers.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Due Date */}
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>

          {/* Assignee */}
          {assignedUser && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAssigneeClick(assignedUser.id);
              }}
              className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-full"
            >
              <img
                src={assignedUser.avatar}
                alt={assignedUser.name}
                className="w-6 h-6 rounded-full"
              />
            </button>
          )}

          {/* Watchers */}
          {task.watchers.length > 0 && (
            <div className="flex items-center text-gray-500">
              <Users className="w-4 h-4" />
              <span className="text-xs ml-1">{task.watchers.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}