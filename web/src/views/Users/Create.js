import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

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
                        <button type="submit" className="btn btn-sm btn-primary"><i className="fa fa-save"></i> Save</button>
                        <button type="reset" className="btn btn-sm btn-danger"><i className="fa fa-ban"></i> Cancel</button>
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