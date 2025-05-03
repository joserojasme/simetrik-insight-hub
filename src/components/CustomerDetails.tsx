
import React from 'react';
import { Customer } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressBar from './ProgressBar';
import { Badge } from '@/components/ui/badge';

interface CustomerDetailsProps {
  customer: Customer;
  type: 'churn' | 'upsell';
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, type }) => {
  const score = type === 'churn' ? customer.churnScore : customer.upSellScore;
  const getScoreColor = () => {
    if (type === 'churn') {
      return score >= 80 ? "bg-danger" : score >= 50 ? "bg-warning" : "bg-success";
    } else {
      return score >= 80 ? "bg-success" : score >= 50 ? "bg-warning" : "bg-danger";
    }
  };

  const getAIExplanation = () => {
    if (type === 'churn') {
      if (customer.churnScore > 70) {
        const reasons = [];
        
        if (!customer.userFlow.onboardingCompleted) {
          reasons.push("not completing onboarding");
        }
        
        if (customer.behavior.weeklyUsage < 3) {
          reasons.push(`low usage (${customer.behavior.weeklyUsage} sessions per week)`);
        }
        
        if (customer.support.openTickets > 0) {
          reasons.push(`${customer.support.openTickets} open support tickets`);
        }
        
        if (customer.userFlow.usagePatternChanges === 'decreasing') {
          reasons.push("decreasing usage patterns");
        }
        
        if (reasons.length === 0) {
          return null;
        }
        
        return (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mt-4">
            <p className="text-sm">
              <span className="font-medium">AI Insight:</span> This customer has a {customer.churnScore}% risk of churn due to {reasons.join(', ')}.
              {customer.support.repeatedIssues && " There are also repeated support issues that should be addressed."}
            </p>
          </div>
        );
      }
    } else {
      if (customer.upSellScore > 70) {
        const reasons = [];
        
        if (customer.behavior.weeklyUsage > 10) {
          reasons.push("high platform usage");
        }
        
        if (customer.additionalData.dataGrowthRate > 30) {
          reasons.push(`${customer.additionalData.dataGrowthRate}% data growth rate`);
        }
        
        if (customer.behavior.keyFeaturesUsed.length > 2) {
          reasons.push("advanced feature adoption");
        }
        
        if (reasons.length === 0) {
          return null;
        }
        
        return (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mt-4">
            <p className="text-sm">
              <span className="font-medium">AI Insight:</span> This customer has an {customer.upSellScore}% up-sell potential due to {reasons.join(', ')}.
              {customer.userFlow.usagePatternChanges === 'increasing' && " Their usage is also increasing, suggesting growing platform adoption."}
            </p>
          </div>
        );
      }
    }
    
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{type === 'churn' ? 'Churn Risk Score' : 'Up-sell Potential'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold">{score}%</span>
            <span className="text-gray-500 text-sm">
              {type === 'churn' 
                ? (score >= 80 ? "High Risk" : score >= 50 ? "Medium Risk" : "Low Risk")
                : (score >= 80 ? "High Potential" : score >= 50 ? "Medium Potential" : "Low Potential")
              }
            </span>
          </div>
          <ProgressBar 
            value={score} 
            colorClass={getScoreColor()} 
            height="h-3" 
          />
          
          {/* Reasons as badges */}
          <div className="mt-4">
            {(type === 'churn' ? customer.churnReasons : customer.upSellReasons).map((reason, idx) => (
              <Badge 
                key={idx}
                variant={type === 'churn' ? 'destructive' : 'default'}
                className={`mr-2 mb-2 ${type === 'churn' ? 'bg-danger/90' : 'bg-success/90'}`}
              >
                {reason}
              </Badge>
            ))}
          </div>
          
          {/* AI explanation */}
          {getAIExplanation()}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">User Behavior</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <div className="col-span-2 py-2 border-b border-gray-100">
              <dt className="text-gray-500">Weekly Usage</dt>
              <dd className="font-medium">{customer.behavior.weeklyUsage} sessions</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Avg Session Time</dt>
              <dd className="font-medium">{customer.behavior.avgSessionTime} minutes</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Reconciliations</dt>
              <dd className="font-medium">{customer.behavior.reconciliationsCompleted}</dd>
            </div>
            <div className="col-span-2 py-2 border-b border-gray-100">
              <dt className="text-gray-500">Key Features</dt>
              <dd className="font-medium flex flex-wrap gap-1 mt-1">
                {customer.behavior.keyFeaturesUsed.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="bg-gray-50">
                    {feature}
                  </Badge>
                ))}
              </dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">CSM Interaction</dt>
              <dd className="font-medium">{customer.engagement.csmInteraction}/10</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Campaign Participation</dt>
              <dd className="font-medium">{customer.engagement.campaignParticipation ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Support & Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Open Tickets</dt>
              <dd className="font-medium">{customer.support.openTickets}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Closed Tickets</dt>
              <dd className="font-medium">{customer.support.closedTickets}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Avg Response Time</dt>
              <dd className="font-medium">{customer.support.avgResponseTime} hours</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Repeated Issues</dt>
              <dd className="font-medium">{customer.support.repeatedIssues ? 'Yes' : 'No'}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Current Plan</dt>
              <dd className="font-medium">{customer.billing.currentPlan}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Payment History</dt>
              <dd className="font-medium capitalize">{customer.billing.paymentHistory}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Usage & Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Onboarding Status</dt>
              <dd className="font-medium">{customer.userFlow.onboardingCompleted ? 'Completed' : 'Incomplete'}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Usage Pattern</dt>
              <dd className="font-medium capitalize">{customer.userFlow.usagePatternChanges}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Core Feature Usage</dt>
              <dd className="font-medium capitalize">{customer.userFlow.coreFeatureUsage}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Monthly Transactions</dt>
              <dd className="font-medium">{customer.additionalData.monthlyTransactionVolume.toLocaleString()}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">GB Consumed Monthly</dt>
              <dd className="font-medium">{customer.additionalData.gigasConsumedMonthly}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Data Growth Rate</dt>
              <dd className="font-medium">{customer.additionalData.dataGrowthRate}%</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetails;
