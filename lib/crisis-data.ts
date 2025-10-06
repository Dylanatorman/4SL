// Crisis Data from CSV files
// These datasets demonstrate the urgent need for 4StudentLives

export interface SuicideDataPoint {
  year: number;
  rate: number;
}

export interface ShootingDataPoint {
  year: number;
  incidents: number;
}

// CDC Youth Suicide Rate (Ages 10-24) per 100,000 population
// Source: CDC NCHS Data Brief 471, National Vital Statistics System
// https://www.cdc.gov/nchs/data/databriefs/db471-tables.pdf
export const suicideData: SuicideDataPoint[] = [
  { year: 2011, rate: 7.9 },
  { year: 2012, rate: 8.0 },
  { year: 2013, rate: 8.1 },
  { year: 2014, rate: 8.5 },
  { year: 2015, rate: 9.2 },
  { year: 2016, rate: 9.6 },
  { year: 2017, rate: 10.6 },
  { year: 2018, rate: 10.7 },
  { year: 2019, rate: 10.2 },
  { year: 2020, rate: 10.5 },
  { year: 2021, rate: 11.0 },
];

// K-12 School Shootings with Injuries or Deaths
// Source: Education Week Tracker
// https://www.edweek.org/leadership/school-shootings-this-year-how-many-and-where/2025/01
export const shootingData: ShootingDataPoint[] = [
  { year: 2018, incidents: 24 },
  { year: 2019, incidents: 24 },
  { year: 2020, incidents: 10 },
  { year: 2021, incidents: 35 },
  { year: 2022, incidents: 51 },
  { year: 2023, incidents: 38 },
  { year: 2024, incidents: 39 },
];

// Key statistics for the crisis
export const crisisStats = {
  suicideIncrease: {
    from: 7.9,
    to: 11.0,
    years: "2011-2021",
    percentChange: 39.2, // (11.0 - 7.9) / 7.9 * 100
  },
  shootingIncrease: {
    from2020: 10,
    to2022: 51,
    percentChange: 410, // (51 - 10) / 10 * 100
    recentYears: "410% increase from 2020 to 2022",
  },
  highSchoolStudents: {
    consideredSuicide: 20, // percentage
    source: "CDC 2023",
  },
  leadingCause: "2nd leading cause of death ages 10-24",
};

// Legal cases and settlements
export const legalCases = [
  {
    case: "Virginia Tech",
    year: 2007,
    amount: 11000000,
    location: "VA",
  },
  {
    case: "Marysville",
    year: 2014,
    amount: 18000000,
    location: "WA",
  },
  {
    case: "Parkland (School Board)",
    year: 2018,
    amount: 25000000,
    location: "FL",
  },
  {
    case: "Parkland (Federal)",
    year: 2018,
    amount: 127500000,
    location: "FL",
  },
  {
    case: "Cleveland v. Taft Union",
    year: 2022,
    amount: 2000000,
    location: "CA",
    note: "Failure to document warning signs",
  },
];

// State mandate timeline
export const stateMandates = [
  { state: "Virginia", year: 2013, statute: "Va. Code §22.1-79.4", isFirst: true },
  { state: "Florida", year: 2018, statute: "Fla. Admin. Code 6A-1.0018" },
  { state: "Texas", year: 2019, statute: "Educ. Code §37.115" },
  { state: "Illinois", year: 2020, statute: "105 ILCS 128/45" },
  { state: "Kentucky", year: 2020, statute: "KRS 158.4412" },
  { state: "Maryland", year: 2021, statute: "Educ. §7-1507" },
  { state: "Ohio", year: 2021, statute: "R.C. §3313.669" },
  { state: "Pennsylvania", year: 2022, statute: "24 P.S. §13-1302-E" },
  { state: "Rhode Island", year: 2022, statute: "R.I. Gen. Laws §16-21-23.2" },
  { state: "Vermont", year: 2023, statute: "16 V.S.A. §1485" },
  { state: "Washington", year: 2023, statute: "RCW 28A.320.123" },
];

export const californiaLegislation = [
  {
    bill: "SB 906",
    year: 2022,
    status: "Enacted (Effective 2023)",
    summary: "Requires school officials (grades 6-12) to report any homicidal threat to law enforcement; immediate threat assessment required",
    url: "https://leginfo.legislature.ca.gov",
  },
  {
    bill: "SB 1241 (SAFE Act)",
    year: 2024,
    status: "Pending",
    summary: "Would mandate multidisciplinary threat assessment teams at all middle/high schools by July 2027; requires 24/7 anonymous reporting system",
    deadline: "July 2027",
    url: "https://leginfo.legislature.ca.gov",
  },
];
