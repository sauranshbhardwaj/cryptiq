CREATE TABLE IF NOT EXISTS transactions
(
    transaction_id      UUID PRIMARY KEY        DEFAULT gen_random_uuid(),
    user_id             UUID           NOT NULL,
    type                VARCHAR(50)    NOT NULL,
    symbol              VARCHAR(10)    NOT NULL,
    amount              NUMERIC(18, 8) NOT NULL,
    exchange_rate       NUMERIC(18, 8) NOT NULL,
    transaction_charges NUMERIC(18, 8) NOT NULL DEFAULT 0,
    total               NUMERIC(18, 8) NOT NULL,
    created_at          TIMESTAMP               DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS balances
(
    user_id      UUID PRIMARY KEY,
    balance      NUMERIC(18, 8) NOT NULL DEFAULT 0,
    last_updated TIMESTAMP               DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio
(
    user_id      UUID PRIMARY KEY,

    btc_qty      NUMERIC(18, 8) DEFAULT 0,
    btc_price    NUMERIC(18, 8) DEFAULT 0,

    eth_qty      NUMERIC(18, 8) DEFAULT 0,
    eth_price    NUMERIC(18, 8) DEFAULT 0,

    bnb_qty      NUMERIC(18, 8) DEFAULT 0,
    bnb_price    NUMERIC(18, 8) DEFAULT 0,

    xrp_qty      NUMERIC(18, 8) DEFAULT 0,
    xrp_price    NUMERIC(18, 8) DEFAULT 0,

    ada_qty      NUMERIC(18, 8) DEFAULT 0,
    ada_price    NUMERIC(18, 8) DEFAULT 0,

    doge_qty     NUMERIC(18, 8) DEFAULT 0,
    doge_price   NUMERIC(18, 8) DEFAULT 0,

    sol_qty      NUMERIC(18, 8) DEFAULT 0,
    sol_price    NUMERIC(18, 8) DEFAULT 0,

    dot_qty      NUMERIC(18, 8) DEFAULT 0,
    dot_price    NUMERIC(18, 8) DEFAULT 0,

    ltc_qty      NUMERIC(18, 8) DEFAULT 0,
    ltc_price    NUMERIC(18, 8) DEFAULT 0,

    uni_qty      NUMERIC(18, 8) DEFAULT 0,
    uni_price    NUMERIC(18, 8) DEFAULT 0,

    spy_qty      NUMERIC(18, 8) DEFAULT 0,
    spy_price    NUMERIC(18, 8) DEFAULT 0,

    xau_qty      NUMERIC(18, 8) DEFAULT 0,
    xau_price    NUMERIC(18, 8) DEFAULT 0,

    networth     NUMERIC(20, 8) GENERATED ALWAYS AS (
        btc_qty * btc_price +
        eth_qty * eth_price +
        bnb_qty * bnb_price +
        xrp_qty * xrp_price +
        ada_qty * ada_price +
        doge_qty * doge_price +
        sol_qty * sol_price +
        dot_qty * dot_price +
        ltc_qty * ltc_price +
        uni_qty * uni_price
        ) STORED,

    xau_networth NUMERIC(20, 8) GENERATED ALWAYS AS (
        xau_qty * xau_price
        ) STORED,

    spy_networth NUMERIC(20, 8) GENERATED ALWAYS AS (
        spy_qty * spy_price
        ) STORED
);

CREATE TABLE IF NOT EXISTS contact
(
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    message    TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS networth_snapshots
(
    snapshot_id   SERIAL PRIMARY KEY,
    user_id       UUID NOT NULL,
    networth      DECIMAL(20, 8),
    spy_networth  DECIMAL(20, 8),
    xau_networth  DECIMAL(20, 8),
    snapshot_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE PROCEDURE capture_networth_snapshot()
    LANGUAGE plpgsql
AS
$$
BEGIN
    INSERT INTO networth_snapshots (user_id, networth, spy_networth, xau_networth)
    SELECT user_id, networth, spy_networth, xau_networth
    FROM portfolio;
END;
$$;

