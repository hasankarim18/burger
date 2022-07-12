import React from 'react'
import Ingredient from '../Ingredient/Ingredient'
import classes from './Burger.module.css'


const Burger = (props) => {

    let IngredientArr = props.ingredients.map(item => {
        let amountArr = [...Array(item.amount).keys()]
        return amountArr.map(_ => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    }).reduce((arr, element) => {
        return arr.concat(element)
    }, [])


    return (
        <div className={`${classes.burger} pt-5`} >
            <Ingredient type="top" />
            {IngredientArr.length <= 0 ? <h3>Add Some ingredients </h3> : IngredientArr}
            <Ingredient type="bottom" />

        </div>
    )
}

export default Burger