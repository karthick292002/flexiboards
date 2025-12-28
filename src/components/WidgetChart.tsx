import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Widget } from '@/store/dashboardStore';

interface WidgetChartProps {
  widget: Widget;
}

export const WidgetChart = ({ widget }: WidgetChartProps) => {
  if (widget.id === 'cloud-accounts') {
    const data = [
      { name: 'Connected', value: widget.data.connected, color: 'hsl(var(--chart-1))' },
      { name: 'Not Connected', value: widget.data.notConnected, color: 'hsl(var(--muted))' }
    ];

    return (
      <div className="space-y-4">
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">
                {entry.name} ({entry.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (widget.id === 'cloud-risk-assessment') {
    const data = [
      { name: 'Failed', value: widget.data.failed, color: 'hsl(var(--destructive))' },
      { name: 'Warning', value: widget.data.warning, color: 'hsl(var(--dashboard-warning))' },
      { name: 'Not Available', value: widget.data.notAvailable, color: 'hsl(var(--muted))' },
      { name: 'Passed', value: widget.data.passed, color: 'hsl(var(--dashboard-success))' }
    ];

    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{widget.data.total}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-1">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground truncate">
                {entry.name} ({entry.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};