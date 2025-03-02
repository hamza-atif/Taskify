import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Calendar,
  Flag,
  Users,
  Tag,
  Paperclip,
  CheckSquare,
  MessageSquare,
  Timer,
  Link
} from 'lucide-react';
import { Task, User, Label } from '../types';

interface TaskModalProps {
  task?: Task;
  users: User[];
  labels: Label[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
}

export default function TaskModal({
  task,
  users,
  labels,
  isOpen,
  onClose,
  onSave
}: TaskModalProps) {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    assignedTo: '',
    labels: [],
    checklist: [],
    timeEstimate: 0,
    timeSpent: 0,
    watchers: [],
    attachments: []
  });

  const [activeTab, setActiveTab] = useState<'details' | 'checklist' | 'comments'>('details');

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
      });
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">{task ? 'Edit Task' : 'New Task'}</h2>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                formData.status === 'completed' ? 'bg-green-100 text-green-800' :
                formData.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {formData.status?.charAt(0).toUpperCase() + formData.status?.slice(1)}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Task title"
                  className="w-full text-xl font-semibold p-2 border-2 border-transparent focus:border-indigo-500 rounded-lg"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add description..."
                  className="w-full h-32 p-3 border rounded-lg resize-none"
                />
              </div>

              {/* Status and Priority */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Due Date and Assignee */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="w-full pl-10 p-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Unassigned</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Labels */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Labels</label>
                <div className="flex flex-wrap gap-2">
                  {labels.map(label => (
                    <button
                      key={label.id}
                      type="button"
                      onClick={() => {
                        const newLabels = formData.labels?.includes(label.id)
                          ? formData.labels.filter(id => id !== label.id)
                          : [...(formData.labels || []), label.id];
                        setFormData({ ...formData, labels: newLabels });
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        formData.labels?.includes(label.id)
                          ? `bg-${label.color}-100 text-${label.color}-800`
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {label.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Tracking */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Estimate (minutes)</label>
                  <div className="relative">
                    <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={formData.timeEstimate}
                      onChange={(e) => setFormData({ ...formData, timeEstimate: parseInt(e.target.value) })}
                      className="w-full pl-10 p-2 border rounded-lg"
                      min="0"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Spent (minutes)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={formData.timeSpent}
                      onChange={(e) => setFormData({ ...formData, timeSpent: parseInt(e.target.value) })}
                      className="w-full pl-10 p-2 border rounded-lg"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}