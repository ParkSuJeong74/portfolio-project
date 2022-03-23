const { Comment, User } = require('../db')
const { v4: uuidv4 } = require('uuid')
const { setUtil } = require('../common/setUtil')

const CommentService = {
    addComment : async ({ userId, writerId, articleId, comment, hidden }) => {
        const id = uuidv4()
        let writerName
        if(hidden == true) { // 익명 처리
            writerName = '익명'
        }
        else {
            const user = await User.findById({ userId })
            console.log(user)
            writerName = user.nickname // 닉네임으로 출력
        }

        const newComment = { id, userId, writerId, writerName, articleId, comment, hidden }
        const createNewComment = await Comment.create({ newComment })
        return createNewComment
    },
    setComment : async ({ userId, commentId, toUpdate }) => {
        let comment = await Comment.findById({ commentId })
        
        if(!comment) {
            throw new Error("해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        if(userId !== comment.userId){
            throw new Error("당신은 이 댓글의 작성자가 아닙니다.")
        }

        const updateObject = setUtil.compareValues({ toUpdate, comment })
        comment = await Comment.update({ commentId, updateObject })
        return comment
    },
    deleteComment : async ({ userId, commentId, toUpdate }) => {
        let comment = await Comment.findById({ commentId })

        if(!commentId) {
            throw new Error("해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        if(userId !== comment.userId) {
            throw new Error("당신은 댓글 작성자가 아닙니다. 댓글을 삭제할 수 없습니다!")
        }

        comment.comment = "삭제된 댓글입니다."
        const updateObject = setUtil.compareValues(toUpdate, comment)

        comment = await Comment.delete({ commentId, updateObject })
        return comment
    }
}

module.exports = { CommentService }
