const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { ArticleService } = require("../services/articleService")
const { timeUtil } = require("../common/timeUtil")

const articleRouter = Router()
articleRouter.use(login_required)

// 모든 API는 app.js에서 /article로 라우팅 된 상태
// 중간 get, put, delete 메소드는 category_name이 필요없는 것 같지만 url 명시의 장점, 통일성을 위해 그냥 두기?? -> 일단 뺐음

// TODO: 게시글 등록하기 -> 1차 테스트 완료
articleRouter.post("/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }

        const user_id = req.body.user_id
        const category_name = req.body.category_name
        const author = user_id // 지금 로그인 한 사용자 = 게시글 작성자
        const title = req.body.title
        const description = req.body.description
        const created_at = timeUtil()
        const updated_at = timeUtil()
        
        const newArticle = await ArticleService.addArticle({
            user_id,
            category_name,
            author,
            title,
            description,
            created_at,
            updated_at
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
        const user_id = req.currentUserId // jwt토큰에서 추출된 로그인 사용자 id
        const articleId = req.params.id
        const author = req.body.author ?? null // 게시글 작성자의 user_id
        const title = req.body.title ?? null
        const description = req.body.description ?? null
        const updated_at = timeUtil()

        // TODO : 프론트에서 아예 수정, 삭제 버튼이 보이지 않도록 해야 함 -> 해주신다고 함 -> 근데 그럼 나는 검증할 필요가 없는건가?(코치님께 여쭤보기)
        if (user_id == author) { // 로그인 사용자 = 게시글 작성자이면
            const toUpdate = { title, description, updated_at }
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

module.exports = { articleRouter }