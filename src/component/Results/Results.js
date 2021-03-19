import React, { useState, useEffect} from "react";

import Filter from "../Filter/Filter";

import Modal from "../Modal/Modal";

import "./Results.css";

export default (props) => {

    let [results , setResults] = useState(null);
    let [inputData , setInputData] = useState([]);
    let [departments, setDepartments] = useState([]);
    let [showModal , setShowModal] = useState(false);
    let [modalData , setModalData] = useState(false);

    const showMoreData = (data) => {
        setModalData(data);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const formatResults = (data) => {
        console.log(data);

        let parentArr = data.filter((d) => d.parent_objective_id === "");

        let finalArr = parentArr.map((p, i) => {
            let children = [];

            children = data.filter((d) => d.parent_objective_id === p.id);

            return { 
                ...p,
                children

            }
        })
        
        return finalArr;

    }

    const formatDepartments = (data) => {
        //return [...new Set(data.map(d => d.category))]
        return [...new Set(data.map(d => d.key_results.product.departments))]
    } 

    const handleFilterDepartment = (event) => {

        let selectedFilter = event.target.value;
        console.log("selected Filter ", selectedFilter);
        let filteredData = [];
        if(selectedFilter === "") {
            filteredData  = [...inputData];
        }
        
        else filteredData = inputData.filter((f) => f.title === selectedFilter); 

        let finalResults = formatResults([...filteredData]);   
        setResults(finalResults);

    }

    useEffect(() => {

        //fetch("https://okrcentral.github.io/sample-okrs/db.json")
        fetch("http://localhost:8080/users/1/objectives")
        .then(res => res.json())
        .then(data => { 
            let inputdata = data.title;
            setInputData(inputdata);
            setDepartments(formatDepartments([...inputdata.departments]));
            let finalResults = formatResults([...inputdata]);   
            setResults(finalResults);
        })
        .catch(err => {
            console.log("Error occurred in fetching results ", err.message);
            
        })
    },[]);

   return <div className="container-fluid">
        <Filter departments={departments} 
        onFilter={handleFilterDepartment}
        />

        { showModal && 
            <Modal modalData={modalData} closeModal={closeModal}/>
        }
        { !results && <h1>Loading...</h1>}
        { results && 
            <div className="timeline">
            <div className="line text-muted"></div>
            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            
        { results.map((result , i )=> {
           return <div key={result.id}>
            <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="heading1">
                <a role="button" data-toggle="collapse" data-parent="#accordion"
                href={`#${result.id}`} aria-expanded="true" aria-controls="collapse1">
                <div className=" icon"> 
                <i className="fa fa-2x fa-caret-down" />
               
               </div>
               </a>
                <h4 className="panel-title">
                <b> <i className="fa fa-user"></i> { i+1}. { result.title}</b>
                
                </h4>
                </div>
                
                <div id={result.id} className="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading1">
                    <div className="panel-body">
                { result.children.map((ch, i) => {
                   return (<p style={{cursor:"pointer"}}
                    onClick={() => showMoreData(ch)}
                    key={i}> - <small key={ch.id}>{ch.title}</small></p>)
                    
                })} 
                </div>
                    </div>    
            </div>
            </div>
        })}
        </div>
        </div>
    }
    </div>
}
