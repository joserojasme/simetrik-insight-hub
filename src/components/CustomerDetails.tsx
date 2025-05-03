
import React from 'react';
import { Customer } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressBar from './ProgressBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, TrendingUp, TrendingDown } from 'lucide-react';

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

  const getTrendIndicator = (value: string | number, isPositive: boolean) => {
    // For churn, negative trends are bad, for upsell positive trends are good
    const isGood = type === 'churn' ? !isPositive : isPositive;
    
    return (
      <span className={`flex items-center ${isGood ? 'text-success' : 'text-danger'} text-xs font-medium ml-1`}>
        {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
        {value}
      </span>
    );
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

  const getActionButtons = () => {
    if (type === 'churn') {
      return (
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <Button variant="destructive" className="flex-1">
            <Phone className="mr-2 h-4 w-4" />
            Schedule Retention Call
          </Button>
          <Button variant="outline" className="flex-1">
            <Mail className="mr-2 h-4 w-4" />
            Send Check-in Email
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <Button className="flex-1 bg-success hover:bg-success/90">
            <Phone className="mr-2 h-4 w-4" />
            Schedule Up-sell Call
          </Button>
          <Button variant="outline" className="flex-1 text-success border-success hover:bg-success/10">
            <Mail className="mr-2 h-4 w-4" />
            Send Product Update
          </Button>
        </div>
      );
    }
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
            animated={score >= 80} 
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
          
          {/* Action buttons */}
          {getActionButtons()}
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
              <dd className="font-medium flex items-center">
                {customer.behavior.weeklyUsage} sessions
                {customer.userFlow.usagePatternChanges === 'increasing' && getTrendIndicator('+12%', true)}
                {customer.userFlow.usagePatternChanges === 'decreasing' && getTrendIndicator('-8%', false)}
              </dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Avg Session Time</dt>
              <dd className="font-medium flex items-center">
                {customer.behavior.avgSessionTime} minutes
                {customer.behavior.avgSessionTime > 15 && getTrendIndicator('+2min', true)}
              </dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Reconciliations</dt>
              <dd className="font-medium flex items-center">
                {customer.behavior.reconciliationsCompleted}
                {customer.behavior.reconciliationsCompleted > 50 && getTrendIndicator('+15%', true)}
              </dd>
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
              <dd className="font-medium flex items-center">
                {customer.engagement.csmInteraction}/10
                {customer.engagement.csmInteraction < 5 && getTrendIndicator('-2', false)}
              </dd>
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
              <dd className="font-medium flex items-center">
                {customer.support.openTickets}
                {customer.support.openTickets > 0 && getTrendIndicator('+1', false)}
              </dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Closed Tickets</dt>
              <dd className="font-medium">{customer.support.closedTickets}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Avg Response Time</dt>
              <dd className="font-medium flex items-center">
                {customer.support.avgResponseTime} hours
                {customer.support.avgResponseTime > 12 && getTrendIndicator('+2h', false)}
              </dd>
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
              <dd className="font-medium capitalize flex items-center">
                {customer.userFlow.usagePatternChanges}
                {customer.userFlow.usagePatternChanges === 'decreasing' && getTrendIndicator('-15%', false)}
                {customer.userFlow.usagePatternChanges === 'increasing' && getTrendIndicator('+18%', true)}
              </dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Core Feature Usage</dt>
              <dd className="font-medium capitalize">{customer.userFlow.coreFeatureUsage}</dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Monthly Transactions</dt>
              <dd className="font-medium flex items-center">
                {customer.additionalData.monthlyTransactionVolume.toLocaleString()}
                {customer.additionalData.dataGrowthRate > 20 && getTrendIndicator('+22%', true)}
              </dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">GB Consumed Monthly</dt>
              <dd className="font-medium flex items-center">
                {customer.additionalData.gigasConsumedMonthly}
                {customer.additionalData.dataGrowthRate > 15 && getTrendIndicator('+18%', true)}
              </dd>
            </div>
            <div className="py-2 border-b border-gray-100">
              <dt className="text-gray-500">Data Growth Rate</dt>
              <dd className="font-medium flex items-center">
                {customer.additionalData.dataGrowthRate}%
                {customer.additionalData.dataGrowthRate > 25 && getTrendIndicator('↑', true)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetails;
