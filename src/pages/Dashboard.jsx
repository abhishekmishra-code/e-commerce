import { BarChart3, Package, Users, TrendingUp } from "lucide-react";
import { Card } from "../components/ui/card";

const stats = [
  {
    name: "Total Products",
    value: "1,234",
    change: "+12%",
    changeType: "positive",
    icon: Package,
  },
  {
    name: "Total Revenue",
    value: "$45,678",
    change: "+8%",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    name: "Active Users",
    value: "8,920",
    change: "+15%",
    changeType: "positive",
    icon: Users,
  },
  {
    name: "Conversion Rate",
    value: "3.24%",
    change: "-2%",
    changeType: "negative",
    icon: BarChart3,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your e-commerce admin panel. Here's an overview of your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className={`text-sm ${
                  stat.changeType === "positive" ? "text-success" : "text-destructive"
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 shadow-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-primary text-primary-foreground cursor-pointer hover:shadow-elevated transition-shadow">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Add Product</h3>
                <p className="text-sm opacity-90">Create a new product listing</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border-2 border-border hover:border-primary cursor-pointer transition-colors">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">View Analytics</h3>
                <p className="text-sm text-muted-foreground">Check your store performance</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border-2 border-border hover:border-primary cursor-pointer transition-colors">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Manage Users</h3>
                <p className="text-sm text-muted-foreground">Handle customer accounts</p>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 shadow-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-foreground">New product "Premium Headphones" was added</span>
            </div>
            <span className="text-sm text-muted-foreground">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-foreground">Product "Smart Watch" is low in stock</span>
            </div>
            <span className="text-sm text-muted-foreground">4 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-foreground">Order #12345 was processed</span>
            </div>
            <span className="text-sm text-muted-foreground">6 hours ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
}