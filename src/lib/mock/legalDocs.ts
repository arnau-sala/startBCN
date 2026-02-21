export interface LegalDigestItem {
  id: string;
  title: string;
  dummyTitle: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  severity: "high" | "medium" | "low";
  deadline: string;
  pages: number;
  affectedAssets: string[];
  keyPoints: string[];
  requiredAction: string;
  fullDocumentUrl: string;
}

export const legalDigestDocs: LegalDigestItem[] = [
  {
    id: "l1",
    title: "MiCA implementation update for retail crypto access",
    dummyTitle: "New EU crypto rule: check if your exchange is licensed",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300",
    source: "BOE / EU Official Journal",
    publishedAt: "2026-02-21T10:30:00Z",
    severity: "high",
    deadline: "Q3 2026",
    pages: 40,
    affectedAssets: ["BTC", "ETH"],
    keyPoints: [
      "Exchanges must have a MiCA license to operate in the EU.",
      "Your crypto can stay available, but platform rules become stricter.",
      "Some non-compliant products may disappear in the short term."
    ],
    requiredAction: "Verify your exchange status and move assets if the platform is not MiCA-ready.",
    fullDocumentUrl: "https://eur-lex.europa.eu/"
  },
  {
    id: "l2",
    title: "Fiscal reporting extension for crypto holdings",
    dummyTitle: "Tax update: you may need to declare crypto movements",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300",
    source: "Spanish Treasury Bulletin",
    publishedAt: "2026-02-20T09:20:00Z",
    severity: "medium",
    deadline: "June 2026",
    pages: 25,
    affectedAssets: ["BTC", "SOL"],
    keyPoints: [
      "New forms include transfers between exchanges and wallets.",
      "Thresholds stay moderate, but reporting detail increases.",
      "Late filings can trigger penalties even without gains."
    ],
    requiredAction: "Keep monthly records of transfers and download exchange statements.",
    fullDocumentUrl: "https://www.boe.es/"
  },
  {
    id: "l3",
    title: "Retail investor disclosure standard for leveraged products",
    dummyTitle: "Before buying risky products, warnings must be clearer",
    imageUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=300",
    source: "CNMV Circular",
    publishedAt: "2026-02-19T14:00:00Z",
    severity: "low",
    deadline: "Q4 2026",
    pages: 18,
    affectedAssets: ["CFDs", "Leveraged ETFs"],
    keyPoints: [
      "Platforms must show a clearer risk summary before purchase.",
      "Performance examples must include downside scenarios.",
      "Marketing language is limited for retail audiences."
    ],
    requiredAction: "Review product warnings carefully and avoid leverage you cannot explain simply.",
    fullDocumentUrl: "https://www.cnmv.es/"
  }
];
