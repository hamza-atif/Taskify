import React, { useState } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { Workspace } from '../types';

interface SettingsProps {
  workspace?: Workspace;
  onUpdateWorkspace: (workspace: Workspace) => void;
}

export default function Settings({ workspace, onUpdateWorkspace }: SettingsProps) {
  const [settings, setSettings] = useState(workspace?.settings || {
    defaultView: 'board',
    allowGuestAccess: false,
    notificationsEnabled: true,
    autoArchiveCompleted: false
  });

  if (!workspace) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Please select a workspace to view settings</p>
      </div>
    );
  }

  const handleSave = () => {
    if (workspace) {
      onUpdateWorkspace({
        ...workspace,
        settings
      });
    }
  };

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Workspace Settings</h1>

      <div className="max-w-3xl">
        <div className="bg-white rounded-lg shadow divide-y">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Workspace Name</label>
                <input
                  type="text"
                  value={workspace.name}
                  onChange={(e) => onUpdateWorkspace({ ...workspace, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Default View</label>
                <select
                  value={settings.defaultView}
                  onChange={(e) => setSettings({ ...settings, defaultView: e.target.value as any })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="board">Board</option>
                  <option value="list">List</option>
                  <option value="calendar">Calendar</option>
                  <option value="timeline">Timeline</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Permissions & Access</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Allow Guest Access</h4>
                  <p className="text-sm text-gray-500">Enable viewing tasks without an account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowGuestAccess}
                    onChange={(e) => setSettings({ ...settings, allowGuestAccess: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Enable Notifications</h4>
                  <p className="text-sm text-gray-500">Receive updates about task changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notificationsEnabled}
                    onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Auto-archive Completed Tasks</h4>
                  <p className="text-sm text-gray-500">Automatically archive tasks when completed</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoArchiveCompleted}
                    onChange={(e) => setSettings({ ...settings, autoArchiveCompleted: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-red-800">Delete Workspace</h4>
                  <p className="text-sm text-red-600">Once deleted, this workspace cannot be recovered</p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}