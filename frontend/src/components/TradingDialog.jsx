import { useState, useEffect } from "react";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./shadcn/Dialog.jsx";
import { Input } from "./shadcn/Input";
import { Label } from "./shadcn/Label";
import { Button } from "./shadcn/Button";
import { RadioGroup, RadioGroupItem } from "./shadcn/RadioGroup";
import { backendURL } from "../../config.js";

function TradingDialog({ coin, balance }) {
  const [amount, setAmount] = useState("");
  const [tradeType, setTradeType] = useState("buy");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${backendURL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: tradeType,
          symbol: coin.symbol,
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit transaction");
      }

      setSuccess(true);
      setAmount("");
    } catch (error) {
      console.error(error);
      alert("Transaction failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSuccess(false), 2000);
      window.location.reload();
    }
  };

  const parsedAmount = parseFloat(amount) || 0;
  const totalValue = parsedAmount * coin.price;
  const fee = totalValue * 0.02;
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalValue);

  const formattedFee = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fee);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: coin.color }}
          />
          Trade {coin.name} ({coin.symbol})
        </DialogTitle>
        <DialogDescription>
          Current price: ${coin.price.toLocaleString()} per {coin.symbol}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          {/* Display the balance */}
          {balance !== null && (
            <div className="grid gap-2">
              <Label>Your Balance</Label>
              <div className="bg-muted rounded-md p-2 text-right font-mono">
                ${balance}
              </div>
            </div>
          )}

          <RadioGroup
            defaultValue="buy"
            value={tradeType}
            onValueChange={setTradeType}
            className="grid grid-cols-2 gap-4"
          >
            <Label
              htmlFor="buy"
              className={`border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-center rounded-md border-2 p-4 ${
                tradeType === "buy" ? "border-primary" : ""
              }`}
            >
              <RadioGroupItem value="buy" id="buy" className="sr-only" />
              <span>Buy</span>
            </Label>
            <Label
              htmlFor="sell"
              className={`border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-center rounded-md border-2 p-4 ${
                tradeType === "sell" ? "border-primary" : ""
              }`}
            >
              <RadioGroupItem value="sell" id="sell" className="sr-only" />
              <span>Sell</span>
            </Label>
          </RadioGroup>

          <div className="grid gap-2">
            <Label htmlFor="amount">Amount ({coin.symbol})</Label>
            <Input
              id="amount"
              type="number"
              step="any"
              placeholder={`Enter amount in ${coin.symbol}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Total Value</Label>
            <div className="bg-muted rounded-md p-2 text-right font-mono">
              {formattedTotal}
            </div>
            <div className="text-muted-foreground text-right text-sm">
              + 2% transaction fee: {formattedFee}
            </div>
          </div>

          {tradeType === "sell" && parsedAmount > coin.amount && (
            <div className="text-destructive text-sm font-medium">
              You don&#39;t have enough {coin.symbol}. Maximum available:{" "}
              {coin.amount}
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-300">
              Transaction successful!
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !amount ||
              parsedAmount <= 0 ||
              (tradeType === "sell" && parsedAmount > coin.amount)
            }
            className={
              tradeType === "buy"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }
          >
            {isSubmitting
              ? "Processing..."
              : tradeType === "buy"
                ? "Buy"
                : "Sell"}{" "}
            {coin.symbol}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default TradingDialog;
