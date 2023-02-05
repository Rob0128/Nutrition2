import React, { useRef, useEffect } from 'react';
import Limit from "./Limit";
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';


export default function SetLimits({ limits, handleSetLimits, handleSetFatLimit, handleSetCarbLimit, clearLimits, carbLimit, carbCalc, carbTotals, sugarLimit, sugarCalc, sugarTotals, fatCalc, fatLimit, fatTotals }) {

    const carbRef = useRef()
    const sugarRef = useRef()
    const fatRef = useRef()

    useEffect(() => {
        carbRef.current.value = null
        sugarRef.current.value = null
        fatRef.current.value = null
    }, [handleSetLimits])

    function callUpdates(carbVal, sugarVal, fatVal) {
        if (carbVal != null) {
            handleSetLimits("carb", carbVal)
        }
        if (sugarVal != null) {
            handleSetLimits("sugar", sugarVal)
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
            <th>sugar</th>
            <th>Fat</th>
            <th>Saturated Fat</th>
            <th>Protein</th>
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
              
              </InputGroup>
            </td>
            <td><InputGroup className="mb-3 inputWidth" size="sm">
                <Form.Control
                    placeholder="Limit"
                    aria-label="Sugar"
                    aria-describedby=""
                    ref={sugarRef} type="number"
                />

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
                
              </InputGroup>
            </td>
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                       
          </tr>
          <tr>
            <td>{carbLimit.value}</td>
            <td>{sugarLimit.value}</td>
            <td>{fatLimit.value}</td>
            <td></td>
        </tr>
        <tr>
            <td>{carbCalc}</td>
            <td>{sugarCalc}</td>
            <td>{fatCalc}</td>
            <td></td>
        </tr>
        <tr>
            <td>{carbTotals}</td>
            <td>{sugarTotals}</td>
            <td>{fatTotals}</td>
            <td></td>
        </tr>
          
        </tbody>
            </Table>
            {/* Will need to set all values not just carbs */}   
            <div className="setButton">
                <Button variant="outline-secondary" onClick={() => callUpdates(carbRef.current.value, sugarRef.current.value, fatRef.current.value)}>
                Set
                </Button>
                </div>
      </div>
    );
}