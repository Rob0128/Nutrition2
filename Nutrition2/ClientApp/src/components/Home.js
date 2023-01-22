import { Container, Row, Col } from 'react-bootstrap';
import { NextUIProvider } from '@nextui-org/react';
import GetLimits from './GetLimits';
import ShowProducts from './ShowProducts';
import SearchProducts from './SearchProducts';
import ShowShoppingList from './ShowShoppingList';
import Totals from './Totals';
import axios from 'axios';

import { Route, Routes } from 'react-router-dom';
import AuthorizeRoute from './api-authorization/AuthorizeRoute';
import { Layout } from './Layout';
import './index.css';

import React, { useState, useRef, useEffect, Component } from 'react';
import SetLimits from './SetLimits';
import MyComponent from './MyComponent';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'nutritionfe.limits'
const LOCAL_CARB_LIMIT_KEY = 'nutritionfe.carblimit'
const LOCAL_CARB_CALC_KEY = 'nutritionfe.carblimit'
const LOCAL_FAT_TOT_LIMIT_KEY = 'nutritionfe.fattotlimit'
const LOCAL_PRODS_KEY = 'nutritionfe.prods'
const LOCAL_LIMIT = 'nutritionfe.limit'
const LOCAL_INDEX = 'nutritionfe.index'
const LOCAL_TOTALS = 'nutritionfe.totals'

//regular consts
const CARB_INDEX = 0;


