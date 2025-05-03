
import React from 'react';
import { Customer } from '@/data/mockData';
import ProgressBar from './ProgressBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
  type: 'churn' | 'upsell';
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, type }) => {
  const score = type === 'churn' ? customer.churnScore : customer.upSellScore;
  const reasons = type === 'churn' ? customer.churnReasons : customer.upSellReasons;
  
  const getScoreColor = () => {
    if (type === 'churn') {
      return score >= 80 ? "bg-danger" : score >= 50 ? "bg-warning" : "bg-success";
    } else {
      return score >= 80 ? "bg-success" : score >= 50 ? "bg-warning" : "bg-danger";
    }
  };

  const getScoreText = () => {
    if (type === 'churn') {
      if (score >= 80) return "High Risk";
      if (score >= 50) return "Medium Risk";
      return "Low Risk";
    } else {
      if (score >= 80) return "High Potential";
      if (score >= 50) return "Medium Potential";
      return "Low Potential";
    }
  };

  const getActionButton = () => {
    if (type === 'churn') {
      if (score >= 70) {
        return (
          <Button variant="destructive" className="w-full mt-4" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Schedule Retention Call
          </Button>
        );
      } else if (score >= 40) {
        return (
          <Button variant="outline" className="w-full mt-4" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Send Check-in Email
          </Button>
        );
      }
    } else {
      if (score >= 70) {
        return (
          <Button variant="default" className="w-full mt-4 bg-success" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Schedule Up-sell Call
          </Button>
        );
      } else if (score >= 40) {
        return (
          <Button variant="outline" className="w-full mt-4 text-success border-success hover:bg-success/10" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Send Product Update
          </Button>
        );
      }
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-lg text-gray-900">{customer.name}</h3>
          <p className="text-gray-500 text-sm">{customer.company}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-500">{type === 'churn' ? 'Risk' : 'Potential'}</span>
          <span className="text-2xl font-bold">{score}%</span>
        </div>
      </div>
      
      <ProgressBar 
        value={score} 
        colorClass={getScoreColor()} 
        height="h-2.5" 
        animated={score >= 80}
      />
      
      <div className="mt-3">
        <p className="text-sm text-gray-500">{getScoreText()}</p>
      </div>
      
      {reasons.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {reasons.map((reason, index) => (
              <Badge 
                key={index} 
                variant={type === 'churn' ? 'destructive' : 'default'}
                className={type === 'churn' ? 'bg-danger/90' : 'bg-success/90'}
              >
                {reason}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="block text-gray-500">Weekly Usage</span>
          <span className="font-medium">{customer.behavior.weeklyUsage} sessions</span>
        </div>
        <div>
          <span className="block text-gray-500">Onboarding</span>
          <span className="font-medium">{customer.userFlow.onboardingCompleted ? 'Completed' : 'Incomplete'}</span>
        </div>
        <div>
          <span className="block text-gray-500">Support</span>
          <span className="font-medium">{customer.support.openTickets} open tickets</span>
        </div>
        <div>
          <span className="block text-gray-500">Engagement</span>
          <span className="font-medium">{customer.engagement.csmInteraction}/10</span>
        </div>
      </div>
      
      {getActionButton()}
    </div>
  );
};

export default CustomerCard;
