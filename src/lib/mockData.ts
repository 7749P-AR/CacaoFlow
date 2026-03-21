export interface Lot {
  id: string;
  producerId: string;
  producerName: string;
  location: string;
  coordinates: { lat: number; lng: number };
  areaSembrada: number;
  cacaoType: "CCN-51" | "Fino de Aroma" | "Trinitario";
  treeAge: number;
  estimatedHarvestDate: string;
  status: "registered" | "scored" | "vpc_issued" | "funded" | "settled";
  createdAt: string;
}

export interface ScoreBreakdownItem {
  label: string;
  value: number;
  max: number;
  color: "green" | "yellow" | "red";
}

export interface ScoringResult {
  lotId: string;
  yieldEstimated: number;
  score: string;
  scoreNumeric: number;
  riskLevel: "low" | "medium" | "high";
  climaticRisk: "low" | "moderate" | "high";
  maxFunding: number;
  historicalYield: number;
  confidenceIndex: number;
  breakdown: ScoreBreakdownItem[];
}

export interface VPC {
  id: string;
  lotId: string;
  claimHash: string;
  onchainReference: string;
  metadata: {
    producer: string;
    location: string;
    yield: number;
    score: string;
    issuedAt: string;
  };
  status: "pending" | "issued" | "active";
}

export interface FinancingCandidate {
  lotId: string;
  vpcId: string;
  score: string;
  scoreNumeric: number;
  riskBand: "A" | "B" | "C" | "D";
  yieldEstimated: number;
  eligibleAmount: number;
  approvedAmount: number;
  producerName: string;
  originatorType: "producer" | "cooperative";
  location: string;
  country: string;
  cacaoType: string;
  daysRemaining: number;
  evidenceCount: number;
}

export interface MockInvestmentOpportunity {
  id: string;
  vpc_id: string;
  lot_id: string;
  status: "published" | "funded" | "closed" | "repaid";
  currency: "USDC" | "USDT";
  target_raise_usd: number;
  min_ticket_usd: number;
  expected_return_bps: number;
  tenor_days: number;
  funding_deadline: string;
  raised_amount_usd: number;
  investor_count: number;
  published_at: string;
  lot_name: string;
  crop_type: string;
  country: string;
  region: string;
  originator_name: string;
  originator_type: "producer" | "cooperative";
  score: string;
  score_numeric: number;
  risk_band: "A" | "B" | "C" | "D";
  evidence_count: number;
}

export interface MockInvestmentPosition {
  id: string;
  opportunity_id: string;
  wallet_address: string;
  amount_usd: number;
  position_status: "pending" | "confirmed" | "active" | "repaid" | "defaulted";
  tx_hash?: string;
  created_at: string;
}

export interface OutcomeSimulation {
  lotId: string;
  actualYield: number;
  projectedYield: number;
  pricePerKg: number;
  totalRevenue: number;
  financierRepayment: number;
  producerNet: number;
  performanceRatio: number;
}

export const mockLots: Lot[] = [
  {
    id: "LOT-2026-001",
    producerId: "PROD-001",
    producerName: "Cooperativa San Martín",
    location: "Huila, Colombia",
    coordinates: { lat: 2.5359, lng: -75.5277 },
    areaSembrada: 4.5,
    cacaoType: "Fino de Aroma",
    treeAge: 6,
    estimatedHarvestDate: "2026-09-15",
    status: "funded",
    createdAt: "2026-01-10",
  },
  {
    id: "LOT-2026-002",
    producerId: "PROD-002",
    producerName: "Finca El Progreso",
    location: "Esmeraldas, Ecuador",
    coordinates: { lat: 0.9592, lng: -79.6539 },
    areaSembrada: 3.2,
    cacaoType: "CCN-51",
    treeAge: 4,
    estimatedHarvestDate: "2026-08-20",
    status: "vpc_issued",
    createdAt: "2026-02-05",
  },
  {
    id: "LOT-2026-003",
    producerId: "PROD-003",
    producerName: "Asociación Cacao Sur",
    location: "Tumbes, Perú",
    coordinates: { lat: -3.5669, lng: -80.4515 },
    areaSembrada: 6.0,
    cacaoType: "Trinitario",
    treeAge: 8,
    estimatedHarvestDate: "2026-10-01",
    status: "scored",
    createdAt: "2026-03-01",
  },
];

