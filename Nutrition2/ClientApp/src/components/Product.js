import React from 'react'
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';

export default function Product({ prod, handleAdd }) {
    return (

            <tr>
            <td><p>{prod.title}</p><p>Carbs: {prod.carb}</p></td><td><Button variant="info" id={prod.id} onClick={() => handleAdd(prod)}>Add</Button></td>
            </tr>
    )
}
