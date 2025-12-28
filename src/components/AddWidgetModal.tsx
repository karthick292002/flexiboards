import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useDashboardStore, Widget } from '@/store/dashboardStore';

interface AddWidgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: string;
}

const predefinedWidgets: Record<string, Omit<Widget, 'id'>[]> = {
  cspm: [
    { name: 'Cloud Accounts', text: 'Connected and disconnected cloud accounts overview', type: 'chart' },
    { name: 'Cloud Account Risk Assessment', text: 'Security risks across cloud accounts', type: 'chart' },
    { name: 'Security Compliance', text: 'Compliance status across services', type: 'metric' },
  ],
  cwpp: [
    { name: 'Top 5 Namespace Specific Alerts', text: 'Critical namespace alerts', type: 'alert' },
    { name: 'Workload Alerts', text: 'Workload security alerts', type: 'alert' },
    { name: 'Threat Detection', text: 'Real-time threat detection status', type: 'metric' },
  ],
  image: [
    { name: 'Image Vulnerability Scan', text: 'Container image security scan results', type: 'progress' },
    { name: 'Registry Security', text: 'Registry security compliance', type: 'metric' },
    { name: 'Base Image Analysis', text: 'Base image security assessment', type: 'chart' },
  ],
  ticket: [
    { name: 'Open Security Tickets', text: 'Current open security tickets', type: 'metric' },
    { name: 'Ticket Resolution Time', text: 'Average ticket resolution metrics', type: 'chart' },
    { name: 'Critical Incidents', text: 'High priority security incidents', type: 'alert' },
  ],
};

export const AddWidgetModal = ({ open, onOpenChange, defaultCategory }: AddWidgetModalProps) => {
  const { categories, addWidget } = useDashboardStore();
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory || 'cspm');
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [selectedWidgets, setSelectedWidgets] = useState<Set<string>>(new Set());

  const handleAddCustomWidget = () => {
    if (!widgetName.trim() || !widgetText.trim()) return;
    
    const widget: Omit<Widget, 'id'> = {
      name: widgetName,
      text: widgetText,
      type: 'metric',
    };
    
    addWidget(selectedCategory, widget);
    setWidgetName('');
    setWidgetText('');
    onOpenChange(false);
  };

  const handleAddPredefinedWidgets = () => {
    const categoryWidgets = predefinedWidgets[selectedCategory] || [];
    
    categoryWidgets.forEach((widget) => {
      if (selectedWidgets.has(widget.name)) {
        addWidget(selectedCategory, widget);
      }
    });
    
    setSelectedWidgets(new Set());
    onOpenChange(false);
  };

  const handleWidgetToggle = (widgetName: string) => {
    const newSelected = new Set(selectedWidgets);
    if (newSelected.has(widgetName)) {
      newSelected.delete(widgetName);
    } else {
      newSelected.add(widgetName);
    }
    setSelectedWidgets(newSelected);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="predefined" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predefined">Select from Categories</TabsTrigger>
            <TabsTrigger value="custom">Create Custom Widget</TabsTrigger>
          </TabsList>

          <TabsContent value="predefined" className="space-y-6">
            <div className="space-y-4">
              <Label>Personalise your dashboard by adding the following widget</Label>
              
              {/* Category Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="cspm">CSPM</TabsTrigger>
                  <TabsTrigger value="cwpp">CWPP</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="ticket">Ticket</TabsTrigger>
                </TabsList>

                {Object.entries(predefinedWidgets).map(([categoryKey, widgets]) => (
                  <TabsContent key={categoryKey} value={categoryKey} className="space-y-3">
                    {widgets.map((widget) => (
                      <div key={widget.name} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <Checkbox
                          id={widget.name}
                          checked={selectedWidgets.has(widget.name)}
                          onCheckedChange={() => handleWidgetToggle(widget.name)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={widget.name} className="font-medium cursor-pointer">
                            {widget.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{widget.text}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddPredefinedWidgets}
                disabled={selectedWidgets.size === 0}
                className="bg-dashboard-primary hover:bg-dashboard-primary/90"
              >
                Confirm
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="widgetName">Widget Name</Label>
                <Input
                  id="widgetName"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  placeholder="Enter widget name..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="widgetText">Widget Text</Label>
                <Textarea
                  id="widgetText"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                  placeholder="Enter widget description..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddCustomWidget}
                disabled={!widgetName.trim() || !widgetText.trim()}
                className="bg-dashboard-primary hover:bg-dashboard-primary/90"
              >
                Add Widget
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};