import React from 'react';
import { format, addDays, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { Task } from '../types';

interface TimelineProps {
  tasks: Task[];
}

export default function Timeline({ tasks }: TimelineProps) {
  const today = new Date();
  const timelineStart = startOfDay(today);
  const timelineEnd = endOfDay(addDays(today, 14));

  const timelineDays = Array.from({ length: 15 }, (_, i) => addDays(timelineStart, i));

  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return isWithinInterval(taskDate, {
        start: startOfDay(date),
        end: endOfDay(date),
      });
    });
  };

  const statusColors = {
    todo: 'bg-blue-100 border-blue-300 text-blue-800',
    'in-progress': 'bg-yellow-100 border-yellow-300 text-yellow-800',
    completed: 'bg-green-100 border-green-300 text-green-800',
  };

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Timeline</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-[200px_1fr] border-b">
          <div className="p-4 font-semibold text-gray-700 border-r">Task</div>
          <div className="grid grid-cols-15 divide-x">
            {timelineDays.map(day => (
              <div
                key={day.toISOString()}
                className={`p-4 text-center text-sm ${
                  format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
                    ? 'bg-indigo-50 font-semibold'
                    : ''
                }`}
              >
                <div className="font-medium">{format(day, 'EEE')}</div>
                <div className="text-gray-500">{format(day, 'd')}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[200px_1fr] divide-y">
          {tasks.map(task => (
            <div key={task.id} className="grid grid-cols-[200px_1fr] group hover:bg-gray-50">
              <div className="p-4 border-r flex items-center">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {task.title}
                </span>
              </div>
              <div className="grid grid-cols-15 relative">
                {timelineDays.map(day => {
                  const dayTasks = getTasksForDay(day);
                  const hasTask = dayTasks.some(t => t.id === task.id);
                  
                  return (
                    <div
                      key={day.toISOString()}
                      className="border-r p-2 flex items-center justify-center"
                    >
                      {hasTask && (
                        <div
                          className={`w-full py-1 px-2 rounded border ${
                            statusColors[task.status]
                          } text-xs truncate`}
                        >
                          {task.title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}