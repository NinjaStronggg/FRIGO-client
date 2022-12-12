import './ProfileTab.css'
import { useState, useContext, useEffect } from 'react'
import { Tab, Tabs, Button, Modal } from 'react-bootstrap'
import { AuthContext } from './../../context/auth.context'
import { Link } from 'react-router-dom'
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded'
import NewRecipeForm from '../NewRecipeForm/NewRecipeForm'
import spoonacularService from "../../services/spoonacular.service"
import recipeService from "../../services/recipes.service"
import { MessageContext } from "../../context/userMessage.context"
import DbRecipeCard from '../DbRecipeCard/DbRecipeCard'
import ApiRecipeCard from '../ApiRecipeCard/ApiRecipeCard'

function ProfileTab() {

    const [showModal, setShowModal] = useState(false)
    const { setShowToast, setToastMessage } = useContext(MessageContext)
    const { user } = useContext(AuthContext)
    const [myRecipes, setMyRecipes] = useState([])
    const [apiFavRecipes, setApiFavRecipes] = useState([])
    const [dbFavRecipes, setDbFavRecipes] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {

        //User Recipes
        recipeService
            .getRecipeByOwner()
            .then(({ data }) => {
                setMyRecipes(data)
            })
            .catch(err => console.log(err))


        //User Fav Recipes
        // user.favRecipes.map(elm => {
        //     const apiFavRecipesCopy = [...apiFavRecipes]
        //     const dbFavRecipesCopy = [...dbFavRecipes]
        //     if (elm.length < 10) {
        //         spoonacularService
        //             .getRecipeById(elm)
        //             .then(({ data }) => {
        //                 apiFavRecipesCopy.push(data)
        //                 setApiFavRecipes(apiFavRecipesCopy)
        //             })
        //             .catch(err => console.log(err))
        //     } else {
        //         recipeService
        //             .getRecipeById(elm)
        //             .then(({ data }) => {
        //                 dbFavRecipesCopy.push(data)
        //                 setDbFavRecipes(dbFavRecipesCopy)
        //             })
        //             .catch(err => console.log(err))
        //     }
        // })
    }

    const closeModal = () => setShowModal(false)

    const openModal = () => setShowModal(true)

    const fireFinalActions = () => {
        setShowToast(true)
        setToastMessage('Recipe created successfully')
        closeModal()
    }


    return (
        <>
            <Tabs
                defaultActiveKey="Fav Recipes"
                id="justify-tab-example"
                className="mb-3 black-text"
                justify

            >
                <Tab eventKey="Fav Recipes" title="Fav Recipes" tabClassName='favTab'>

                    {user.favRecipes.length < 1 && <h5 className='mt-5'>You don't have favorites recipes yet</h5>}
                    <section className='d-flex justify-content-start mb-3'>
                        {apiFavRecipes?.map(elm => {
                            return <ApiRecipeCard key={elm.id} {...elm} />
                        })}
                        {dbFavRecipes?.map(elm => {
                            return <DbRecipeCard key={elm._id} {...elm} />
                        })}
                    </section>
                </Tab>
                <Tab eventKey="My Recipes" title="My Recipes" tabClassName='myRecTab'>
                    {myRecipes.length < 1 && <h5 className='mt-5'>You don't have recipes yet</h5>}
                    <section className='mt-5'>
                        <Button variant='outline-secondary' onClick={openModal}> <LibraryBooksRoundedIcon /> New Recipe</Button>
                        <div className='d-flex justify-content-start mt-3'>
                            {myRecipes?.map(elm => {
                                return <DbRecipeCard key={elm._id} {...elm} />
                            })}
                        </div>
                        <Modal size='xl' show={showModal} onHide={closeModal}>
                            <Modal.Header closeButton>
                                <img src="#" alt="LOGO FRIGO" />
                                <p>New Recipe</p>
                            </Modal.Header>
                            <Modal.Body>
                                <NewRecipeForm fireFinalActions={fireFinalActions} />
                            </Modal.Body>
                        </Modal>
                    </section>
                </Tab>

            </Tabs>
        </>
    )

}

export default ProfileTab