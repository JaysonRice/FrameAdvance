import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { GameContext } from "../../providers/GameProvider";
import { ReviewPostContext } from "../../providers/ReviewPostProvider";

export const PostReviewForm = () => {
    const { addReviewPost } = useContext(ReviewPostContext);
    const { getAllGames, games } = useContext(GameContext);

    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const [formState, setformState] = useState({ userProfileId: +userProfileId });

    const handleUserInput = (e) => {
        const updatedState = { ...formState };
        updatedState[e.target.id] = e.target.value;
        setformState(updatedState);
    };

    useEffect(() => {
        getAllGames();
    }, []);

    // Use this hook to allow us to programatically redirect users
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        formState.private = false
        formState.gameId = +formState.gameId;
        addReviewPost(formState).then((p) => {
            history.push(`/reviewpost/${p.id}`);
        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form onSubmit={submit}>

                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" onChange={handleUserInput} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="videoLocation">Youtube Link:</Label>
                                <Input id="videoLocation" onChange={handleUserInput} required />
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
                            <div className="buttonContainer">
                                <Button color="info" type="submit">
                                    Start Review
                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};