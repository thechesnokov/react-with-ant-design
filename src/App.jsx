import React from 'react';
import './App.scss';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {Skeleton, Switch, Card, Col, Row} from 'antd';

const {Meta} = Card;

let url = 'https://api.punkapi.com/v2/beers';

export default class App extends React.Component {
    state = {
        loading: true,
        data: [1, 2, 3, 4, 5, 6]
    };

    onChange = checked => {
        this.setState({loading: !checked});
    };

    componentDidMount() {
        axios.get(url).then(response => {
            const data = response.data;
            setTimeout(() => {
                this.setState({data, loading: false})
            }, 2000)
        })
    }

    render() {
        const {loading} = this.state;

        return (
            <>
                <Layout style={{padding: "0 20px"}}>
                    <Switch checked={!loading} onChange={this.onChange} style={{width: "44px", margin: "20px"}}/>
                    <Row type="flex" gutter={[20, 20]}>
                        {
                            this.state.data.map(item =>
                                <Col span={4}>
                                    <Card
                                        loading={loading}
                                        hoverable
                                        cover={<img alt="beer"
                                                    src={item.image_url}
                                                    style={{height: "150px", width: "auto", margin: "20px auto 0"}}
                                        />}
                                    >
                                        <Meta title={item.name} description={item.description}/>
                                    </Card>
                                </Col>)
                        }
                    </Row>
                </Layout>
            </>
        )
    }
}
