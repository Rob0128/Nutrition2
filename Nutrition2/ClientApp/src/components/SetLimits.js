import React, { useRef, useEffect } from 'react';
import Limit from "./Limit";
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';


export default function SetLimits({limits, handleSetLimits, clearLimits, carbLimit, handleSetCarbLimit}) {

    const limitNameRef = useRef()

    useEffect(() => {
        limitNameRef.current.value = null
          }, [handleSetLimits])

    return (
        <div>
        <Table className="boxStyle" striped="columns" hover>
        <thead>
          <tr>
            <th>Nutrition</th>
            <th>Set</th>
            <th>Limits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Carbs</td>
            <td><InputGroup className="mb-3 inputWidth" size="sm">
        <Form.Control
          placeholder="Limit"
          aria-label="Carbs"
          aria-describedby=""
          ref={limitNameRef} type="number"
        />
        {/*<Button variant="outline-secondary" onClick={() => handleSetCarbLimit("carb", limitNameRef.current.value)}>
          Set
        </Button>*/}
      </InputGroup>
      </td>
            <td>{carbLimit.value}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
          </tr>
        </tbody>
            </Table>
            {/* Will need to set all values not just carbs */}   
            <div className="setButton">
               <Button variant="outline-secondary" onClick={() => handleSetCarbLimit("carb", limitNameRef.current.value)}>
                Set
                </Button>
                </div>
      </div>
    );
}