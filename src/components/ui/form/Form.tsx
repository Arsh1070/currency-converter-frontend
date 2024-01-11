import React, { useState } from 'react';
import { Button, Col, Form, Image, InputNumber, Row, Select, Space } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { useEffectOnce } from '../../../hooks/useEffectOnce';
import { getCoinsList, getConvertedResult } from '../../../api/Apis';
import { useDebounce } from '../../../hooks/useDebounce';
import CustomNotification from '../notification/Notification';
import CustomCard from '../card/Card';
import ConvertedResult from '../../result/ConvertedResult';
import { CURRENCIES_LIST, DEFAULT_CURRENCY } from '../../../dummy/Currencies';
import { convertedResult } from '../../../common/FormTypes';

const { Option } = Select;
const DEFAULT_COIN_LIST_SIZE = 30;

const DEFAULT_PARAMS = { amount: 1, coinId: 'bitcoin', targetCurrency: 'usd' };

const CustomForm: React.FC = () => {
  const [coinsList, setCoinsList] = useState([]);
  const [convertedResult, setConvertedResult] = useState<convertedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [convertLoading, setConvertLoading] = useState(false);

  const onCoinSearch = (value: string | undefined): void => {
    if (value !== '' && value?.length) {
      setLoading(true);
      getCoinsList(value)
        .then((res) => {
          if (res?.status === 200 && res?.data) {
            setCoinsList(res?.data?.coins);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          CustomNotification.error(err?.message);
        });
    } else {
      getCoinsList()
        .then((res) => {
          if (res?.status === 200 && res?.data) {
            setCoinsList(res?.data?.coins?.slice(0, DEFAULT_COIN_LIST_SIZE));
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          CustomNotification.error(err?.message);
        });
    }
  };

  const debouncedSearch = useDebounce(onCoinSearch, 500);

  const onFinish = (values: any) => {
    const { amount, coinId, targetCurrency } = values;
    if (values) {
      setConvertLoading(true);
      getConvertedResult(values)
        .then((res) => {
          if (res?.status === 200 && res?.data) {
            const selectedCurrency = CURRENCIES_LIST?.find((currency) => currency.id === targetCurrency);
            const selectedCoin = coinsList?.find((coin: any) => coin.id === coinId);
            const finalResult: convertedResult = {
              selectedCurrency,
              selectedCoin,
              amount: amount,
              exchangeRate: res?.data?.exchangeRate,
            };
            setConvertedResult(finalResult);
            setConvertLoading(false);
          }
        })
        .catch((err) => {
          setConvertLoading(false);
          CustomNotification.error(err?.message);
        });
    }
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) => {
    return (
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) ||
      (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
    );
  };

  const renderOptions = (optionType: string, optionListItems: any[]) => {
    if (optionType === 'coins') {
      return optionListItems.map((coin: any) => (
        <Option key={coin?.id} value={coin?.id} label={coin?.name}>
          <Row gutter={[8, 24]} align="middle">
            <Col>
              <Image src={coin?.large || coin?.thumb} width={24} height={24} alt="coin_img" loading="lazy" />
            </Col>
            <Col>
              <span style={{ fontWeight: 600 }}>{coin?.name}</span>
            </Col>
            <Col>
              <span style={{ color: '#808A9D' }}>({coin?.symbol})</span>
            </Col>
          </Row>
        </Option>
      ));
    }
    if (optionType === 'currencies') {
      return optionListItems.map((currency: any) => (
        <Option key={currency?.id} value={currency?.id} label={currency?.name}>
          <Row gutter={[8, 24]} align="middle">
            <Col>
              <span style={{ fontWeight: 600 }}>{currency?.name}</span>
            </Col>
            {currency?.id?.toLowerCase() === currency?.unit?.toLowerCase() ? (
              <Col>
                <span>({currency?.unit})</span>
              </Col>
            ) : (
              <>
                <Col>
                  <span>({currency?.id?.toUpperCase()})</span>
                </Col>
                <Col>
                  <span style={{ color: '#808A9D' }}>{currency?.unit}</span>
                </Col>
              </>
            )}
          </Row>
        </Option>
      ));
    }
  };

  useEffectOnce(() => {
    const { amount, coinId, targetCurrency } = DEFAULT_PARAMS;

    setLoading(true);
    getCoinsList()
      .then((res) => {
        if (res?.status === 200 && res?.data) {
          setCoinsList(res?.data?.coins?.slice(0, DEFAULT_COIN_LIST_SIZE));
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        CustomNotification.error(err?.message);
      });

    getConvertedResult(DEFAULT_PARAMS)
      .then((res) => {
        if (res?.status === 200 && res?.data) {
          const selectedCurrency = DEFAULT_CURRENCY.selectedCurrency;
          const selectedCoin = DEFAULT_CURRENCY.selectedCoin;
          const finalResult: convertedResult = {
            selectedCurrency,
            selectedCoin,
            amount: amount,
            exchangeRate: res?.data?.exchangeRate,
          };
          setConvertedResult(finalResult);
        }
      })
      .catch((err) => {
        CustomNotification.error(err?.message);
      });

    return () => console.log('my effect is destroying');
  });

  return (
    <>
      <CustomCard title="Cryptocurrency Converter Calculator">
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          // initialValues={{ remember: true }}
          initialValues={{ amount: 1, coinId: 'bitcoin', targetCurrency: 'usd' }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          className="Form"
        >
          <Form.Item
            label="Enter Amount"
            name="amount"
            rules={[{ required: true, message: 'Please enter your amount!' }]}
          >
            <InputNumber
              defaultValue={1.0}
              size={'large'}
              placeholder={'e.g 1.00'}
              controls={false}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="Select Coin"
            name="coinId"
            rules={[{ required: true, message: 'Please select your coin!' }]}
            style={{ textAlign: 'left' }}
          >
            <Select
              showSearch
              defaultValue={'bitcoin'}
              loading={loading}
              optionFilterProp="children"
              onSearch={debouncedSearch}
              filterOption={filterOption}
              size="large"
              placeholder={'e.g Bitcoin'}
            >
              {coinsList && coinsList.length && renderOptions('coins', coinsList)}
            </Select>
          </Form.Item>
          <Space>
            <SwapOutlined rotate={90} style={{ fontSize: '16px' }} />
          </Space>
          <Form.Item
            label="Select Currency"
            name="targetCurrency"
            rules={[{ required: true, message: 'Please select your currency!' }]}
            style={{ textAlign: 'left' }}
          >
            <Select
              showSearch
              defaultValue={'usd'}
              optionFilterProp="children"
              filterOption={filterOption}
              size="large"
              placeholder={'e.g INR'}
            >
              {CURRENCIES_LIST && CURRENCIES_LIST.length && renderOptions('currencies', CURRENCIES_LIST)}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" loading={convertLoading}>
              Convert
            </Button>
          </Form.Item>
        </Form>
      </CustomCard>

      {convertedResult && <ConvertedResult loading={convertLoading} result={convertedResult} />}
    </>
  );
};

export default CustomForm;
