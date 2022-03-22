const is = require('@sindresorhus/is')
const { Router } = require('express')
const { login_required } = require('../middlewares/login_required')
const { CategoryService } = require('../services/categoryService')

const categoryRouter = Router()

// POST
categoryRouter.post('/create', login_required, async (req, res, next) => {
    try {
        if(is.emptyObject(req.body)){
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요."
            )
        }
        const { name, description} = req.body
        const userId = req.currentUserId
        const newCategory = await CategoryService.addCategory({
            userId,
            name,
            description,
        })

        res.status(201).json(newCategory)
    } catch(err) {
        next(err)
    }
})

// GET
categoryRouter.get('/list', async (req, res, next) => {
    try {
        const category = await CategoryService.getCategory()

        res.status(200).send(category)
    } catch(err) {
        next(err)
    }
})

// GET
categoryRouter.get('/:name', async (req, res, next) =>{
    try {
        const name = req.params.name
        const category = await CategoryService.getCategoryByName({ name })

        res.status(200).send(category)
    } catch(err) {
        next(err)
    }
})

// PUT
categoryRouter.put('/:name', login_required, async (req, res, next) => {
    try {
        const name = req.params.name
        const { description } = req.body
        const toUpdate = { description }

        const category = await CategoryService.setCategory({ name, toUpdate })

        if (category.errorMessage) {
            throw new Error(category.errorMessage)
        }

        res.status(200).send(category)
    } catch(err) {
        next(err)
    }
})

// // DELETE
// categoryRouter.delete('/:name', login_required, async (req, res, next) => {
//     try {
//         const categoryName = req.params.name
//         const result = await CategoryService.deleteCategory({ categoryName })

//         if(result.errorMessage){
//             throw new Error(result.errorMessage)
//         }

//         res.status(200).send(result)
//     } catch(err) {
//         next(err)
//     }
// })

module.exports = { categoryRouter }
