import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap'
import './Control.css'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]


const BuildControl = props => {
    return (
        <div className="d-flex justify-content-between align-items-center" >
            <div>
                <h5>{props.label}:</h5>
            </div>
            <div>
                <button
                    onClick={props.remove}
                    className="btn-danger btn m-2">Less</button>
                <button
                    onClick={props.added}
                    className="btn-success btn m-2">More</button>
            </div>

        </div>
    )
}

const Controls = (props) => {

    return (

        <Card>
            <CardHeader
                style={{
                    backgroundColor: "#D70F64",
                    color: "#fff"
                }}
            >
                <h4>Add Ingredients</h4>
            </CardHeader>
            <CardBody>
                {
                    controls.map(item => {
                        return <BuildControl
                            label={item.label}
                            type={item.type}
                            key={Math.random()}
                            added={() => props.added(item.type)}
                            remove={() => props.remove(item.type)}
                        />
                    })
                }
            </CardBody>
            <CardFooter>
                <h5>Price: <strong>{props.price}</strong> BDT</h5>

            </CardFooter>
            <Button
                className="order_now"
                disabled={!props.purchasable}
                onClick={props.toggleModal}  >Order Now</Button>
        </Card>

    )
}

export default Controls 