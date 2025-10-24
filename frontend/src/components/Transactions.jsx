import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/Card";
import { Badge } from "./shadcn/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./shadcn/Table";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { backendURL } from "../../config.js";

export function TransactionsList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${backendURL}/transactions`);
        const data = await response.json();

        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Rate</TableHead>
                <TableHead className="hidden md:table-cell">Fee</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.type === "buy" ? "default" : "destructive"
                      }
                      className={
                        transaction.type === "buy"
                          ? "bg-green-500 hover:bg-green-600"
                          : "text-white"
                      }
                    >
                      {transaction.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.symbol}
                  </TableCell>
                  <TableCell>
                    {Number.parseFloat(transaction.amount).toFixed(4)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ${Number.parseFloat(transaction.exchange_rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    $
                    {Number.parseFloat(transaction.transaction_charges).toFixed(
                      2,
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${Number.parseFloat(transaction.total).toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDistanceToNow(new Date(transaction.created_at), {
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
