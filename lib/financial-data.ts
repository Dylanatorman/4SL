// Financial Data Extracted from 4SL_36_Month_Projection.xlsx - 36-Month Summary.csv
// Last updated: November 11, 2025

export interface MonthlyFinancialData {
  month: string;
  monthNumber: number;
  newContracts: number;
  totalContracts: number;
  activeCustomers: number;
  aiCustomers: number;
  newCustomerRevenue: number;
  renewalRevenue: number;
  aiAddonRevenue: number;
  onboardingFees: number;
  totalRevenue: number;
  grossProfit: number;
  grossMargin: number;
  netIncome: number;
  netMargin: number;
  endingCash: number;
}

// MRR Growth Data (from financial projections)
// MRR = Monthly Recurring Revenue (excludes one-time onboarding fees)
// Calculated as: newCustomerRevenue + renewalRevenue + aiAddonRevenue
export const mrrGrowthData = [
  // All data from projection model (recurring revenue only - no onboarding fees)
  { month: 'Nov 2025', mrr: 3500, actual: false, contracts: 2 },    // $3,500 + $0 + $0
  { month: 'Dec 2025', mrr: 6150, actual: false, contracts: 4 },     // $6,150 + $0 + $0
  { month: 'Jan 2026', mrr: 14190, actual: false, contracts: 7 },    // $14,190 + $0 + $0
  { month: 'Feb 2026', mrr: 23693, actual: false, contracts: 10 },   // $23,693 + $0 + $0
  { month: 'Mar 2026', mrr: 30656, actual: false, contracts: 14 },   // $30,656 + $0 + $0
  { month: 'Apr 2026', mrr: 37493, actual: false, contracts: 18 },   // $37,493 + $0 + $0
  { month: 'May 2026', mrr: 51279, actual: false, contracts: 23 },   // $51,279 + $0 + $0
  { month: 'Jun 2026', mrr: 72243, actual: false, contracts: 28 },   // $71,297 + $0 + $946
  { month: 'Jul 2026', mrr: 69377, actual: false, contracts: 35 },   // $12,542 + $56,082 + $753
  { month: 'Aug 2026', mrr: 83667, actual: false, contracts: 43 },   // $26,024 + $56,082 + $1,561
  { month: 'Sep 2026', mrr: 99030, actual: false, contracts: 51 },   // $40,517 + $56,082 + $2,431
  { month: 'Oct 2026', mrr: 115546, actual: false, contracts: 59 },  // $56,098 + $56,082 + $3,366
  { month: 'Nov 2026', mrr: 133300, actual: false, contracts: 69 },  // $72,847 + $56,082 + $4,371
  { month: 'Dec 2026', mrr: 152385, actual: false, contracts: 79 },  // $90,852 + $56,082 + $5,451
  { month: 'Jan 2027', mrr: 172902, actual: false, contracts: 90 },  // $110,208 + $56,082 + $6,612
  { month: 'Feb 2027', mrr: 194958, actual: false, contracts: 101 }, // $131,015 + $56,082 + $7,861
  { month: 'Mar 2027', mrr: 218668, actual: false, contracts: 114 }, // $153,383 + $56,082 + $9,203
  { month: 'Apr 2027', mrr: 244156, actual: false, contracts: 127 }, // $177,428 + $56,082 + $10,646
  { month: 'May 2027', mrr: 271556, actual: false, contracts: 141 }, // $203,277 + $56,082 + $12,197
  { month: 'Jun 2027', mrr: 301010, actual: false, contracts: 157 }, // $231,064 + $56,082 + $13,864
];

