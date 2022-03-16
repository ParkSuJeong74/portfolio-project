const { Award } = require("../db")
const { v4: uuidv4 } = require("uuid")

class AwardService {
    static async addAward({ user_id, title, description }) {

      const id = uuidv4()

      const newAward = { id, user_id, title, description }
      const createdNewAward = await Award.create({ newAward })
  
      return createdNewAward
    }
  
    static async getAward({ awardId }) {
<<<<<<< HEAD
=======
        const award = await Award.findById({ awardId })
        if (!award) {
            const errorMessage =
                "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }
>>>>>>> 8049b686caf0e6ffbb0def2676009e0017956ff7

      const award = await Award.findById({ awardId })
      if (!award) {
        const errorMessage =
          "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
        return { errorMessage }
      }
  
      return award
    }
  
    static async getAwardList({ user_id }) {
      const awards = await Award.findByUserId({ user_id })
      return awards
    }
  
    static async setAward({ awardId, toUpdate }) {
      let award = await Award.findById({ awardId })

<<<<<<< HEAD
      if (!award) {
        const errorMessage =
          "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
        return { errorMessage }
      }
  
      if (toUpdate.title) {
        const fieldToUpdate = "title"
        const newValue = toUpdate.title
        award = await Award.update({ awardId, fieldToUpdate, newValue })
      }
  
      if (toUpdate.description) {
        const fieldToUpdate = "description"
        const newValue = toUpdate.description
        award = await Award.update({ awardId, fieldToUpdate, newValue })
      }
  
      return award
=======
        if (!award) {
            const errorMessage =
                "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        if (toUpdate.title) {
            const fieldToUpdate = "title"
            const newValue = toUpdate.title
            award = await Award.update({ awardId, fieldToUpdate, newValue })
        }

        if (toUpdate.description) {
            const fieldToUpdate = "description"
            const newValue = toUpdate.description
            award = await Award.update({ awardId, fieldToUpdate, newValue })
        }
        return award
>>>>>>> 8049b686caf0e6ffbb0def2676009e0017956ff7
    }
  
    static async deleteAward({ awardId }) {
<<<<<<< HEAD
      const isDataDeleted = await Award.deleteById({ awardId })
  
      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!isDataDeleted) {
        const errorMessage =
          "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
        return { errorMessage }
      }
  
      return { status: "ok" }
    }
  }
=======
        const isDataDeleted = await Award.deleteById({ awardId })

        if (!isDataDeleted) {
            const errorMessage =
                "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        return { status: "ok" }
    }
}
>>>>>>> 8049b686caf0e6ffbb0def2676009e0017956ff7

module.exports = { AwardService }