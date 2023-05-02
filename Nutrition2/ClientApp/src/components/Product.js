import React from 'react'
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';

export default function Product({ prod, handleAdd }) {
    return (

            <tr>
            <td><p className="productinfoHeader">{prod.title}</p><p className="productinfo">Carbs: {prod.carb} | Fat Total: {prod.fat_total} | Fat Saturated: {prod.fat_saturated} | Sugar: {prod.sugar} | Protein: {prod.protein} </p></td><td><Button variant="info" id={prod.id} onClick={() => handleAdd(prod)}>Add</Button></td>
            </tr>
    )
}
