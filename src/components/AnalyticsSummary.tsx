
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getChurnRiskCustomers, getUpSellCustomers } from '@/data/mockData';

interface AnalyticsSummaryProps {
  type: 'churn' | 'upsell' | 'both';
}

const AnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({ type }) => {
  const churnCustomers = getChurnRiskCustomers();
  const upSellCustomers = getUpSellCustomers();
  
  const getChurnInsight = () => {
    const onboardingIssues = churnCustomers.filter(c => !c.userFlow.onboardingCompleted).length;
    const supportIssues = churnCustomers.filter(c => c.support.openTickets > 0).length;
    const usageIssues = churnCustomers.filter(c => c.behavior.weeklyUsage < 3).length;
    
    return (
      <>
        <p className="mb-2">
          <span className="font-medium">{onboardingIssues} of {churnCustomers.length}</span> at-risk customers have incomplete onboarding.
        </p>
        <p className="mb-2">
          <span className="font-medium">{supportIssues} of {churnCustomers.length}</span> at-risk customers have open support tickets.
        </p>
        <p className="mb-2">
          <span className="font-medium">{usageIssues} of {churnCustomers.length}</span> at-risk customers have low weekly usage (less than 3 sessions).
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Main drivers of churn risk appear to be incomplete onboarding and low product adoption.
          Consider targeted onboarding campaigns and proactive support outreach.
        </p>
      </>
    );
  };
  
  const getUpSellInsight = () => {
    const highUsage = upSellCustomers.filter(c => c.behavior.weeklyUsage > 10).length;
    const highGrowth = upSellCustomers.filter(c => c.additionalData.dataGrowthRate > 25).length;
    const manyFeatures = upSellCustomers.filter(c => c.behavior.keyFeaturesUsed.length >= 3).length;
    
    return (
      <>
        <p className="mb-2">
          <span className="font-medium">{highUsage} of {upSellCustomers.length}</span> high-potential customers show above-average platform usage.
        </p>
        <p className="mb-2">
          <span className="font-medium">{highGrowth} of {upSellCustomers.length}</span> high-potential customers have data growth rates above 25%.
        </p>
        <p className="mb-2">
          <span className="font-medium">{manyFeatures} of {upSellCustomers.length}</span> high-potential customers use 3+ key features regularly.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Companies with high feature adoption and growing data needs represent the strongest 
          up-sell opportunities. Schedule reviews with these accounts to discuss plan upgrades.
        </p>
      </>
    );
  };
  
  const getBothInsights = () => {
    return (
      <>
        <div className="mb-4">
          <h4 className="font-medium mb-1 text-danger">Churn Risk Factors:</h4>
          <p className="mb-2 text-sm">
            Incomplete onboarding and low platform usage are the strongest predictors of churn risk. 
            Customers with 2+ open support tickets are 3x more likely to churn.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-1 text-success">Up-sell Opportunity Factors:</h4>
          <p className="text-sm">
            High platform engagement, growing data volume (25%+), and consistent usage of advanced features 
            strongly correlate with up-sell readiness. These accounts show 80%+ acceptance of upgrade offers.
          </p>
        </div>
      </>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === 'churn' && 'Churn Risk Analysis'}
          {type === 'upsell' && 'Up-sell Opportunity Analysis'}
          {type === 'both' && 'Customer Insight Summary'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {type === 'churn' && getChurnInsight()}
        {type === 'upsell' && getUpSellInsight()}
        {type === 'both' && getBothInsights()}
      </CardContent>
    </Card>
  );
};

export default AnalyticsSummary;
