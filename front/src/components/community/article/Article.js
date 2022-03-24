import { useState } from "react"
import ArticleCard from "./ArticleCard"
import ArticleEditForm from "./ArticleEditForm"
import { Link } from 'react-router-dom'
import Style from '../../../App.module.css'

function Article({category, article, dispatch, owner, isLogin, setIsDetail, setSelectedArticle}) {

    // 편집중 여부
    const [isEditing, setIsEditing] = useState(false)

    function removeArticle(){

        //TODO: Api delete 요청
        // category정보, article정보 필요
        //async function removeArticle(){
        //    try{
        //      await Api.delete('category이름/article/article아이디')
        //    } catch(err) {
        //      console.log(err)
        //    }
        //}
        
        dispatch({
            type: 'DELETE',
            payload: article
        })
    }

    return (
        <>
            {isEditing ? (
                <ArticleEditForm 
                    currentArticle={article}
                    dispatch={dispatch}
                    setIsEditing={setIsEditing} />
            ) : (
                <Link to = {`/${category.id}/${article.title}`} className={Style.articleLink}>
                    <ArticleCard
                        className={Style.articleCard}
                        article={article}
                        owner={owner}
                        isLogin={isLogin}
                        removeArticle={removeArticle}
                        setIsEditing={setIsEditing}
                        setIsDetail={setIsDetail}
                        setSelectedArticle={setSelectedArticle} />
                </Link>
            )}
        </>
    )
}
export default Article