// Contract Velocity Data (from CSV Row 6 & 7)
export const contractVelocityData = [
  { month: 'Nov 25', newContracts: 2, totalContracts: 2 },
  { month: 'Dec 25', newContracts: 3, totalContracts: 4 },
  { month: 'Jan 26', newContracts: 3, totalContracts: 7 },
  { month: 'Feb 26', newContracts: 4, totalContracts: 10 },
  { month: 'Mar 26', newContracts: 4, totalContracts: 14 },
  { month: 'Apr 26', newContracts: 5, totalContracts: 18 },
  { month: 'May 26', newContracts: 5, totalContracts: 23 },
  { month: 'Jun 26', newContracts: 7, totalContracts: 28 },
  { month: 'Jul 26', newContracts: 8, totalContracts: 35 },
  { month: 'Aug 26', newContracts: 8, totalContracts: 43 },
  { month: 'Sep 26', newContracts: 9, totalContracts: 51 },
  { month: 'Oct 26', newContracts: 9, totalContracts: 59 },
  { month: 'Nov 26', newContracts: 10, totalContracts: 69 },
  { month: 'Dec 26', newContracts: 11, totalContracts: 79 },
  { month: 'Jan 27', newContracts: 12, totalContracts: 90 },
  { month: 'Feb 27', newContracts: 12, totalContracts: 101 },
  { month: 'Mar 27', newContracts: 13, totalContracts: 114 },
  { month: 'Apr 27', newContracts: 14, totalContracts: 127 },
  { month: 'May 27', newContracts: 16, totalContracts: 141 },
  { month: 'Jun 27', newContracts: 17, totalContracts: 157 },
];

