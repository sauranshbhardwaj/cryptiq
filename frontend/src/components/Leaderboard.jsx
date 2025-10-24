import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/Card";
import { Badge } from "./shadcn/Badge";
import { useEffect, useState } from "react";
import { backendURL, websocketURL } from "../../config.js";

export function Leaderboard() {
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUserPosition = async () => {
    try {
      const response = await fetch(`${backendURL}/leaderboard/me`);
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error("Error fetching current user position", error);
    }
  };

  useEffect(() => {
    fetchCurrentUserPosition();

    const socket = new WebSocket(`${websocketURL}/leaderboard`);

    socket.onmessage = (event) => {
      const leaderboardData = JSON.parse(event.data);
      setLeaderboardUsers(leaderboardData);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Format currency with commas
  const formatCurrency = (value) => {
    return "$" + Number.parseInt(value).toLocaleString();
  };

  // Get medal emoji based on rank
  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return (
          <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">
            🥇 1st
          </Badge>
        );
      case 2:
        return (
          <Badge className="bg-gray-300 text-black hover:bg-gray-400">
            🥈 2nd
          </Badge>
        );
      case 3:
        return (
          <Badge className="bg-amber-600 hover:bg-amber-700">🥉 3rd</Badge>
        );
      default:
        return <Badge variant="outline">{rank}th</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Investors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardUsers.map((user, index) => (
              <div
                key={user.user_id}
                className={`flex items-center justify-between rounded-lg p-3 ${
                  index === 0
                    ? "bg-yellow-50 dark:bg-yellow-950/20"
                    : index === 1
                      ? "bg-gray-50 dark:bg-gray-800/20"
                      : index === 2
                        ? "bg-amber-50 dark:bg-amber-950/20"
                        : "bg-background"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">{getRankBadge(user.rank)}</div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="font-bold">
                  {formatCurrency(user.net_worth)}
                </div>
              </div>
            ))}
            {currentUser && currentUser.rank > 10 ? (
              <>
                <div className="py-2 text-center">
                  <span className="text-2xl">•••</span>
                </div>

                <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Badge variant="outline">{currentUser.rank}th</Badge>
                    </div>
                    <div>
                      <p className="font-medium">{currentUser.name}</p>
                    </div>
                  </div>
                  <div className="font-bold">
                    {formatCurrency(currentUser.net_worth)}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
