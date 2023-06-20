import React, { Component, useState, useEffect } from 'react'
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios';

import Navbar from "./components/Nav";

import CowsList from './components/cowsList';
import CowDetail from './components/cowDetail';
import Sidbar from './components/Sidbar';
import AddCow from './components/addCow';
import CowMilk from './components/cowMilk';
import CowChildren from './components/cowChildren';





export default function App (){
    const url = 'http://localhost:3001/'
    const [cows, setCows] = useState([]);
    const [milk, setMilk] = useState([])
    const [children, setChildren] = useState([])

    const getData = async () => {

      await axios.get(`${url}cows`)
        .then((response)=>{
          setCows(response.data)
        }).catch(error => console.error({error}))
      
        await axios.get(`${url}milk`)
      .then((response)=>{
        setMilk(response.data)
      }).catch(error => console.error({error}))
      
      await axios.get(`${url}children`)
      .then((response)=>{
        setChildren(response.data)
      }).catch(error => console.error({error}))
      
    }


    useEffect(()=>{
      const interval = setInterval(() => {
        getData();
      }, 2000); 
    
      return () => clearInterval(interval);
    }, []);

    return (
      <div className='App'>
      <Navbar/>
      <div className='Content'>
        <Sidbar/>
        <Routes>
          <Route path="/cows" element={ <CowsList cows={cows} /> } />
          <Route path="/cows/exams/:id" element={ <CowDetail/> } />
          <Route path="/add" element={ <AddCow/> } />
          <Route path="/milk" element={ <CowMilk milk={milk} /> } />
          <Route path="/children" element={ <CowChildren children={children} />  } />

          

        </Routes>
      </div>
      
      </div>

    )
  }
