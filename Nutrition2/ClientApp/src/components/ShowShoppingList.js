import React from "react";
import ShoppingListProduct from "./ShoppingListProduct";
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';


export default function ShowShoppingList({ shoppingList, handleRemove }) {
    return (
        <Container>
            <Table>
                <tbody>
                    {shoppingList.map(listItem => { return <ShoppingListProduct key={listItem.newIndex} listItem={listItem} handleRemove={handleRemove} /> })}
                </tbody>
            </Table>
        </Container>
    );
}