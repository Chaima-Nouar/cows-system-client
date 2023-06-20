import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';

function CowDetail() {

  const URL = "http://localhost:3001/"
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const params = useParams();
    
  const [cow, setCow] = useState([])
  const [medical, setMedical] = useState([])
  
      // useEffect(()=> {
      //     axios.get(`${URL}cows/${params.id}`)
      //     .then(res => {
      //         setCow(res.data)
      //     })
      //     .catch(err =>{
      //         console.log(err)
      //     })
          
      // }, [params.id])
      
      const getSpeCow = async ()=>{
        await axios.get(`${URL}cows/exams/${params.id}`)
        .then(res => {
            setCow(res.data)
        })
        .catch(err =>{
            console.log(err)
        })
      }
      useEffect(()=>{
        getSpeCow()
      }, [params.id])


      const getMedical = (async()=>{
        await axios.get(`${URL}cows/exams/${params.id}`)
        .then(res => {
          const data = res.data
          console.log(data);
          // const med = data.filter((medicalcon)=>medicalcon.cowId === params.id)
          setMedical(data)
        })
        .catch(err =>{
            console.log(err)
        })
      })
     
      useEffect(()=>{
        const interval = setInterval(() => {
          getMedical();
        }, 2000); 
      
        return () => clearInterval(interval);
      }, []);

      const [sickness, setSickness] = useState({
        cowId: params.id,
        sicknes:"",
        date: ""
      })
    
      const handleChange = (e) => {
        const value = e.target.value;
        setSickness({
          ...sickness,
          [e.target.name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const sicknessData = {
          cowId:  params.id,
          date:  sickness.date,
          sicknes: sickness.sicknes
        };
        axios.post(`${URL}cows/exams`, sicknessData).then((response) => {
          console.log(response.status, response.data);
        });
      };
      
  return (
    <div className='Cowdetail w-50 vh-100'>
            <section className='cowMedcine w-100'>
      <div className='title d-flex justify-content-between mt-4' >
        <h2>Cows informations</h2>
        <button type="button" class="btn btn-outline-primary " onClick={handleShow}>Add medication +</button>
       
      </div>
      <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">Medical condition</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
      {medical.map((medicalcon)=>(
        <tr key={medicalcon.id}>
          <td> {medicalcon.sicknes} </td>
          <td> {medicalcon.date} </td>
        </tr>
      ))}
       
      </tbody>
    </table>


    </section>



          

    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Medical condition</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>

        <Modal.Body>
          <div class="form-group ">
            <label for="text">Medical condition</label>
            <input type="text" class="form-control" id="text" name="sicknes" onChange={handleChange} value={sickness.sicknes} placeholder="Enter The medical condition"/>
          </div>
          <div class="form-group mt-4">
                <label for="number">Cow Number:</label>
                <input type="date" class="form-control" id="number" name="date" onChange={handleChange} value={sickness.date} placeholder="Enter The Cow Number"/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondry' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-primary' type='submit' onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
        </form>

      </Modal>
    </div>


  )
}

export default CowDetail