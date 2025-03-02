import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Calendar from './components/Calendar';
import Reports from './components/Reports';
import Team from './components/Team';
import Settings from './components/Settings';
import Timeline from './components/Timeline';
import ActivityFeed from './components/ActivityFeed';
import Integrations from './components/Integrations';
import WorkspaceModal from './components/WorkspaceModal';
import { Task, Workspace, User, Label, Activity, Integration } from './types';
import {
  getWorkspaces,
  saveWorkspaces,
  createWorkspace,
  createTask,
  getUsers,
  getLabels,
  getActivities,
  createActivity,
  saveActivities
} from './utils/storage';

function App() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<string>('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [users, setUsers] = useState<User[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeView, setActiveView] = useState<string>('tasks');

  useEffect(() => {
    const stored = getWorkspaces();
    const storedUsers = getUsers();
    const storedLabels = getLabels();
    const storedActivities = getActivities();

    if (stored.length > 0) {
      setWorkspaces(stored);
      setActiveWorkspace(stored[0].id);
    }
    setUsers(storedUsers);
    setLabels(storedLabels);
    setActivities(storedActivities);
  }, []);

  useEffect(() => {
    saveWorkspaces(workspaces);
  }, [workspaces]);

  const handleCreateWorkspace = (name: string, description: string) => {
    const newWorkspace = createWorkspace(name, description);
    setWorkspaces([...workspaces, newWorkspace]);
    setActiveWorkspace(newWorkspace.id);
    
    const activity = createActivity('member_joined', newWorkspace.id, users[0]?.id || '', {});
    setActivities([...activities, activity]);
    saveActivities([...activities, activity]);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    const currentWorkspace = workspaces.find(w => w.id === activeWorkspace);
    if (!currentWorkspace) return;

    const updatedWorkspaces = workspaces.map(workspace => {
      if (workspace.id !== activeWorkspace) return workspace;

      let newActivity: Activity;
      
      if (selectedTask) {
        // Edit existing task
        const updatedTasks = workspace.tasks.map(task =>
          task.id === selectedTask.id ? { ...task, ...taskData } : task
        );
        
        newActivity = createActivity('task_updated', selectedTask.id, users[0]?.id || '', {
          taskTitle: taskData.title || selectedTask.title
        });
        
        return { ...workspace, tasks: updatedTasks };
      } else {
        // Create new task
        const newTask = createTask(workspace.id, taskData);
        
        newActivity = createActivity('task_created', newTask.id, users[0]?.id || '', {
          taskTitle: newTask.title
        });
        
        return { ...workspace, tasks: [...workspace.tasks, newTask] };
      }
    });

    setWorkspaces(updatedWorkspaces);
    setIsTaskModalOpen(false);
    setSelectedTask(undefined);
  };

  const handleNavigate = (route: string) => {
    setActiveView(route);
  };

  const currentWorkspace = workspaces.find(w => w.id === activeWorkspace);
  const todoTasks = currentWorkspace?.tasks.filter(t => t.status === 'todo') || [];
  const inProgressTasks = currentWorkspace?.tasks.filter(t => t.status === 'in-progress') || [];
  const completedTasks = currentWorkspace?.tasks.filter(t => t.status === 'completed') || [];

  const renderContent = () => {
    switch (activeView) {
      case 'calendar':
        return <Calendar tasks={currentWorkspace?.tasks || []} />;
      case 'timeline':
        return <Timeline tasks={currentWorkspace?.tasks || []} />;
      case 'reports':
        return <Reports workspace={currentWorkspace} />;
      case 'team':
        return <Team users={users} onUpdateUsers={setUsers} />;
      case 'settings':
        return <Settings workspace={currentWorkspace} onUpdateWorkspace={(updated) => {
          setWorkspaces(workspaces.map(w => w.id === updated.id ? updated : w));
        }} />;
      case 'integrations':
        return (
          <Integrations
            integrations={currentWorkspace?.integrations || []}
            onUpdateIntegrations={(updatedIntegrations) => {
              if (currentWorkspace) {
                setWorkspaces(workspaces.map(w =>
                  w.id === currentWorkspace.id
                    ? { ...w, integrations: updatedIntegrations }
                    : w
                ));
              }
            }}
          />
        );
      case 'tasks':
      default:
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentWorkspace?.name || 'No workspace selected'}
              </h1>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </div>

            <div className="grid grid-cols-[1fr_300px] gap-8">
              <div className="flex gap-6 overflow-auto pb-8">
                <TaskList
                  title="To Do"
                  tasks={todoTasks}
                  users={users}
                  labels={labels}
                  onTaskClick={(task) => {
                    setSelectedTask(task);
                    setIsTaskModalOpen(true);
                  }}
                  onAddTask={() => setIsTaskModalOpen(true)}
                  onAssigneeClick={() => {}}
                />
                <TaskList
                  title="In Progress"
                  tasks={inProgressTasks}
                  users={users}
                  labels={labels}
                  onTaskClick={(task) => {
                    setSelectedTask(task);
                    setIsTaskModalOpen(true);
                  }}
                  onAddTask={() => setIsTaskModalOpen(true)}
                  onAssigneeClick={() => {}}
                />
                <TaskList
                  title="Completed"
                  tasks={completedTasks}
                  users={users}
                  labels={labels}
                  onTaskClick={(task) => {
                    setSelectedTask(task);
                    setIsTaskModalOpen(true);
                  }}
                  onAddTask={() => setIsTaskModalOpen(true)}
                  onAssigneeClick={() => {}}
                />
              </div>
              
              <ActivityFeed
                activities={activities.filter(a => 
                  currentWorkspace?.tasks.some(t => t.id === a.entityId) ||
                  a.entityId === currentWorkspace?.id
                )}
                users={users}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        workspaces={workspaces}
        activeWorkspace={activeWorkspace}
        onWorkspaceSelect={setActiveWorkspace}
        onCreateWorkspace={() => setIsWorkspaceModalOpen(true)}
        onNavigate={handleNavigate}
        activeView={activeView}
      />
      
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>

      <TaskModal
        task={selectedTask}
        users={users}
        labels={labels}
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(undefined);
        }}
        onSave={handleSaveTask}
      />

      <WorkspaceModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
        onSave={handleCreateWorkspace}
      />
    </div>
  );
}

export default App;