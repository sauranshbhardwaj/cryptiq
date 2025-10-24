import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/Card";
import {
  Area,
  AreaChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn/Select";
import { Button } from "./shadcn/Button";
import { ArrowDownRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Badge } from "./shadcn/Badge";
import { Separator } from "./shadcn/Separator";
import { Dialog, DialogTrigger } from "./shadcn/Dialog.jsx";
import TradingDialog from "./TradingDialog.jsx";
import axios from "axios";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import CustomTooltip from "./CustomTooltip.jsx";
import { backendURL, websocketURL } from "../../config.js";

const timePeriods = ["Live", "1d", "5d", "1M", "6M", "YTD", "1Y"];

const emptyData = {
  "1d": [],
  "5d": [],
  "1M": [],
  "6M": [],
  YTD: [],
  "1Y": [],
  Live: [],
};

const useCryptoDataUpdater = (
  selectedCoin,
  selectedTimePeriod,
  setCryptoData,
) => {
  const wsRef = useRef(null);

  useEffect(() => {
    if (!selectedCoin || !selectedTimePeriod) return;

    // Clean up any existing WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    const updateData = (newData) => {
      setCryptoData((prev) => ({
        ...prev,
        [selectedCoin]: {
          ...prev[selectedCoin],
          data: {
            ...prev[selectedCoin].data,
            [selectedTimePeriod]: newData,
          },
        },
      }));
    };

    const updateLiveData = ({ time, price }) => {
      setCryptoData((prev) => {
        const prevLiveData = prev[selectedCoin].data["Live"] || [];
        const updatedLiveData = [...prevLiveData, { time, price }].slice(-120);

        return {
          ...prev,
          [selectedCoin]: {
            ...prev[selectedCoin],
            data: {
              ...prev[selectedCoin].data,
              Live: updatedLiveData,
            },
          },
        };
      });
    };

    let coin = `${selectedCoin}USDT`;
    if (selectedTimePeriod === "Live") {
      const fetchData = async () => {
        try {
          const res = await fetch(`${backendURL}/crypto/historic/${coin}/2m`);
          const data = await res.json();

          updateData(
            data.map((item) => {
              let temp = {};
              temp.time = new Date(item.timestamp).toLocaleTimeString();
              temp.price = parseFloat(item.close);

              return temp;
            }),
          );
        } catch (error) {
          console.error("REST fetch error:", error);
        }
      };

      fetchData();

      const ws = new WebSocket(`${websocketURL}/crypto/${coin}`);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        const liveData = JSON.parse(event.data);
        const { s, w } = liveData.data;
        const price = parseFloat(w);
        const time = new Date().toLocaleTimeString();

        updateLiveData({ time, price });
      };

      ws.onerror = (err) => console.error("WebSocket error:", err);

      return () => {
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    } else {
      // Fetch data via REST API
      const fetchData = async () => {
        try {
          const res = await fetch(
            `${backendURL}/crypto/historic/${coin}/${selectedTimePeriod}`,
          );
          const data = await res.json();

          updateData(
            data.map((item) => {
              let temp = {};
              temp.time = new Date(item.timestamp).toLocaleString();
              temp.price = parseFloat(item.close);

              return temp;
            }),
          );
        } catch (error) {
          console.error("REST fetch error:", error);
        }
      };

      fetchData();
    }
  }, [selectedCoin, selectedTimePeriod, setCryptoData]);
};

