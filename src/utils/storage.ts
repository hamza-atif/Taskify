import {
  Workspace,
  Task,
  User,
  Comment,
  Label,
  TimeEntry,
  Activity,
  Template,
  Integration,
  Automation,
  Filter
} from '../types';

const STORAGE_KEYS = {
  WORKSPACES: 'taskify-workspaces',
  USERS: 'taskify-users',
  COMMENTS: 'taskify-comments',
  LABELS: 'taskify-labels',
  TIME_ENTRIES: 'taskify-time-entries',
  ACTIVITIES: 'taskify-activities',
  TEMPLATES: 'taskify-templates',
  INTEGRATIONS: 'taskify-integrations',
  AUTOMATIONS: 'taskify-automations',
  FILTERS: 'taskify-filters',
  CURRENT_USER: 'taskify-current-user'
};

// Generic storage functions
const getItem = <T>(key: string): T[] => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const setItem = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Workspace functions
export const getWorkspaces = (): Workspace[] => getItem(STORAGE_KEYS.WORKSPACES);
export const saveWorkspaces = (workspaces: Workspace[]): void => setItem(STORAGE_KEYS.WORKSPACES, workspaces);

export const createWorkspace = (name: string, description: string = ''): Workspace => ({
  id: crypto.randomUUID(),
  name,
  description,
  tasks: [],
  members: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  icon: '📋',
  color: '#6366F1',
  isArchived: false,
  settings: {
    defaultView: 'board',
    allowGuestAccess: false,
    notificationsEnabled: true,
    autoArchiveCompleted: false
  }
});

// Task functions
export const createTask = (workspaceId: string, task: Partial<Task>): Task => ({
  id: crypto.randomUUID(),
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  assignedTo: '',
  labels: [],
  attachments: [],
  checklist: [],
  timeEstimate: 0,
  timeSpent: 0,
  watchers: [],
  ...task
});

// User functions
export const getUsers = (): User[] => getItem(STORAGE_KEYS.USERS);
export const saveUsers = (users: User[]): void => setItem(STORAGE_KEYS.USERS, users);

export const createUser = (name: string, email: string): User => ({
  id: crypto.randomUUID(),
  name,
  email,
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
  role: 'member'
});

// Comment functions
export const getComments = (): Comment[] => getItem(STORAGE_KEYS.COMMENTS);
export const saveComments = (comments: Comment[]): void => setItem(STORAGE_KEYS.COMMENTS, comments);

export const createComment = (taskId: string, userId: string, content: string): Comment => ({
  id: crypto.randomUUID(),
  taskId,
  userId,
  content,
  createdAt: new Date().toISOString()
});

// Label functions
export const getLabels = (): Label[] => getItem(STORAGE_KEYS.LABELS);
export const saveLabels = (labels: Label[]): void => setItem(STORAGE_KEYS.LABELS, labels);

export const createLabel = (name: string, color: string, workspaceId: string): Label => ({
  id: crypto.randomUUID(),
  name,
  color,
  workspaceId
});

// Time entry functions
export const getTimeEntries = (): TimeEntry[] => getItem(STORAGE_KEYS.TIME_ENTRIES);
export const saveTimeEntries = (entries: TimeEntry[]): void => setItem(STORAGE_KEYS.TIME_ENTRIES, entries);

export const createTimeEntry = (taskId: string, userId: string): TimeEntry => ({
  id: crypto.randomUUID(),
  taskId,
  userId,
  startTime: new Date().toISOString(),
  endTime: null,
  description: ''
});

// Activity functions
export const getActivities = (): Activity[] => getItem(STORAGE_KEYS.ACTIVITIES);
export const saveActivities = (activities: Activity[]): void => setItem(STORAGE_KEYS.ACTIVITIES, activities);

export const createActivity = (
  type: Activity['type'],
  entityId: string,
  userId: string,
  details: Record<string, any>
): Activity => ({
  id: crypto.randomUUID(),
  type,
  entityId,
  userId,
  details,
  createdAt: new Date().toISOString()
});

// Template functions
export const getTemplates = (): Template[] => getItem(STORAGE_KEYS.TEMPLATES);
export const saveTemplates = (templates: Template[]): void => setItem(STORAGE_KEYS.TEMPLATES, templates);

// Integration functions
export const getIntegrations = (): Integration[] => getItem(STORAGE_KEYS.INTEGRATIONS);
export const saveIntegrations = (integrations: Integration[]): void => setItem(STORAGE_KEYS.INTEGRATIONS, integrations);

// Automation functions
export const getAutomations = (): Automation[] => getItem(STORAGE_KEYS.AUTOMATIONS);
export const saveAutomations = (automations: Automation[]): void => setItem(STORAGE_KEYS.AUTOMATIONS, automations);

// Filter functions
export const getFilters = (): Filter[] => getItem(STORAGE_KEYS.FILTERS);
export const saveFilters = (filters: Filter[]): void => setItem(STORAGE_KEYS.FILTERS, filters);

// Current user functions
export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return stored ? JSON.parse(stored) : null;
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};