// Revenue Trajectory (36 months from CSV Row 20)
export const revenueTrajectoryData: MonthlyFinancialData[] = [
  // FY 2025-2026
  { month: 'Nov 25', monthNumber: 1, newContracts: 2, totalContracts: 2, activeCustomers: 2, aiCustomers: 0, newCustomerRevenue: 3500, renewalRevenue: 0, aiAddonRevenue: 0, onboardingFees: 8000, totalRevenue: 11500, grossProfit: 11450, grossMargin: 99.6, netIncome: -21317, netMargin: -185.4, endingCash: 821683 },
  { month: 'Dec 25', monthNumber: 2, newContracts: 3, totalContracts: 4, activeCustomers: 4, aiCustomers: 0, newCustomerRevenue: 6150, renewalRevenue: 0, aiAddonRevenue: 0, onboardingFees: 12000, totalRevenue: 18150, grossProfit: 18050, grossMargin: 99.4, netIncome: -45912, netMargin: -253.0, endingCash: 818722 },
  { month: 'Jan 26', monthNumber: 3, newContracts: 3, totalContracts: 7, activeCustomers: 7, aiCustomers: 0, newCustomerRevenue: 14190, renewalRevenue: 0, aiAddonRevenue: 0, onboardingFees: 12000, totalRevenue: 26190, grossProfit: 26015, grossMargin: 99.3, netIncome: -37946, netMargin: -144.9, endingCash: 875070 },
  { month: 'Feb 26', monthNumber: 4, newContracts: 4, totalContracts: 10, activeCustomers: 10, aiCustomers: 0, newCustomerRevenue: 23693, renewalRevenue: 0, aiAddonRevenue: 0, onboardingFees: 16000, totalRevenue: 39693, grossProfit: 39443, grossMargin: 99.4, netIncome: -40644, netMargin: -102.4, endingCash: 921756 },
  { month: 'Mar 26', monthNumber: 5, newContracts: 4, totalContracts: 14, activeCustomers: 14, aiCustomers: 0, newCustomerRevenue: 30656, renewalRevenue: 0, aiAddonRevenue: 0, onboardingFees: 16000, totalRevenue: 46656, grossProfit: 46306, grossMargin: 99.2, netIncome: -35431, netMargin: -75.9, endingCash: 927375 },
  { month: 'Apr 26', monthNumber: 6, newContracts: 5, totalContracts: 18, activeCustomers: 18, aiCustomers: 0, newCustomerRevenue: 37493, renewalRevenue: 0, aiAddonRevenue: 0, onboardingFees: 20000, totalRevenue: 57493, grossProfit: 57043, grossMargin: 99.2, netIncome: -28247, netMargin: -49.1, endingCash: 922659 },
  { month: 'May 26', monthNumber: 7, newContracts: 5, totalContracts: 23, activeCustomers: 23, aiCustomers: 0, newCustomerRevenue: 51279, renewalRevenue: 0, aiAddonRevenue: 0, onboardingFees: 20000, totalRevenue: 71279, grossProfit: 70704, grossMargin: 99.2, netIncome: -30764, netMargin: -43.2, endingCash: 915758 },
  { month: 'Jun 26', monthNumber: 8, newContracts: 7, totalContracts: 28, activeCustomers: 28, aiCustomers: 0, newCustomerRevenue: 71297, renewalRevenue: 0, aiAddonRevenue: 946, onboardingFees: 28000, totalRevenue: 100243, grossProfit: 99543, grossMargin: 99.3, netIncome: -17523, netMargin: -17.5, endingCash: 895921 },

  // FY 2026-2027 (Year 2)
  { month: 'Jul 26', monthNumber: 9, newContracts: 8, totalContracts: 35, activeCustomers: 33, aiCustomers: 1, newCustomerRevenue: 12542, renewalRevenue: 56082, aiAddonRevenue: 753, onboardingFees: 30100, totalRevenue: 99476, grossProfit: 98618, grossMargin: 99.1, netIncome: -47437, netMargin: -47.7, endingCash: 1611618 },
  { month: 'Aug 26', monthNumber: 10, newContracts: 8, totalContracts: 43, activeCustomers: 41, aiCustomers: 3, newCustomerRevenue: 26024, renewalRevenue: 56082, aiAddonRevenue: 1561, onboardingFees: 32358, totalRevenue: 116025, grossProfit: 114948, grossMargin: 99.1, netIncome: -52947, netMargin: -45.6, endingCash: 1632207 },
  { month: 'Sep 26', monthNumber: 11, newContracts: 9, totalContracts: 51, activeCustomers: 49, aiCustomers: 4, newCustomerRevenue: 40517, renewalRevenue: 56082, aiAddonRevenue: 2431, onboardingFees: 34784, totalRevenue: 133814, grossProfit: 127664, grossMargin: 95.4, netIncome: -41911, netMargin: -31.3, endingCash: 1644897 },
  { month: 'Oct 26', monthNumber: 12, newContracts: 9, totalContracts: 59, activeCustomers: 58, aiCustomers: 6, newCustomerRevenue: 56098, renewalRevenue: 56082, aiAddonRevenue: 3366, onboardingFees: 37393, totalRevenue: 152939, grossProfit: 140486, grossMargin: 91.9, netIncome: -61215, netMargin: -40.0, endingCash: 1616774 },
  { month: 'Nov 26', monthNumber: 13, newContracts: 10, totalContracts: 69, activeCustomers: 67, aiCustomers: 8, newCustomerRevenue: 72847, renewalRevenue: 56082, aiAddonRevenue: 4371, onboardingFees: 40198, totalRevenue: 173497, grossProfit: 160773, grossMargin: 92.7, netIncome: -54960, netMargin: -31.7, endingCash: 1570546 },
  { month: 'Dec 26', monthNumber: 14, newContracts: 11, totalContracts: 79, activeCustomers: 77, aiCustomers: 10, newCustomerRevenue: 90852, renewalRevenue: 56082, aiAddonRevenue: 5451, onboardingFees: 43212, totalRevenue: 195597, grossProfit: 182582, grossMargin: 93.3, netIncome: -35224, netMargin: -18.0, endingCash: 1516535 },
  { month: 'Jan 27', monthNumber: 15, newContracts: 12, totalContracts: 90, activeCustomers: 88, aiCustomers: 12, newCustomerRevenue: 110208, renewalRevenue: 56082, aiAddonRevenue: 6612, onboardingFees: 46453, totalRevenue: 219355, grossProfit: 206026, grossMargin: 93.9, netIncome: -33710, netMargin: -15.4, endingCash: 1433025 },
  { month: 'Feb 27', monthNumber: 16, newContracts: 12, totalContracts: 101, activeCustomers: 99, aiCustomers: 15, newCustomerRevenue: 131015, renewalRevenue: 56082, aiAddonRevenue: 7861, onboardingFees: 49937, totalRevenue: 244895, grossProfit: 221549, grossMargin: 90.5, netIncome: -32354, netMargin: -13.2, endingCash: 1315992 },
  { month: 'Mar 27', monthNumber: 17, newContracts: 13, totalContracts: 114, activeCustomers: 112, aiCustomers: 17, newCustomerRevenue: 153383, renewalRevenue: 56082, aiAddonRevenue: 9203, onboardingFees: 53683, totalRevenue: 272350, grossProfit: 248642, grossMargin: 91.3, netIncome: -19949, netMargin: -7.3, endingCash: 1172215 },
  { month: 'Apr 27', monthNumber: 18, newContracts: 14, totalContracts: 127, activeCustomers: 125, aiCustomers: 20, newCustomerRevenue: 177428, renewalRevenue: 56082, aiAddonRevenue: 10646, onboardingFees: 57709, totalRevenue: 301864, grossProfit: 277768, grossMargin: 92.0, netIncome: 6401, netMargin: 2.1, endingCash: 1010925 },
  { month: 'May 27', monthNumber: 19, newContracts: 16, totalContracts: 141, activeCustomers: 140, aiCustomers: 23, newCustomerRevenue: 203277, renewalRevenue: 56082, aiAddonRevenue: 12197, onboardingFees: 62037, totalRevenue: 333592, grossProfit: 304237, grossMargin: 91.2, netIncome: 17792, netMargin: 5.3, endingCash: 811961 },
  { month: 'Jun 27', monthNumber: 20, newContracts: 17, totalContracts: 157, activeCustomers: 155, aiCustomers: 26, newCustomerRevenue: 231064, renewalRevenue: 56082, aiAddonRevenue: 13864, onboardingFees: 66690, totalRevenue: 367700, grossProfit: 337895, grossMargin: 91.9, netIncome: 48279, netMargin: 13.1, endingCash: 588685 },

  // FY 2027-2028 (Year 3) - Selected months
  { month: 'Jul 27', monthNumber: 21, newContracts: 18, totalContracts: 174, activeCustomers: 163, aiCustomers: 28, newCustomerRevenue: 29177, renewalRevenue: 285959, aiAddonRevenue: 1751, onboardingFees: 70024, totalRevenue: 386911, grossProfit: 356867, grossMargin: 92.2, netIncome: 44664, netMargin: 11.5, endingCash: 4119102 },
  { month: 'Dec 27', monthNumber: 26, newContracts: 22, totalContracts: 249, activeCustomers: 239, aiCustomers: 43, newCustomerRevenue: 161220, renewalRevenue: 285959, aiAddonRevenue: 9673, onboardingFees: 85115, totalRevenue: 541968, grossProfit: 495215, grossMargin: 91.4, netIncome: 170959, netMargin: 31.5, endingCash: 4325749 },
  { month: 'Jun 28', monthNumber: 32, newContracts: 30, totalContracts: 422, activeCustomers: 412, aiCustomers: 77, newCustomerRevenue: 464411, renewalRevenue: 285959, aiAddonRevenue: 27865, onboardingFees: 119765, totalRevenue: 898000, grossProfit: 831703, grossMargin: 92.6, netIncome: 467683, netMargin: 52.1, endingCash: 3403244 },
  { month: 'Jul 28', monthNumber: 33, newContracts: 31, totalContracts: 452, activeCustomers: 420, aiCustomers: 83, newCustomerRevenue: 52397, renewalRevenue: 728665, aiAddonRevenue: 3144, onboardingFees: 125754, totalRevenue: 909960, grossProfit: 843347, grossMargin: 92.7, netIncome: 446971, netMargin: 49.1, endingCash: 12629378 },
  { month: 'Aug 28', monthNumber: 34, newContracts: 33, totalContracts: 484, activeCustomers: 451, aiCustomers: 90, newCustomerRevenue: 107415, renewalRevenue: 741406, aiAddonRevenue: 6445, onboardingFees: 132041, totalRevenue: 987307, grossProfit: 914943, grossMargin: 92.7, netIncome: 552275, netMargin: 55.9, endingCash: 12967888 },
  { month: 'Sep 28', monthNumber: 35, newContracts: 35, totalContracts: 517, activeCustomers: 484, aiCustomers: 96, newCustomerRevenue: 165183, renewalRevenue: 796948, aiAddonRevenue: 9911, onboardingFees: 138643, totalRevenue: 1110684, grossProfit: 1037363, grossMargin: 93.4, netIncome: 670193, netMargin: 60.3, endingCash: 13278381 },
  { month: 'Oct 28', monthNumber: 36, newContracts: 36, totalContracts: 551, activeCustomers: 519, aiCustomers: 103, newCustomerRevenue: 225839, renewalRevenue: 855266, aiAddonRevenue: 13550, onboardingFees: 145576, totalRevenue: 1240231, grossProfit: 1165904, grossMargin: 94.0, netIncome: 798995, netMargin: 64.4, endingCash: 13561383 },
];

