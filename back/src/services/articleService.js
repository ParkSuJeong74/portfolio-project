const { Article } = require("../db")
const { User } = require("../db")
const { v4: uuidv4 } = require("uuid")

const ArticleService = {
    // 게시글 등록하기
    addArticle: async function({ userId, categoryName, author, hidden, title, description, createdAt,
        updatedAt }) {
        const id = uuidv4()
        const user = await User.findById({ userId })
        let authorName = user.name
        // 익명에 체크되어 있으면
        if (hidden == true) {
            authorName = "익명"
        }

        const newArticle = { id, userId, categoryName, author, authorName, hidden, title, description, createdAt,
            updatedAt }
        const createdNewArticle = await Article.create({ newArticle })

        return createdNewArticle
    },
    // 게시글 상세 페이지 보여주기
    getArticle: async function({ articleId }) {
        const article = await Article.findById({ articleId })
        if (!article) {
            throw new Error("해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }

        return article
    },
    // 게시글 수정하기
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
    // 게시글 삭제하기
    deleteArticle: async function({ articleId }) {
        const isDataDeleted = await Article.deleteById({ articleId })

        if (!isDataDeleted) {
            throw new Error("해당 id를 가진 게시글 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }

        return { status: "ok" }
    },
    // 게시글 좋아요
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