import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';
import { Task } from '../types';

interface CalendarProps {
  tasks: Task[];
}

export default function Calendar({ tasks }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const tasksByDate: Record<string, Task[]> = {};
  tasks.forEach(task => {
    const date = task.dueDate.split('T')[0];
    if (!tasksByDate[date]) {
      tasksByDate[date] = [];
    }
    tasksByDate[date].push(task);
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Previous
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const dayTasks = tasksByDate[dateStr] || [];
            
            return (
              <div
                key={day.toString()}
                className={`min-h-[120px] bg-white p-2 ${
                  !isSameMonth(day, currentDate) ? 'bg-gray-50' : ''
                } ${isToday(day) ? 'bg-blue-50' : ''}`}
              >
                <div className="font-medium text-sm text-gray-500">
                  {format(day, 'd')}
                </div>
                <div className="mt-1 space-y-1">
                  {dayTasks.map(task => (
                    <div
                      key={task.id}
                      className={`text-xs p-1 rounded truncate ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}