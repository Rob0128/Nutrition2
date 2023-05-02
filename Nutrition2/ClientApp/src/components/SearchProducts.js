import React, { useRef, useEffect } from 'react';
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';


export default function SetLimits({ search }) {

    const searchTerm = useRef()

    useEffect(() => {
        searchTerm.current.value = null
    }, [search])

    return (
        <div>
            <InputGroup className="mb-3 inputWidth" size="sm">
                <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby=""
                    ref={searchTerm} type="text"
                />
                <Button variant="outline-secondary" onClick={() => search(searchTerm.current.value)}>
                    Search
                </Button>
            </InputGroup>
        </div>
    );
}