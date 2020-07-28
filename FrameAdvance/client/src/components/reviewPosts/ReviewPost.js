import React, { useState } from "react"
import {
    Card, CardBody,
    Button,
    CardFooter,
    CardImg
} from 'reactstrap';

export default ({ reviewPost }) => {

    let formatedDate = null;
    let unformatedDate = null;

    if (reviewPost.createDateTime != null) {
        unformatedDate = reviewPost.createDateTime.split("T")[0];
        const [year, month, day] = unformatedDate.split("-");
        formatedDate = month + "/" + day + "/" + year;
    }

    return (
        <>
            <div className="reviewPost">
                <Card >
                    <CardBody body outline color="info" className="reviewPostBody">
                        <div className="reviewPostMain">

                            <div className="reviewPostInfo">
                                <h5>{reviewPost.title}</h5>
                                <div>
                                    <p>{reviewPost.game.title}</p>
                                    <small>Posted By: {reviewPost.userProfile.username} {formatedDate}</small>
                                </div>
                            </div>

                            <div className="reviewPostImage">
                                <CardImg src={reviewPost.game.imageLocation} alt={reviewPost.game.title} />
                            </div>

                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}