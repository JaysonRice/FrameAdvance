import React, { useEffect, useContext, useState } from "react";
import {
    Button, CardBody, Form, FormGroup,
    Input, Label, Modal, ModalHeader, ModalBody,
} from "reactstrap";
import "../css/PostDetails.css"
import "../css/Timestamp.css"
import "../css/Comments.css"
import { useParams, useHistory, Link } from "react-router-dom";
import { ReviewPostContext } from "../../providers/ReviewPostProvider";
import { GameContext } from "../../providers/GameProvider";
import ReactPlayer from "react-player";
import Timestamp from "./Timestamp"
import Comment from "./Comment"

const ReviewPostDetails = () => {
    const [reviewPost, setReviewPost] = useState();
    const { getReviewPost, deleteReviewPostById, editReviewPost, addTimestamp, addComment } = useContext(ReviewPostContext);
    const { games, getAllGames } = useContext(GameContext);

    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const { id } = useParams();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    const [showDeleteModal, setDeleteShowModal] = useState(false);
    const toggleDelete = () => setDeleteShowModal(!showDeleteModal);

    const [commentAdding, setCommentAdding] = useState(false);
    const [content, setContent] = useState("");

    // Form state for editing a post
    const [formState, setformState] = useState();

    const handleUserInput = (e) => {
        const updatedState = { ...formState };
        updatedState[e.target.id] = e.target.value;
        setformState(updatedState);
    };

    useEffect(() => {
        getReviewPost(id).then(setReviewPost);
    }, []);

    useEffect(() => {
        getAllGames();
    }, []);

    useEffect(() => {
        setformState(reviewPost);
    }, [reviewPost]);

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
        // Building the timestamp object
        const fullTimestamp =
        {
            time: time,
            notes: "",
            reviewPostId: reviewPost.id,
        }
        if (fullTimestamp.time === 0) {
            alert("Enter a time to create a timestamp!")
        } else {
            addTimestamp(fullTimestamp).then(() => {
                getReviewPost(reviewPost.id).then(setReviewPost);
            });
        }
    };

    // Delete and update post
    const deletePost = (e) => {
        e.preventDefault();
        deleteReviewPostById(reviewPost.id).then(() => {
            history.push("/");
        });
    };

    const updatePost = (e) => {
        e.preventDefault();
        formState.private = false
        formState.gameId = +formState.gameId
        formState.userProfileId = +formState.userProfile.id
        editReviewPost(formState.id, formState).then(() => {
            getReviewPost(formState.id).then(setReviewPost).then(toggleModal);
        });
    };

    // Form to render when adding a comment
    const inputContent = () => {
        return (
            <div className="buttonContainer">
                <Form onSubmit={saveComment}>
                    <FormGroup>
                        <Label for="content">Content:</Label>
                        <Input
                            id="content"
                            type="textarea"
                            rows="4"
                            defaultValue=""
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </FormGroup>
                    <Button color="primary" type="submit">
                        Save Comment
                </Button>
                </Form>
            </div>
        );
    };

    // Function that builds the comment and posts to the database 
    const saveComment = (e) => {
        e.preventDefault();
        const comment =
        {
            content: content,
            userProfileId: userProfileId,
            reviewPostId: reviewPost.id
        }
        if (comment.content === "") {
            alert("Enter some content to create a comment!")
        } else {
            setCommentAdding(false)
            addComment(comment).then(() => {
                getReviewPost(reviewPost.id).then((rp) => setReviewPost(rp));
            });
        }
    };

    if (!reviewPost) {
        return null;
    }

    // Logic for reurning the dates in a more readable format
    let formatedDate = null;
    let unformatedDate = null;

    if (reviewPost.createDateTime != null) {
        unformatedDate = reviewPost.createDateTime.split("T")[0];
        const [year, month, day] = unformatedDate.split("-");
        formatedDate = month + "/" + day + "/" + year;
    }


    return (
        <div>
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
                            controls={true}
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
                                    <Input id="seconds" name="seconds" type="number" max="59" onChange={(e) => setSeconds(e.target.value)} />
                                </div>
                            </div>
                            <Button color="info" type="submit">
                                Create Timestamp
                </Button>
                        </Form>
                        {reviewPost.userProfile.id === userProfileId
                            ? <Button onClick={toggleModal} color="secondary">Edit Post</Button>
                            : ""}


                        {reviewPost.userProfile.id === userProfileId
                            ? <Button onClick={toggleDelete} color="danger">Delete Post</Button>
                            : ""}

                    </div>
                </div>

                {/* Timestamps display here */}

                <div className="timestampContainer">
                    {
                        reviewPost.timestamps.map(timestamp => {
                            return <Timestamp key={timestamp.id} timestamp={timestamp}
                                currentReviewPost={reviewPost} setReviewPost={setReviewPost} />
                        })
                    }
                </div>
                {/* Comments display here */}

                {
                    commentAdding === true
                        ? inputContent()
                        : ""
                }

                <div className="commentContainer">
                    {
                        commentAdding === false
                            ? <Button color="primary" onClick={() => { setCommentAdding(true) }}>Add a Comment</Button>
                            : ""
                    }

                    {
                        reviewPost.comments.map(comment => {
                            return <Comment key={comment.id} comment={comment}
                                currentReviewPost={reviewPost} setReviewPost={setReviewPost} />
                        })
                    }
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
                                        <select id="gameId" required defaultValue={reviewPost.game.id} onChange={handleUserInput}>
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
                                    <div className="buttonContainer">
                                        <Button color="secondary" onClick={toggleModal}>
                                            Cancel
        </Button>
                                        <Button color="primary" type="submit">
                                            Save Changes
        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={showDeleteModal} toggle={toggleDelete}>
                        <ModalHeader toggle={toggleDelete}>
                            Delete this post and all its notes?
                    </ModalHeader>
                        <ModalBody>
                            <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
                            <Button color="danger" type="submit" onClick={deletePost}>Delete</Button>
                        </ModalBody>
                    </Modal>

                </div >
            </div >
            <footer className="postFooter">Tip: Press . when paused to advance YouTube videos frame by frame.</footer>
        </div>
    );
};
export default ReviewPostDetails;