import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap'


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
                <button className="btn-danger btn m-2">Less</button>
                <button className="btn-success btn m-2">More</button>
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
                        />
                    })
                }
            </CardBody>
            <CardFooter>
                <h5>Price: BDT</h5>
            </CardFooter>
        </Card>

    )
}

export default Controls 