'use client';

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Rect,
  Line,
} from '@react-pdf/renderer';

// Brand colors
const colors = {
  primary: '#05092B',
  secondary: '#1A3859',
  accent: '#FCC169',
  teal: '#007097',
  green: '#10B981',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#6B7280',
};

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  logo: {
    width: 150,
    height: 40,
  },
  headerRight: {
    textAlign: 'right',
  },
  updateTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.teal,
  },
  date: {
    fontSize: 9,
    color: colors.gray,
    marginTop: 2,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    color: colors.secondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.teal,
    marginBottom: 6,
    marginTop: 8,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 6,
    color: colors.primary,
  },
  // Table styles
  table: {
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 8,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    padding: 6,
  },
  tableRowAlt: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    padding: 6,
    backgroundColor: colors.lightGray,
  },
  tableCell: {
    flex: 1,
    fontSize: 8,
    textAlign: 'center',
    color: colors.primary,
  },
  tableCellBold: {
    flex: 1,
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
  },
  // Metrics box
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 8,
  },
  metricBox: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.teal,
  },
  metricLabel: {
    fontSize: 7,
    color: colors.gray,
    marginTop: 3,
  },
  // Chart grid styles
  chartGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 8,
    gap: 8,
  },
  miniChartContainer: {
    width: '48%',
    backgroundColor: colors.lightGray,
    padding: 6,
    borderRadius: 4,
    marginBottom: 4,
  },
  miniChartTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  // Bullet points
  bulletList: {
    marginBottom: 6,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 12,
    fontSize: 8,
    color: colors.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.3,
    color: colors.primary,
  },
  // Signature
  signature: {
    marginTop: 15,
  },
  signatureName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
  },
  signatureTitle: {
    fontSize: 9,
    color: colors.gray,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: colors.gray,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: 10,
  },
});

// Mini bar chart component
interface MiniChartProps {
  title: string;
  data: number[];
  labels: string[];
  color: string;
  formatValue?: (val: number) => string;
}

