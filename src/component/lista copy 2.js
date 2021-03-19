import React,{ useState, useEffect } from "react";

import { Accordion, Card, Button } from "react-bootstrap";

import {FaPlus, FaAngleDown} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";
//import {ProgressBar} from '@adobe/react-spectrum';
import { ProgressBar } from 'react-bootstrap';
import { Line, Circle } from 'rc-progress';
import CircularProgressbar from 'react-circular-progressbar';
import "./lista.css";

const List = (props) => {

    const [data, setData] = useState([]);
    const [addVisible, setAddVisible] = useState(false);
    const [value, setValue] = useState([1,2,3,4]);

    useEffect(()=>{
        funcao();
    }, []);

    const funcao = (props) = async() => {
        
        const response = await fetch('http://localhost:8080/users/1/objectives');
        const data = await response.json();
        //setUserData(jsonData);
       console.log(data);     
        setData(data)
    }
    
    
    const addKr = (props) =>{
        setAddVisible(!addVisible);
    }

    const saveKr = (event) =>{
        if(event.keyCode === 13){
            let obj = {
                title: event.target.value,
                key_results: []
            }

            let copy_data = data;
            copy_data.push(obj);
            
            event.target.value = '';

            setValue([])

        } else if(event.keyCode === 27){
            addKr();
            event.target.value = ''
        }
    }

    const removeKr = (event, element) =>{
        
        let obj = data.filter(elem =>{
            return elem.title !== element.title
        });

        setData(obj);
    }

        return(
            <div className='container'>
                
                <div className='mt-2 mb-2'>
                    <div className='d-flex align-items-center'>
                        <Button onClick={addKr} style={{borderRadius: '20px', zIndex: '999'}} className={`d-flex align-items-center justify-content-center btn-success p-2 pr-2 pl-2 text-white ml-2`}>
                            <FaPlus />  
                        </Button>
                        <div 
                            style={{display: `${addVisible ? 'block' : 'block'}`}} 
                            className='mt-2'
                        >
                            <div>
                                <input onKeyDown={saveKr} placeholder='title' className={`input-add ${addVisible ? 'input-add-visible': ''}`}/>
                                <input onKeyDown={saveKr} placeholder='Tipo' className={`ml-1 input-add ${addVisible ? 'input-add-visible': ''}`}/>
                                <input onKeyDown={saveKr} placeholder='Período' className={`ml-1 input-add ${addVisible ? 'input-add-visible': ''}`}/>
                                <input onKeyDown={saveKr} placeholder='Data' className={`ml-1 input-add ${addVisible ? 'input-add-visible': ''}`}/>
                                <button className='btn btn-white btn-add-kr rounded'>
                                    <FaAngleDown />
                                </button>
                                {/* <button>
                                    <IoMdClose className={`ml-2`}/>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        
                    </div>
                    <Accordion>
                        {data.map((element, index) =>(
                            <Card key={index}>
                                <Accordion.Toggle style={{display: 'none'}} as={Button} eventKey={index}>
                                    Botao
                                </Accordion.Toggle>
                                
                                <Card.Header onClick={(event) => {
                                            (event.target.parentNode.querySelector('button') !== null) ? event.target.parentNode.querySelector('button').click() : console.log('')
                                        }} className='d-flex justify-content-between'>
                                    <div>
                                        {element.title}
                                    </div>
                                    <div>
                                        <button>Teste</button>
                                        <IoMdClose onClick={ (event) => removeKr(event, element) } className='m-2 text-danger' />
                                    </div>
                                </Card.Header>

                                <Accordion.Collapse eventKey={index}>
                                    <Card.Body>
                                        {element.key_results.map((element, index)=>(
                                            //index 1 and element is i
                                            //<div key={index}>{element.title}<ProgressBar  now={element.progress} label={`${element.progress}%`} />{element.progress}%</div>
                                           
                                            //<div key={index}>{element.title}{element.progress}</div>
                                            //<div style={{width: "600px"}}>
                                            <div key={index}>{element.title} <span className="progress-right"><ProgressBar  now={element.progress}  /></span><div class="div-2">@{element.team.team_name} contribute</div></div>
                                           //@{element.team.team_name}
                                            //</div>
                                            //<div key={index}>{element.title}<Circle percent={element.progress} strokeWidth="2" strokeColor="#D3D3D3" /></div>
                                          //<div key={index}>{element.title}<Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" /></div>
                                          //<div key={index}>{element.title}<Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" /></div>
                                        ))}
                                         
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                    </Accordion>
                </div>
            </div>
        ); 
}

export default List;