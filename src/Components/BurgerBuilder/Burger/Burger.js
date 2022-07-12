import React from 'react'
import Ingredient from '../Ingredient/Ingredient'
import classes from './Burger.module.css'
const Burger = (props) => {
    return (
        <div className={`${classes.burger} pt-5`} >
            <Ingredient type="top" />
            <Ingredient type="salad" />
            <Ingredient type="cheese" />
            <Ingredient type="meat" />
            <Ingredient type="bottom" />

        </div>
    )
}

export default Burger