// Revenue Mix Data (for stacked chart)
export const revenueMixData = [
  { month: 'Nov 25', new: 3500, renewal: 0, ai: 0, onboarding: 8000 },
  { month: 'Dec 25', new: 6150, renewal: 0, ai: 0, onboarding: 12000 },
  { month: 'Jan 26', new: 14190, renewal: 0, ai: 0, onboarding: 12000 },
  { month: 'Feb 26', new: 23693, renewal: 0, ai: 0, onboarding: 16000 },
  { month: 'Mar 26', new: 30656, renewal: 0, ai: 0, onboarding: 16000 },
  { month: 'Apr 26', new: 37493, renewal: 0, ai: 0, onboarding: 20000 },
  { month: 'May 26', new: 51279, renewal: 0, ai: 0, onboarding: 20000 },
  { month: 'Jun 26', new: 71297, renewal: 0, ai: 946, onboarding: 28000 },
  { month: 'Jul 26', new: 12542, renewal: 56082, ai: 753, onboarding: 30100 },
  { month: 'Aug 26', new: 26024, renewal: 56082, ai: 1561, onboarding: 32358 },
  { month: 'Sep 26', new: 40517, renewal: 56082, ai: 2431, onboarding: 34784 },
  { month: 'Oct 26', new: 56098, renewal: 56082, ai: 3366, onboarding: 37393 },
  { month: 'Nov 26', new: 72847, renewal: 56082, ai: 4371, onboarding: 40198 },
  { month: 'Dec 26', new: 90852, renewal: 56082, ai: 5451, onboarding: 43212 },
  { month: 'Jun 27', new: 231064, renewal: 56082, ai: 13864, onboarding: 66690 },
  { month: 'Dec 27', new: 161220, renewal: 285959, ai: 9673, onboarding: 85115 },
  { month: 'Jun 28', new: 464411, renewal: 285959, ai: 27865, onboarding: 119765 },
  { month: 'Oct 28', new: 225839, renewal: 855266, ai: 13550, onboarding: 145576 },
];

