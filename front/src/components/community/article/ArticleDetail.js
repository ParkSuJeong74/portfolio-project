import { useNavigate } from "react-router"
import Comments from "../comment/Comments"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Style from '../../../App.module.css'

function ArticleDetail({category, setIsDetail, selectedArticle, isLogin, owner}){

    const navigate = useNavigate()

    return(
        <>
            <span class={Style.backButton} onClick={() => {
                setIsDetail(false)
                navigate(`/${category.id}`)
                
            }}> <FontAwesomeIcon icon={faArrowLeft} /> </span>

            <Comments 
                isLogin={isLogin}
                category={category}
                article={selectedArticle}
                owner={owner} />
        </>
    )
}

export default ArticleDetail
