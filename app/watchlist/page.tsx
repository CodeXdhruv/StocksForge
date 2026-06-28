"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreHorizontal, FileText, TrendingUp, TrendingDown, Trash2, Search, X, Info } from "lucide-react";
import { Button, Badge, Card, CardContent, Skeleton, Input } from "@/components/ui";
import { TickerAutocomplete } from "@/components/ticker-autocomplete";
import { motion, AnimatePresence } from "framer-motion";
import { getTickerIconUrl } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useApi } from "@/hooks/useApi";
import { AuthGate } from "@/components/auth-gate";

function WatchlistContent() {
  const queryClient = useQueryClient();

  const { getWatchlist, apiClient } = useApi();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [newTicker, setNewTicker] = useState("");
  const searchContainerRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchVisible(false);
      }
    };
    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchVisible]);

  const { data, isLoading } = useQuery({
    queryKey: ['watchlist'],
    queryFn: async () => {
      const res = await getWatchlist();
      return res;
    },
    refetchOnWindowFocus: true // Update when user comes back to tab
  });

  const toggleMutation = useMutation({
    mutationFn: async (ticker: string) => {
      const { data } = await apiClient.post('/watchlist', { ticker });
      return data;
    },
    onMutate: async (ticker) => {
      await queryClient.cancelQueries({ queryKey: ['watchlist'] });
      const previousWatchlist = queryClient.getQueryData(['watchlist']);
      
      queryClient.setQueryData(['watchlist'], (old: any) => {
        if (!old?.data?.watchlist) return old;
        const list = old.data.watchlist;
        const exists = list.some((i: any) => i.ticker === ticker);
        
        if (exists) {
          return { ...old, data: { ...old.data, watchlist: list.filter((i: any) => i.ticker !== ticker) } };
        } else {
          return {
            ...old,
            data: {
              ...old.data,
              watchlist: [
                { id: ticker, ticker, name: ticker, price: 0, today: 0, ytd: 0, oneYear: 0, verdict: 'Hold', reasoning: 'Fetching market data...', mcap: 'N/A', added: 'Just now' },
                ...list
              ]
            }
          };
        }
      });
      
      return { previousWatchlist };
    },
    onError: (err, ticker, context) => {
      if (context?.previousWatchlist) {
        queryClient.setQueryData(['watchlist'], context.previousWatchlist);
      }
      toast.error(`Failed to update ${ticker}`);
    },
    onSuccess: (data, ticker) => {
      if (data?.added) {
        toast.success(`Added ${ticker.toUpperCase()} to watchlist`);
      } else {
        toast.success(`Removed ${ticker.toUpperCase()} from watchlist`);
      }
      setNewTicker("");
      setIsSearchVisible(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    }
  });

  const watchlist = data?.data?.watchlist || [];
  
  const isAlreadyWatchlisted = newTicker.trim() !== "" && watchlist.some((item: any) => item.ticker === newTicker.trim().toUpperCase());

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTicker.trim() && !isAlreadyWatchlisted) {
      toggleMutation.mutate(newTicker.trim().toUpperCase());
    }
  };

  const totalValue = watchlist.reduce((acc: number, item: any) => acc + (item.price || 0), 0);
  const avgYTD = watchlist.length > 0 ? watchlist.reduce((acc: number, item: any) => acc + (item.ytd || 0), 0) / watchlist.length : 0;
  const bestPerformer = [...watchlist].sort((a, b) => (b.ytd || 0) - (a.ytd || 0))[0];
  const worstPerformer = [...watchlist].sort((a, b) => (a.ytd || 0) - (b.ytd || 0))[0];
  const strongBuys = watchlist.filter((item: any) => item.verdict === 'Strong Buy' || item.verdict === 'Buy').length;

  const renderSparkline = (isPositive: boolean) => (
    <svg viewBox="0 0 50 15" className="w-12 h-4 overflow-visible">
      <path 
        d={isPositive ? "M0,10 C10,12 15,5 25,8 C35,11 40,2 50,0" : "M0,2 C10,5 15,0 25,8 C35,12 40,8 50,15"} 
        fill="none" 
        stroke={isPositive ? "var(--success)" : "var(--danger)"} 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1400px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-bold mb-1">My Watchlist</h1>
          <p className="text-muted-foreground text-sm">Track your favorite stocks and their performance.</p>
        </div>
        <div className="w-full md:w-auto h-10 flex items-center justify-start md:justify-end min-w-[250px]">
          <AnimatePresence mode="wait">
            {!isSearchVisible ? (
              <motion.div
                key="button"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full md:w-auto"
              >
                <Button 
                  onClick={() => setIsSearchVisible(true)}
                  className="bg-foreground hover:bg-foreground/90 text-background rounded-lg font-medium w-full md:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Stock
                </Button>
              </motion.div>
            ) : (
              <motion.form
                ref={searchContainerRef}
                key="search"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleAddSubmit}
                className="flex items-center w-full gap-2"
              >
                  <div className="relative w-full">
                    <TickerAutocomplete
                      autoFocus={true}
                      placeholder="Ticker (e.g. AAPL, Amazon)" 
                      value={newTicker}
                      onChange={(val: string) => setNewTicker(val)}
                      className=""
                      errorClass={`h-10 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none ${isAlreadyWatchlisted ? 'border-danger focus-visible:ring-danger' : 'border-border/60 hover:border-border'}`}
                      disabled={toggleMutation.isPending}
                    />
                    {isAlreadyWatchlisted && (
                      <span className="absolute -bottom-5 left-1 text-[10px] font-medium text-danger whitespace-nowrap">
                        Already in watchlist
                      </span>
                    )}
                  </div>
                <button 
                  type="button"
                  onClick={() => setIsSearchVisible(false)}
                  className="shrink-0 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-8">
           <Skeleton className="h-32 w-full" />
           <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <AuthGate message="Sign in to build and track your personal portfolio watchlist.">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
            <Card className="shadow-sm border-border col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-5">
                <div className="text-xs font-semibold text-muted-foreground mb-3">Total Watchlist Price</div>
                <div className="text-2xl font-bold font-mono mb-2">${totalValue.toFixed(2)}</div>
                <div className={`text-xs font-medium flex items-center justify-between text-muted-foreground`}>
                  <span>Sum of current prices</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-border col-span-1">
              <CardContent className="p-4 sm:p-5">
                <div className="text-xs font-semibold text-muted-foreground mb-3">Avg YTD Return</div>
                <div className={`text-xl sm:text-2xl font-bold font-mono mb-2 ${avgYTD >= 0 ? 'text-success' : 'text-danger'}`}>
                  {avgYTD >= 0 ? '+ ' : ''}{avgYTD.toFixed(2)}%
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-border col-span-1">
              <CardContent className="p-4 sm:p-5 flex items-center justify-between">
                <div className="w-full">
                  <div className="text-xs font-semibold text-muted-foreground mb-3">Best YTD</div>
                  {bestPerformer ? (
                    <div className="flex items-center gap-2 mt-1">
                      <img src={getTickerIconUrl(bestPerformer.ticker)} alt={bestPerformer.ticker} className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-white p-0.5 border border-border/50" onError={(e) => e.currentTarget.style.display = 'none'} />
                      <div>
                        <div className="font-bold text-xs sm:text-sm">{bestPerformer.ticker}</div>
                        <div className="text-success text-[10px] sm:text-xs font-medium">+{bestPerformer.ytd.toFixed(2)}%</div>
                      </div>
                    </div>
                  ) : <div className="text-sm">N/A</div>}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-border col-span-1">
              <CardContent className="p-4 sm:p-5 flex items-center justify-between">
                <div className="w-full">
                  <div className="text-xs font-semibold text-muted-foreground mb-3">Worst YTD</div>
                  {worstPerformer ? (
                    <div className="flex items-center gap-2 mt-1">
                      <img src={getTickerIconUrl(worstPerformer.ticker)} alt={worstPerformer.ticker} className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-white p-0.5 border border-border/50" onError={(e) => e.currentTarget.style.display = 'none'} />
                      <div>
                        <div className="font-bold text-xs sm:text-sm">{worstPerformer.ticker}</div>
                        <div className="text-danger text-[10px] sm:text-xs font-medium">{worstPerformer.ytd.toFixed(2)}%</div>
                      </div>
                    </div>
                  ) : <div className="text-sm">N/A</div>}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-border col-span-1 bg-muted/20">
              <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
                <div className="text-xs font-semibold text-muted-foreground mb-2">Buy Signals</div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">{strongBuys}</div>
                <div className="text-[10px] sm:text-xs text-primary font-medium hover:underline cursor-pointer flex items-center">
                  View <TrendingUp className="w-3 h-3 ml-1 rotate-45" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Watchlist Table */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border font-bold text-lg">Watchlist</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground border-b border-border bg-muted/10">
                  <tr>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">Company</th>
                    <th className="px-6 py-4 font-semibold text-right">Price</th>
                    <th className="px-6 py-4 font-semibold text-center hidden md:table-cell">Today</th>
                    <th className="px-6 py-4 font-semibold text-right">YTD</th>
                    <th className="px-6 py-4 font-semibold text-right hidden lg:table-cell">1Y</th>
                    <th className="px-6 py-4 font-semibold text-center">Verdict</th>
                    <th className="px-6 py-4 font-semibold text-right hidden lg:table-cell">Market Cap</th>
                    <th className="px-6 py-4 font-semibold text-center hidden md:table-cell">News</th>
                    <th className="px-6 py-4 font-semibold hidden lg:table-cell">Added</th>
                    <th className="px-6 py-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((item: any) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={getTickerIconUrl(item.ticker)} alt={item.ticker} className="w-8 h-8 rounded bg-white shadow-sm" onError={(e) => e.currentTarget.style.display = 'none'} />
                          <div>
                            <div className="font-bold text-foreground">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.ticker}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-medium">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center justify-center gap-2">
                          {renderSparkline(item.today >= 0)}
                          <span className={`font-medium ${item.today >= 0 ? 'text-success' : 'text-danger'}`}>
                            {item.today >= 0 ? '+' : ''}{item.today.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-right font-medium ${item.ytd >= 0 ? 'text-success' : 'text-danger'}`}>
                        {item.ytd >= 0 ? '+' : ''}{item.ytd.toFixed(2)}%
                      </td>
                      <td className={`px-6 py-4 text-right font-medium hidden lg:table-cell ${item.oneYear >= 0 ? 'text-success' : 'text-danger'}`}>
                        {item.oneYear >= 0 ? '+' : ''}{item.oneYear.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Badge variant="outline" className={`
                            ${item.verdict === 'Strong Buy' ? 'bg-success/10 text-success border-success/20' : ''}
                            ${item.verdict === 'Buy' ? 'bg-success/5 text-success border-success/10' : ''}
                            ${item.verdict === 'Hold' ? 'bg-muted text-muted-foreground border-border' : ''}
                            ${item.verdict === 'Sell' ? 'bg-danger/5 text-danger border-danger/10' : ''}
                            ${item.verdict === 'Strong Sell' ? 'bg-danger/10 text-danger border-danger/20' : ''}
                          `}>
                            {item.verdict}
                          </Badge>
                          <div className="relative group/tooltip flex items-center justify-center">
                            <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help hover:text-foreground transition-colors ml-1" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs leading-tight text-center rounded-md border border-border shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50">
                              {item.reasoning}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border"></div>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[3px] border-transparent border-t-popover -mt-[1px]"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-muted-foreground hidden lg:table-cell">{item.mcap}</td>
                      <td className="px-6 py-4 text-center hidden md:table-cell">
                        <a 
                          href={`https://finance.yahoo.com/quote/${item.ticker}/news`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                          title="View Yahoo Finance News"
                        >
                          <FileText className="w-4 h-4" />
                        </a>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-muted-foreground whitespace-nowrap hidden lg:table-cell">{item.added}</td>
                      <td className="px-6 py-4 text-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-danger hover:text-danger hover:bg-danger/10"
                          onClick={() => toggleMutation.mutate(item.ticker)}
                          disabled={toggleMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {watchlist.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-6 py-8 text-center text-muted-foreground">
                        Your watchlist is empty. Add some stocks to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </AuthGate>
      )}
    </div>
  );
}

const queryClient = new QueryClient();

export default function WatchlistPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <WatchlistContent />
    </QueryClientProvider>
  );
}