// Profitability Path Data (Net Income over time)
export const profitabilityPathData = [
  { month: 'Nov 25', netIncome: -21317, monthNumber: 1 },
  { month: 'Dec 25', netIncome: -45912, monthNumber: 2 },
  { month: 'Jan 26', netIncome: -37946, monthNumber: 3 },
  { month: 'Feb 26', netIncome: -40644, monthNumber: 4 },
  { month: 'Mar 26', netIncome: -35431, monthNumber: 5 },
  { month: 'Apr 26', netIncome: -28247, monthNumber: 6 },
  { month: 'May 26', netIncome: -30764, monthNumber: 7 },
  { month: 'Jun 26', netIncome: -17523, monthNumber: 8 },
  { month: 'Jul 26', netIncome: -47437, monthNumber: 9 },
  { month: 'Aug 26', netIncome: -52947, monthNumber: 10 },
  { month: 'Sep 26', netIncome: -41911, monthNumber: 11 },
  { month: 'Oct 26', netIncome: -61215, monthNumber: 12 },
  { month: 'Nov 26', netIncome: -54960, monthNumber: 13 },
  { month: 'Dec 26', netIncome: -35224, monthNumber: 14 },
  { month: 'Jan 27', netIncome: -33710, monthNumber: 15 },
  { month: 'Feb 27', netIncome: -32354, monthNumber: 16 },
  { month: 'Mar 27', netIncome: -19949, monthNumber: 17 },
  { month: 'Apr 27', netIncome: 6401, monthNumber: 18 },  // First positive!
  { month: 'May 27', netIncome: 17792, monthNumber: 19 },
  { month: 'Jun 27', netIncome: 48279, monthNumber: 20 }, // BREAKEVEN MILESTONE
  { month: 'Jul 27', netIncome: 44664, monthNumber: 21 },
  { month: 'Aug 27', netIncome: 82867, monthNumber: 22 },
  { month: 'Sep 27', netIncome: 103071, monthNumber: 23 },
  { month: 'Oct 27', netIncome: 137535, monthNumber: 24 },
  { month: 'Nov 27', netIncome: 170959, monthNumber: 25 },
  { month: 'Dec 27', netIncome: 199065, monthNumber: 26 },
  { month: 'Jan 28', netIncome: 226419, monthNumber: 27 },
  { month: 'Feb 28', netIncome: 278752, monthNumber: 28 },
  { month: 'Mar 28', netIncome: 320439, monthNumber: 29 },
  { month: 'Apr 28', netIncome: 368321, monthNumber: 30 },
  { month: 'May 28', netIncome: 414785, monthNumber: 31 },
  { month: 'Jun 28', netIncome: 467683, monthNumber: 32 },
  { month: 'Jul 28', netIncome: 446971, monthNumber: 33 },
  { month: 'Aug 28', netIncome: 552275, monthNumber: 34 },
  { month: 'Sep 28', netIncome: 670193, monthNumber: 35 },
  { month: 'Oct 28', netIncome: 798995, monthNumber: 36 },
];

