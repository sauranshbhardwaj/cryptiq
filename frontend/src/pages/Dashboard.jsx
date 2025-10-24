import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/shadcn/Tabs";
import { UserStats } from "../components/UserStats";
import { TransactionsList } from "../components/Transactions";
import { Leaderboard } from "../components/Leaderboard";
import { UserSettings } from "../components/UserSettings";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { Button } from "../components/shadcn/Button";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import Session from "supertokens-web-js/recipe/session";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isLoggedIn) {
      window.location.href = "/login";
    }
  }, [auth.isLoading]);

  async function signOut() {
    await Session.signOut();
    window.location.href = "/";
  }

  return (
    <>
      <Helmet>
        <title>CryptIQ | Dashboard</title>
      </Helmet>
      <Navbar />
      <div className="container mx-auto mt-16 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome Back, {auth.name}!</h1>
          <div className="flex flex-row">
            <ThemeToggle />
            <Button className="ml-2" onClick={signOut}>
              Logout
            </Button>
          </div>
        </div>
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="user-settings">User Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <UserStats />
          </TabsContent>
          <TabsContent value="transactions">
            <TransactionsList />
          </TabsContent>
          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>
          <TabsContent value="user-settings">
            <UserSettings />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
