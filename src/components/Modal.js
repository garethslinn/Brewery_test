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
                        Last updated: { lastUpdated }
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
                                        <h1>{ item.name }</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>Brewery type:</strong> { item.brewery_type }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>Street:</strong> { item.street }
                                    </div>
                                    <div className="col">
                                        <strong>City:</strong> { item.city }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>State:</strong> { item.state }
                                    </div>
                                    <div className="col">
                                        <strong>Country:</strong> { item.country }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>Postal Code:</strong> { item.postal_code }
                                    </div>
                                    <div className="col">
                                        <strong>Phone:</strong> { item.phone }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>Website</strong> <a href={ item.website_url }>{ item.website_url }</a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>Latitude:</strong> { item.latitude }
                                    </div>
                                    <div className="col">
                                        <strong>Longitude:</strong> { item.longitude }
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