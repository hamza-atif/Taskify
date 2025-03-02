import React from 'react';
import { MoreVertical, Plus } from 'lucide-react';
import { Task, User, Label } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  title: string;
  tasks: Task[];
  users: User[];
  labels: Label[];
  onTaskClick: (task: Task) => void;
  onAddTask: () => void;
  onAssigneeClick: (userId: string) => void;
}

export default function TaskList({
  title,
  tasks,
  users,
  labels,
  onTaskClick,
  onAddTask,
  onAssigneeClick
}: TaskListProps) {
  return (
    <div className="flex-1 min-w-[350px] bg-gray-100 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-700">{title}</h2>
          <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-sm">
            {tasks.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onAddTask}
            className="p-1 hover:bg-gray-200 rounded-md transition-colors"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-md transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            users={users}
            labels={labels}
            onClick={() => onTaskClick(task)}
            onAssigneeClick={onAssigneeClick}
          />
        ))}
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-8 h-8" />
          </div>
          <p className="text-sm">No tasks yet</p>
          <button
            onClick={onAddTask}
            className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            Add a task
          </button>
        </div>
      )}
    </div>
  );
}