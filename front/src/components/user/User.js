import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import UserEditForm from "./UserEditForm"
import UserCard from "./UserCard"
import * as Api from "../../api"

function User({ portfolioOwnerId, isEditable }) {
    const [isEditing, setIsEditing] = useState(false)
    const [user, setUser] = useState(null)

    const userState = useSelector((state) => state.user)
    //현재 로그인한 자기 아이디
    const myID = userState.user?.id

    useEffect(() => {
        Api.get("users", portfolioOwnerId).then((res) => setUser(res.data))
    }, [portfolioOwnerId])

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
    )
}

export default User
