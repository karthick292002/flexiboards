import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category } from '@/store/dashboardStore';
import { WidgetCard } from './WidgetCard';
import { useState } from 'react';
import { AddWidgetModal } from './AddWidgetModal';

interface DashboardCategoryProps {
  category: Category;
}

export const DashboardCategory = ({ category }: DashboardCategoryProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.widgets.map((widget) => (
          <WidgetCard 
            key={widget.id} 
            widget={widget} 
            categoryId={category.id} 
          />
        ))}
        
        {/* Add Widget Button */}
        <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] hover:border-dashboard-primary/50 transition-colors cursor-pointer group">
          <Button
            variant="ghost"
            onClick={() => setIsAddModalOpen(true)}
            className="h-auto p-6 flex-col gap-4 group-hover:bg-dashboard-primary/5"
          >
            <Plus className="w-8 h-8 text-muted-foreground group-hover:text-dashboard-primary" />
            <span className="text-muted-foreground group-hover:text-dashboard-primary">
              Add Widget
            </span>
          </Button>
        </div>
      </div>

      <AddWidgetModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen}
        defaultCategory={category.id}
      />
    </div>
  );
};