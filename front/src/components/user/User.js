import React, { useState, useContext, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

function User({ portfolioOwnerId, isEditable }) {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);

    const userState = useContext(UserStateContext);
    //현재 로그인한 자기 아이디
    const myID = userState.user?.id

    // follow를 하거나 unfollow를 할 때 눌렀으면(상태가 변경되는 걸 감지하고) 해당 user 정보를 다시 불러오도록 함
    const [ReloadUser, setReloadUser] = useState(false)

    useEffect(() => {
        Api.get("user", portfolioOwnerId).then((res) => setUser(res.data));
    }, [portfolioOwnerId, ReloadUser]);

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
                setReloadUser={setReloadUser}
            />
        )}
    </>
    );
}

export default User;
