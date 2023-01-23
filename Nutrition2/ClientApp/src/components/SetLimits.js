import React, { useRef, useEffect } from 'react';
import Limit from "./Limit";
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';


export default function SetLimits({ limits, handleSetLimits, handleSetFatLimit, handleSetCarbLimit, clearLimits, carbLimit, fatLimit}) {

    const carbRef = useRef()
    const fatRef = useRef()

    useEffect(() => {
        carbRef.current.value = null
    }, [handleSetCarbLimit])

    useEffect(() => {
        fatRef.current.value = null
    }, [handleSetFatLimit])

    function callUpdates(carbVal, fatVal) {
        if (carbVal != null) {
            handleSetLimits("carb", carbVal)
        }
        if (fatVal != null) {
            handleSetLimits("fat", fatVal)
        }
    }

    return (
        <div>
        <Table className="boxStyle" striped="columns" hover>
        <thead>
          <tr>
            <th>Carbs</th>
            <th>Fat</th>
            <th>Saturated Fat</th>
            <th>Protein</th>
            <th>Salt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><InputGroup className="mb-3 inputWidth" size="sm">
                <Form.Control
                  placeholder="Limit"
                  aria-label="Carbs"
                  aria-describedby=""
                  ref={carbRef} type="number"
                />
                {/*<Button variant="outline-secondary" onClick={() => handleSetCarbLimit("carb", limitNameRef.current.value)}>
                  Set
                </Button>*/}
              </InputGroup>
              </td>
              <td>
              <InputGroup className="mb-3 inputWidth" size="sm">
                <Form.Control
                  placeholder="Limit"
                  aria-label="Fat"
                  aria-describedby=""
                  ref={fatRef} type="number"
                />
                {/*<Button variant="outline-secondary" onClick={() => handleSetCarbLimit("carb", limitNameRef.current.value)}>
                  Set
                </Button>*/}
              </InputGroup>
            </td>
                        <td>
                            <InputGroup className="mb-3 inputWidth" size="sm">
                                <Form.Control
                                    placeholder="Limit"
                                    aria-label="Fat"
                                    aria-describedby=""
                                    ref={fatRef} type="number"
                                />
                                {/*<Button variant="outline-secondary" onClick={() => handleSetCarbLimit("carb", limitNameRef.current.value)}>
                  Set
                </Button>*/}
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup className="mb-3 inputWidth" size="sm">
                                <Form.Control
                                    placeholder="Limit"
                                    aria-label="Fat"
                                    aria-describedby=""
                                    ref={fatRef} type="number"
                                />
                                {/*<Button variant="outline-secondary" onClick={() => handleSetCarbLimit("carb", limitNameRef.current.value)}>
                  Set
                </Button>*/}
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup className="mb-3 inputWidth" size="sm">
                                <Form.Control
                                    placeholder="Limit"
                                    aria-label="Fat"
                                    aria-describedby=""
                                    ref={fatRef} type="number"
                                />
                                {/*<Button variant="outline-secondary" onClick={() => handleSetCarbLimit("carb", limitNameRef.current.value)}>
                  Set
                </Button>*/}
                            </InputGroup>
                        </td>
          </tr>
          <tr>
            <td>{carbLimit.value}</td>
            <td>{fatLimit.value}</td>
            <td>Thornton</td>
          </tr>
          
        </tbody>
            </Table>
            {/* Will need to set all values not just carbs */}   
            <div className="setButton">
                <Button variant="outline-secondary" onClick={() => callUpdates(carbRef.current.value, fatRef.current.value)}>
                Set
                </Button>
                </div>
      </div>
    );
}