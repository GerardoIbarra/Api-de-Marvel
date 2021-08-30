import React from 'react';
import {useState,useEffect} from 'react';
import { Button} from 'reactstrap';
import Poupop from './Components/Popup';
import './App.css'

function Personaje ({per}){
    const [buttonPoupop,setButtonPoupop] = useState(false);
    console.log(per);
    const validacion1=() =>{
      if(per.description == ""){
        return <p>No hay informacion del personaje</p>
        }else{
            return <p>{per.description}</p>
            }
          }
    return(
      <>
        <div className ="col mt-2" >
                <div className ="card" key = {per.id}>
                    <img src={`${per.thumbnail.path}.${per.thumbnail.extension}`} className="img-fluid" alt="Marvel" />
                
                    <div className ="card-body" id="clasename">
                      <p className ="card-text" >{per.name}</p>
                    </div>
                    <Button color ="success" className="botonmodal" onClick={() => setButtonPoupop(true)}>Mas informacion</Button>
                </div>
                <br></br><br></br>
            </div>
            <Poupop trigger = {buttonPoupop} setTrigger = {setButtonPoupop}>
            <img src = {`${per.thumbnail.path}.${per.thumbnail.extension}`} className ="img-thumbnail" alt = "Marvel" />
            <div>
                <strong><h2 className = "card-text" >{per.name}</h2></strong>
                <br></br>
                {validacion1()}
            </div>
            </Poupop>
      </>
     
    )
  }
  export default Personaje;