export function Home({ Component, pageProps }) {
 
    //react consts
    const displayName = Home.name;

    //set nutrition limits and their running total calculation based on shopping list and use set limits
    const storedCarbLimit = JSON.parse(localStorage.getItem(LOCAL_CARB_LIMIT_KEY)) || [];
    const [carbLimit, setCarbLimits] = useState(storedCarbLimit);
    const storedCarbCalc = JSON.parse(localStorage.getItem(LOCAL_CARB_CALC_KEY)) || [];
    const [carbCalc, setCarbCalc] = useState(storedCarbCalc);

    const storedFatTotLimit = JSON.parse(localStorage.getItem(LOCAL_FAT_TOT_LIMIT_KEY)) || [];
    const [fatLimit, setFatLimits] = useState(storedFatTotLimit);

    const storedLimits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const [limits, setLimits] = useState(storedLimits);

    const storedTotals = JSON.parse(localStorage.getItem(LOCAL_TOTALS)) || [];
    var [totals, setTotals] = useState(storedTotals);

    const storedProds = JSON.parse(localStorage.getItem(LOCAL_PRODS_KEY)) || [];

    const storedIndex = JSON.parse(localStorage.getItem(LOCAL_INDEX)) || [];
    
    var [prods, setProds] = useState([]);
    var [shoppingList, setShoppingList] = useState([]);
    const [index, setIndex] = useState(storedIndex);
    var addingIndex = 0;

    var [isOpen, setIsOpen] = useState(false);


    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    useEffect(() => {
        console.log("hi")

        const storedLimits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedLimits) setLimits(storedLimits)

        setIndex(1);

        setTotals(0);

        axios.get('https://localhost:7149/home').then(res => {
            console.log(res.data)   
            setProds(res.data)
        })
    }, []) 

    useEffect(() => {
        console.log("saved")
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(limits))
    }, [limits])

    useEffect(() => {
        if (carbLimit.value > 0) {
            var newAmount = carbLimit.value - totals;
            setCarbCalc(newAmount);
        }
        else {
            setCarbCalc(0);
        }
        
    }, [totals, shoppingList, carbLimit])

    const handleSetLimits = (e) => {
        const value = e
        if (value === '') return
        setLimits(prevLimits => { return [...prevLimits, { id: uuidv4(), name: "carbs", value: value }] })
    }

    const search = (e) => {
        
        const formData = new FormData();

        formData.append('keyword', 'test@gmail.com');
        const url = "https://localhost:7149/home?keyword=";
        if (e == "") {
            axios.get('https://localhost:7149/home').then(res => {
                console.log(res.data)
                setProds(res.data)
            })
        }
        else {
            const postUrl = url.concat(e);
        
        fetch(postUrl, {
            method: 'post',
            body: formData
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setProds(result);
                }).catch(err => {
                    console.log(err);
                })
        }

    };

    const handleSetCarbLimit = (element, val) => {
        const value = val
        if (value === '') return

        switch (element) {
            case "carb":
                setCarbLimits(prevLimits => { return { value: value } })
                break;
        }
    }

    const handleSetProds = (e) => {
        const value = e
        if (value === '') return
    }

    function clearLimits(e) {
        const newLimits = []
        setLimits(newLimits)
    }

    const handleAdd = (e) => {
        let itemToAdd = Object.assign({}, e);
        itemToAdd.newIndex = index;
        var newIndex = parseInt(index) + 1;

/*        calculateRemainingCarbs(e);
*/
        setTotals(totals = totals + parseInt(e.carb));
        console.log(totals);
        setIndex(newIndex);

        if (shoppingList.length > 0) {
            setShoppingList([...shoppingList, itemToAdd]);
        }
        else {
            setShoppingList([itemToAdd]);
        }
        return itemToAdd.newIndex
    }

    /*function calculateRemainingCarbs(e) {
        if (totals > 0) {
            setCarbCalc()
        }
        setLimits(newLimits)
    }*/

    const handleRemove = (e) => {
        console.log(e);
        setTotals(totals = totals - parseInt(e.carb));

        console.log(shoppingList.filter(item => item.newIndex === e.newIndex));
        console.log(shoppingList.filter(item => item.newIndex !== e.newIndex));
        
        setShoppingList(shoppingList.filter(item => item.newIndex !== e.newIndex));
    }

    const handleAddIndex = (e) => {
        var returnIndex = addingIndex;
        addingIndex++;
        return returnIndex;
     
    }

    const handleCheckout = () => {
        shoppingList.forEach(openTabs);
    }

    /*const handleSave = () => {

        const formData = new FormData();

        formData.append('keyword', 'test@gmail.com');
        const url = "https://localhost:7149/home?keyword=";
        
        const postUrl = url.concat(e);

        fetch(postUrl, {
            method: 'post',
            body: formData
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setProds(result);
                }).catch(err => {
                    console.log(err);
                })
        

    };*/

    function openTabs(prod) {
        window.open(prod.item_link, '_blank').focus();
    }

    return (
        
            
        <Container fluid>
               {/* <div>
                    {prods.map(prod => <h2>{prod.title}</h2>)}
                </div>*/}
               {/* <Row>
                    <Col sm={1}>
                    </Col>
                    <Col sm={5}>


                        <SetLimits limits={limits} carbLimit={carbLimit} handleSetLimits={handleSetLimits} handleSetCarbLimit={handleSetCarbLimit} clearLimits={clearLimits} />
                        <GetLimits limits={limits} />
                    </Col>
                    <Col sm={2}>
                    </Col>
                    <Col sm={3}>
                        <Totals limits={limits} totals={totals} carbLimit={carbLimit} carbCalc={carbCalc} handleSetLimits={handleSetLimits} handleSetCarbLimit={handleSetCarbLimit} clearLimits={clearLimits} />

                    </Col>
                    <Col sm={1}>
                    </Col>
                </Row>*/}
                <Row className='breakBar'>
                </Row>

                <Row className=''>
                </Row>

                <Row>
                </Row>
                <Row>
                <Col sm={8}>
                    <div className='searchBox'>
                    <h2 className='searchText'>Search products</h2>
                        <SearchProducts className='searchBar' search={search} />
                    </div>
                        <ShowProducts prods={prods} handleAdd={handleAdd} handleAddIndex={handleAddIndex} />
                        
                    </Col>
                    
                    
                <Col sm={3} className="rightDiv">
                    <div className='shoppingButtonBox'>
                    <button onClick={() => openCart()} className="rounded shoppingButton" varient="outline-primary" style={{ width: "5rem", height: "3rem", position:"relative" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="" width="" height="" viewBox="0 0 32 32" version="1.1">
                    <title>shopping-basket</title>
                    <path d="M30 13.25h-5.572l-5.723-10.606c-0.129-0.236-0.376-0.394-0.66-0.394-0.414 0-0.75 0.336-0.75 0.75 0 0.131 0.033 0.253 0.092 0.36l-0.002-0.004 5.338 9.894h-13.415l5.395-9.891c0.055-0.101 0.087-0.222 0.087-0.35 0-0.414-0.336-0.75-0.75-0.75-0.279 0-0.522 0.152-0.651 0.377l-0.002 0.004-5.787 10.609h-5.6c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h1.389l1.913 14.35c0.050 0.369 0.364 0.65 0.742 0.65 0 0 0 0 0.001 0h20c0.379-0 0.693-0.281 0.744-0.646l0-0.004 1.913-14.35h1.298c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM25.389 28.25h-18.688l-1.8-13.5h22.287zM16.044 17.25h-0.004c0 0 0 0 0 0-0.413 0-0.748 0.334-0.75 0.746v0l-0.035 7c0 0.001 0 0.002 0 0.004 0 0.413 0.334 0.748 0.746 0.75h0.004c0.413-0 0.747-0.334 0.75-0.746v-0l0.035-7c0-0.001 0-0.002 0-0.004 0-0.413-0.334-0.748-0.746-0.75h-0zM11.065 17.25h-0.004c0 0 0 0 0 0-0.413 0-0.748 0.334-0.75 0.746v0l-0.034 7c0 0.001 0 0.002 0 0.004 0 0.413 0.334 0.748 0.746 0.75h0.004c0.413-0 0.747-0.334 0.75-0.746v-0l0.034-7c0-0.001 0-0.002 0-0.004 0-0.413-0.334-0.748-0.746-0.75h-0zM21.016 17.25h-0.004c0 0 0 0 0 0-0.413 0-0.748 0.334-0.75 0.746v0l-0.033 7c0 0.001 0 0.002 0 0.004 0 0.413 0.334 0.748 0.746 0.75h0.004c0.413-0 0.747-0.334 0.75-0.746v-0l0.033-7c0-0.001 0-0.003 0-0.004 0-0.413-0.334-0.748-0.746-0.75h-0z" />
                    </svg>
                    <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", bottom: "0", right: "0", transform: "translate(+25%, +25%)" } }>3</div>
                    </button>
                
                    <button className="rounded shoppingButton" varient="outline-primary" style={{ width: "5rem", height: "3rem", position: "relative" }} onClick={() => handleCheckout()}>Checkout</button>
                    </div>
                    <div className="rightBoxes">
                    <SetLimits limits={limits} carbLimit={carbLimit} handleSetLimits={handleSetLimits} handleSetCarbLimit={handleSetCarbLimit} clearLimits={clearLimits} />
                    <GetLimits limits={limits} />
                    </div>
                    <div className="rightBoxes">
                    <Totals limits={limits} totals={totals} carbLimit={carbLimit} carbCalc={carbCalc} handleSetLimits={handleSetLimits} handleSetCarbLimit={handleSetCarbLimit} clearLimits={clearLimits} />
                    </div>
                    {/*<div className="shadowDiv">
                    </div>*/}

                    <ShowShoppingList closeCart={closeCart} limits={limits} shoppingList={shoppingList} handleRemove={handleRemove} handleAddIndex={handleAddIndex} cartClose={closeCart} isOpen={isOpen} />
                </Col>
                
                </Row>
                <Row>
                    <Col md>

                    </Col>
                    <Col md>
                        
                    </Col>
                </Row>
            </Container>
        
    );
  
}

