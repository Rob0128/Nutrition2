import React from "react";
import ShoppingListProduct from "./ShoppingListProduct";
import { Container, Row, Col, Button, Table, InputGroup, Form, Offcanvas } from 'react-bootstrap';


export default function ShowShoppingList({ shoppingList, handleRemove, isOpen, closeCart }) {
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping List</Offcanvas.Title>
                </Offcanvas.Header>
            <Table>
                <tbody>

                    {shoppingList.map(listItem => { return <ShoppingListProduct key={listItem.newIndex} listItem={listItem} handleRemove={handleRemove} /> })}
                </tbody>
            </Table>
        </Offcanvas>
    );
}