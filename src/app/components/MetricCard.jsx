import React from 'react';
import { Card, Text, Metric } from '@tremor/react';

const MetricCard = ({ title, value }) => {
  return (
    <Card>
      <Text>{title}</Text>
      <Metric>£{value.toLocaleString()}</Metric>
    </Card>
  );
};

export default MetricCard;
