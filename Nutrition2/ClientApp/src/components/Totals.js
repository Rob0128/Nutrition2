import React, { useRef, useEffect } from 'react';
import Limit from "./Limit";
import { Container, Row, Col, Button, Table, InputGroup, Form } from 'react-bootstrap';


export default function SetLimits({ totals, limits, handleSetLimits, clearLimits, carbLimit, handleSetCarbLimit, carbCalc }) {

    const carbRef = useRef()
    const fatRef = useRef()


    return (
        <div>
            <Table className="boxStyle" striped="columns" hover>
                <thead>
                    <tr>
                        <th>Nutrition</th>
                        <th>Total</th>
                        <th>Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Carbs</td>
                        <td>
                            {totals}
                        </td>
                        <td>{carbCalc}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>newone</td>
                        <td>Thornton</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}