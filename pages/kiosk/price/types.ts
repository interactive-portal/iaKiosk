export interface PricingTier {
  duration: string;
  price: string;
  multiple: string;
}

export interface MembershipPlan {
  title: string;
  ageGroup: string;
  pricingTiers: PricingTier[];
}

export interface FooterNote {
  title: string;
  details: string[];
}

export interface Discount {
  category: string;
  discount: string;
}

export interface AppData {
  header: {
    logoSrc: string;
    title: string;
  };
  membershipPlans: MembershipPlan[];
  footerNotes: FooterNote[];
}
