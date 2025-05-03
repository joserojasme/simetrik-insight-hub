
import React, { useState } from 'react';
import Layout from '../components/Layout';
import CustomerCard from '../components/CustomerCard';
import CustomerDetails from '../components/CustomerDetails';
import AnalyticsSummary from '../components/AnalyticsSummary';
import { getUpSellCustomers } from '../data/mockData';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const UpSellPage = () => {
  const upSellCustomers = getUpSellCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('highest');
  
  const filteredCustomers = upSellCustomers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'highest') {
        return b.upSellScore - a.upSellScore;
      } else {
        return a.upSellScore - b.upSellScore;
      }
    });

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Up-sell Opportunity Analysis</h1>
          <p className="text-gray-600">
            {upSellCustomers.length} customers identified with significant up-sell potential
          </p>
        </div>
        <Button onClick={() => window.history.back()} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="w-full md:w-2/3">
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-1/3">
              <Select
                value={sortOrder}
                onValueChange={(value) => setSortOrder(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by potential" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highest">Highest Potential First</SelectItem>
                  <SelectItem value="lowest">Lowest Potential First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} onClick={() => setSelectedCustomer(customer)} className="cursor-pointer">
                <CustomerCard customer={customer} type="upsell" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <AnalyticsSummary type="upsell" />
        </div>
      </div>

      {selectedCustomer && (
        <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
          <DialogContent className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">{selectedCustomer.name}</h2>
            <p className="text-gray-500 mb-6">{selectedCustomer.company}</p>
            <CustomerDetails customer={selectedCustomer} type="upsell" />
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default UpSellPage;
