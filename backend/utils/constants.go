package utils

import (
	"github.com/hashicorp/go-set/v3"
	"github.com/shopspring/decimal"
)

var Coins = set.From[string]([]string{"BTC", "ETH", "BNB", "XRP", "ADA", "DOGE", "SOL", "DOT", "LTC", "UNI"})
var TransactionType = set.From[string]([]string{"BUY", "SELL"})
var TransactionCharges = decimal.NewFromFloat(0.02)
