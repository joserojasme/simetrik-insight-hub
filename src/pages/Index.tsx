
import React from 'react';
import Layout from '../components/Layout';
import StatusCircle from '../components/StatusCircle';
import AnalyticsSummary from '../components/AnalyticsSummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  getChurnRiskTotal, 
  getUpSellTotal,
  getAverageChurnRisk,
  getAverageUpSellPotential
} from '../data/mockData';

const Index = () => {
  const churnCount = getChurnRiskTotal();
  const upSellCount = getUpSellTotal();
  const avgChurnRisk = getAverageChurnRisk();
  const avgUpSellPotential = getAverageUpSellPotential();

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customer Insight Dashboard</h1>
        <p className="text-gray-600">Monitor customer health and growth opportunities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Risk & Opportunity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-around items-center py-6 gap-8">
              <StatusCircle
                title="Churn Risk"
                count={churnCount}
                percentage={avgChurnRisk}
                colorClass="bg-danger"
                hoverColorClass="bg-danger/90"
                link="/churn"
              />
              <StatusCircle
                title="Up-sell Potential"
                count={upSellCount}
                percentage={avgUpSellPotential}
                colorClass="bg-success"
                hoverColorClass="bg-success/90"
                link="/upsell"
              />
            </div>
          </CardContent>
        </Card>

        <AnalyticsSummary type="both" />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>About Simetrik Insight Hub</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Simetrik Insight Hub provides data-driven predictions for your customer base,
              helping you identify both churn risks and growth opportunities before they materialize.
            </p>
            <p className="text-gray-600">
              Our predictive model analyzes user behavior, engagement metrics, support history,
              billing patterns, and feature adoption to generate actionable insights for your team.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
