import { mockOpportunities } from "@/lib/mockData";
import OpportunityDetailClient from "./OpportunityDetailClient";

export function generateStaticParams() {
  return mockOpportunities.map((o) => ({ id: o.id }));
}

export default function OpportunityDetailPage() {
  return <OpportunityDetailClient />;
}

