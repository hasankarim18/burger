import React from 'react'

const Summary = (props) => {
    const IngredientSummary = props.ingredients.map(item => {
        return (
            <li key={item.type}>
                <span style={{ textTransform: 'capitalize' }} >{item.type}</span>:
                <span>{item.amount}x</span>

            </li>
        )
    })


    return (
        <div>
            <ul>
                {IngredientSummary}
            </ul>
        </div>
    )
}

export default Summary