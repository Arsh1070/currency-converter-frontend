import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface FuncProps {
  fullScreen?: boolean;
}

const CustomLoader: React.FC<FuncProps> = ({ fullScreen }) => (
  <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: fullScreen ? '60px' : '24px' }} spin />} />
);

export default CustomLoader;
