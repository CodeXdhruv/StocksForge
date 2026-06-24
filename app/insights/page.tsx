"use client";
import { Lightbulb } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">AI Insights</h1>
      <p className="text-muted-foreground mb-8">Curated market trends and actionable signals discovered by Quantix AI.</p>
      
      <div className="bg-card border border-border rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center">
        <Lightbulb className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Insights Yet</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Add more stocks to your watchlist or portfolio to receive personalized AI-driven market insights and alerts.
        </p>
        <button className="bg-foreground text-background px-6 py-2.5 rounded-lg font-medium hover:bg-foreground/90 transition-colors">
          Explore Markets
        </button>
      </div>
    </div>
  );
}
