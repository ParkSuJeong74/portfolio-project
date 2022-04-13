import { useState } from "react"
import ArticleCard from "./ArticleCard"
import ArticleEditForm from "./ArticleEditForm"
import { Link } from "react-router-dom"
import Style from "../../../App.module.css"
import * as Api from "../../../api"

const Article = ({
    category,
    article,
    dispatch,
    owner,
    isLogin,
    setIsDetail,
    setSelectedArticle,
}) => {
    const [isEditing, setIsEditing] = useState(false)

    const removeArticle = async () => {
        //TODO: Api delete 요청
        try {
            await Api.delete(`articles/${article.id}`)

            dispatch({
                type: "DELETE",
                payload: article,
            })
        } catch (error) {
            alert(error.response.data)
        }
    }

    return (
        <>
            {isEditing ? (
                <ArticleEditForm
                    currentArticle={article}
                    dispatch={dispatch}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <Link
                    to={`/${category.id}/${article.title}`}
                    className={Style.articleLink}
                >
                    <ArticleCard
                        className={Style.articleCard}
                        article={article}
                        owner={owner}
                        isLogin={isLogin}
                        removeArticle={removeArticle}
                        setIsEditing={setIsEditing}
                        setIsDetail={setIsDetail}
                        setSelectedArticle={setSelectedArticle}
                    />
                </Link>
            )}
        </>
    )
}
export default Article
