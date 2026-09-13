// Domain types
export type Motor = {
  id: string;
  brand: string;
  model: string;
  year: number;
  engine: string;
  power: string;
  weight: number;
  category: "matic" | "sport";
  popularity: number;
};

export type Part = {
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  oem: boolean;
  fitments: string[];
  price_idr: number;
  stock: number;
  market_median_idr: number;
};

export type GarageEntry = {
  id: string;
  motorId: string;
  nickname: string;
  plate: string;
  year: number;
  currentKm: number;
  addedAt: string;
};

export type ServiceLog = {
  id: string;
  garageId: string;
  motorId: string;
  type: string; // service interval id
  date: string;
  km: number;
  partsUsed: { sku: string; qty: number; price: number }[];
  laborHours: number;
  laborRate: number;
  notes: string;
  totalIdr: number;
};

export type ServiceSchedule = {
  id: string;
  garageId: string;
  motorId: string;
  intervalId: string;
  lastDoneKm: number;
  lastDoneDate: string;
  lastDoneId?: string; // service log id
  enabled: boolean;
};

export type FinanceEntry = {
  id: string;
  type: "auto-task" | "auto-bill" | "auto-vendor";
  category: string;
  description: string;
  amount: number; // in IDR
  source: string; // "motopart:<module>"
  ts: string; // ISO
};

export type DiagnosticResult = {
  id: string;
  symptomId: string;
  symptomLabel: string;
  cause: string;
  partsToInspect: string[];
  laborHours: number;
  severity: "low" | "medium" | "high";
  savedAt: string;
};
