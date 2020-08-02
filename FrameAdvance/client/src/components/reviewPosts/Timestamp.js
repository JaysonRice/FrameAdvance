import React, { useState } from "react"
import {
    Card, CardBody,
    CardImg,
    Button
} from 'reactstrap';
import ReactPlayer from "react-player";

export default ({ timestamp, reviewPost }) => {

    return (
        <>

            <div className="reviewPost">
                <Card >
                    <CardBody body outline color="info" className="reviewPostBody">
                        <div className="timestampContainer">

                            <div className="embeddedTimestamp">
                                <ReactPlayer
                                    url={`${reviewPost.videoLocation}?t=${timestamp.time}`}
                                    controls="true"
                                />
                            </div>

                            <div className="timestampNoteContainer">

                                {
                                    timestamp.notes === null

                                        ? <Button color="primary">Add Notes</Button>
                                        : <div>{timestamp.notes}</div>
                                }

                            </div>

                            {/* <Modal isOpen={editModal} toggle={toggleEdit}>
                                <ModalHeader toggle={toggleEdit}>
                                    Edit {category.name}
                                </ModalHeader>
                                <ModalBody >
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="name"
                                            ref={name}
                                            required
                                            autoFocus
                                            className="form-control"
                                            defaultValue={category.name}
                                        />
                                        <div className="categoryModalBody">
                                            <button type="submit"
                                                onClick={
                                                    evt => {
                                                        evt.preventDefault() // Prevent browser from submitting the form
                                                        toggleEdit()
                                                    }
                                                }
                                                className="btn btn-secondary">
                                                Cancel
            </button>
                                            <button type="submit"
                                                onClick={
                                                    evt => {
                                                        evt.preventDefault() // Prevent browser from submitting the form
                                                        catUpdate()


                                                    }
                                                }
                                                className="btn btn-primary">
                                                Save Changes
            </button>
                                        </div>
                                    </div>
                                </ModalBody>
                            </Modal> */}

                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}