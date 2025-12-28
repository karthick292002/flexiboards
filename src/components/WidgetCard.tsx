import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Widget, useDashboardStore } from '@/store/dashboardStore';
import { WidgetChart } from './WidgetChart';

interface WidgetCardProps {
  widget: Widget;
  categoryId: string;
}

export const WidgetCard = ({ widget, categoryId }: WidgetCardProps) => {
  const removeWidget = useDashboardStore((state) => state.removeWidget);

  const handleRemove = () => {
    removeWidget(categoryId, widget.id);
  };

  return (
    <Card className="relative group hover:shadow-md transition-shadow">
      {/* Remove button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
      >
        <X className="w-4 h-4" />
      </Button>

      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground pr-8">
          {widget.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {widget.type === 'chart' && widget.data ? (
          <WidgetChart widget={widget} />
        ) : widget.type === 'progress' && widget.data ? (
          <div className="space-y-4">
            <div className="text-2xl font-bold">{widget.data.total}</div>
            <div className="text-sm text-muted-foreground">Total Vulnerabilities</div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-destructive">Critical ({widget.data.critical})</span>
                <span className="text-dashboard-warning">High ({widget.data.high})</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 flex">
                <div 
                  className="bg-destructive h-2 rounded-l-full" 
                  style={{ width: `${(widget.data.critical / widget.data.total) * 100}%` }}
                />
                <div 
                  className="bg-dashboard-warning h-2 rounded-r-full" 
                  style={{ width: `${(widget.data.high / widget.data.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ) : widget.type === 'alert' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-6xl text-muted-foreground/20 mb-4">📊</div>
            <p className="text-sm text-muted-foreground">{widget.text}</p>
          </div>
        ) : (
          <div className="py-4">
            <p className="text-sm text-muted-foreground">{widget.text}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};