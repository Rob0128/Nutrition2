import { Container, Row, Col } from 'react-bootstrap';
import { NextUIProvider } from '@nextui-org/react';
import GetLimits from './GetLimits';
import ShowProducts from './ShowProducts';
import SearchProducts from './SearchProducts';
import ShowShoppingList from './ShowShoppingList';

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
const LOCAL_CARB_TOTALS = 'nutritionfe.carbTotals'

const LOCAL_SUGAR_LIMIT_KEY = 'nutritionfe.sugarlimit'
const LOCAL_SUGAR_CALC_KEY = 'nutritionfe.sugarlimit'
const LOCAL_SUGAR_TOTALS = 'nutritionfe.sugarTotals'

const LOCAL_FAT_TOT_LIMIT_KEY = 'nutritionfe.fattotlimit'
const LOCAL_FAT_CALC_KEY = 'nutritionfe.fattotlimit'
const LOCAL_FAT_TOTALS = 'nutritionfe.fatTotals'

const LOCAL_FAT_SAT_LIMIT_KEY = 'nutritionfe.fatsatlimit'
const LOCAL_FAT_SAT_CALC_KEY = 'nutritionfe.fatsatlimit'
const LOCAL_FAT_SAT_TOTALS = 'nutritionfe.fatSatTotals'

const LOCAL_PROTEIN_LIMIT_KEY = 'nutritionfe.proteinlimit'
const LOCAL_PROTEIN_CALC_KEY = 'nutritionfe.proteinlimit'
const LOCAL_PROTEIN_TOTALS = 'nutritionfe.proteinTotals'

