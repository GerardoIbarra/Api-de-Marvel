import './App.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
import Personaje from './personaje.js';

// https://gateway.marvel.com:443/v1/public/characters?apikey=63e0272c56397cac3c65469e436c43b3
// https://gateway.marvel.com:443/v1/public/characters/1533/stories?apikey=63e0272c56397cac3c65469e436c43b3
//key privada:c95c4549ec723b5bfa3c6f0fd49f9b85fb043918
//key publica: 63e0272c56397cac3c65469e436c43b3
//its:1
//1c95c4549ec723b5bfa3c6f0fd49f9b85fb04391863e0272c56397cac3c65469e436c43b3
//hash:08419370c4c0dde739b5ac60e2f1771e
function App() {
  const [aux, setAuxiliar] = useState(0)
  const [personajes, setPersonajes] = useState({
    results:[], total:0
  })

  useEffect(() => {
      axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=63e0272c56397cac3c65469e436c43b3&hash=08419370c4c0dde739b5ac60e2f1771e')
    //axios.get('https://gateway.marvel.com:443/v1/public/characters/1533/stories?ts=1&apikey=63e0272c56397cac3c65469e436c43b3&hash=08419370c4c0dde739b5ac60e2f1771e')
      .then( res => {
       setPersonajes(res.data.data)
        console.log(res.data)
     }).catch(error => console.log(error))
  }, [])

  useEffect(() => {
      axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&offset='+aux+'&apikey=63e0272c56397cac3c65469e436c43b3&hash=08419370c4c0dde739b5ac60e2f1771e')
    //axios.get('https://gateway.marvel.com:443/v1/public/characters/1533/stories?ts=1&offset='+aux+'&apikey=63e0272c56397cac3c65469e436c43b3&hash=08419370c4c0dde739b5ac60e2f1771e')  
    .then( res => {
        setPersonajes(res.data.data)
        //console.log(res.data)
      }).catch(error => console.log(error))
  },[aux]) 

  console.log(personajes)

  const incrementodepersonajes = () =>{
    if(aux+20<personajes.total){  
      setAuxiliar(aux + 20);
    }
  }
  const descrementodepersonajes = () =>{
    if(aux-20>=0){  

      setAuxiliar(aux - 20);
    }
  }

  return (
    personajes.results.length > 0 ?
      <div className = "App">
        <div className = "icon-bar">
            <a className = "active" href = "#">Personajes<i className="fa fa-home"></i></a> 
            <a href="#">Inicio<i className = "fa fa-search"></i></a> 
            <a href="#">Local<i className = "fa fa-envelope"></i></a> 
            <a href="#">Comics<i className = "fa fa-globe"></i></a>
            <a href="#">Info<i className = "fa fa-trash"></i></a> 
            <a><i><input type = "text"></input></i></a>
        </div>
          <header>
            <h1 className = "h1">Personajes</h1>
          </header>
          <div className = "d-inline-flex p-2 bd-highlight" id = "color">
            <div className = "row row-cols-1 row-cols-md-3 g-4">
              {
                personajes.results.map( per => (
                  <Personaje per = {per}></Personaje>
               ))
              }
            </div>
          </div>
          <div id = "color2">
            <button type = "button" className = "btn btn-danger" onClick={descrementodepersonajes} id='atras'>Atras</button>   
            <button type = "button" className = "btn btn-danger" onClick={incrementodepersonajes} id='siguientes'>Siguiente</button>   
          </div>
        </div> :
        <div className = "principal">
          <div className = "secundario">
            <div className = "loader"></div>
          </div>
        </div>
  );
}
export default App;
