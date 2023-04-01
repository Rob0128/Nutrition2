import React, { useRef, useEffect } from 'react';
import Limit from "./Limit";
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';


export default function SetLimits({ limits, handleSetLimits, handleSetFatLimit, handleSetCarbLimit, clearLimits, carbLimit, carbCalc, carbTotals, sugarLimit, sugarCalc, sugarTotals, fatCalc, fatLimit, fatTotals, fatSatCalc, fatSatLimit, fatSatTotals, proteinLimit, proteinCalc, proteinTotals }) {

    const carbRef = useRef()
    const sugarRef = useRef()
    const fatRef = useRef()
    const fatSatRef = useRef()
    const proteinRef = useRef()

    useEffect(() => {
        carbCalc.value = null
        sugarCalc.value = null
        fatCalc.value = null
        fatSatCalc.value = null
        proteinCalc.value = null
    }, [])

    useEffect(() => {
        carbRef.current.value = null
        sugarRef.current.value = null
        fatRef.current.value = null
        fatSatRef.current.value = null
        proteinRef.current.value = null
    }, [handleSetLimits])

    function callUpdates(carbVal, sugarVal, fatVal, fatSatVal, proteinVal) {
        if (carbVal != null) {
            handleSetLimits("carb", carbVal)
        }
        if (sugarVal != null) {
            handleSetLimits("sugar", sugarVal)
        }
        if (fatVal != null) {
            handleSetLimits("fat", fatVal)
        }
        if (fatSatVal != null) {
            handleSetLimits("fatSat", fatSatVal)
        }
        if (proteinVal != null) {
            handleSetLimits("protein", proteinVal)
        }
    }

    return (
        <div>
        <Table className="boxStyle" striped="columns" hover>
        <thead>
          <tr>
            <th></th>
            <th>Carbs</th>
            <th>sugar</th>
            <th>Fat</th>
            <th>Saturated Fat</th>
            <th>Protein</th>
          </tr>
        </thead>
                <tbody>
                    
            <tr className="highlightedRow">
            <td class="setLimitsSideHeaders">Set Limits</td>
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
                    <InputGroup className="mb-3 inputWidth" size="sm">
                        <Form.Control
                            placeholder="Limit"
                            aria-label="FatSat"
                            aria-describedby=""
                            ref={fatSatRef} type="number"
                        />

                    </InputGroup>
                </td>
                <td><InputGroup className="mb-3 inputWidth" size="sm">
                    <Form.Control
                        placeholder="Limit"
                        aria-label="Protein"
                        aria-describedby=""
                        ref={proteinRef} type="number"
                    />

                </InputGroup>
                </td>
                       
          </tr>
                    <tr>
            <td class="setLimitsSideHeaders">Limits</td>
            <td>{carbLimit.value}</td>
            <td>{sugarLimit.value}</td>
            <td>{fatLimit.value}</td>
            <td>{fatSatLimit.value}</td>
            <td>{proteinLimit.value}</td>

        </tr>
        <tr>
            <td class="setLimitsSideHeaders">Remaining</td>
            <td>{carbCalc}</td>
            <td>{sugarCalc}</td>
            <td>{fatCalc}</td>
            <td>{fatSatCalc}</td>
            <td>{proteinCalc}</td>

        </tr>
        <tr>
            <td class="setLimitsSideHeaders">Totals</td>
            <td>{carbTotals}</td>
            <td>{sugarTotals}</td>
            <td>{fatTotals}</td>
            <td>{fatSatTotals}</td>
            <td>{proteinTotals}</td>

        </tr>
          
        </tbody>
            </Table>
            {/* Will need to set all values not just carbs */}   
            <div className="setButton">
                <Button variant="outline-secondary" onClick={() => callUpdates(carbRef.current.value, sugarRef.current.value, fatRef.current.value, fatSatRef.current.value, proteinRef.current.value)}>
                Set
                </Button>
                </div>
      </div>
    );
}