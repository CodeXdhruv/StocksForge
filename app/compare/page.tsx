"use client";
import { Search, Plus, Loader2, BarChart2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ComparePage() {
  const [tickers, setTickers] = useState<string[]>(["MSFT", "NVDA"]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { getCompareStocks } = useApi();

  const handleCompare = async () => {
    setLoading(true);
    try {
      const response = await getCompareStocks(tickers);
      if (response && response.success && Array.isArray(response.data)) {
        setData(response.data);
      } else if (Array.isArray(response)) {
        // Fallback in case useApi somehow returns the array directly
        setData(response);
      } else {
        console.error("Invalid response format", response);
      }
    } catch (error) {
      console.error("Failed to fetch compare data", error);
    } finally {
      setLoading(false);
    }
  };

  const renderHighlight = (value: number, allValues: number[], isHigherBetter = true) => {
    if (!allValues.length || isNaN(value)) return "";
    const max = Math.max(...allValues);
    const min = Math.min(...allValues);
    if (value === (isHigherBetter ? max : min)) return "text-success font-bold";
    if (value === (isHigherBetter ? min : max)) return "text-danger font-bold";
    return "";
  };

  const revGrowths = data.map(d => Number(d.revenueGrowth));
  const margins = data.map(d => Number(d.grossMargin));

  const handleUpdateTicker = (index: number, newTicker: string) => {
    if (!newTicker.trim()) return;
    const newTickers = [...tickers];
    newTickers[index] = newTicker.toUpperCase();
    setTickers(newTickers);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      handleUpdateTicker(index, e.currentTarget.value);
    }
  };

  const mergedChartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const baseChart = data[0]?.chartData || [];
    return baseChart.map((point: any, index: number) => {
      const entry: any = { date: point.date };
      data.forEach(stock => {
        const matchingPoint = stock.chartData?.[index];
        entry[stock.ticker] = matchingPoint ? matchingPoint.price : null;
      });
      return entry;
    });
  }, [data]);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Compare Stocks</h1>
          <p className="text-muted-foreground">Compare up to 2 companies side by side.</p>
        </div>
        <button 
          onClick={handleCompare}
          disabled={loading}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-sm w-fit"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BarChart2 className="w-5 h-5" />}
          Compare
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {tickers.map((ticker, i) => (
          <div key={i} className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input 
              defaultValue={ticker} 
              onBlur={(e) => handleUpdateTicker(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="pl-9 bg-card border-border shadow-sm rounded-lg uppercase"
            />
          </div>
        ))}
        {tickers.length < 2 && (
          <button 
            onClick={() => setTickers([...tickers, "AAPL"])}
            className="flex items-center justify-center gap-2 border border-dashed border-border rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors h-10"
          >
            <Plus className="w-4 h-4" /> Add Stock
          </button>
        )}
      </div>

      <div className="space-y-8">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden min-h-[400px] relative">
          {loading && (
            <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] bg-muted/30"></TableHead>
                {data.map((stock) => (
                  <TableHead key={stock.ticker} className="min-w-[150px] p-6 align-top">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-foreground text-background rounded-lg flex items-center justify-center font-bold text-xs mb-3 shadow-sm">
                        {stock.ticker.substring(0, 4)}
                      </div>
                      <div className="font-bold text-foreground">{stock.ticker}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{stock.name}</div>
                      <div className="mt-3">
                        <div className="font-mono font-bold">${Number(stock.price).toFixed(2)}</div>
                        <div className={`text-xs font-semibold ${Number(stock.changePercent) >= 0 ? 'text-success' : 'text-danger'}`}>
                          {Number(stock.changePercent) >= 0 ? '+' : ''}{Number(stock.changePercent).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium bg-muted/30 text-muted-foreground">Market Cap</TableCell>
                {data.map((stock) => (
                  <TableCell key={stock.ticker} className="text-center font-mono">{stock.marketCap}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-muted/30 text-muted-foreground">P/E Ratio (TTM)</TableCell>
                {data.map((stock) => (
                  <TableCell key={stock.ticker} className="text-center font-mono">{stock.peRatio}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-muted/30 text-muted-foreground">Revenue Growth (YoY)</TableCell>
                {data.map((stock) => (
                  <TableCell key={stock.ticker} className={`text-center font-mono ${renderHighlight(Number(stock.revenueGrowth), revGrowths)}`}>
                    {Number(stock.revenueGrowth) > 0 ? '+' : ''}{Number(stock.revenueGrowth)}%
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-muted/30 text-muted-foreground">Gross Margin</TableCell>
                {data.map((stock) => (
                  <TableCell key={stock.ticker} className={`text-center font-mono ${renderHighlight(Number(stock.grossMargin), margins)}`}>
                    {Number(stock.grossMargin)}%
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
          {!loading && data.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
              Click "Compare" to load data for the selected stocks.
            </div>
          )}
        </div>

        {/* Graphical Analysis */}
        {data.length > 0 && mergedChartData.length > 0 && (
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h3 className="text-lg font-bold mb-6">30-Day Price Trend</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mergedChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(val) => {
                      const d = new Date(val);
                      return `${d.getMonth() + 1}/${d.getDate()}`;
                    }}
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickFormatter={(val) => `$${val}`}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Legend />
                  {data.map((stock, i) => (
                    <Line 
                      key={stock.ticker} 
                      type="monotone" 
                      dataKey={stock.ticker} 
                      stroke={colors[i % colors.length]} 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