const LOCAL_PRODS_KEY = 'nutritionfe.prods'
const LOCAL_LIMIT = 'nutritionfe.limit'
const LOCAL_INDEX = 'nutritionfe.index'

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
    const storedCarbTotals = JSON.parse(localStorage.getItem(LOCAL_CARB_TOTALS)) || [];
    var [carbTotals, setCarbTotals] = useState(storedCarbTotals);

    const storedSugarLimit = JSON.parse(localStorage.getItem(LOCAL_SUGAR_LIMIT_KEY)) || [];
    const [sugarLimit, setSugarLimits] = useState(storedSugarLimit);
    const storedSugarCalc = JSON.parse(localStorage.getItem(LOCAL_SUGAR_CALC_KEY)) || [];
    const [sugarCalc, setSugarCalc] = useState(storedSugarCalc);
    const storedSugarTotals = JSON.parse(localStorage.getItem(LOCAL_SUGAR_TOTALS)) || [];
    var [sugarTotals, setSugarTotals] = useState(storedSugarTotals);

    const storedFatTotLimit = JSON.parse(localStorage.getItem(LOCAL_FAT_TOT_LIMIT_KEY)) || [];
    const [fatLimit, setFatLimits] = useState(storedFatTotLimit);
    const storedFatCalc = JSON.parse(localStorage.getItem(LOCAL_FAT_CALC_KEY)) || [];
    const [fatCalc, setFatCalc] = useState(storedFatCalc);
    const storedFatTotals = JSON.parse(localStorage.getItem(LOCAL_FAT_TOTALS)) || [];
    var [fatTotals, setFatTotals] = useState(storedFatTotals);

    const storedFatSatLimit = JSON.parse(localStorage.getItem(LOCAL_FAT_SAT_LIMIT_KEY)) || [];
    const [fatSatLimit, setFatSatLimits] = useState(storedFatSatLimit);
    const storedFatSatCalc = JSON.parse(localStorage.getItem(LOCAL_FAT_SAT_CALC_KEY)) || [];
    const [fatSatCalc, setFatSatCalc] = useState(storedFatSatCalc);
    const storedFatSatTotals = JSON.parse(localStorage.getItem(LOCAL_FAT_SAT_TOTALS)) || [];
    var [fatSatTotals, setFatSatTotals] = useState(storedFatSatTotals);

    const storedProteinLimit = JSON.parse(localStorage.getItem(LOCAL_PROTEIN_LIMIT_KEY)) || [];
    const [proteinLimit, setProteinLimits] = useState(storedProteinLimit);
    const storedProteinCalc = JSON.parse(localStorage.getItem(LOCAL_PROTEIN_CALC_KEY)) || [];
    const [proteinCalc, setProteinCalc] = useState(storedProteinCalc);
    const storedProteinTotals = JSON.parse(localStorage.getItem(LOCAL_PROTEIN_TOTALS)) || [];
    var [proteinTotals, setProteinTotals] = useState(storedProteinTotals);

    const storedLimits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const [limits, setLimits] = useState(storedLimits);

    

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

        const storedLimits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedLimits) setLimits(storedLimits)

        setIndex(1);
        
        setCarbTotals(0.0);
        setSugarTotals(0.0);
        setFatTotals(0.0);
        setFatSatTotals(0.0);
        setProteinTotals(0.0);

    axios.get('/home').then(res => {
            console.log(res.data)   
            setProds(res.data)
        })
    }, []) 

    useEffect(() => {
        search("")
    }, [carbCalc, fatCalc, fatSatCalc, sugarCalc, proteinCalc])

    useEffect(() => {
        if (carbLimit.value > 0.0) {
            var newAmount = parseFloat(carbLimit.value - carbTotals).toFixed(1);
            setCarbCalc(newAmount);
        }
        else {
            setCarbCalc(0.0);
        }
        if (sugarLimit.value > 0.0) {
            var newAmount = parseFloat(sugarLimit.value - sugarTotals).toFixed(1);
            setSugarCalc(newAmount);
        }
        else {
            setSugarCalc(0.0);
        }
        if (fatLimit.value > 0.0) {
            var newAmount = parseFloat(fatLimit.value - fatTotals).toFixed(1);
            setFatCalc(newAmount);
        }
        else {
            setFatCalc(0.0);
        }
        if (fatSatLimit.value > 0.0) {
            var newAmount = parseFloat(fatSatLimit.value - fatSatTotals).toFixed(1);
            setFatSatCalc(newAmount);
        }
        else {
            setFatSatCalc(0.0);
        }
        if (proteinLimit.value > 0.0) {
            var newAmount = parseFloat(proteinLimit.value - proteinTotals).toFixed(1);
            setProteinCalc(newAmount);
        }
        else {
            setProteinCalc(0);
        }
        search();

    }, [shoppingList, carbTotals, carbLimit, sugarTotals, sugarLimit, fatTotals, fatLimit, fatSatTotals, fatSatLimit, proteinTotals, proteinLimit])

   

    const search = (e) => {
        
        const formData = new FormData();
        formData.append('keyword', 'test@gmail.com');
        const url = "https://localhost:7149/home?keyword=";
        if (e == "") {
            var postUrl = url.concat("empty");
        }
        else {
            debugger;
            var postUrl = url.concat(e);
        }
            if (fatLimit.value != null) {
                postUrl = postUrl.concat("&fat_tot=" + String(fatCalc))
            }
            if (carbLimit.value != null) {
                postUrl = postUrl.concat("&carb=" + String(carbCalc))
            }
            if (fatSatLimit.value != null) {
                postUrl = postUrl.concat("&fat_saturated=" + String(fatSatCalc))
            }
            if (sugarLimit.value != null) {
                postUrl = postUrl.concat("&sugar=" + String(sugarCalc))
            }
            if (proteinLimit.value != null) {
                postUrl = postUrl.concat("&protein=" + String(proteinCalc))
            }
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

    };

    const handleSetLimits = (element, val) => {
        const value = val
        if (value === '') return
        switch (element) {
            case "carb":
                setCarbLimits(prevLimits => { return { value: value } })
                break;
            case "sugar":
                setSugarLimits(prevLimits => { return { value: value } })
                break;
            case "fat":
                setFatLimits(prevLimits => { return { value: value } })
                break;
            case "fatSat":
                setFatSatLimits(prevLimits => { return { value: value } })
                break;
            case "protein":
                setProteinLimits(prevLimits => { return { value: value } })
                break;
        }
    }

    function clearLimits() {
        const newLimits = []
        setCarbLimits(newLimits)
        setSugarLimits(newLimits)
        setFatLimits(newLimits)
        setFatSatLimits(newLimits)
        setProteinLimits(newLimits)
    }
    function totalsFigure(totals, unit) {
        return ((parseFloat(totals) + parseFloat(unit)).toFixed(1))
    }

    const handleAdd = (e) => {

        let itemToAdd = Object.assign({}, e);
        itemToAdd.newIndex = index;
        var newIndex = parseInt(index) + 1;

        if (e.carb > 0.0) {
            setCarbTotals(totalsFigure(carbTotals, e.carb));
        }
        if (e.sugar > 0.0) {
            setSugarTotals(totalsFigure(sugarTotals, e.sugar));
        }
        if (e.fat_total > 0.0) {
            setFatTotals(totalsFigure(fatTotals, e.fat_total));
        }
        if (e.fat_saturated > 0.0) {
            setFatSatTotals(totalsFigure(fatSatTotals, e.fat_saturated));
        }
        if (e.protein > 0.0) {
            setProteinTotals(totalsFigure(proteinTotals, e.protein));
        }
        setIndex(newIndex);

        if (shoppingList.length > 0.0) {
            setShoppingList([...shoppingList, itemToAdd]);
        }
        else {
            setShoppingList([itemToAdd]);
        }
        return itemToAdd.newIndex
    }


    const handleRemove = (e) => {
        setCarbTotals(carbTotals = (carbTotals - parseFloat(e.carb)).toFixed(1));
        setSugarTotals(sugarTotals = (sugarTotals - parseFloat(e.sugar)).toFixed(1));
        setFatTotals(fatTotals = (fatTotals - parseFloat(e.fat_total)).toFixed(1));
        setFatSatTotals(fatSatTotals = (fatSatTotals - parseFloat(e.fat_saturated)).toFixed(1));
        setProteinTotals(proteinTotals = (proteinTotals - parseFloat(e.protein)).toFixed(1));
                
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

    function openTabs(prod) {
        window.open(prod.item_link, '_blank').focus();
    }

    return (
        
        <Container fluid>
               
                <Row className='breakBar'>
                </Row>

            <Row className=''>
                <Col sm={1}>
                </Col>
                <Col sm={9}>
                    <SetLimits limits={limits} carbLimit={carbLimit} carbCalc={carbCalc} carbTotals={carbTotals} sugarLimit={sugarLimit} sugarCalc={sugarCalc} sugarTotals={sugarTotals} fatLimit={fatLimit} fatCalc={fatCalc} fatTotals={fatTotals} fatSatLimit={fatSatLimit} fatSatCalc={fatSatCalc} fatSatTotals={fatSatTotals} handleSetLimits={handleSetLimits} clearLimits={clearLimits} proteinLimit={proteinLimit} proteinCalc={proteinCalc} proteinTotals={proteinTotals} />
                <GetLimits limits={limits} />
                </Col>
                </Row>

            <Row>
                <Row className='breakBar'>
                </Row>
                </Row>
            <Row>
                <Col sm={1}>
                    </Col>
                <Col sm={10}>
                    <div className='searchBox'>
                        <h2 className='searchText'>Search products</h2>
                        <div className="searchBarDiv">
                        <SearchProducts className='searchBar' search={search} />
                            </div>
                        <div className='shoppingButtonBox'>

                        <button className="rounded shoppingButton" varient="outline-primary" onClick={() => handleCheckout()}>Checkout</button>
                        

                        <button onClick={() => openCart()} className="rounded shoppingButton" varient="outline-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="" width="" height="" viewBox="0 0 32 32" version="1.1">
                                <title>shopping-basket</title>
                                <path d="M30 13.25h-5.572l-5.723-10.606c-0.129-0.236-0.376-0.394-0.66-0.394-0.414 0-0.75 0.336-0.75 0.75 0 0.131 0.033 0.253 0.092 0.36l-0.002-0.004 5.338 9.894h-13.415l5.395-9.891c0.055-0.101 0.087-0.222 0.087-0.35 0-0.414-0.336-0.75-0.75-0.75-0.279 0-0.522 0.152-0.651 0.377l-0.002 0.004-5.787 10.609h-5.6c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h1.389l1.913 14.35c0.050 0.369 0.364 0.65 0.742 0.65 0 0 0 0 0.001 0h20c0.379-0 0.693-0.281 0.744-0.646l0-0.004 1.913-14.35h1.298c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM25.389 28.25h-18.688l-1.8-13.5h22.287zM16.044 17.25h-0.004c0 0 0 0 0 0-0.413 0-0.748 0.334-0.75 0.746v0l-0.035 7c0 0.001 0 0.002 0 0.004 0 0.413 0.334 0.748 0.746 0.75h0.004c0.413-0 0.747-0.334 0.75-0.746v-0l0.035-7c0-0.001 0-0.002 0-0.004 0-0.413-0.334-0.748-0.746-0.75h-0zM11.065 17.25h-0.004c0 0 0 0 0 0-0.413 0-0.748 0.334-0.75 0.746v0l-0.034 7c0 0.001 0 0.002 0 0.004 0 0.413 0.334 0.748 0.746 0.75h0.004c0.413-0 0.747-0.334 0.75-0.746v-0l0.034-7c0-0.001 0-0.002 0-0.004 0-0.413-0.334-0.748-0.746-0.75h-0zM21.016 17.25h-0.004c0 0 0 0 0 0-0.413 0-0.748 0.334-0.75 0.746v0l-0.033 7c0 0.001 0 0.002 0 0.004 0 0.413 0.334 0.748 0.746 0.75h0.004c0.413-0 0.747-0.334 0.75-0.746v-0l0.033-7c0-0.001 0-0.003 0-0.004 0-0.413-0.334-0.748-0.746-0.75h-0z" />
                            </svg>
                                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", bottom: "0", right: "0", transform: "translate(+25%, +25%)" }}>{shoppingList.length}</div>
                            </button>
                        </div>

                    </div>

                        <ShowProducts prods={prods} handleAdd={handleAdd} handleAddIndex={handleAddIndex} />
                        
                    </Col>
                    
                    
                <Col sm={3} className="rightDiv">
                    
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

