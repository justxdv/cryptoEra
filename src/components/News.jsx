import React from 'react';
import { Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import newsLogo from '../assets/crypto-news-img.png'
import newsSourceLogo from '../assets/CoinDesk.png'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const {Text, Title} = Typography;

const News = () => {
  const { data: cryptoNews } = useGetCryptoNewsQuery()
  // console.log(cryptoNews);

  if(!cryptoNews) return <Skeleton count={2}/>;

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel='noreferrer'>
              <div className="news-image-container">
                <Title className='news-title' level={4}>{news.title}</Title>
                <img className='img' src={newsLogo} alt='news'/>
              </div>
              <p>
                {news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={newsSourceLogo} />
                  <Text className='provider-name'>CoinDesk</Text>
                </div>
                  <Text>{moment(news.date).startOf('ss').fromNow()} | {(news.date).substring(0, 12)}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News