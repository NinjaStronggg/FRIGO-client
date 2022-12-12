import { Col, Container, Row, Button } from "react-bootstrap"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import DbRecipeSteps from "../../components/DbRecipeSteps/DbRecipeSteps"
import ApiRecipeSteps from "../../components/ApiRecipeSteps/ApiRecipeSteps"
import RecipeIngredients from "../../components/RecipeIngredients/RecipeIngredients"
import { MessageContext } from "../../context/userMessage.context"
import spoonacularService from "../../services/spoonacular.service"
import { AuthContext } from './../../context/auth.context'
import recipeService from "../../services/recipes.service"
import userService from "../../services/user.service"
import './../../components/RecipeCard/RecipeCard.css'

const RecipeDetailsPage = () => {

    const { id } = useParams()

    const [apiRecipe, setApiRecipe] = useState(null)
    const [dbRecipe, setDbRecipe] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [favRecipe, setFavRecipe] = useState(false)
    const { user } = useContext(AuthContext)
    const { setShowToast, setToastMessage } = useContext(MessageContext)

    useEffect(() => {
        loadCurrentUser()
    }, [])

    useEffect(() => {
        loadData()
    }, [currentUser, favRecipe])

    const loadCurrentUser = () => {

        userService
            .getUserById()
            .then(({ data }) => {
                setCurrentUser(data)
            })
            .catch(err => console.log(err))
    }

    const loadData = () => {

        if (id.length < 10) {
            spoonacularService
                .getRecipeById(id)
                .then(({ data }) => {
                    setApiRecipe(data)
                })
                .catch(err => console.log(err))
        } else {
            recipeService
                .getRecipeById(id)
                .then(({ data }) => {
                    setDbRecipe(data)
                })
                .catch(err => console.log(err))
        }

        currentUser?.favRecipes.includes(id) ? setFavRecipe(true) : setFavRecipe(false)

    }

    const addRecipeToFav = () => {

        userService
            .addRecipeToFav(id)
            .then(() => {
                loadData()
                loadCurrentUser()
                setShowToast(true)
                setToastMessage('Recipe add to fav')
            })
            .catch(err => console.log(err))
    }

    const removeRecipeFromFav = () => {

        userService
            .removeRecipeFromFav(id)
            .then(() => {
                loadData()
                loadCurrentUser()
                setShowToast(true)
                setToastMessage('Recipe removed from fav')
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            {user &&
                <>
                    {!favRecipe ? <Button onClick={addRecipeToFav} className='favBtn mt-3'><FavoriteBorderIcon /></Button> :
                        <Button onClick={removeRecipeFromFav} className='favBtn mt-3'><FavoriteIcon /></Button>}
                </>
            }
            {!dbRecipe ? <RecipeCard {...apiRecipe} /> : <RecipeCard {...dbRecipe} />}
            <Col>
                <Row>
                    <Col md={12}>
                    {!dbRecipe ? <RecipeIngredients {...apiRecipe} /> : <RecipeIngredients {...dbRecipe} />}
                    </Col>
                    <Col md={12}>
                    {!dbRecipe ? <ApiRecipeSteps {...apiRecipe} /> : <DbRecipeSteps {...dbRecipe} />}
                    </Col>
                </Row>
            </Col>
            <hr />
        </Container>
    )
}

export default RecipeDetailsPage