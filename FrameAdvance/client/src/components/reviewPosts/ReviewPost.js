import React, { useState } from "react"
import {
    Card, CardBody,
    Button
} from 'reactstrap';

export default ({ reviewPost }) => {
    return (
        <>
            <div className="reviewPost">
                <Card style={{ width: '15rem', }}>
                    <CardBody className="reviewPostBody">
                        <div className="reviewPostMain">
                            <h4>{reviewPost.title}</h4>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}