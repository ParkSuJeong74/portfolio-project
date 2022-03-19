import * as Api from '../../api'

function AwardRemove({setAwards, currentAward, setIsRemoving}){
    //currentAward의 user_id를 user_id 변수에 할당함
    const user_id = currentAward.user_id

    async function deleteAward(){
        await Api.delete(`awards/${currentAward.id}`)

        //수정을 해놨으니까, 다시 get 요청함. 엔드포인트: "awardlist/유저아이디"
        const res = await Api.get("awardlist", user_id)
        setAwards(res.data)

        //추가하는 과정이 끝났으니까 isAdding을 false로 설정해서 수정폼을 안보이게 함
        setIsRemoving(false)
    }
    deleteAward()
}

export default AwardRemove