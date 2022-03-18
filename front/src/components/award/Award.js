import React, {useState} from 'react'
import AwardCard from './AwardCard'
import AwardEditForm from './AwardEditForm'

//편집(setAwards가 필요하다)과 일반 상태(각 award를 AwardCard컴포넌트로 보여줘야 함.)
//편집을 끝냈으면 setIsEditing(false)로 편집폼을 닫아줘야 한다.
//편집버튼을 눌렀으면 setIsEditing(false)로 편집폼을 열어줘야 한다.
function Award({award, setAwards, isEditable}) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <>
            {isEditing ? (
                <AwardEditForm 
                    setAwards={setAwards}
                    currentAward={award}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <AwardCard 
                    award={award}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}                   
                />
            )}
        </>
    )
}

export default Award

