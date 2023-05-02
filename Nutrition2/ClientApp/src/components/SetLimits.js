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
            <Table className="boxStyle" striped hover>
                <thead>
                    <tr>
                        <th className=""></th>
                        <th>Set Limits</th>
                        <th>Limits</th>
                        <th>Remaining</th>
                        <th>Totals</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="">
                        <td className="mb-2">Carbs</td>
                        <td>
                            <InputGroup className="mb-3 inputWidth" size="sm">
                                <Form.Control
                                    placeholder="Limit"
                                    aria-label="Carbs"
                                    aria-describedby=""
                                    ref={carbRef}
                                    type="number"
                                />
                            </InputGroup>
                        </td>
                        <td>{carbLimit.value}</td>
                        <td>{carbCalc}</td>
                        <td>{carbTotals}</td>
                    </tr>
                    <tr>
                        <td className="">Sugar</td>
                        <td>
                            <InputGroup className="mb-3 inputWidth" size="sm">
                                <Form.Control
                                    placeholder="Limit"
                                    aria-label="Sugar"
                                    aria-describedby=""
                                    ref={sugarRef}
                                    type="number"
                                />
                            </InputGroup>
                        </td>
                        <td>{sugarLimit.value}</td>
                        <td>{sugarCalc}</td>
                        <td>{sugarTotals}</td>
                    </tr>
                    <tr>
                        <td className="">Fat Total</td>
                        <td>
                            <InputGroup className="mb-3 inputWidth" size="sm">
                                <Form.Control
                                    placeholder="Limit"
                                    aria-label="Fat"
                                    aria-describedby=""
                                    ref={fatRef}
                                    type="number"
                                />
                            </InputGroup>
                        </td>
                        <td>{fatLimit.value}</td>
                        <td>{fatCalc}</td>
                        <td>{fatTotals}</td>
                    </tr>
                    <tr>
                        <td className="">Saturated Fat</td>
                        <td>
                            <InputGroup className="mb-3 inputWidth" size="sm">
                                <Form.Control
                                    placeholder="Limit"
                                    aria-label="FatSat"
                                    aria-describedby=""
                                    ref={fatSatRef}
                                    type="number"
                                />
                            </InputGroup>
                        </td>
                        <td>{fatSatLimit.value}</td>
                        <td>{fatSatCalc}</td>
                        <td>{fatSatTotals}</td>
                    </tr>
                    <tr>
                        <td className="">Protein</td>
                        <td>
                            <InputGroup className="mb-3 inputWidth" size="sm">
                                <Form.Control
                                    placeholder="Limit"
                                    aria-label="Protein"
                                    aria-describedby=""
                                    ref={proteinRef}
                                    type="number"
                                />
                            </InputGroup>
                        </td>
                        <td>{proteinLimit.value}</td>
                        <td>{proteinCalc}</td>
                        <td>{proteinTotals}</td>
                    </tr>
                </tbody>
            </Table>
            <div className="setButton">
                <Button
                    variant="outline-secondary"
                    className="setButtonDiv"
                    onClick={() =>
                        callUpdates(
                            carbRef.current.value,
                            sugarRef.current.value,
                            fatRef.current.value,
                            fatSatRef.current.value,
                            proteinRef.current.value
                        )
                    }
                >
                    Set
                </Button>
                <Button
                    variant="outline-secondary"
                    className="clearButton"
                    onClick={() => clearLimits()}
                >Clear</Button>
                </div>
      </div>
    );
}