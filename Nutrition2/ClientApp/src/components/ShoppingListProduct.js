import React from 'react'
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';

export default function ShoppingListProduct({ listItem, handleRemove, cartClose }) {
    return (

        <tr>
            <td><p>{listItem.title}</p><p>Carbs: {listItem.carb}</p></td><td><Button variant="info" id={listItem.id} onHide={cartClose} onClick={() => handleRemove(listItem)} >Remove</Button></td>
        </tr>
    )
}