export const mockScoring: Record<string, ScoringResult> = {
  "LOT-2026-001": {
    lotId: "LOT-2026-001",
    yieldEstimated: 1.8,
    score: "A",
    scoreNumeric: 92,
    riskLevel: "low",
    climaticRisk: "low",
    maxFunding: 3600,
    historicalYield: 1.65,
    confidenceIndex: 94,
    breakdown: [
      { label: "Consistencia histórica", value: 36, max: 40, color: "green" },
      { label: "Riesgo climático", value: 26, max: 30, color: "green" },
      { label: "Tamaño del lote", value: 14, max: 15, color: "green" },
      { label: "Documentación completa", value: 16, max: 15, color: "green" },
    ],
  },
  "LOT-2026-002": {
    lotId: "LOT-2026-002",
    yieldEstimated: 1.2,
    score: "B+",
    scoreNumeric: 78,
    riskLevel: "medium",
    climaticRisk: "moderate",
    maxFunding: 2400,
    historicalYield: 1.1,
    confidenceIndex: 81,
    breakdown: [
      { label: "Consistencia histórica", value: 28, max: 40, color: "yellow" },
      { label: "Riesgo climático", value: 22, max: 30, color: "yellow" },
      { label: "Tamaño del lote", value: 13, max: 15, color: "green" },
      { label: "Documentación completa", value: 15, max: 15, color: "green" },
    ],
  },
  "LOT-2026-003": {
    lotId: "LOT-2026-003",
    yieldEstimated: 2.4,
    score: "A-",
    scoreNumeric: 86,
    riskLevel: "low",
    climaticRisk: "low",
    maxFunding: 4800,
    historicalYield: 2.2,
    confidenceIndex: 88,
    breakdown: [
      { label: "Consistencia histórica", value: 32, max: 40, color: "green" },
      { label: "Riesgo climático", value: 24, max: 30, color: "green" },
      { label: "Tamaño del lote", value: 15, max: 15, color: "green" },
      { label: "Documentación completa", value: 15, max: 15, color: "green" },
    ],
  },
};

export const mockVPCs: Record<string, VPC> = {
  "LOT-2026-001": {
    id: "VPC-2026-001",
    lotId: "LOT-2026-001",
    claimHash: "0x7a3b...f29e1c4d8b",
    onchainReference: "stellar:VPC-2026-001",
    metadata: {
      producer: "Cooperativa San Martín",
      location: "Huila, Colombia",
      yield: 1.8,
      score: "A",
      issuedAt: "2026-01-15",
    },
    status: "active",
  },
  "LOT-2026-002": {
    id: "VPC-2026-002",
    lotId: "LOT-2026-002",
    claimHash: "0x3e9f...a12b5c7d3e",
    onchainReference: "stellar:VPC-2026-002",
    metadata: {
      producer: "Finca El Progreso",
      location: "Esmeraldas, Ecuador",
      yield: 1.2,
      score: "B+",
      issuedAt: "2026-02-10",
    },
    status: "active",
  },
};

export const mockCandidates: FinancingCandidate[] = [
  {
    lotId: "LOT-2026-001",
    vpcId: "VPC-2026-001",
    score: "A",
    scoreNumeric: 92,
    riskBand: "A",
    yieldEstimated: 1.8,
    eligibleAmount: 3600,
    approvedAmount: 2880,
    producerName: "Cooperativa San Martín",
    originatorType: "cooperative",
    location: "Huila, Colombia",
    country: "Colombia",
    cacaoType: "Fino de Aroma",
    daysRemaining: 45,
    evidenceCount: 4,
  },
  {
    lotId: "LOT-2026-002",
    vpcId: "VPC-2026-002",
    score: "B+",
    scoreNumeric: 78,
    riskBand: "B",
    yieldEstimated: 1.2,
    eligibleAmount: 2400,
    approvedAmount: 960,
    producerName: "Finca El Progreso",
    originatorType: "producer",
    location: "Esmeraldas, Ecuador",
    country: "Ecuador",
    cacaoType: "CCN-51",
    daysRemaining: 62,
    evidenceCount: 3,
  },
  {
    lotId: "LOT-2026-003",
    vpcId: "VPC-2026-003",
    score: "A-",
    scoreNumeric: 86,
    riskBand: "A",
    yieldEstimated: 2.4,
    eligibleAmount: 4800,
    approvedAmount: 0,
    producerName: "Asociación Cacao Sur",
    originatorType: "cooperative",
    location: "Tumbes, Perú",
    country: "Peru",
    cacaoType: "Trinitario",
    daysRemaining: 90,
    evidenceCount: 5,
  },
];

