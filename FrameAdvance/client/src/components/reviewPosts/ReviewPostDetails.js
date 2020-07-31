import React, { useEffect, useContext, useState } from "react";
import {
    Button, CardBody, Form, FormGroup,
    Input, Label, ListGroup, ListGroupItem,
    CardImg, Modal, ModalHeader, ModalBody,
} from "reactstrap";
import "../css/PostDetails.css"
import { useParams, useHistory, Link } from "react-router-dom";
import { ReviewPostContext } from "../../providers/ReviewPostProvider";
import { GameContext } from "../../providers/GameProvider";
import ReactPlayer from "react-player";

const ReviewPostDetails = () => {
    const [reviewPost, setReviewPost] = useState();
    const { getReviewPost, deleteReviewPostById, editReviewPost, addTimestamp } = useContext(ReviewPostContext);
    const { games } = useContext(GameContext);

    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const { id } = useParams();

    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    // Form state for editing a post
    const [formState, setformState] = useState({ userProfileId: +userProfileId });

    const handleUserInput = (e) => {
        const updatedState = { ...formState };
        updatedState[e.target.id] = e.target.value;
        setformState(updatedState);
    };

    // Form state for selecting a timestamp 
    const [timestampFormState, setTimestampFormState] = useState();

    const handleTimestampUserInput = (e) => {
        const updatedState = { ...timestampFormState };
        updatedState[e.target.id] = e.target.value;
        const seconds = (convertedHours * 3600) + (convertedMinutes * 60) + (convertedSeconds)
        console.log(seconds)
        debugger
        setTimestampFormState(seconds);
    };

    const saveTimestamp = (e) => {
        e.preventDefault();
        // Not implemented yet
        addTimestamp(timestampFormState).then((p) => {
            history.push(`/reviewpost/${p.id}`);
        });
    };

    // Use this hook to allow us to programatically redirect users
    const history = useHistory();

    useEffect(() => {
        getReviewPost(id).then(setReviewPost);
    }, []);

    useEffect(() => {
        setformState(reviewPost);
    }, [reviewPost]);

    if (!reviewPost) {
        return null;
    }

    const deletePost = (e) => {
        e.preventDefault();

        deleteReviewPostById(reviewPost.id).then((p) => {
            history.push("/");
        });
    };

    const updatePost = (e) => {
        e.preventDefault();
        formState.private = false
        formState.gameId = +formState.gameId;
        editReviewPost(formState.id, formState).then(() => {
            getReviewPost(formState.id).then(setReviewPost).then(toggleModal);
        });
    };

    const formButtonContainer = () => {
        return (
            <div className="buttonContainer">
                <Button color="info" type="submit">
                    EDIT POST
        </Button>
                <Button color="warning" onClick={toggleModal}>
                    CANCEL EDIT
        </Button>{" "}
            </div>
        );
    };


    let formatedDate = null;
    let unformatedDate = null;

    if (reviewPost.createDateTime != null) {
        unformatedDate = reviewPost.createDateTime.split("T")[0];
        const [year, month, day] = unformatedDate.split("-");
        formatedDate = month + "/" + day + "/" + year;
    }

    return (
        <div className="postDetailsContainer">

            <div className="postDetailsHeader">

                <strong>Posted By:
                <Link to={`/user/${reviewPost.userProfile.id}`}>
                        {reviewPost.userProfile.username}
                    </Link>
                </strong>

                <h2>{reviewPost.title}</h2>

                <small>Posted on: {formatedDate}</small>

            </div>

            <div className="postDetailsYoutubeLink">
                <div className="embeddedVideo">
                    <ReactPlayer
                        url={reviewPost.videoLocation}
                        controls="true"
                    />
                </div>

                <div className="timestampCreation">
                    <Form onSubmit={saveTimestamp}>
                        <div className="timestampInput">
                            <div>
                                <Label for="hours">Hours</Label>
                                <Input id="hours" type="number" ref={hours} onChange={handleTimestampUserInput} />
                            </div>
                            <div>
                                <Label for="minutes">Minutes</Label>
                                <Input id="minutes" type="number" max="59" ref={minutes} onChange={handleTimestampUserInput} />
                            </div>
                            <div>
                                <Label for="hours">Seconds</Label>
                                <Input id="seconds" type="number" ref={seconds} onChange={handleTimestampUserInput} />
                            </div>
                        </div>
                        <Button color="info" type="submit">
                            Create Timestamp
                </Button>
                    </Form>
                </div>


                {/* Put the timestamp input stuff here */}
            </div>

            {/* 
            {reviewPost.userProfile.id === userProfileId ? (
                    <ListGroupItem>
                        <Link to={`/AddCharacter/post/${reviewPost.id}`}>
                            <h6>Add Character</h6>
                        </Link>
                    </ListGroupItem>
                ) : (
                        ""
                    )} */}

            <div>
                <Modal isOpen={showModal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>
                        Edit post: {reviewPost.title}
                    </ModalHeader>
                    <ModalBody>
                        <CardBody>
                            <Form onSubmit={updatePost}>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input
                                        id="title"
                                        defaultValue={reviewPost.title}
                                        onChange={handleUserInput}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Game:</Label>
                                    <select id="gameId" required onChange={handleUserInput}>
                                        <option value=""> Choose Game</option>
                                        {games.map((g) => {
                                            return (
                                                <option key={g.id} value={g.id}>
                                                    {g.title}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </FormGroup>
                                {reviewPost.userProfileId === userProfileId
                                    ? formButtonContainer()
                                    : ""}
                            </Form>
                        </CardBody>
                    </ModalBody>
                </Modal>
            </div >
        </div >
    );
};
export default ReviewPostDetails;