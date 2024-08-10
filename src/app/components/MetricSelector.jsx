import { useState } from 'react';
import { Card, Checkbox, Button } from '@tremor/react';

const MetricSelector = ({ availableMetrics, selectedMetrics, setSelectedMetrics }) => {
  const handleMetricChange = (metric) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  };

  return (
    <Card>
      <Text size="lg" weight="bold">Customize Metrics</Text>
      {availableMetrics.map((metric) => (
        <Checkbox
          key={metric}
          label={metric}
          checked={selectedMetrics.includes(metric)}
          onChange={() => handleMetricChange(metric)}
        />
      ))}
      <Button onClick={() => {/* Close Sidebar or Modal Logic */}}>Save Changes</Button>
    </Card>
  );
};

export default MetricSelector;
