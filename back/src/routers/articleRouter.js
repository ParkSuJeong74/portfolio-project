const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { ArticleService } = require("../services/articleService")
const { timeUtil } = require("../common/timeUtil")

const articleRouter = Router()
articleRouter.use(login_required)

// 모든 API는 app.js에서 /article로 라우팅 된 상태
// 중간 get, put, delete 메소드는 categoryName이 필요없는 것 같지만 url 명시의 장점, 통일성을 위해 그냥 두기?? -> 일단 뺐음

// TODO: 게시글 등록하기 -> 1차 테스트 완료
articleRouter.post("/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }

        const userId = req.currentUserId // jwt토큰에서 추출된 로그인 사용자 id
        const author = userId // 지금 로그인 한 사용자 = 게시글 작성자
        const { categoryName, title, description } = req.body
        const createdAt = timeUtil()
        const updatedAt = timeUtil()
        
        const newArticle = await ArticleService.addArticle({
            userId,
            categoryName,
            author,
            title,
            description,
            createdAt,
            updatedAt
        })

        res.status(201).json(newArticle)

    } catch (error) {
        next(error)
    }
})
// TODO: 게시글 상세 페이지 보여주기 -> 1차 테스트 완료
articleRouter.get("/:id", async (req, res, next) => {
    try {
        const articleId = req.params.id

        const article = await ArticleService.getArticle({ articleId })

        if (article.errorMessage) {
            throw new Error(article.errorMessage)
        }

        res.status(200).send(article)

    } catch (error) {
        next(error)
    }
})
// TODO: 게시글 수정하기 -> 1차 테스트 완료
articleRouter.put("/:id", async (req, res, next) => {
    try {
        const userId = req.currentUserId // jwt토큰에서 추출된 로그인 사용자 id
        const articleId = req.params.id
        const { author, title, description } = req.body
        const updatedAt = timeUtil()

        // TODO : 프론트에서 아예 수정, 삭제 버튼이 보이지 않도록 해야 함 -> 해주신다고 함 -> 근데 그럼 나는 검증할 필요가 없는건가?(코치님께 여쭤보기)
        if (userId == author) { // 로그인 사용자 = 게시글 작성자이면
            const toUpdate = { title, description, updatedAt }
            const article = await ArticleService.setArticle({ articleId, toUpdate })

            if (article.errorMessage) {
                throw new Error(article.errorMessage)
            }

            res.status(200).send(article)
        } else {
            throw new Error("당신은 게시글 작성자가 아닙니다.")
        }
    } catch (error) {
        next(error)
    }
})
// TODO: 게시글 삭제하기 -> 1차 테스트 완료
articleRouter.delete("/:id", async (req, res, next) => {
    try {
        const articleId = req.params.id

        const result = await ArticleService.deleteArticle({ articleId })

        if (result.errorMessage) {
            throw new Error(result.errorMessage)
        }

        res.status(200).send(result)

    } catch (error) {
        next(error)
    }
})

// TODO: 게시글 좋아요/좋아요 취소 -> 1차 테스트 완료
articleRouter.put("/:id/like", async (req, res, next) => {
    try {
        const userId = req.currentUserId // 로그인 한 사용자
        const articleId = req.params.id // 게시글 Id
        const author = req.body.author // 게시글 작성자의 userId

        if (userId == author) { // 로그인 사용자 = 게시글 작성자이면
            throw new Error("본인 글에는 좋아요 할 수 없습니다.")
        } else { // 본인 게시글이 아니면
            const article = await ArticleService.setLike({ userId, articleId })

            if (article.errorMessage) {
                throw new Error(article.errorMessage)
            }

            res.status(200).send(article)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = { articleRouter }