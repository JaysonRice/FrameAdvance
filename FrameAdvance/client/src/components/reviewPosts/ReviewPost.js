import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { CharactersOnPost } from "./CharactersOnPost";
import "../css/Character.css";
export default ({ reviewPost }) => {
  let formatedDate = null;
  let unformatedDate = null;

  if (reviewPost.createDateTime != null) {
    unformatedDate = reviewPost.createDateTime.split("T")[0];
    const [year, month, day] = unformatedDate.split("-");
    formatedDate = month + "/" + day + "/" + year;
  }

  const renderCharactersOnPost = () => {
    return reviewPost.reviewPostCharacters.length > 0 ? (
      <div className="postCharacters">
        <b> Characters: </b>
        {reviewPost.reviewPostCharacters.map((char) => (
          <CharactersOnPost key={char.id} postCharacter={char} />
        ))}
      </div>
    ) : (
      ""
    );
  };

  const skillName = () => {
    return reviewPost.game.userGames.find(
      (ug) => ug.userProfileId === reviewPost.userProfile.id
    ).skillLevel.name;
  };

  if (!reviewPost) {
    return null;
  }

  return (
    <>
      <Link
        to={`/reviewpost/${reviewPost.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="reviewPost">
          <Card>
            <CardBody color="info" className="reviewPostBody">
              <div className="reviewPostMain">
                <div className="reviewPostInfo">
                  <h5>{reviewPost.title}</h5>
                  <div>
                    <div>Game: {reviewPost.game.title}</div>
                    <small>
                      Posted By: {reviewPost.userProfile.username} on
                      {formatedDate}
                    </small>

                    {renderCharactersOnPost()}

                    {!reviewPost.game.userGames.find(
                      (ug) => ug.userProfileId === reviewPost.userProfile.id
                    ) ? (
                      ""
                    ) : (
                      <div className={skillName()}>
                        <p>{skillName()}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="reviewPostImage">
                  <CardImg
                    src={reviewPost.game.imageLocation}
                    alt={reviewPost.game.title}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Link>
    </>
  );
};
