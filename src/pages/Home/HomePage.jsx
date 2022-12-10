import { Container } from "react-bootstrap"
import { useState, useEffect } from 'react'
import Category from "../../components/Category/Category"
import UserMessage from "../../components/UserMessage/UserMessage"
import IngredientsSearchBar from "../../components/IngredientsSearchBar/IngredientsSearchBar"
import spoonacularService from "../../services/spoonacular.service"
import './HomePage.css'
import RecipesResults from "../../components/RecipesResults/RecipesResults"

const HomePage = () => {

    const [query, setQuery] = useState('')
    const [recipesToSearch, setrecipesToSearch] = useState([])

    const loadData = () => {

        const paramsObj = { query: query, number: '2' }
        const searchParams = new URLSearchParams(paramsObj)

        spoonacularService
            .autocompleatSearch(searchParams.toString())
            .then(({ data }) => {
                console.log(data)
                setrecipesToSearch(data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadData()
    }, [query])

    return (
        <Container className="homepageForm">
            <h1 className="titles mb-5">What's in your fridge?</h1>
            <IngredientsSearchBar setQuery={setQuery} />
            <RecipesResults recipesToSearch={recipesToSearch} />
            {/* <Category /> */}
            <h2>Placeholder Categories</h2>

        </Container>
    )
}

export default HomePage