# Dynamic Dashboard Application

A React-based dynamic dashboard application similar to CNAPP Dashboard with widget management capabilities.

## Features

### ✅ Core Requirements Implemented

1. **JSON-Driven Dashboard Structure**
   - Dynamic dashboard built from JSON configuration
   - Categories with multiple widgets support
   - Flexible widget types: chart, metric, progress, alert

2. **Widget Management**
   - ✅ Add widgets dynamically to categories
   - ✅ Remove widgets with cross icon
   - ✅ Widget selection from predefined categories (CSPM, CWPP, Image, Ticket)
   - ✅ Custom widget creation with name and text

3. **Search Functionality**
   - ✅ Search across all widgets by name and content
   - Real-time filtering

4. **User Interface**
   - Professional dashboard design matching reference images
   - Interactive charts using Recharts
   - Responsive grid layout
   - Clean card-based widget display

### 🏗️ Technical Implementation

- **React 18** with TypeScript
- **Zustand** for state management
- **Tailwind CSS** with custom design system
- **Recharts** for data visualizations
- **Shadcn/ui** components
- **Local storage persistence** (via Zustand)

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps to Run Locally

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

## Usage Guide

### Adding Widgets

#### Method 1: From Categories (Predefined Widgets)
1. Click "Add Widget" button in header or category
2. Select "Select from Categories" tab
3. Choose category: CSPM, CWPP, Image, or Ticket
4. Check desired widgets
5. Click "Confirm"

#### Method 2: Custom Widget
1. Click "Add Widget" button
2. Select "Create Custom Widget" tab
3. Choose target category
4. Enter widget name and description
5. Click "Add Widget"

### Removing Widgets
- Hover over any widget card
- Click the "X" button that appears in top-right corner
- Widget will be removed from the category

### Searching Widgets
- Use the search bar in the header
- Type widget name or content to filter
- Search works across all categories and widgets

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard component
│   ├── DashboardCategory.tsx  # Category container
│   ├── WidgetCard.tsx         # Individual widget display
│   ├── WidgetChart.tsx        # Chart visualizations
│   └── AddWidgetModal.tsx     # Widget management modal
├── store/
│   └── dashboardStore.ts      # Zustand state management
└── pages/
    └── Index.tsx              # Main page entry point
```

## JSON Data Structure

```typescript
interface Widget {
  id: string;
  name: string;
  text: string;
  type: 'chart' | 'metric' | 'progress' | 'alert';
  data?: any; // Chart/visualization data
}

interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}
```

## Available Widget Types

1. **Chart Widgets** - Pie charts with data visualization
2. **Metric Widgets** - Simple text/number displays
3. **Progress Widgets** - Progress bars with critical/high indicators
4. **Alert Widgets** - Empty state with alert messages

## Customization

### Adding New Categories
Edit `src/store/dashboardStore.ts` to add new categories to `initialData`

### Adding New Predefined Widgets
Edit `src/components/AddWidgetModal.tsx` to extend `predefinedWidgets` object

### Styling
- Design system defined in `src/index.css`
- Tailwind configuration in `tailwind.config.ts`
- All colors use HSL semantic tokens

## Build for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

## Technology Stack

- **Frontend**: React 18, TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **UI Components**: Shadcn/ui
- **Build Tool**: Vite
- **Package Manager**: npm

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

*This dashboard application demonstrates modern React development patterns with proper state management, component architecture, and professional UI design.*