export const mockOutcome: OutcomeSimulation = {
  lotId: "LOT-2026-001",
  actualYield: 1.92,
  projectedYield: 1.8,
  pricePerKg: 2850,
  totalRevenue: 5472,
  financierRepayment: 3168,
  producerNet: 2304,
  performanceRatio: 1.067,
};

export const mockOpportunities: MockInvestmentOpportunity[] = [
  {
    id: "OPP-2026-001",
    vpc_id: "VPC-2026-001",
    lot_id: "LOT-2026-001",
    status: "published",
    currency: "USDC",
    target_raise_usd: 3600,
    min_ticket_usd: 250,
    expected_return_bps: 850,
    tenor_days: 180,
    funding_deadline: "2026-04-30",
    raised_amount_usd: 2880,
    investor_count: 7,
    published_at: "2026-01-20",
    lot_name: "Lote Norte – Finca San Martín",
    crop_type: "Fino de Aroma",
    country: "Colombia",
    region: "Huila",
    originator_name: "Cooperativa San Martín",
    originator_type: "cooperative",
    score: "A",
    score_numeric: 92,
    risk_band: "A",
    evidence_count: 4,
  },
  {
    id: "OPP-2026-002",
    vpc_id: "VPC-2026-002",
    lot_id: "LOT-2026-002",
    status: "published",
    currency: "USDC",
    target_raise_usd: 2400,
    min_ticket_usd: 250,
    expected_return_bps: 920,
    tenor_days: 150,
    funding_deadline: "2026-05-15",
    raised_amount_usd: 960,
    investor_count: 3,
    published_at: "2026-02-12",
    lot_name: "Parcela Esmeraldas B",
    crop_type: "CCN-51",
    country: "Ecuador",
    region: "Esmeraldas",
    originator_name: "Finca El Progreso",
    originator_type: "producer",
    score: "B+",
    score_numeric: 78,
    risk_band: "B",
    evidence_count: 3,
  },
  {
    id: "OPP-2026-003",
    vpc_id: "VPC-2026-003",
    lot_id: "LOT-2026-003",
    status: "published",
    currency: "USDT",
    target_raise_usd: 4800,
    min_ticket_usd: 500,
    expected_return_bps: 780,
    tenor_days: 210,
    funding_deadline: "2026-06-01",
    raised_amount_usd: 0,
    investor_count: 0,
    published_at: "2026-03-05",
    lot_name: "Lote Tumbes Alto",
    crop_type: "Trinitario",
    country: "Peru",
    region: "Tumbes",
    originator_name: "Asociación Cacao Sur",
    originator_type: "cooperative",
    score: "A-",
    score_numeric: 86,
    risk_band: "A",
    evidence_count: 5,
  },
  {
    id: "OPP-2026-004",
    vpc_id: "VPC-2026-002",
    lot_id: "LOT-2026-002",
    status: "funded",
    currency: "USDC",
    target_raise_usd: 1800,
    min_ticket_usd: 250,
    expected_return_bps: 800,
    tenor_days: 120,
    funding_deadline: "2026-02-28",
    raised_amount_usd: 1800,
    investor_count: 5,
    published_at: "2026-01-10",
    lot_name: "Finca Palmeras – Lote 2",
    crop_type: "Fino de Aroma",
    country: "Colombia",
    region: "Nariño",
    originator_name: "Carlos Méndez",
    originator_type: "producer",
    score: "B+",
    score_numeric: 80,
    risk_band: "B",
    evidence_count: 3,
  },
];

export const mockPositions: MockInvestmentPosition[] = [
  {
    id: "POS-2026-001",
    opportunity_id: "OPP-2026-001",
    wallet_address: "GDEMO...WALLET1",
    amount_usd: 500,
    position_status: "active",
    tx_hash: "0xabc1...def2",
    created_at: "2026-01-22T10:30:00Z",
  },
  {
    id: "POS-2026-002",
    opportunity_id: "OPP-2026-004",
    wallet_address: "GDEMO...WALLET1",
    amount_usd: 750,
    position_status: "repaid",
    tx_hash: "0x3f9e...8ab4",
    created_at: "2026-01-12T14:15:00Z",
  },
];
