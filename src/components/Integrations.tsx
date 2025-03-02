import React, { useState } from 'react';
import { 
  Github, 
  Slack, 
  Mail, 
  Calendar as GoogleCalendar,
  MessageSquare as Discord,
  Link2,
  ToggleLeft,
  ToggleRight,
  Settings as ConfigIcon
} from 'lucide-react';
import { Integration } from '../types';

interface IntegrationsProps {
  integrations: Integration[];
  onUpdateIntegrations: (integrations: Integration[]) => void;
}

export default function Integrations({ integrations, onUpdateIntegrations }: IntegrationsProps) {
  const [configuringIntegration, setConfiguringIntegration] = useState<Integration | null>(null);

  const availableIntegrations = [
    {
      id: 'github',
      name: 'GitHub',
      description: 'Connect your GitHub repositories to create tasks from issues and track progress.',
      icon: Github,
      color: 'bg-gray-900',
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates directly in your Slack channels.',
      icon: Slack,
      color: 'bg-purple-500',
    },
    {
      id: 'google',
      name: 'Google Workspace',
      description: 'Sync with Google Calendar and Gmail for seamless integration.',
      icon: GoogleCalendar,
      color: 'bg-red-500',
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Receive notifications and updates in your Discord servers.',
      icon: Discord,
      color: 'bg-indigo-500',
    },
  ];

  const handleToggleIntegration = (integrationId: string) => {
    const existingIntegration = integrations.find(i => i.type === integrationId);
    
    if (existingIntegration) {
      // If integration exists, toggle its enabled state
      const updatedIntegrations = integrations.map(integration =>
        integration.type === integrationId
          ? { ...integration, enabled: !integration.enabled }
          : integration
      );
      onUpdateIntegrations(updatedIntegrations);
    } else {
      // If integration doesn't exist, create a new one
      const newIntegration: Integration = {
        id: crypto.randomUUID(),
        type: integrationId,
        config: {},
        enabled: true,
        workspaceId: '',
      };
      onUpdateIntegrations([...integrations, newIntegration]);
    }
  };

  const handleConfigureIntegration = (integration: Integration) => {
    setConfiguringIntegration(integration);
  };

  const handleSaveConfiguration = (updatedConfig: Record<string, any>) => {
    if (!configuringIntegration) return;

    const updatedIntegrations = integrations.map(integration =>
      integration.id === configuringIntegration.id
        ? { ...integration, config: { ...integration.config, ...updatedConfig } }
        : integration
    );

    onUpdateIntegrations(updatedIntegrations);
    setConfiguringIntegration(null);
  };

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="mt-2 text-sm text-gray-600">
            Connect your favorite tools and services to streamline your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {availableIntegrations.map(integration => {
            const isConnected = integrations.some(i => i.type === integration.id);
            const currentIntegration = integrations.find(i => i.type === integration.id);

            return (
              <div key={integration.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${integration.color}`}>
                        <integration.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {isConnected && (
                        <button
                          onClick={() => currentIntegration && handleConfigureIntegration(currentIntegration)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
                        >
                          <ConfigIcon className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleToggleIntegration(integration.id)}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          isConnected
                            ? 'bg-red-50 text-red-700 hover:bg-red-100'
                            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                        }`}
                      >
                        {isConnected ? (
                          <>
                            <ToggleRight className="w-5 h-5 mr-2" />
                            Disconnect
                          </>
                        ) : (
                          <>
                            <Link2 className="w-5 h-5 mr-2" />
                            Connect
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {isConnected && currentIntegration?.enabled && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          <span className="text-sm text-gray-600">Connected and working properly</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Last synced: {new Date().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Configuration Modal */}
        {configuringIntegration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Configure {configuringIntegration.type.charAt(0).toUpperCase() + configuringIntegration.type.slice(1)}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
                  <input
                    type="text"
                    value={configuringIntegration.config.webhookUrl || ''}
                    onChange={(e) => handleSaveConfiguration({ ...configuringIntegration.config, webhookUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <input
                    type="password"
                    value={configuringIntegration.config.apiKey || ''}
                    onChange={(e) => handleSaveConfiguration({ ...configuringIntegration.config, apiKey: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter API key"
                  />
                </div>
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    checked={configuringIntegration.config.notifications || false}
                    onChange={(e) => handleSaveConfiguration({ ...configuringIntegration.config, notifications: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Enable notifications
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setConfiguringIntegration(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveConfiguration(configuringIntegration.config)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}