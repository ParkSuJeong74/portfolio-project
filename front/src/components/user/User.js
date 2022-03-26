import React, { useState, useContext, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

function User({ portfolioOwnerId, isEditable }) {
    // useState 훅을 통해 isEditing 상태를 생성함.
    const [isEditing, setIsEditing] = useState(false);
    // useState 훅을 통해 user 상태를 생성함.
    const [user, setUser] = useState(null);

    const userState = useContext(UserStateContext);
    //현재 로그인한 자기 아이디
    const myID = userState.user?.id

    useEffect(() => {
        // "user/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
        Api.get("user", portfolioOwnerId).then((res) => setUser(res.data));
    }, [user]);

    return (
    <>
        {isEditing ? (
            <UserEditForm
                user={user}
                setIsEditing={setIsEditing}
                setUser={setUser}
            />
        ) : (
            <UserCard
                user={user}
                myID={myID}
                setIsEditing={setIsEditing}
                isEditable={isEditable}
            />
        )}
    </>
    );
}

export default User;
