"use client";
import React, { useEffect, useState } from 'react';
import { Card, Text, Table, LineChart, Grid, Metric, TextInput } from '@tremor/react'; // Import Tremor components
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const NoticesList = () => {
  console.log('NoticesList component rendered');
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotices = notices.filter((notice) => 
    notice.item_awardedSupplier.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    console.log('Fetching notices...');
    fetch('http://localhost:5000/api/notices')
      .then(response => {
        console.log('Response received:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setNotices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-q">
      <Card className="mb-6">
        <TextInput
          icon={MagnifyingGlassIcon}
          placeholder="Search notices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md text-black bg-white"
        />
      </Card>
      
      <Grid numItems={1} numItemsSm={1} numItemsLg={2} className="gap-6">
        <Card>
          <Text>Total Awarded Value</Text>
          <Metric>£{notices.reduce((sum, notice) => sum + notice.item_awardedValue, 0).toLocaleString()}</Metric>
        </Card>
        <Card>
          <Text>Number of Notices</Text>
          <Metric>{notices.length}</Metric>
        </Card>
      </Grid>

      <Card className="mt-6">
        <Text size="lg" weight="bold">Notices</Text>
        <Table className="mt-4">
          <thead>
            <tr>
              <th>Awarded Supplier</th>
              <th>Published Date</th>
              <th>Awarded Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.map((notice, index) => (
              <tr key={`${notice.item_id}-${index}`} className="border border-gray-200">
                <td className="border border-gray-200 p-2">{notice.item_awardedSupplier}</td>
                <td className="border border-gray-200 p-2">{new Date(notice.item_publishedDate).toLocaleDateString()}</td>
                <td className="border border-gray-200 p-2">{notice.item_awardedValue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
  </div>
  );
};

export default NoticesList;
