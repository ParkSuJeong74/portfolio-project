import { useState } from "react"
import ArticleCard from "./ArticleCard"
import ArticleEditForm from "./ArticleEditForm"

function Article({article, setArticles, isEditable, owner}) {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <>
            {isEditing ? (
                <ArticleEditForm 
                    setArticles={setArticles}
                    currentArticle={article}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <ArticleCard
                    article={article}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                    owner={owner}
                />
            )}
        </>
    )
}
export default Article