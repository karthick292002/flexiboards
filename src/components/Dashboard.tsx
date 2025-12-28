import { useEffect, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardCategory } from './DashboardCategory';
import { AddWidgetModal } from './AddWidgetModal';

export const Dashboard = () => {
  const { categories, searchTerm, setSearchTerm, initializeData } = useDashboardStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">CNAPP Dashboard</h1>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-dashboard-primary hover:bg-dashboard-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Widget
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Dashboard Categories */}
      <div className="space-y-8">
        {categories.map((category) => (
          <DashboardCategory key={category.id} category={category} />
        ))}
      </div>

      {/* Add Widget Modal */}
      <AddWidgetModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
      />
    </div>
  );
};