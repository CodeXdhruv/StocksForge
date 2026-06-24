"use client";
import { BellRing } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">Alerts</h1>
      <p className="text-muted-foreground mb-8">Manage your price targets, news triggers, and volatility alerts.</p>
      
      <div className="bg-card border border-border rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center">
        <BellRing className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
        <h3 className="text-lg font-semibold mb-2">You're all caught up</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          There are currently no active alerts triggered for your tracked assets.
        </p>
        <button className="bg-foreground text-background px-6 py-2.5 rounded-lg font-medium hover:bg-foreground/90 transition-colors">
          Create New Alert
        </button>
      </div>
    </div>
  );
}
