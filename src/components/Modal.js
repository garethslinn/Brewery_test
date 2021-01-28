import React from 'react';
import moment from 'moment';

const Modal = (props) => {
    const { closeModal, details } = props;
    const item = details[0];
    const lastUpdated = moment(item.updated_at).format("DD-MM-YYYY h:mm:ss");
    return (
        <div data-testid="modal" className="modal fade show" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title" id="exampleModalLongTitle">
                        Last updated: <span data-id="lastUpdated">{ lastUpdated }</span>
                    </div>
                    <button onClick={ () => closeModal() }type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div className="modal-body">
                        {
                            <React.Fragment>
                                <div className="row">
                                    <div className="col">
                                        <h1 data-testid="name">{ item.name }</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>Brewery type:</strong> <span data-testid="type">{ item.brewery_type }</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>Street:</strong> <span data-testid="street">{ item.street }</span>
                                    </div>
                                    <div className="col">
                                        <strong>City:</strong> <span data-testid="city">{ item.city }</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>State:</strong> <span data-testid="state">{ item.state }</span>
                                    </div>
                                    <div className="col">
                                        <strong>Country:</strong> <span data-testid="country">{ item.country }</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>Postal Code:</strong> <span data-testid="postcode">{ item.postal_code }</span>
                                    </div>
                                    <div className="col">
                                        <strong>Phone:</strong> <span data-testid="phone">{ item.phone }</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>Website</strong> <span data-testid="url"><a href={ item.website_url }>{ item.website_url }</a></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>Latitude:</strong> <span data-testid="latitude">{ item.latitude }</span>
                                    </div>
                                    <div className="col">
                                        <strong>Longitude:</strong> <span data-testid="longitude">{ item.longitude }</span>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;