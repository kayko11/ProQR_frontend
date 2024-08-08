import React, { useEffect, useState } from 'react';
import { Card, Text, Table } from '@tremor/react'; // Import Tremor components

const NoticesList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/notices')
      .then(response => response.json())
      .then(data => {
        setNotices(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card>
      <Text size="lg" weight="bold">Notices</Text>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {notices.map(notice => (
            <tr key={notice.item_id}>
              <td>{notice.item_title}</td>
              <td>{notice.item_description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default NoticesList;
