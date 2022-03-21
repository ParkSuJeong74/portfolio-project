const { Article } = require("../db")
const { v4: uuidv4 } = require("uuid")

const ArticleService = {
    // TODO: 게시글 등록하기 -> 1차 완료
    addArticle: async function({ userId, categoryName, author, title, description, createdAt,
        updatedAt }) {
        const id = uuidv4()

        const newArticle = { id, userId, categoryName, author, title, description, createdAt,
            updatedAt }
        const createdNewArticle = await Article.create({ newArticle })

        return createdNewArticle
    },
    // TODO: 게시글 상세 페이지 보여주기 -> 1차 완료
    getArticle: async function({ articleId }) {
        const article = await Article.findById({ articleId })
        if (!article) {
            throw new Error("해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }

        return article
    },
    // TODO: 게시글 수정하기 -> 1차 완료
    setArticle: async function({ articleId, toUpdate }) {
        let article = await Article.findById({ articleId })

        if (!article) {
            throw new Error("해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }
        
        const fieldToUpdate = Object.keys(toUpdate)
        const newValue = Object.values(toUpdate)
        article = await Article.update({ articleId, fieldToUpdate, newValue })

        return article
    },
    // TODO: 게시글 삭제하기 -> 1차 완료
    deleteArticle: async function({ articleId }) {
        const isDataDeleted = await Article.deleteById({ articleId })

        if (!isDataDeleted) {
            throw new Error("해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }

        return { status: "ok" }
    },
    // TODO: 게시글 좋아요 -> 1차 테스트 완료
    setLike: async function({ userId, articleId }) {
        let article = await Article.findById({ articleId }) // 좋아요 할 게시글 객체 찾기

        if (!article) {
            throw new Error("해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }

        const likeUserIdList = article.likeUserIdList // 좋아요 누른 사용자들의 목록

        article = await Article.updateLike({ userId, articleId, likeUserIdList })

        return article
    },
}

module.exports = { ArticleService }