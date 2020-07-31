import React, { useEffect, useContext, useState, useRef } from "react";
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

    // Creating the timestamp itself
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const saveTimestamp = (e) => {
        e.preventDefault();
        // Making sure we can't get a value that can't be multiplied
        let convertedSeconds = parseInt(seconds)
        let convertedMinutes = parseInt(minutes)
        let convertedHours = parseInt(hours)
        if (!convertedSeconds) { convertedSeconds = 0 }
        if (!convertedMinutes) { convertedMinutes = 0 }
        if (!convertedHours) { convertedHours = 0 }

        const time = (convertedHours * 3600) + (convertedMinutes * 60) + (convertedSeconds)
        debugger
        // Not implemented yet
        addTimestamp(time).then(getReviewPost(id).then(setReviewPost));
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
                                <Input id="hours" name="hours" type="number" onChange={(e) => setHours(e.target.value)} />
                            </div>
                            <div>
                                <fieldset>
                                    <Label for="minutes">Minutes</Label>
                                    <Input id="minutes" name="minutes" type="number" max="59" onChange={(e) => setMinutes(e.target.value)} />
                                </fieldset>
                            </div>
                            <div>
                                <Label for="seconds">Seconds</Label>
                                <Input id="seconds" name="seconds" type="number" onChange={(e) => setSeconds(e.target.value)} />
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