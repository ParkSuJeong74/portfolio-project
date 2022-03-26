const { Article } = require("../db")
const { User } = require("../db")
const { v4: uuidv4 } = require("uuid")
const { SetUtil } = require("../common/setUtil")

const ArticleService = {
    // 게시글 등록하기
    addArticle: async ({ userId, categoryName, author, hidden, title, description }) => {
        const id = uuidv4()
        let authorName
        
        // 익명에 체크되어 있으면
        if (hidden == true) {
            authorName = "익명"
        } else {
            const user = await User.findById({ userId: author })
            authorName = user.nickname
        }

        const newArticle = { userId, id, categoryName, author, authorName, hidden, title, description }
        const createdNewArticle = await Article.create({ newArticle })

        return createdNewArticle
    },
    // 게시글 상세 페이지 + 좋아요 상태 보여주기
    getArticle: async ({ userId, articleId }) => {
        const article = await Article.findById({ articleId })
        if (!article) {
            throw new Error("해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }
        const likeUserIdList = article.article.likeUserIdList // 좋아요 누른 사용자들의 목록
        let likeState
        if (likeUserIdList.includes(userId)) { // 좋아요 한 상태이면
            likeState = true
        } else { // 좋아요 안 한 상태이면
            likeState = false
        }
        article["likeState"] = likeState

        return article
    },
    // 게시글 수정하기
    setArticle: async ({ userId, articleId, toUpdate }) => {
        let article = await Article.findById({ articleId })

        if (!article) {
            throw new Error("해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }
        // 익명에 체크되어 있으면
        if (toUpdate.hidden == true) {
            toUpdate.authorName = "익명"
        } else {
            const user = await User.findById({ userId })
            toUpdate.authorName = user.nickname
        }

        const originalArticle = article.article
        const updateObject = SetUtil.compareValues(toUpdate, originalArticle)

        article = await Article.update({ articleId, updateObject })

        return article
    },
    // 게시글 삭제하기
    deleteArticle: async ({ articleId }) => {
        const isDataDeleted = await Article.deleteById({ articleId })

        if (!isDataDeleted) {
            throw new Error("해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }

        return { status: "ok" }
    },
    // 게시글 좋아요
    setLike: async ({ userId, articleId }) => {
        const user = await User.findById({ userId })
        if (!user) {
            throw new Error("당신은 회원이 아닙니다.")
        }
        let article = await Article.findById({ articleId }) // 좋아요 할 게시글 객체 찾기
        if (!article) {
            throw new Error("해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }
        let toUpdate
        const likeUserIdList = article.article.likeUserIdList // 좋아요 누른 사용자들의 목록
        if (likeUserIdList.includes(userId)) { // 이미 좋아요 한 상태이면
            toUpdate = {
                $inc: {
                    likeCount: -1,
                },
                $pull: {
                    likeUserIdList: userId,
                }
            }
        } else { // 좋아요 안 누른 상태이면
            toUpdate = {
                $inc: {
                    likeCount: 1,
                },
                $push: {
                    likeUserIdList: userId,
                }
            }
        }
        article = await Article.updateLike({ articleId, toUpdate })

        return article
    },
}

module.exports = { ArticleService }
