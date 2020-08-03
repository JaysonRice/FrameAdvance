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

    // Logic for reurning the dates in a more readable format
    let formatedDate = null;
    let unformatedDate = null;

    if (comment.createDateTime != null) {
        unformatedDate = comment.createDateTime.split("T")[0];
        const [year, month, day] = unformatedDate.split("-");
        formatedDate = month + "/" + day + "/" + year;
    }

    return (
        <>

            <Card className="singleCommentContainer">
                <CardBody color="info" >


                    {/* If the user owns the post, they should be able to delete comments, but not edit them. */}
                    {
                        noteAdding === false && currentReviewPost.userProfileId === userProfileId && comment.userProfileId !== userProfileId

                            ? <div className="commentButtonContainer">
                                <Button className="commentButton" outline color="danger" onClick={toggleModal}>X</Button>
                            </div>
                            : ""
                    }
                    {/* If the user owns the comment, they should be able to edit or delete it */}
                    {
                        comment.userProfileId === userProfileId

                            ?
                            <div className="commentButtonContainer">

                                <Button className="commentButton" color="info" outline onClick={() => { setNoteAdding(true) }}>Edit</Button>
                                <Button className="commentButton" color="danger" outline onClick={toggleModal}>X</Button>

                            </div>
                            : ""
                    }
                    {
                        noteAdding === false
                            ? < div className="singleCommentDetails">
                                <div>{comment.content}</div>
                                <small>Posted by: {comment.userProfile.username} on {formatedDate}</small>
                            </div>
                            : ""
                    }
                    {
                        noteAdding === true
                            ? inputContent()
                            : ""
                    }


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