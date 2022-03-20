const { Article } = require("../db")
const { v4: uuidv4 } = require("uuid")

const ArticleService = {
    // TODO: 게시글 등록하기 -> 1차 완료
    addArticle: async function({ user_id, category_name, author, title, description, created_at,
        updated_at }) {
        const id = uuidv4()

        const newArticle = { id, user_id, category_name, author, title, description, created_at,
            updated_at }
        const createdNewArticle = await Article.create({ newArticle })

        return createdNewArticle
    },
    // TODO: 게시글 상세 페이지 보여주기 -> 1차 완료
    getArticle: async function({ articleId }) {
        const article = await Article.findById({ articleId })
        if (!article) {
            throw new Error("해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }

        return article
    },
    // TODO: 게시글 수정하기 -> 1차 완료
    setArticle: async function({ articleId, toUpdate }) {
        let article = await Article.findById({ articleId })

        if (!article) {
            throw new Error("해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요.")
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
            throw new Error("해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }

        return { status: "ok" }
    }
}

module.exports = { ArticleService }