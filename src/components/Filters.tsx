import React, { useState } from 'react';
import { Filter as FilterIcon, Plus, Save, Trash2, Edit2 } from 'lucide-react';
import { Filter } from '../types';

interface FiltersProps {
  filters: Filter[];
  onCreateFilter: (filter: Omit<Filter, 'id'>) => void;
  onUpdateFilter: (filter: Filter) => void;
  onDeleteFilter: (filterId: string) => void;
  onApplyFilter: (filter: Filter) => void;
}

export default function Filters({
  filters,
  onCreateFilter,
  onUpdateFilter,
  onDeleteFilter,
  onApplyFilter
}: FiltersProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingFilter, setEditingFilter] = useState<Filter | null>(null);
  const [newFilter, setNewFilter] = useState({
    name: '',
    conditions: [{ field: 'status', operator: 'equals' as const, value: 'todo' }],
    workspaceId: '',
    isDefault: false
  });

  const fields = [
    { id: 'status', label: 'Status' },
    { id: 'priority', label: 'Priority' },
    { id: 'assignee', label: 'Assignee' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'labels', label: 'Labels' }
  ];

  const operators = [
    { id: 'equals', label: 'Equals' },
    { id: 'contains', label: 'Contains' },
    { id: 'greater', label: 'Greater than' },
    { id: 'less', label: 'Less than' },
    { id: 'between', label: 'Between' }
  ];

  const handleCreateFilter = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateFilter(newFilter);
    setIsCreating(false);
    setNewFilter({
      name: '',
      conditions: [{ field: 'status', operator: 'equals', value: 'todo' }],
      workspaceId: '',
      isDefault: false
    });
  };

  const handleUpdateFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFilter) {
      onUpdateFilter(editingFilter);
      setEditingFilter(null);
    }
  };

  return (
    <div className="h-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Filters</h1>
            <p className="mt-2 text-sm text-gray-600">
              Create and manage custom filters for your tasks
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Filter
          </button>
        </div>

        <div className="grid gap-6">
          {filters.map(filter => (
            <div key={filter.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {filter.name}
                    </h3>
                    {filter.isDefault && (
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="mt-4 space-y-2">
                    {filter.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">
                          {fields.find(f => f.id === condition.field)?.label}
                        </span>
                        <span>{operators.find(o => o.id === condition.operator)?.label}</span>
                        <span className="font-medium">{condition.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingFilter(filter)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeleteFilter(filter.id)}
                    className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onApplyFilter(filter)}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Filter Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Create Filter</h2>
              <form onSubmit={handleCreateFilter} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter Name
                  </label>
                  <input
                    type="text"
                    value={newFilter.name}
                    onChange={e => setNewFilter({ ...newFilter, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conditions
                  </label>
                  {newFilter.conditions.map((condition, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <select
                        value={condition.field}
                        onChange={e => {
                          const newConditions = [...newFilter.conditions];
                          newConditions[index] = {
                            ...condition,
                            field: e.target.value
                          };
                          setNewFilter({ ...newFilter, conditions: newConditions });
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        {fields.map(field => (
                          <option key={field.id} value={field.id}>
                            {field.label}
                          </option>
                        ))}
                      </select>
                      <select
                        value={condition.operator}
                        onChange={e => {
                          const newConditions = [...newFilter.conditions];
                          newConditions[index] = {
                            ...condition,
                            operator: e.target.value as any
                          };
                          setNewFilter({ ...newFilter, conditions: newConditions });
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        {operators.map(op => (
                          <option key={op.id} value={op.id}>
                            {op.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={condition.value}
                        onChange={e => {
                          const newConditions = [...newFilter.conditions];
                          newConditions[index] = {
                            ...condition,
                            value: e.target.value
                          };
                          setNewFilter({ ...newFilter, conditions: newConditions });
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Value"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setNewFilter({
                      ...newFilter,
                      conditions: [
                        ...newFilter.conditions,
                        { field: 'status', operator: 'equals', value: '' }
                      ]
                    })}
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    + Add condition
                  </button>
                </div>

                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    checked={newFilter.isDefault}
                    onChange={e => setNewFilter({ ...newFilter, isDefault: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Set as default filter
                  </label>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Create Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Filter Modal */}
        {editingFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Filter</h2>
              <form onSubmit={handleUpdateFilter} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter Name
                  </label>
                  <input
                    type="text"
                    value={editingFilter.name}
                    onChange={e => setEditingFilter({ ...editingFilter, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conditions
                  </label>
                  {editingFilter.conditions.map((condition, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <select
                        value={condition.field}
                        onChange={e => {
                          const newConditions = [...editingFilter.conditions];
                          newConditions[index] = {
                            ...condition,
                            field: e.target.value
                          };
                          setEditingFilter({ ...editingFilter, conditions: newConditions });
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        {fields.map(field => (
                          <option key={field.id} value={field.id}>
                            {field.label}
                          </option>
                        ))}
                      </select>
                      <select
                        value={condition.operator}
                        onChange={e => {
                          const newConditions = [...editingFilter.conditions];
                          newConditions[index] = {
                            ...condition,
                            operator: e.target.value as any
                          };
                          setEditingFilter({ ...editingFilter, conditions: newConditions });
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        {operators.map(op => (
                          <option key={op.id} value={op.id}>
                            {op.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={condition.value}
                        onChange={e => {
                          const newConditions = [...editingFilter.conditions];
                          newConditions[index] = {
                            ...condition,
                            value: e.target.value
                          };
                          setEditingFilter({ ...editingFilter, conditions: newConditions });
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Value"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setEditingFilter({
                      ...editingFilter,
                      conditions: [
                        ...editingFilter.conditions,
                        { field: 'status', operator: 'equals', value: '' }
                      ]
                    })}
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    + Add condition
                  </button>
                </div>

                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    checked={editingFilter.isDefault}
                    onChange={e => setEditingFilter({ ...editingFilter, isDefault: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Set as default filter
                  </label>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setEditingFilter(null)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}