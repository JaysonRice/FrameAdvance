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
import { ReviewPostContext } from "../../providers/ReviewPostProvider";

export default ({ comment, currentReviewPost, setReviewPost }) => {

    const { editComment, deleteComment, getReviewPost } = useContext(ReviewPostContext);
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const [formState, setformState] = useState();
    const [noteAdding, setNoteAdding] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    const updateComment = (e) => {
        e.preventDefault();
        setNoteAdding(false)
        editComment(formState.id, formState).then(() => {
            getReviewPost(currentReviewPost.id).then((rp) => setReviewPost(rp));
        });
    };

    useEffect(() => {
        setformState(comment);
    }, [comment]);

    const handleUserInput = (e) => {
        const updatedState = { ...formState };
        updatedState[e.target.id] = e.target.value;
        setformState(updatedState);
    };

    const commentDelete = () => {
        deleteComment(comment.id).then(() => {
            getReviewPost(currentReviewPost.id).then((rp) => setReviewPost(rp)).then(toggleModal);
        });
    };

    const inputContent = () => {
        return (
            <div className="buttonContainer">
                <Form onSubmit={updateComment}>
                    <FormGroup>
                        <Label for="content">Notes:</Label>
                        <Input
                            id="content"
                            type="textarea"
                            rows="4"
                            defaultValue={comment.content}
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

            <Card className="singleCommentContainer">
                <CardBody color="info" >

                    <div className="singleCommentDetails">

                        {comment.content}

                        {/* If the user owns the post, they should be able to delete comments, but not edit them. */}

                        {
                            noteAdding === false && currentReviewPost.userProfileId === userProfileId && comment.userProfileId !== userProfileId

                                ? <div className="commentNotes">
                                    <Button outline color="danger" onClick={toggleModal}>X</Button>
                                </div>
                                : ""
                        }
                        {/* If the user owns the comment, they should be able to edit or delete it */}
                        {
                            comment.userProfileId === userProfileId

                                ?
                                <div className="commentButtons">
                                    <Button color="info" outline onClick={() => { setNoteAdding(true) }}>Edit</Button>
                                    <Button color="danger" outline onClick={toggleModal}>X</Button>
                                </div>
                                : ""
                        }

                        {
                            noteAdding === true
                                ? inputContent()
                                : ""
                        }

                    </div>
                </CardBody>
            </Card>

            <Modal isOpen={showModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    Delete this comment?
                    </ModalHeader>
                <ModalBody>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    <Button color="danger" type="submit" onClick={commentDelete}>Delete</Button>
                </ModalBody>
            </Modal>

        </>
    );
}