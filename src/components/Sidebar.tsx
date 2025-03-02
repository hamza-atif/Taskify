import React, { useState } from 'react';
import { Layout, PlusCircle, Settings, Calendar, Clock, BarChart2, Users, Archive, Bell, Zap, Filter, FileText, GitBranch, HelpCircle, Baseline as Timeline } from 'lucide-react';
import { Workspace } from '../types';

interface SidebarProps {
  workspaces: Workspace[];
  activeWorkspace: string;
  activeView: string;
  onWorkspaceSelect: (id: string) => void;
  onCreateWorkspace: () => void;
  onNavigate?: (route: string) => void;
}

export default function Sidebar({
  workspaces,
  activeWorkspace,
  activeView,
  onWorkspaceSelect,
  onCreateWorkspace,
  onNavigate = () => {},
}: SidebarProps) {
  const navigationItems = [
    { id: 'tasks', icon: Layout, label: 'Tasks' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'timeline', icon: Timeline, label: 'Timeline' },
    { id: 'reports', icon: BarChart2, label: 'Reports' },
    { id: 'team', icon: Users, label: 'Team' },
  ];

  const toolItems = [
    { id: 'templates', icon: FileText, label: 'Templates' },
    { id: 'automations', icon: Zap, label: 'Automations' },
    { id: 'filters', icon: Filter, label: 'Filters' },
    { id: 'integrations', icon: GitBranch, label: 'Integrations' },
  ];

  return (
    <div className="w-64 bg-gray-900 h-screen p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Layout className="w-6 h-6 text-indigo-400" />
        <h1 className="text-xl font-bold text-white">Taskify</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-8">
        {/* Workspaces */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase">Workspaces</h2>
            <button
              onClick={onCreateWorkspace}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-1">
            {workspaces.map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => onWorkspaceSelect(workspace.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  workspace.id === activeWorkspace
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span style={{ color: workspace.color }}>{workspace.icon}</span>
                <span className="truncate">{workspace.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Navigation */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-4">Navigation</h2>
          <div className="space-y-1">
            {navigationItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => {
                  onNavigate(id);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeView === id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-4">Tools</h2>
          <div className="space-y-1">
            {toolItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => {
                  onNavigate(id);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeView === id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 space-y-2 border-t border-gray-800">
        <button
          onClick={() => onNavigate('notifications')}
          className="w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </button>
        <button
          onClick={() => onNavigate('archive')}
          className="w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <Archive className="w-5 h-5" />
          <span>Archive</span>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            activeView === 'settings'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button
          onClick={() => onNavigate('help')}
          className="w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help & Support</span>
        </button>
      </div>
    </div>
  );
}