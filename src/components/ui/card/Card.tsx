import React from 'react';
import { Card } from 'antd';

interface FuncProp {
  children: React.ReactNode;
  title: string;
}

const CustomCard: React.FC<FuncProp> = ({ children, title }) => (
  <Card title={title} className="Card">
    {children}
  </Card>
);

export default CustomCard;
