import React from "react";
import Product from "./Product";
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';


export default function ShowProduct({ prods, handleAdd }) {
    return (
        <Container>
            <Table>
                <tbody>
                    {prods.map(prod => { return <Product key={prod.id} prod={prod} handleAdd={handleAdd} /> })}
                </tbody>
        </Table>    
        </Container>
    );
}