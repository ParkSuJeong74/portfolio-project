const { ArticleModel } = require("../schemas/article")
/* !!!!!!!!! 두 모델 완성되기 전까지 동작하지 않을 것 !!!!!!!!!
const { LikeModel } = require("../schemas/like")
const { CommentModel } = require("../schemas/comment") */

const Article = {
    // TODO : 게시글 생성하기 -> 1차 완료
    create: async ({ newArticle }) => {
        const createdNewArticle = await ArticleModel.create(newArticle)
        return createdNewArticle
    },
    // TODO : id로 게시글 찾기 -> 1차 완료
    // !!!!!!!!! like랑 comment 쿼리 수정하기 !!!!!!!!!!
    findById: async ({ articleId }) => {
        const article = await ArticleModel.findOne({ id: articleId })
        // const like = await LikeModel.findOne({ id: articleId })
        // const comment = await ArticleModel.find({ id: articleId })
        // return { article, like, comment }
        return article
    },
    // TODO : 본인 게시글 확인 후 수정하기 -> 1차 완료
    update: async ({ articleId, fieldToUpdate, newValue }) => {
        const filter = { id: articleId } // 바꿀 대상 찾기
        const update = { $set:
            { // 바꿀 내용
                [fieldToUpdate[0]]: newValue[0],
                [fieldToUpdate[1]]: newValue[1],
                [fieldToUpdate[2]]: newValue[2]
            }
        }
        const option = { returnOriginal: false } // 옵션

        const updateArticle = await ArticleModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateArticle
    },
    // TODO : 본인 게시글 확인 후 삭제하기 -> 1차 완료
    deleteById: async ({ articleId }) => {
        const deleteResult = await ArticleModel.deleteOne({ id: articleId })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    }
}

module.exports = { Article }