import React from 'react';
import CustomCard from '../ui/card/Card';
import { Col, Row, Typography } from 'antd';
import CustomLoader from '../ui/loader/Loader';

interface FuncProps {
  result: any;
  loading: boolean;
}

const ConvertedResult: React.FC<FuncProps> = ({ result, loading }) => {
  const { amount, selectedCoin, selectedCurrency, exchangeRate } = result;
  return (
    <CustomCard title="Result">
      <Row justify="center">
        <Col>
          <Typography.Title level={1} style={{ fontSize: '30px' }}>
            {amount.toLocaleString()}
            <Typography.Text style={{ paddingLeft: '5px' }}>({selectedCoin?.symbol})</Typography.Text>
            {/*  <Image src={selectedCoin?.large || selectedCoin?.thumb} width={24} height={24} alt="coin_img" /> */}
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title level={4} style={{ padding: '0px 20px' }}>
            =
          </Typography.Title>
        </Col>
        <Col>
          <Typography.Title level={1} style={{ fontSize: '30px' }} type="success">
            {loading ? <CustomLoader /> : exchangeRate?.toLocaleString()}
            <Typography.Text style={{ paddingLeft: '5px' }}>({selectedCurrency?.unit})</Typography.Text>
          </Typography.Title>
        </Col>
      </Row>
    </CustomCard>
  );
};

export default ConvertedResult;