export function UserStats() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("1d");
  const [portfolioData, setPortfolioData] = useState([
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      amount: 0,
      price: 0,
      change: 0,
      color: "#F7931A",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      amount: 0,
      price: 0,
      change: 0,
      color: "#627EEA",
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      amount: 0,
      price: 0,
      change: 0,
      color: "#00FFA3",
    },
    {
      id: "doge",
      name: "Dogecoin",
      symbol: "DOGE",
      amount: 0,
      price: 0,
      change: 0,
      color: "#C2A633",
    },
    {
      id: "ada",
      name: "Cardano",
      symbol: "ADA",
      amount: 0,
      price: 0,
      change: 0,
      color: "#0033AD",
    },
    {
      id: "dot",
      name: "Polkadot",
      symbol: "DOT",
      amount: 0,
      price: 0,
      change: 0,
      color: "#E6007A",
    },
    {
      id: "bnb",
      name: "B. Coin",
      symbol: "BNB",
      amount: 0,
      price: 0,
      change: 0,
      color: "#F3BA2F",
    },
    {
      id: "xrp",
      name: "Ripple",
      symbol: "XRP",
      amount: 0,
      price: 0,
      change: 0,
      color: "#346AA9",
    },
    {
      id: "ltc",
      name: "Litecoin",
      symbol: "LTC",
      amount: 0,
      price: 0,
      change: 0,
      color: "#BEBEBE",
    },
    {
      id: "uni",
      name: "Uniswap",
      symbol: "UNI",
      amount: 0,
      price: 0,
      change: 0,
      color: "#FF007A",
    },
  ]);

  const [newsData, setNewsData] = useState([]);
  const [cryptoData, setCryptoData] = useState({
    BTC: { name: "Bitcoin", color: "#627EEA", data: { ...emptyData } },
    ETH: { name: "Ethereum", color: "#627EEA", data: { ...emptyData } },
    DOGE: { name: "Dogecoin", color: "#627EEA", data: { ...emptyData } },
    SOL: { name: "Solana", color: "#627EEA", data: { ...emptyData } },
    BNB: { name: "Binance Coin", color: "#627EEA", data: { ...emptyData } },
    XRP: { name: "Ripple", color: "#627EEA", data: { ...emptyData } },
    ADA: { name: "Cardano", color: "#627EEA", data: { ...emptyData } },
    DOT: { name: "Polkadot", color: "#627EEA", data: { ...emptyData } },
    LTC: { name: "Litecoin", color: "#627EEA", data: { ...emptyData } },
    UNI: { name: "Uniswap", color: "#627EEA", data: { ...emptyData } },
  });
  const [chartData, setChartData] = useState([]);
  const [historicPortfolio, setHistoricPortfolio] = useState([]);

  const [networth, setNetworth] = useState(0);
  const [xauNetworth, setXauNetworth] = useState(0);
  const [spyNetworth, setSpyNetworth] = useState(0);
  const [leaderboardPosition, setLeaderboardPosition] = useState(1);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`${backendURL}/balance`);
        if (response.ok) {
          const data = await response.json();
          setBalance(data.balance);
        } else {
          console.error("Failed to fetch balance");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${backendURL}/portfolio/spy-xau`);
        const data = await response.json();

        const spyUnits = parseFloat(data.portfolio.spy);
        const xauUnits = parseFloat(data.portfolio.xau);
        const spyPrice = parseFloat(data.price.SPY);
        const xauPrice = parseFloat(data.price.XAU);

        setSpyNetworth(spyUnits * spyPrice);
        setXauNetworth(xauUnits * xauPrice);
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
      }
    };

    fetchPortfolio();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/portfolio`);

        const portfolio = response.data.portfolio;
        const prices = response.data.price;

        // Fetch all price change requests concurrently
        const changePromises = await axios.get(
          `${backendURL}/crypto/priceChange`,
        );
        const changeMap = changePromises.data;

        const updatedData = portfolioData.map((coin) => ({
          ...coin,
          amount: parseFloat(portfolio[coin.symbol]) || 0,
          price: parseFloat(prices[coin.symbol]) || 0,
          change: changeMap[`${coin.symbol}USDT`] ?? coin.change,
        }));

        setPortfolioData(updatedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchNetWorth() {
      try {
        const response = await fetch(`${backendURL}/leaderboard/me`);
        if (!response.ok) {
          throw new Error("Failed to fetch net worth");
        }

        const data = await response.json();
        setNetworth(parseFloat(data.net_worth));
      } catch (error) {
        console.error("Error fetching net worth:", error);
      }
    }

    fetchNetWorth();
  }, []);

  useEffect(() => {
    const fetchLeaderboardPosition = async () => {
      try {
        const response = await fetch(`${backendURL}/leaderboard/me`);
        const data = await response.json();
        setLeaderboardPosition(data.rank);
      } catch (error) {
        console.error("Failed to fetch leaderboard position:", error);
      }
    };

    fetchLeaderboardPosition();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${backendURL}/news`);
        const data = await response.json();

        const formattedNews = data.Data.slice(0, 5).map((newsItem) => {
          // Convert fromUnixTime to the actual Date object using the timestamp
          const publishedDate = fromUnixTime(newsItem.PUBLISHED_ON);

          // Format the date to something like "2 hours ago"
          const formattedDate = formatDistanceToNow(publishedDate, {
            addSuffix: true,
          });

          return {
            id: newsItem.ID,
            title: newsItem.TITLE,
            source: newsItem.AUTHORS || newsItem.SOURCE_DATA?.NAME || "Unknown",
            date: formattedDate, // Formatted date
            snippet: newsItem.BODY.slice(0, 250) + "...", // Trim body for snippet
            url: newsItem.URL,
          };
        });

        // Update state with the formatted news items
        setNewsData(formattedNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  useCryptoDataUpdater(selectedCrypto, selectedTimePeriod, setCryptoData);

  useEffect(() => {
    setChartData(cryptoData[selectedCrypto].data[selectedTimePeriod]);
  }, [selectedCrypto, selectedTimePeriod, cryptoData]);

  useEffect(() => {
    const fetchHistoricPortfolio = async () => {
      try {
        const response = await fetch(`${backendURL}/portfolio/historic`);
        const data = await response.json();

        const formattedData = data.map((item) => ({
          timestamp: new Date(item.timestamp).toLocaleString(),
          networth: parseFloat(item.networth),
          spy_networth: parseFloat(item.spy_networth),
          xau_networth: parseFloat(item.xau_networth),
        }));

        setHistoricPortfolio(formattedData);
      } catch (error) {
        console.error("Failed to fetch historic portfolio:", error);
      }
    };

    fetchHistoricPortfolio();
  }, []);

  const firstPrice = chartData[0] !== undefined ? chartData[0].price : 0;
  const lastPrice =
    chartData[chartData.length - 1] !== undefined
      ? chartData[chartData.length - 1].price
      : 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = (priceChange / firstPrice) * 100;
  const isPositive = priceChange >= 0;

  const formatCurrency = (value) => {
    if (value < 1) return `$${value.toFixed(4)}`;
    if (value < 10) return `$${value.toFixed(2)}`;
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Networth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(networth)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Networth (Gold)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(xauNetworth)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Networth (S&P 500)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(spyNetworth)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leaderboard Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{leaderboardPosition}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle>Cryptocurrency Performance</CardTitle>
            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-2xl font-bold">
                {formatCurrency(lastPrice)}
              </span>
              <span
                className={`text-sm font-medium ${
                  isPositive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isPositive ? "+" : ""}
                {formatCurrency(priceChange)} ({isPositive ? "+" : ""}
                {priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Coin" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(cryptoData).map((crypto) => (
                  <SelectItem key={crypto} value={crypto}>
                    {cryptoData[crypto].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            {timePeriods.map((period) => (
              <Button
                key={period}
                variant={selectedTimePeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimePeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7529F4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#7529F4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatCurrency(value)}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Price"]}
                  labelFormatter={(label) => `Time: ${label}`}
                  contentStyle={{
                    backgroundColor: "#1E1E1E", // dark background
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#FFFFFF", // white text
                  }}
                  itemStyle={{ color: "#FFFFFF" }}
                  labelStyle={{ color: "#AAAAAA" }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#7529F4"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  fill="url(#lineGradient)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Portfolio</h2>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-4" style={{ minWidth: "max-content" }}>
            {portfolioData.map((coin) => (
              <Dialog key={coin.id}>
                <DialogTrigger asChild>
                  <Card className="w-[220px] flex-shrink-0 cursor-pointer transition-shadow hover:shadow-md">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: coin.color }}
                          >
                            {coin.symbol.charAt(0)}
                          </div>
                          <div>
                            <CardTitle className="text-sm">
                              {coin.name}
                            </CardTitle>
                            <p className="text-muted-foreground text-xs">
                              {coin.symbol}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            coin.change > 0
                              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          }
                        >
                          {coin.change > 0 ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(coin.change)}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="mt-2">
                        <div className="text-muted-foreground text-sm">
                          Amount
                        </div>
                        <div className="font-medium">
                          {coin.amount.toLocaleString()} {coin.symbol}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="text-muted-foreground text-sm">
                          Value
                        </div>
                        <div className="font-bold">
                          {formatCurrency(coin.amount * coin.price)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <TradingDialog coin={coin} balance={balance} />
              </Dialog>
            ))}
          </div>
        </div>
      </div>
      <Card>
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle>Historic Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicPortfolio}>
                <XAxis
                  dataKey="timestamp"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value, entry) => {
                    if (value === "networth") return "Net Worth";
                    if (value === "spy_networth") return "S&P 500 ETF";
                    if (value === "xau_networth") return "Gold";
                    return value;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="networth"
                  stroke="#8884d8"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="spy_networth"
                  stroke="#82ca9d"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="xau_networth"
                  stroke="#ffc658"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Crypto News</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newsData.map((news, index) => (
              <div key={news.id}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="hover:text-primary font-semibold">
                      <a
                        href={news.url}
                        target="_blank"
                        className="hover:underline"
                      >
                        {news.title}
                      </a>
                    </h3>
                    <ExternalLink className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                  </div>
                  <div className="text-muted-foreground flex items-center text-sm">
                    <span className="font-medium">{news.source}</span>
                    <span className="mx-2">•</span>
                    <span>{news.date}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {news.snippet}
                  </p>
                </div>
                {index < newsData.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
