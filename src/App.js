/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import { GLOBAL } from './constants/global';
import { API } from './constants/api';
import './App.css';
import '../node_modules/bootstrap-css-only/css/bootstrap.css';
import List from './components/List';
import Modal from './components/Modal';

function App() {
  const { TITLE } = GLOBAL;
  const { URL, QTY, PAGE1, PAGE2 } = API;
  const [ list, setList ] = useState();
  const [ option, setOption ] = useState();
  const [ loaded, setLoaded ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ details, setDetails ] = useState([]);
  const [ toggle, setToggle ] = useState(false);
  const axios = require('axios');

  const sortData = (option) => {
    let updatedList;
    setToggle(false);

    switch(option) {
      case 'Name':
        updatedList = list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Type':
        updatedList = list.sort((a, b) => a.brewery_type.localeCompare(b.brewery_type));
        break;
        case 'State':
          updatedList = list.sort((a, b) => a.state.localeCompare(b.state));
        break;
      default:
    } 
    setList(updatedList);
    setOption(option);
  }

  const firstList = () => {
    return axios.get(`${URL + QTY + PAGE1}`);
  }
  
  const secondList = () => {
    return axios.get(`${URL + QTY + PAGE2}`);
  }
  
  const getData = () => {
    axios.all([firstList(), secondList()])
    .then(axios.spread(function (first, second) {
      const data = [ ...first.data, ...second.data ];
      setList(data);
      setLoaded(true);
    }));
  }

  const getDetails = (id) => {
      const selectedDetails = list.filter(x => x.id === id);
      setDetails(selectedDetails);
      setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }
  
  useEffect(() => {
    if (!loaded) {
      getData();
    }
  }, [loaded, option, details]);

  return (
    <div className="container">
      <h1 data-testid="title">{ TITLE }</h1>
      
      { !loaded && <div data-testid="loading">Loading table...</div> }
      { loaded && 

      <React.Fragment>
        { modal && <Modal closeModal={ closeModal } details={ details } /> }
        <Filter sortData={ sortData } setToggle={setToggle} toggle={toggle} option={ option } />
        <table data-testid="table" className="table table-bordered table-striped">
          <Header />
          <List 
            list={ list } 
            getDetails={ getDetails }
          />
        </table>
      </React.Fragment>
      }
    </div>
  );
}

export default App;
