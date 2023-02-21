import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Select, Space } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useGetExchangesQuery } from '../services/cryptoApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const { Option } = Select;

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const {data: cryptoList} = useGetCryptosQuery(100);
  const [search, setSearch] = useSearchParams({replace: true});
  const coinId = search.get('coinId');
  const { data, isFetching } = useGetExchangesQuery(coinId);
  const exchangesList = data?.data?.exchanges;
  if (isFetching) return <Skeleton count={2}/>;
 


  return (

    <>
    <Col span={24} align='center'>
      <Select style={{width: '200px'}} placeholder='Select a CryptoCurrency' onChange={(value) => {
    setSearch({coinId: value}); 
     }}>
        {cryptoList?.data?.coins.map((coin) => <Option value={coin.uuid} key={coin.uuid}>{coin.name}</Option>)}
      </Select>
    </Col>
    <Title level={2} align='center' style={{margin: '15px', fontWeight: 'bold', color: 'var(--green)'}}>
          Exchanges
        </Title>
     <Row style={{marginTop: '15px'}}>
        <Col style={{fontSize: '17px', fontWeight: 'bold'}} span={6}>Exchanges</Col>
        <Col style={{fontSize: '17px', fontWeight: 'bold'}} span={6}>24h Trade Volume</Col>
        <Col style={{fontSize: '17px', fontWeight: 'bold'}} span={6}>Markets</Col>
        <Col style={{fontSize: '17px', fontWeight: 'bold'}} span={6}>Change</Col>
      </Row>
      <Row style={{marginTop: '15px', padding: '1px'}}>
        {exchangesList.map((exchange) => (
          <Col span={24}>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid} style={{marginBottom: '10px'}}>
                    <Col span={6} >
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange['24hVolume'])}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.price)}%</Col>
                  </Row>
                  )}
              >
              </Panel>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;