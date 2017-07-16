import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';

const Create = props => {
    return (
        <Row>
            <Col md={8}>
                <div className="card card-accent-primary">
                    <div className="card-header">
                        Create a user
                    </div>
                    <div className="card-block">
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" className="form-control" id="firstname" placeholder="Enter first name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" className="form-control" id="lastname" placeholder="Enter last name"/>
                        </div>
                    </div>
                    <div className="card-footer">      
                        <LinkContainer to="/users">
                            <Button bsStyle="primary" bsSize="sm"><i className="fa fa-save"></i> Save</Button>
                        </LinkContainer>
                        <LinkContainer to="/users">
                            <Button>Cancel</Button>
                        </LinkContainer>
                    </div>
                </div>
            </Col>
            <Col md={4}>
                <div className="card card-accent-info">
                    <div className="card-header">
                        Info
                    </div>
                    <div className="card-block">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                        euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                        aliquip ex ea commodo consequat.
                    </div>
                </div>
            </Col>
        </Row>
    );
};

Create.propTypes = {};

export default Create;