import { Table } from "@nextui-org/react";
import React, { useRef, useEffect } from 'react';
import Limit from "./Limit";
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';

export default function App({ handleSetCarbLimit }) {

    const carbRef = useRef();
    const fatRef = useRef();

  return (
    <Table
      aria-label="Example static collection table"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="single"
    >
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>ROLE</Table.Column>
        <Table.Column>STATUS</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="1">
          <Table.Cell>Tony Reichert</Table.Cell>
                  <Table.Cell><InputGroup className="mb-3 inputWidth" size="sm">
                      <Form.Control
                          placeholder="Limit"
                          aria-label="Carbs"
                          aria-describedby=""
                          ref={carbRef} type="number"
                      />
                      <Button variant="outline-secondary" onClick={() => handleSetCarbLimit("carb", carbRef.current.value)}>
                          Set
                      </Button>
                  </InputGroup></Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row key="2">
          <Table.Cell>Zoey Lang</Table.Cell>
          <Table.Cell>Technical Lead</Table.Cell>
          <Table.Cell>Paused</Table.Cell>
        </Table.Row>
        <Table.Row key="3">
          <Table.Cell>Jane Fisher</Table.Cell>
          <Table.Cell>Senior Developer</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row key="4">
          <Table.Cell>William Howard</Table.Cell>
          <Table.Cell>Community Manager</Table.Cell>
          <Table.Cell>Vacation</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
