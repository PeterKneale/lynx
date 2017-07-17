import React, {Component} from 'react';
import {Row, Col, Panel} from 'react-bootstrap'

class Cards extends Component {
  render() {
    return (
      <Row>
        <Col md="4">
          <Panel>
            Basic panel example
          </Panel>
        </Col>
        <Col md="4">
          <Panel>
            Basic panel example
          </Panel>
        </Col>
        <Col md="4">
          <Panel>
            Basic panel example
          </Panel>
        </Col>
      </Row>
    )
  }
}

export default Cards;