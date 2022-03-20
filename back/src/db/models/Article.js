const { ArticleModel } = require("../schemas/article")
/* !!!!!!!!! 두 모델 완성되기 전까지 동작하지 않을 것 !!!!!!!!!
const { CommentModel } = require("../schemas/comment") */

const Article = {
    // TODO : 게시글 생성하기 -> 1차 완료
    create: async ({ newArticle }) => {
        const createdNewArticle = await ArticleModel.create(newArticle)
        return createdNewArticle
    },
    // TODO : id로 게시글 찾기 -> 1차 완료
    // !!!!!!!!! comment 쿼리 수정하기 !!!!!!!!!!
    findById: async ({ articleId }) => {
        const article = await ArticleModel.findOne({ id: articleId })
        // const comment = await CommentModel.find({ id: articleId })
        // return { article, comment }
        return article
    },
    // TODO : 본인 게시글 확인 후 수정하기 -> 1차 완료
    update: async ({ articleId, fieldToUpdate, newValue }) => {
        const filter = { id: articleId } // 바꿀 대상 찾기
        const update = { $set:
            { // 바꿀 내용 -> forEach문으로 바꾸기
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
    },
    // TODO : 좋아요 개수, 좋아요 누른 사용자 목록 업데이트
    updateLike: async ({ userId, articleId, likeUserIdList }) => {
        //console.log(likeUserIdList.includes(userId))
        const filter = { id: articleId } // 바꿀 게시물
        let update = {}
        if (likeUserIdList.includes(userId)) { // 이미 좋아요 한 상태이면
            update = {
                $inc: {
                    likeCount: -1,
                },
                $pull: {
                    likeUserIdList: userId, // 해당 값이 여러 번 있으면 다 없앰
                }
            }
        } else {
            update = {
                $inc: {
                    likeCount: 1,
                },
                $push: {
                    likeUserIdList: userId,
                }
            }
        }
        const option = { returnOriginal: false }

        const updateArticle = await ArticleModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateArticle
    }
}

module.exports = { Article }