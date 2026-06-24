"use client";
import WatchlistPanel from "@/components/WatchlistPanel";

export default function WatchlistPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">My Watchlist</h1>
      <p className="text-muted-foreground mb-8">Track your favorite stocks and their performance.</p>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Reusing the WatchlistPanel component but full width */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
           <WatchlistPanel />
        </div>
      </div>
    </div>
  );
}
