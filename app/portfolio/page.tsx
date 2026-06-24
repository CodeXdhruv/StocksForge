"use client";
import { PieChart, Activity, DollarSign } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-2">My Portfolio</h1>
      <p className="text-muted-foreground mb-8">Manage and analyze your current holdings.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
             <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="text-2xl font-bold font-mono">$124,500.00</div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-success/10 rounded-xl">
             <Activity className="w-6 h-6 text-success" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Day Return</div>
            <div className="text-2xl font-bold font-mono text-success">+$1,245.50</div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
             <PieChart className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Return</div>
            <div className="text-2xl font-bold font-mono text-success">+14.5%</div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center">
        <PieChart className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Portfolio Empty</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Connect your brokerage account or manually add holdings to start analyzing your portfolio with AI.
        </p>
        <button className="bg-foreground text-background px-6 py-2.5 rounded-lg font-medium hover:bg-foreground/90 transition-colors">
          Add Holdings
        </button>
      </div>
    </div>
  );
}
