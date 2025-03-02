export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member';
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  assignedTo: string;
  labels: string[];
  attachments: Attachment[];
  checklist: ChecklistItem[];
  timeEstimate: number; // in minutes
  timeSpent: number; // in minutes
  watchers: string[]; // user IDs
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'link';
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  content: string;
  completed: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  members: User[];
  createdAt: string;
  updatedAt: string;
  icon: string;
  color: string;
  isArchived: boolean;
  settings: WorkspaceSettings;
}

export interface WorkspaceSettings {
  defaultView: 'board' | 'list' | 'calendar' | 'timeline';
  allowGuestAccess: boolean;
  notificationsEnabled: boolean;
  autoArchiveCompleted: boolean;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  workspaceId: string;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: string;
  endTime: string | null;
  description: string;
}

export interface Activity {
  id: string;
  type: 'task_created' | 'task_updated' | 'comment_added' | 'member_joined' | 'status_changed';
  entityId: string;
  userId: string;
  details: Record<string, any>;
  createdAt: string;
}

export interface Dashboard {
  totalTasks: number;
  completedTasks: number;
  upcomingDeadlines: Task[];
  recentActivity: Activity[];
  workloadByMember: Record<string, number>;
  tasksByStatus: Record<string, number>;
  tasksByPriority: Record<string, number>;
}

export interface Report {
  id: string;
  name: string;
  type: 'productivity' | 'time-tracking' | 'workload' | 'custom';
  filters: Record<string, any>;
  createdAt: string;
  lastRun: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'mention' | 'assignment' | 'due_soon' | 'comment' | 'status_change';
  read: boolean;
  data: Record<string, any>;
  createdAt: string;
}

export interface Calendar {
  events: CalendarEvent[];
  view: 'month' | 'week' | 'day';
  selectedDate: string;
}

export interface CalendarEvent {
  id: string;
  taskId: string;
  title: string;
  start: string;
  end: string;
  color: string;
}

export interface Timeline {
  tasks: Task[];
  startDate: string;
  endDate: string;
  groupBy: 'status' | 'assignee' | 'priority';
}

export interface Filter {
  id: string;
  name: string;
  conditions: FilterCondition[];
  workspaceId: string;
  isDefault: boolean;
}

export interface FilterCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'between';
  value: any;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  taskTemplate: Partial<Task>;
  checklistTemplate: ChecklistItem[];
  workspaceId: string;
}

export interface Integration {
  id: string;
  type: 'github' | 'slack' | 'google' | 'microsoft';
  config: Record<string, any>;
  enabled: boolean;
  workspaceId: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  workspaceId: string;
  enabled: boolean;
}

export interface AutomationTrigger {
  type: 'task_created' | 'status_changed' | 'due_date_approaching' | 'task_assigned';
  config: Record<string, any>;
}

export interface AutomationCondition {
  type: 'status' | 'priority' | 'assignee' | 'due_date';
  operator: 'equals' | 'not_equals' | 'contains' | 'greater' | 'less';
  value: any;
}

export interface AutomationAction {
  type: 'update_status' | 'assign_user' | 'send_notification' | 'add_label';
  config: Record<string, any>;
}