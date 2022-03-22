import React, {useEffect, useState} from 'react'
import AwardCard from './AwardCard'
import AwardEditForm from './AwardEditForm'
import * as Api from '../../api'

//편집(setAwards가 필요하다)과 일반 상태(각 award를 AwardCard컴포넌트로 보여줘야 함.)
//편집을 끝냈으면 setIsEditing(false)로 편집폼을 닫아줘야 한다.
//편집버튼을 눌렀으면 setIsEditing(false)로 편집폼을 열어줘야 한다.
function Award({award, setAwards, isEditable}) {
    const [isEditing, setIsEditing] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)

    useEffect(() => {
        if(isRemoving){
            async function awardRemove(){
                
                //currentAward의 user_id를 user_id 변수에 할당함
                const user_id = award.user_id
                
                await Api.delete(`awards/${award.id}`)

                //삭제를 해놨으니까, 다시 get 요청함. 엔드포인트: "awardlist/유저아이디"
                const res = await Api.get("awardlist", user_id)
                setAwards(res.data)

                //추가하는 과정이 끝났으니까 isRemoving을 false로 설정하기
                setIsRemoving(false)
            }
            awardRemove()
        }
    }, [isRemoving])

    return (
        <>
            {isEditing ? (
                <AwardEditForm 
                    setAwards = {setAwards}
                    currentAward = {award}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <AwardCard 
                    setIsEditing={setIsEditing}
                    setIsRemoving={setIsRemoving}
                    award={award}
                    isEditable={isEditable}/>
            )}
        </>
    )
}

export default Award

