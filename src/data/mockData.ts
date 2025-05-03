
export interface Customer {
  id: string;
  name: string;
  company: string;
  churnScore: number;
  upSellScore: number;
  churnReasons: string[];
  upSellReasons: string[];
  behavior: {
    weeklyUsage: number; // sessions per week
    keyFeaturesUsed: string[];
    avgSessionTime: number; // minutes
    reconciliationsCompleted: number;
  };
  engagement: {
    campaignParticipation: boolean;
    csmInteraction: number; // 0-10 scale
  };
  support: {
    openTickets: number;
    closedTickets: number;
    avgResponseTime: number; // hours
    repeatedIssues: boolean;
  };
  billing: {
    currentPlan: string;
    paymentHistory: "good" | "delayed" | "issues";
    recentPlanChanges: boolean;
  };
  userFlow: {
    onboardingCompleted: boolean;
    usagePatternChanges: "stable" | "increasing" | "decreasing" | "abandoned";
    coreFeatureUsage: "consistent" | "inconsistent" | "abandoned";
  };
  additionalData: {
    monthlyTransactionVolume: number; // transactions
    gigasConsumedMonthly: number;
    dataGrowthRate: number; // percentage
  };
}

export const customers: Customer[] = [
  {
    id: "1",
    name: "MercadoLibre",
    company: "MercadoLibre Inc.",
    churnScore: 25,
    upSellScore: 85,
    churnReasons: ["One open ticket"],
    upSellReasons: ["High feature usage", "Growing data volume", "Consistent engagement"],
    behavior: {
      weeklyUsage: 12,
      keyFeaturesUsed: ["Reconciliation", "Reporting", "API Integration"],
      avgSessionTime: 45,
      reconciliationsCompleted: 350,
    },
    engagement: {
      campaignParticipation: true,
      csmInteraction: 8,
    },
    support: {
      openTickets: 1,
      closedTickets: 12,
      avgResponseTime: 3.5,
      repeatedIssues: false,
    },
    billing: {
      currentPlan: "Business",
      paymentHistory: "good",
      recentPlanChanges: false,
    },
    userFlow: {
      onboardingCompleted: true,
      usagePatternChanges: "increasing",
      coreFeatureUsage: "consistent",
    },
    additionalData: {
      monthlyTransactionVolume: 125000,
      gigasConsumedMonthly: 250,
      dataGrowthRate: 35,
    },
  },
  {
    id: "2",
    name: "Rappi",
    company: "Rappi S.A.S",
    churnScore: 15,
    upSellScore: 90,
    churnReasons: [],
    upSellReasons: ["Advanced feature needs", "Expanding team", "High growth rate"],
    behavior: {
      weeklyUsage: 15,
      keyFeaturesUsed: ["Reconciliation", "Reporting", "Data Export", "Automation"],
      avgSessionTime: 60,
      reconciliationsCompleted: 425,
    },
    engagement: {
      campaignParticipation: true,
      csmInteraction: 9,
    },
    support: {
      openTickets: 0,
      closedTickets: 8,
      avgResponseTime: 2.8,
      repeatedIssues: false,
    },
    billing: {
      currentPlan: "Professional",
      paymentHistory: "good",
      recentPlanChanges: false,
    },
    userFlow: {
      onboardingCompleted: true,
      usagePatternChanges: "increasing",
      coreFeatureUsage: "consistent",
    },
    additionalData: {
      monthlyTransactionVolume: 98000,
      gigasConsumedMonthly: 180,
      dataGrowthRate: 42,
    },
  },
  {
    id: "3",
    name: "Nubank",
    company: "Nu Pagamentos S.A.",
    churnScore: 82,
    upSellScore: 20,
    churnReasons: ["Reduced usage", "Incomplete onboarding", "Multiple open tickets"],
    upSellReasons: [],
    behavior: {
      weeklyUsage: 2,
      keyFeaturesUsed: ["Reporting"],
      avgSessionTime: 15,
      reconciliationsCompleted: 45,
    },
    engagement: {
      campaignParticipation: false,
      csmInteraction: 3,
    },
    support: {
      openTickets: 3,
      closedTickets: 2,
      avgResponseTime: 8.5,
      repeatedIssues: true,
    },
    billing: {
      currentPlan: "Basic",
      paymentHistory: "delayed",
      recentPlanChanges: false,
    },
    userFlow: {
      onboardingCompleted: false,
      usagePatternChanges: "decreasing",
      coreFeatureUsage: "abandoned",
    },
    additionalData: {
      monthlyTransactionVolume: 12000,
      gigasConsumedMonthly: 20,
      dataGrowthRate: -15,
    },
  },
  {
    id: "4",
    name: "Banco Galicia",
    company: "Banco de Galicia y Buenos Aires S.A.",
    churnScore: 90,
    upSellScore: 10,
    churnReasons: ["No recent logins", "Payment issues", "No customer engagement"],
    upSellReasons: [],
    behavior: {
      weeklyUsage: 0,
      keyFeaturesUsed: [],
      avgSessionTime: 0,
      reconciliationsCompleted: 5,
    },
    engagement: {
      campaignParticipation: false,
      csmInteraction: 1,
    },
    support: {
      openTickets: 2,
      closedTickets: 1,
      avgResponseTime: 12,
      repeatedIssues: true,
    },
    billing: {
      currentPlan: "Basic",
      paymentHistory: "issues",
      recentPlanChanges: false,
    },
    userFlow: {
      onboardingCompleted: false,
      usagePatternChanges: "abandoned",
      coreFeatureUsage: "abandoned",
    },
    additionalData: {
      monthlyTransactionVolume: 3000,
      gigasConsumedMonthly: 5,
      dataGrowthRate: -50,
    },
  },
  {
    id: "5",
    name: "Falabella",
    company: "Falabella S.A.",
    churnScore: 65,
    upSellScore: 25,
    churnReasons: ["Reduced usage", "Delayed payments"],
    upSellReasons: [],
    behavior: {
      weeklyUsage: 4,
      keyFeaturesUsed: ["Reconciliation", "Reporting"],
      avgSessionTime: 25,
      reconciliationsCompleted: 85,
    },
    engagement: {
      campaignParticipation: false,
      csmInteraction: 4,
    },
    support: {
      openTickets: 1,
      closedTickets: 6,
      avgResponseTime: 6.2,
      repeatedIssues: true,
    },
    billing: {
      currentPlan: "Professional",
      paymentHistory: "delayed",
      recentPlanChanges: true,
    },
    userFlow: {
      onboardingCompleted: true,
      usagePatternChanges: "decreasing",
      coreFeatureUsage: "inconsistent",
    },
    additionalData: {
      monthlyTransactionVolume: 45000,
      gigasConsumedMonthly: 60,
      dataGrowthRate: 5,
    },
  },
  {
    id: "6",
    name: "Cencosud",
    company: "Cencosud S.A.",
    churnScore: 35,
    upSellScore: 75,
    churnReasons: ["Some inactive users"],
    upSellReasons: ["Growing usage", "High data volume", "Complete feature adoption"],
    behavior: {
      weeklyUsage: 10,
      keyFeaturesUsed: ["Reconciliation", "Reporting", "Data Export"],
      avgSessionTime: 40,
      reconciliationsCompleted: 220,
    },
    engagement: {
      campaignParticipation: true,
      csmInteraction: 7,
    },
    support: {
      openTickets: 1,
      closedTickets: 9,
      avgResponseTime: 4.1,
      repeatedIssues: false,
    },
    billing: {
      currentPlan: "Professional",
      paymentHistory: "good",
      recentPlanChanges: false,
    },
    userFlow: {
      onboardingCompleted: true,
      usagePatternChanges: "stable",
      coreFeatureUsage: "consistent",
    },
    additionalData: {
      monthlyTransactionVolume: 78000,
      gigasConsumedMonthly: 120,
      dataGrowthRate: 25,
    },
  },
  {
    id: "7",
    name: "Grupo Exito",
    company: "Almacenes Exito S.A.",
    churnScore: 78,
    upSellScore: 15,
    churnReasons: ["Minimal feature usage", "Poor engagement", "Long ticket response times"],
    upSellReasons: [],
    behavior: {
      weeklyUsage: 3,
      keyFeaturesUsed: ["Reporting"],
      avgSessionTime: 15,
      reconciliationsCompleted: 35,
    },
    engagement: {
      campaignParticipation: false,
      csmInteraction: 3,
    },
    support: {
      openTickets: 2,
      closedTickets: 3,
      avgResponseTime: 9.5,
      repeatedIssues: true,
    },
    billing: {
      currentPlan: "Basic",
      paymentHistory: "delayed",
      recentPlanChanges: true,
    },
    userFlow: {
      onboardingCompleted: true,
      usagePatternChanges: "decreasing",
      coreFeatureUsage: "inconsistent",
    },
    additionalData: {
      monthlyTransactionVolume: 25000,
      gigasConsumedMonthly: 30,
      dataGrowthRate: -10,
    },
  },
  {
    id: "8",
    name: "BBVA",
    company: "BBVA S.A.",
    churnScore: 20,
    upSellScore: 80,
    churnReasons: [],
    upSellReasons: ["Advanced feature usage", "High engagement", "Growing data needs"],
    behavior: {
      weeklyUsage: 14,
      keyFeaturesUsed: ["Reconciliation", "Reporting", "API Integration", "Automation"],
      avgSessionTime: 55,
      reconciliationsCompleted: 310,
    },
    engagement: {
      campaignParticipation: true,
      csmInteraction: 9,
    },
    support: {
      openTickets: 0,
      closedTickets: 15,
      avgResponseTime: 3.2,
      repeatedIssues: false,
    },
    billing: {
      currentPlan: "Business",
      paymentHistory: "good",
      recentPlanChanges: false,
    },
    userFlow: {
      onboardingCompleted: true,
      usagePatternChanges: "increasing",
      coreFeatureUsage: "consistent",
    },
    additionalData: {
      monthlyTransactionVolume: 140000,
      gigasConsumedMonthly: 270,
      dataGrowthRate: 32,
    },
  },
  {
    id: "9",
    name: "Itaú",
    company: "Itaú Unibanco S.A.",
    churnScore: 30,
    upSellScore: 70,
    churnReasons: ["One open support ticket"],
    upSellReasons: ["High feature usage", "Consistent engagement", "Growing team"],
    behavior: {
      weeklyUsage: 11,
      keyFeaturesUsed: ["Reconciliation", "Reporting", "Data Export"],
      avgSessionTime: 42,
      reconciliationsCompleted: 275,
    },
    engagement: {
      campaignParticipation: true,
      csmInteraction: 8,
    },
    support: {
      openTickets: 1,
      closedTickets: 10,
      avgResponseTime: 3.8,
      repeatedIssues: false,
    },
    billing: {
      currentPlan: "Professional",
      paymentHistory: "good",
      recentPlanChanges: false,
    },
    userFlow: {
      onboardingCompleted: true,
      usagePatternChanges: "stable",
      coreFeatureUsage: "consistent",
    },
    additionalData: {
      monthlyTransactionVolume: 95000,
      gigasConsumedMonthly: 180,
      dataGrowthRate: 22,
    },
  },
  {
    id: "10",
    name: "Bancolombia",
    company: "Bancolombia S.A.",
    churnScore: 85,
    upSellScore: 10,
    churnReasons: ["No recent usage", "Multiple support issues", "Incomplete implementation"],
    upSellReasons: [],
    behavior: {
      weeklyUsage: 1,
      keyFeaturesUsed: ["Reporting"],
      avgSessionTime: 10,
      reconciliationsCompleted: 15,
    },
    engagement: {
      campaignParticipation: false,
      csmInteraction: 2,
    },
    support: {
      openTickets: 4,
      closedTickets: 3,
      avgResponseTime: 10.5,
      repeatedIssues: true,
    },
    billing: {
      currentPlan: "Basic",
      paymentHistory: "issues",
      recentPlanChanges: true,
    },
    userFlow: {
      onboardingCompleted: false,
      usagePatternChanges: "abandoned",
      coreFeatureUsage: "abandoned",
    },
    additionalData: {
      monthlyTransactionVolume: 8000,
      gigasConsumedMonthly: 12,
      dataGrowthRate: -25,
    },
  },
];

export const getChurnRiskCustomers = () => {
  return customers.filter(customer => customer.churnScore >= 60);
};

export const getUpSellCustomers = () => {
  return customers.filter(customer => customer.upSellScore >= 60);
};

export const getChurnRiskTotal = () => {
  return getChurnRiskCustomers().length;
};

export const getUpSellTotal = () => {
  return getUpSellCustomers().length;
};

export const getAverageChurnRisk = () => {
  const churnCustomers = getChurnRiskCustomers();
  if (churnCustomers.length === 0) return 0;
  
  const sum = churnCustomers.reduce((acc, customer) => acc + customer.churnScore, 0);
  return Math.round(sum / churnCustomers.length);
};

export const getAverageUpSellPotential = () => {
  const upSellCustomers = getUpSellCustomers();
  if (upSellCustomers.length === 0) return 0;
  
  const sum = upSellCustomers.reduce((acc, customer) => acc + customer.upSellScore, 0);
  return Math.round(sum / upSellCustomers.length);
};
