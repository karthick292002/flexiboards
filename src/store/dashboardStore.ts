import { create } from 'zustand';

export interface Widget {
  id: string;
  name: string;
  text: string;
  type: 'chart' | 'metric' | 'progress' | 'alert';
  data?: any;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

interface DashboardState {
  categories: Category[];
  searchTerm: string;
  addWidget: (categoryId: string, widget: Omit<Widget, 'id'>) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  setSearchTerm: (term: string) => void;
  getFilteredWidgets: () => Widget[];
  initializeData: () => void;
}

// Initial dashboard data
const initialData: Category[] = [
  {
    id: 'cspm',
    name: 'CSPM Executive Dashboard',
    widgets: [
      {
        id: 'cloud-accounts',
        name: 'Cloud Accounts',
        text: 'Connected (2), Not Connected (2)',
        type: 'chart',
        data: { connected: 2, notConnected: 2 }
      },
      {
        id: 'cloud-risk-assessment',
        name: 'Cloud Account Risk Assessment',
        text: '9659 Total Issues',
        type: 'chart',
        data: { 
          total: 9659,
          failed: 1689,
          warning: 681,
          notAvailable: 36,
          passed: 7253
        }
      }
    ]
  },
  {
    id: 'cwpp',
    name: 'CWPP Dashboard',
    widgets: [
      {
        id: 'namespace-alerts',
        name: 'Top 5 Namespace Specific Alerts',
        text: 'No Graph data available!',
        type: 'alert',
      },
      {
        id: 'workload-alerts',
        name: 'Workload Alerts',
        text: 'No Graph data available!',
        type: 'alert',
      }
    ]
  },
  {
    id: 'registry',
    name: 'Registry Scan',
    widgets: [
      {
        id: 'image-risk',
        name: 'Image Risk Assessment',
        text: '1470 Total Vulnerabilities',
        type: 'progress',
        data: { total: 1470, critical: 9, high: 150 }
      },
      {
        id: 'image-security',
        name: 'Image Security Issues',
        text: '2 Total Images',
        type: 'progress',
        data: { total: 2, critical: 2, high: 2 }
      }
    ]
  }
];

export const useDashboardStore = create<DashboardState>((set, get) => ({
  categories: [],
  searchTerm: '',
  
  addWidget: (categoryId, widget) => {
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: [...category.widgets, { ...widget, id: Date.now().toString() }]
            }
          : category
      )
    }));
  },
  
  removeWidget: (categoryId, widgetId) => {
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter((widget) => widget.id !== widgetId)
            }
          : category
      )
    }));
  },
  
  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },
  
  getFilteredWidgets: () => {
    const { categories, searchTerm } = get();
    if (!searchTerm) return [];
    
    const allWidgets = categories.flatMap(category => 
      category.widgets.map(widget => ({ ...widget, categoryId: category.id }))
    );
    
    return allWidgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
  
  initializeData: () => {
    set({ categories: initialData });
  }
}));