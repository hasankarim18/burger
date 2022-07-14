import React from 'react'

const Order = (props) => {
    const ingredientSummary = props.order.ingredients.map(item => {
        return (
            <span
                style={{ border: "1px solid grey", borderRadius: "10px", padding: "5px", display: 'inline-block' }}
                key={item.type} className="m-2" >
                {item.amount}x <span style={{ textTransform: 'capitalize' }} >{item.type}</span>
            </span>
        )
    })
    return (
        <div style={{ border: "1px solid grey", borderRadius: "10px", boxShadow: '1px 1px #888888', marginBottom: "10px" }} >
            <p>Total: {props.order.price} </p>
            <p>Order Number: {props.order.id}</p>
            <p>Delivery Address: {props.order.customerInfo.deliveryAddress} </p>
            <hr />
            {ingredientSummary}
        </div>
    )
}

export default Order