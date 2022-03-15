const Award = require('../db')
const { v4:uuidv4 } = require('uuid')

// create, get(awardId, userId), update, delete 
class AwardService{
    // POST
    static async addAward({ user_id, title, description }) {
        const id = uuidv4()
        const newAward = { id, user_id, title, description } // add data
        const createNewAward = await Award.create({ newAward }) // newAward -> router

        return createNewAward
    }

    // GET
    static async getWard({ awardId }){
        const award = await Award.findById({ AwardId })

        // 예외처리 : award 없음
        if(!award) {
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 확인해주세요."
            return { errorMessage }
        }
        return award 
    }

    // GET
    static async getAwardList({ user_id }) {
        const awards = await Award.findByUserId({ user_id });
        return awards;
    }

    // PUT
    static async setAward({ awardId, toUpdate }){
        let award = await Award.findById({ AwardId })
        
        // 예외처리 : award 없음
        if(!award){
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }
        // title 변경
        if(toUpdate.title){
            const fieldToUpdate="title"
            const newValue=toUpdate.title
            award=await Award.update({ awardId, fieldToUpdate, newValue })
        }

        // description 변경
        if(toUpdate.description){
            const fieldToUpdate = "description"
            const newValue = toUpdate.description
            award = await Award.update({ awardId, fieldToUpdate, newValue })
        }
        return award
    }

    // DELETE
    static async deleteAward({ awardId }) {
        const isDataDeleted = await Award.deleteById({ awardId })
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!isDataDeleted) { // 사라진 데이터 갯수가 1이 아님
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }
        return { status: "ok" } // delete 성공
    }
}

module.exports = { AwardService }