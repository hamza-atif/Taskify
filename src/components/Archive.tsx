import React from 'react';
import { Archive as ArchiveIcon, RefreshCw, Trash2 } from 'lucide-react';
import { Task, Workspace } from '../types';

interface ArchiveProps {
  workspace?: Workspace;
  onRestoreTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function Archive({ workspace, onRestoreTask, onDeleteTask }: ArchiveProps) {
  if (!workspace) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Please select a workspace to view archives</p>
      </div>
    );
  }

  const archivedTasks = workspace.tasks.filter(task => task.status === 'completed');

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Archive</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage your completed and archived tasks
          </p>
        </div>

        {archivedTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ArchiveIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No archived tasks</h3>
            <p className="text-gray-500">
              Completed tasks will appear here automatically
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {archivedTasks.map(task => (
              <div key={task.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span>Completed on: {new Date(task.createdAt).toLocaleDateString()}</span>
                      <span>Priority: {task.priority}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRestoreTask(task.id)}
                      className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Restore task"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete permanently"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}