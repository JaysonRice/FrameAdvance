import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"
import "firebase/auth";

export const ReviewPostContext = React.createContext();

export const ReviewPostProvider = (props) => {
    const [reviewPosts, setReviewPosts] = useState([]);

    const apiUrl = "/api/reviewpost";
    const { getToken } = useContext(UserProfileContext);

    // Currently Unused
    const getAllReviewPosts = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setReviewPosts));

    const getAllPostList = () =>
        getToken().then((token) =>
            fetch(`${apiUrl}/postlist`, {
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
    // Currently Unused
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

    // Fetch calls for timestamps
    const addTimestamp = (timestamp) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/addtimestamp`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(timestamp),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(getReviewPost(timestamp.reviewPostId));
                }
                throw new Error("Unauthorized");
            }));

    const editTimestamp = (id, timestamp) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/updatetimestamp/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(timestamp),
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Unauthorized");
            }))
    };

    const deleteTimestamp = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/deletetimestamp/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Failed to delete timestamp.")
            })
        );
    };

    return (
        <ReviewPostContext.Provider value={{
            reviewPosts, getAllReviewPosts, getAllPostList, addReviewPost,
            getReviewPost, getUserReviewPosts, getReviewPostsByGame, deleteReviewPostById,
            editReviewPost, addTimestamp, editTimestamp, deleteTimestamp
        }}>
            {props.children}
        </ReviewPostContext.Provider>
    );
};