// Key Milestones
export const keyMilestones = [
  {
    month: 0,
    label: 'Launch',
    description: 'Current traction',
    metric: '$120K ARR',
    achieved: true,
    highlight: false,
  },
  {
    month: 8,
    label: 'Year 1 End',
    description: 'First fiscal year complete',
    metric: '$371K revenue, 28 customers',
    achieved: false,
    highlight: false,
  },
  {
    month: 18,
    label: 'First Profit',
    description: 'Net income turns positive',
    metric: '$6.4K net income',
    achieved: false,
    highlight: true,
  },
  {
    month: 20,
    label: 'Breakeven',
    description: 'Sustained profitability',
    metric: '$48K net income',
    achieved: false,
    highlight: true,
  },
  {
    month: 24,
    label: '$1M ARR',
    description: 'Key revenue milestone',
    metric: '$2.6M annual revenue',
    achieved: false,
    highlight: false,
  },
  {
    month: 36,
    label: 'Year 3 End',
    description: 'Scaled profitable business',
    metric: '$7.5M revenue, 64% margin',
    achieved: false,
    highlight: true,
  },
];

// Fiscal Year Summary
export const fiscalYearSummary = [
  {
    year: 'FY 2025-2026',
    revenue: 371204,
    growth: null,
    contracts: 33,
    customers: 28,
    grossMargin: 99.0,
    netIncome: -257784,
    netMargin: -69.4,
  },
  {
    year: 'FY 2026-2027',
    revenue: 2611104,
    growth: 603,
    contracts: 139,
    customers: 155,
    grossMargin: 92.7,
    netIncome: -307235,
    netMargin: -11.8,
  },
  {
    year: 'FY 2027-2028',
    revenue: 7461304,
    growth: 186,
    contracts: 279,
    customers: 412,
    grossMargin: 92.0,
    netIncome: 2814558,
    netMargin: 37.7,
  },
];
