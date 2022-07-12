import React from 'react'
import Top from '../../../assets/images/top.png'
import Bottom from '../../../assets/images/bottom.png'
import Salad from '../../../assets/images/salad.png'
import Meat from '../../../assets/images/meat.png'
import Cheese from '../../../assets/images/cheese.png'

const Ingredient = (props) => {

    let showIngredients = null

    switch (props.type) {
        case 'top':
            showIngredients = <div><img src={Top} alt="bread top" /></div>
            break;
        case 'bottom':
            showIngredients = <div><img src={Bottom} alt="bread-bottom" /></div>
            break;
        case 'salad':
            showIngredients = <div><img src={Salad} alt="Salad" /></div>
            break;
        case 'meat':
            showIngredients = <div><img src={Meat} alt="Salad" /></div>
            break;
        case 'cheese':
            showIngredients = <div><img src={Cheese} alt="Cheese" /></div>
            break;
        default:
            showIngredients = null
            break;
    }

    return (
        <>
            {showIngredients}
        </>
    )
}

export default Ingredient