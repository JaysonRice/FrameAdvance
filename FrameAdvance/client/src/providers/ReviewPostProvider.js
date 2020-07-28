import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"
import "firebase/auth";

export const ReviewPostContext = React.createContext();

export const ReviewPostProvider = (props) => {
    const [reviewPosts, setReviewPosts] = useState([]);

    const apiUrl = "/api/reviewpost";
    const { getToken } = useContext(UserProfileContext);


    const getAllReviewPosts = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setReviewPosts));

    const addReviewPost = (reviewPost) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewPost),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    const getReviewPost = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                else { throw new Error("Unauthorized"); }
            }));
    }

    const getUserReviewPosts = (id) => {
        getToken().then((token) =>
            fetch(apiUrl + `/getbyuser/${id}`, {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(setReviewPosts);
                }
                throw new Error("Unauthorized");
            }))
    };

    const getReviewPostsByGame = (gameId) => {
        getToken().then((token) =>
            fetch(apiUrl + `/getbygame/${gameId}`, {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(setReviewPosts);
                }
                throw new Error("Unauthorized");
            }))
    };

    const deleteReviewPostById = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Failed to delete post.")
            })
        );
    };

    const editReviewPost = (id, reviewPost) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewPost),
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Unauthorized");
            }))
    };



    return (
        <ReviewPostContext.Provider value={{ reviewPosts, getAllReviewPosts, addReviewPost, getReviewPost, getUserReviewPosts, getReviewPostsByGame, deleteReviewPostById, editReviewPost }}>
            {props.children}
        </ReviewPostContext.Provider>
    );
};