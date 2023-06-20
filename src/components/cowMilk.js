import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';


function CowMilk(props) {
  const milk = props.milk
  
  const [show, setShow] = useState(false);
  const [dayMilk, setDayMilk] = useState({
    production:"",
    day:""
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setDayMilk({
      ...dayMilk,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const milkData = {
      production:  dayMilk.production,
      date:  dayMilk.date,

    };
    axios.post("http://localhost:3001/milk", milkData).then((response) => {
      console.log(response.status, response.data);
    });
  };



  return (
  <div className='Cowlist mt-5'>
    {/* milk production */}

      <div className='title d-flex justify-content-between mt-4' >
        <h3>Milk Production</h3>
        <h4>Total production today : <span>5L</span> </h4>
        
      </div>

      <table class="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Production</th>

        </tr>
      </thead>
      <tbody>
      {milk.map((milk)=>(
        <tr key={milk.id}>
          <td>{milk.date}</td>
          <td>{milk.production} L</td>
        </tr>
      ))}
        
      </tbody>
    </table>
      {/* end milk production */}

      {/* milk insertion */}

    <div className='d-flex justify-content-start ' >
            <h4 className='m-2'> Add Today's Milk </h4>
            <button type="button" class="btn btn-outline-primary m-1 " onClick={handleShow}>Add Milk</button>    
        </div>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Milk production</Modal.Title>
    </Modal.Header>
      <form onSubmit={handleSubmit}>
      <Modal.Body>
        <div class="form-group ">
          <label for="text">Milk Production</label>
          <input name='production' value={dayMilk.production} onChange={handleChange} type="text" class="form-control" id="text" aria-describedby="text" placeholder="Enter Milk production by liter"/>
          </div>
          <div class="form-group mt-4">
              <label for="number">Milk day</label>
              <input name="date" value= {dayMilk.date} onChange={handleChange}  type="date" class="form-control" id="number" aria-describedby="cowNumber" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondry' onClick={handleClose}>
          Close
          </button>
          <button type="submit" className='btn btn-primary' onClick={handleClose}>
          Save Changes
          </button>
        </Modal.Footer>
      </form>

   
    
    </Modal>

        {/* end milk insertion */}

    </div>
      
    )
}

export default CowMilk