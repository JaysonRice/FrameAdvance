import React, { useState, useContext, useEffect } from "react"
import {
    Card, CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import ReactPlayer from "react-player";
import { ReviewPostContext } from "../../providers/ReviewPostProvider";

export default ({ timestamp, currentReviewPost, setReviewPost }) => {

    const { editTimestamp, deleteTimestamp, getReviewPost } = useContext(ReviewPostContext);
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const [formState, setformState] = useState();
    const [noteAdding, setNoteAdding] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    const updateTimestamp = (e) => {
        e.preventDefault();
        formState.reviewPostId = currentReviewPost.id
        formState.time = timestamp.time
        setNoteAdding(false)
        editTimestamp(formState.id, formState).then(() => {
            getReviewPost(currentReviewPost.id).then((rp) => setReviewPost(rp));
        });
    };

    useEffect(() => {
        setformState(timestamp);
    }, [timestamp]);

    const handleUserInput = (e) => {
        const updatedState = { ...formState };
        updatedState[e.target.id] = e.target.value;
        setformState(updatedState);
    };

    const timestampDelete = () => {
        deleteTimestamp(timestamp.id).then(() => {
            getReviewPost(currentReviewPost.id).then((rp) => setReviewPost(rp)).then(toggleModal);
        });
    };

    const inputNotes = () => {
        return (
            <div className="buttonContainer">
                <Form onSubmit={updateTimestamp}>
                    <FormGroup>
                        <Label for="notes">Notes:</Label>
                        <Input
                            id="notes"
                            type="textarea"
                            rows="8"
                            defaultValue={timestamp.notes}
                            onChange={handleUserInput}
                        />
                    </FormGroup>
                    <Button color="primary" type="submit">
                        Save Note
                </Button>
                </Form>
            </div>
        );
    };



    return (
        <>

            <div className="timestampContainer">
                <Card >
                    <CardBody color="info" className="singleTimestampContainer">

                        <div className="singleTimestamp">

                            <ReactPlayer className="embeddedTimestamp"
                                url={`${currentReviewPost.videoLocation}?t=${timestamp.time}`}
                                controls={true}
                            />

                            <div className="timestampNoteContainer">
                                {
                                    timestamp.notes === null && noteAdding === false && currentReviewPost.userProfileId === userProfileId

                                        ? <Button color="primary" onClick={() => { setNoteAdding(true) }}>Add Notes</Button>
                                        : ""
                                }

                                {
                                    timestamp.notes !== null && noteAdding === false && currentReviewPost.userProfileId === userProfileId

                                        ? <div className="timestampNotes">
                                            <Card >
                                                <p>{timestamp.notes}</p>
                                            </Card>
                                            <Button color="primary" onClick={() => { setNoteAdding(true) }}>Edit Notes</Button>
                                        </div>
                                        : ""
                                }

                                {
                                    noteAdding === true
                                        ? inputNotes()
                                        : ""
                                }


                            </div>
                            {
                                currentReviewPost.userProfile.id === userProfileId

                                    ? <div> <Button color="danger" onClick={toggleModal} outline>X</Button></div>
                                    : ""
                            }

                        </div>
                    </CardBody>
                </Card>

                <Modal isOpen={showModal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>
                        Delete this timestamp and all its notes?
                    </ModalHeader>
                    <ModalBody>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        <Button color="danger" type="submit" onClick={timestampDelete}>Delete</Button>
                    </ModalBody>
                </Modal>

            </div>
        </>
    );
}