const MiniBarChart = ({ title, data, labels, color, formatValue }: MiniChartProps) => {
  const chartWidth = 200;
  const chartHeight = 55;
  const padding = { top: 12, right: 5, bottom: 15, left: 5 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxValue = Math.max(...data) * 1.1;
  const barWidth = innerWidth / data.length - 6;

  const xScale = (index: number) => padding.left + (index * (innerWidth / data.length)) + (innerWidth / data.length) / 2;
  const yScale = (value: number) => padding.top + innerHeight - (value / maxValue) * innerHeight;
  const barHeight = (value: number) => (value / maxValue) * innerHeight;

  return (
    <View style={styles.miniChartContainer}>
      <Text style={styles.miniChartTitle}>{title}</Text>
      <Svg width={chartWidth} height={chartHeight}>
        {/* Bars */}
        {data.map((value, i) => (
          <React.Fragment key={i}>
            <Rect
              x={xScale(i) - barWidth / 2}
              y={yScale(value)}
              width={barWidth}
              height={barHeight(value)}
              fill={color}
            />
            {/* Value label */}
            <Text
              x={xScale(i)}
              y={yScale(value) - 2}
              style={{ fontSize: 6, textAnchor: 'middle' }}
            >
              {formatValue ? formatValue(value) : value}
            </Text>
          </React.Fragment>
        ))}

        {/* X-axis labels */}
        {labels.map((label, i) => (
          <Text
            key={`label-${i}`}
            x={xScale(i)}
            y={chartHeight - 3}
            style={{ fontSize: 6, textAnchor: 'middle' }}
          >
            {label}
          </Text>
        ))}
      </Svg>
    </View>
  );
};

// Four chart grid component
const FourChartGrid = () => {
  const labels = ['Sep', 'Oct', 'Nov', 'Dec', 'Total'];

  // Monthly data (not cumulative) + Q4 Total
  const districtsData = [1, 14, 1, 13, 29]; // Districts added each month + total
  const contractsData = [1, 1, 1, 2, 5]; // Contracts signed each month + total
  const studentsData = [12.4, 19.5, 3.5, 20.9, 56.3]; // Students added each month (in thousands) + total
  const arrData = [12.5, 20, 25, 48, 105.5]; // ACV each month (in thousands) + total

  return (
    <View style={styles.chartGrid}>
      <MiniBarChart
        title="District Growth"
        data={districtsData}
        labels={labels}
        color={colors.accent}
      />
      <MiniBarChart
        title="Contracts"
        data={contractsData}
        labels={labels}
        color={colors.teal}
      />
      <MiniBarChart
        title="Students (K)"
        data={studentsData}
        labels={labels}
        color={colors.primary}
        formatValue={(val) => val.toFixed(1)}
      />
      <MiniBarChart
        title="ACV ($K)"
        data={arrData}
        labels={labels}
        color={colors.green}
        formatValue={(val) => `$${val.toFixed(0)}`}
      />
    </View>
  );
};

// Main Document Component
export const InvestorNewsletter = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src="/4SL_logo_color.png" />
        <View style={styles.headerRight}>
          <Text style={styles.updateTitle}>Investor Update</Text>
          <Text style={styles.date}>December 2025</Text>
        </View>
      </View>

      {/* Main Title */}
      <Text style={styles.mainTitle}>
        4SL Momentum Update: From 0 to 29 Districts in Only 4 Months
      </Text>
      <Text style={styles.subtitle}>
        2025 Progress Report
      </Text>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>29</Text>
          <Text style={styles.metricLabel}>Districts Served</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>56,300</Text>
          <Text style={styles.metricLabel}>Students Protected</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>$105,500</Text>
          <Text style={styles.metricLabel}>Annual Recurring Revenue</Text>
        </View>
      </View>

      {/* Traction Table */}
      <Text style={styles.sectionTitle}>Traction Highlights</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Month</Text>
          <Text style={styles.tableHeaderCell}>Customer</Text>
          <Text style={styles.tableHeaderCell}>Districts</Text>
          <Text style={styles.tableHeaderCell}>Students</Text>
          <Text style={styles.tableHeaderCell}>ACV</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellBold}>Sep</Text>
          <Text style={styles.tableCell}>Chico Unified, CA</Text>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>12,400</Text>
          <Text style={styles.tableCell}>$12,500</Text>
        </View>
        <View style={styles.tableRowAlt}>
          <Text style={styles.tableCellBold}>Oct</Text>
          <Text style={styles.tableCell}>El Dorado County, CA</Text>
          <Text style={styles.tableCell}>14</Text>
          <Text style={styles.tableCell}>19,500</Text>
          <Text style={styles.tableCell}>$20,000</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellBold}>Nov</Text>
          <Text style={styles.tableCell}>Silver City, NM</Text>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>3,500</Text>
          <Text style={styles.tableCell}>$25,000</Text>
        </View>
        <View style={styles.tableRowAlt}>
          <Text style={styles.tableCellBold}>Dec</Text>
          <Text style={styles.tableCell}>Butte County, CA</Text>
          <Text style={styles.tableCell}>5</Text>
          <Text style={styles.tableCell}>6,900</Text>
          <Text style={styles.tableCell}>$22,000</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellBold}>Dec</Text>
          <Text style={styles.tableCell}>Glenn County, CA</Text>
          <Text style={styles.tableCell}>8</Text>
          <Text style={styles.tableCell}>14,000</Text>
          <Text style={styles.tableCell}>$26,000</Text>
        </View>
      </View>

      {/* Growth Charts */}
      <FourChartGrid />

      {/* What This Means */}
      <Text style={styles.sectionTitle}>What This Means</Text>
      <View style={styles.bulletList}>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontWeight: 'bold' }}>Multi-Year Revenue Locked In: </Text>
            Every district signed a 3-year agreement, giving us long-term revenue visibility and validating that districts see our platform as mandatory safety infrastructure, not discretionary software.
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontWeight: 'bold' }}>County-Level Expansion Model Proven: </Text>
            Our wins in El Dorado, Butte, and Glenn Counties demonstrate a scalable playbook: one contract unlocks 5 to 14 districts at once, delivering 10-20x sales leverage compared to district-by-district selling.
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontWeight: 'bold' }}>Geographic Validation Beyond California: </Text>
            Silver City, New Mexico confirms demand outside California's SB 1241 mandate cycle. With more than 11 states enforcing similar requirements, we now have a multi-state expansion runway.
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontWeight: 'bold' }}>Acceleration With Zero Upfront Fees: </Text>
            We eliminated onboarding fees and embedded implementation directly into contract pricing, removing friction while maintaining strong unit economics. December alone delivered 13 new districts—our most productive month to date.
          </Text>
        </View>
      </View>

      {/* Looking Ahead - Page 2 */}
      <View break>
        <Text style={styles.sectionTitle}>Looking Ahead</Text>
        <Text style={styles.paragraph}>
          With California's SB 1241 compliance deadline approaching in July 2027 and county-level deployments now repeatable, we expect accelerated growth in 2025. Our focus next quarter:
        </Text>
        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Expanding county-first selling into additional California regions</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Targeting court and community schools as entry points into new counties</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Opening new mandate-driven states with existing superintendent referrals</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Continuing to convert every qualified district we engage</Text>
          </View>
        </View>
        <Text style={styles.paragraph}>
          We'll share a full Q1 roadmap and updated financial projections in our next investor briefing.
        </Text>
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <Text style={styles.signatureName}>Adam Bangerter</Text>
        <Text style={styles.signatureTitle}>Founder & CEO, 4StudentLives</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        4StudentLives • Private Investor Materials • Confidential
      </Text>
    </Page>
  </Document>
);

export default InvestorNewsletter;
