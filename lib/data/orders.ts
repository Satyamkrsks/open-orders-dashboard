export interface OrderData {
  time: string;
  client: string;
  ticker: string;
  hasAudio?: boolean;
  side: "Buy" | "Sell";
  product: string;
  quantity: string;
  price: string;
}

export const orderData: OrderData[] = [
  {
    time: "08:14:31",
    client: "AAA001",
    ticker: "RELIANCE",
    hasAudio: true,
    side: "Buy",
    product: "CNC",
    quantity: "50/100",
    price: "250.50"
  },
  {
    time: "08:14:31",
    client: "AAA003",
    ticker: "MRF",
    side: "Buy",
    product: "NRML",
    quantity: "10/20",
    price: "2,700.00"
  },
  {
    time: "08:14:31",
    client: "AAA002",
    ticker: "ASIANPAINT",
    hasAudio: true,
    side: "Buy",
    product: "NRML",
    quantity: "10/30",
    price: "1,500.60"
  },
  {
    time: "08:14:31",
    client: "AAA002",
    ticker: "TATAINVEST",
    side: "Sell",
    product: "INTRADAY",
    quantity: "10/10",
    price: "2,300.10"
  },
  {
    time: "08:15:45",
    client: "AAA005",
    ticker: "INFOSYS",
    side: "Buy",
    product: "CNC",
    quantity: "25/25",
    price: "1,543.75"
  },
  {
    time: "08:16:22",
    client: "AAA002",
    ticker: "HDFCBANK",
    side: "Buy",
    product: "NRML",
    quantity: "15/30",
    price: "1,680.25"
  },
  {
    time: "08:18:05",
    client: "AAA007",
    ticker: "TCS",
    hasAudio: true,
    side: "Sell",
    product: "INTRADAY",
    quantity: "5/15",
    price: "3,450.80"
  },
  {
    time: "08:20:17",
    client: "AAA001",
    ticker: "SBIN",
    side: "Buy",
    product: "CNC",
    quantity: "100/200",
    price: "624.30"
  }
];