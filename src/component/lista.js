import React ,{ useState  , useEffect} from 'react';
import axios from 'axios';
import { Accordion, Card, Button, FormControl,InputGroup } from "react-bootstrap";
import  {FaPlus, FaAngleDown} from 'react-icons/fa'
import { BsPersonFill, BsPeopleFill } from "react-icons/bs";
//https://react-icons.github.io/react-icons/icons?name=bs
import {IoMdClose} from "react-icons/io";
import { ProgressBar } from 'react-bootstrap';
import moment from 'moment';
import "./lista.css";

export default function Search() {
    const [data ,setData] = useState([]);
    const [filtered ,setFilterd] = useState([]);
    const [result , setResult] = useState("");
    const [addVisible, setAddVisible] = useState(false);
    const [value, setValue] = useState([1,2,3,4]);

    useEffect(()=>{
            const fetchData = async ()=> {
                    try{
                        const res = await axios.get('http://localhost:8080/users/1/objectives');
                        setData(res.data);
                        setFilterd(res.data);
                    }catch(err){
                        throw new Error(err);
                    }
                     };
                  fetchData(); 
        },[]);

        useEffect(()=> {
            const results = filtered.filter(res=> res.organization.organization_name.toLowerCase().includes(result)

            ); 
            setData(results)
        } ,[result])
        //console.log(data)

      const onChange =(e)=> {
            setResult(e.target.value);
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
        
      <div>  
        <div className='container'>
        <span className="inputbox-right">
<InputGroup className="mb-3">
    <FormControl
      placeholder="Search by organization ..."
      aria-describedby="basic-addon2"
      value={result}
      onChange={onChange}      
    />   
  </InputGroup></span>      
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
                            <input onKeyDown={saveKr} placeholder='Description' className={`ml-1 input-add ${addVisible ? 'input-add-visible': ''}`}/>
                            <input onKeyDown={saveKr} placeholder='Period' className={`ml-1 input-add ${addVisible ? 'input-add-visible': ''}`}/>
                            <input onKeyDown={saveKr} placeholder='Owner' className={`ml-1 input-add ${addVisible ? 'input-add-visible': ''}`}/>
                            <button className='btn btn-white btn-add-kr rounded'>
                                <FaAngleDown />
                            </button>
                            {/* { <button>
                                <IoMdClose className={`ml-2`}/>
                            </button> } */}
                        </div>
                    </div>
                </div>
            </div>
            <div>
               
                <Accordion >
                    {data.map((element, index) =>(
                        <Card key={index}>
                            <Accordion.Toggle style={{display: 'none'}} as={Button} eventKey={index} defaultActiveKey={1}>
                                Botao
                            </Accordion.Toggle>
                            
                            <Card.Header onClick={(event) => {
                                        (event.target.parentNode.querySelector('button') !== null) ? event.target.parentNode.querySelector('button').click() : console.log('')
                                    }} className='d-flex justify-content-between'>
                                {/* <div >
                                    {element.title} 
                                </div> */}
<div className="first">
    <div key={index}> {element.title} </div> 
    </div>
    <div className="second">
    <div><BsPersonFill/>{element.organization.organization_name} </div>
    </div>
    <div className="third">
    { moment(element.start_date).format("MMM Do").slice(0, -2)} - { moment(element.due_date).format("MMM Do").slice(0, -2)}
    </div>
    <div className="fourth">
    <div ><ProgressBar  now={element.progress}  /></div>
    </div>    

                               
                            </Card.Header>

                            <Accordion.Collapse eventKey={index} >
                                <Card.Body>
                                    {element.key_results.map((element, index)=>(
                                        //index 1 and element is i
                                        //<div key={index}>{element.title}<ProgressBar  now={element.progress} label={`${element.progress}%`} />{element.progress}%</div>
                                       
                                        //<div key={index}>{element.title}{element.progress}</div>
                                        //<div style={{width: "600px"}}>
                                        //<div key={index}>{element.title} <span className="progress-right"><ProgressBar  now={element.progress}  /></span><div class="div-2">@{element.team.team_name} contribute</div></div>
                                       // <div key={index}>{element.title} <span className="progress-right"><ProgressBar  now={element.progress}  /></span><BsPeopleFill/>{element.team.team_name}</div>
                                     //  <div>
                                    //</div>   <div key={index}> {element.title} </div><div><BsPeopleFill/>{element.team.team_name}</div> <div className="progress-right"><ProgressBar  now={element.progress}  /></div>
                                     //  </div>
                                        //<div key={index}>{element.title}<Circle percent={element.progress} strokeWidth="2" strokeColor="#D3D3D3" /></div>
                                      //<div key={index}>{element.title}<Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" /></div>
                                      //<div key={index}>{element.title}<Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" /></div>



<div id="content">      
    <div className="first">
    <div key={index}> {element.title} </div> 
    </div>
    <div className="second">
    <div><BsPeopleFill/>{element.team.team_name}</div>
    </div>
    <div className="third">
        COl3
    </div>
    <div className="fourth">
    <div ><ProgressBar  now={element.progress}  /></div>
    </div>             
</div>



                                      
                                    ))}                                     
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                </Accordion>
            </div>
        </div>
        </div> 
    ); 
}
