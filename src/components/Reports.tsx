import React from 'react';
import { BarChart2, TrendingUp, Clock } from 'lucide-react';
import { Workspace } from '../types';

interface ReportsProps {
  workspace?: Workspace;
}

export default function Reports({ workspace }: ReportsProps) {
  if (!workspace) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Please select a workspace to view reports</p>
      </div>
    );
  }

  const totalTasks = workspace.tasks.length;
  const completedTasks = workspace.tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = workspace.tasks.filter(t => t.status === 'in-progress').length;
  const todoTasks = workspace.tasks.filter(t => t.status === 'todo').length;

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Task Overview</h3>
            <BarChart2 className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Total Tasks</span>
                <span>{totalTasks}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Completed</span>
                <span>{completedTasks}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>In Progress</span>
                <span>{inProgressTasks}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${(inProgressTasks / totalTasks) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Completion Rate</h3>
            <TrendingUp className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="3"
                  strokeDasharray={`${completionRate}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{Math.round(completionRate)}%</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">Overall Completion Rate</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Time Tracking</h3>
            <Clock className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="space-y-4">
            {workspace.tasks.slice(0, 3).map(task => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{task.timeSpent} mins spent</span>
                    <span className="mx-1">•</span>
                    <span>{task.timeEstimate} mins estimated</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {Math.round((task.timeSpent / task.timeEstimate) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {workspace.tasks.slice(-5).reverse().map(task => (
            <div key={task.id} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 text-sm">
                    {task.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                <p className="text-sm text-gray-500">
                  Status changed to {task.status}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}