import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'


function CowChildren(props) {

    const children = props.children

    const [show, setShow] = useState(false);

    const [child, setChild] = useState({
      cowNumber:"",
      number:"",
      birthday:""
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleChange = (e) => {
      const value = e.target.value;
      setChild({
        ...child,
        [e.target.name]: value
      });
    };
    
    const handleDelete = (childId) => {
      axios
        .delete(`http://localhost:3001/children/${childId}`)
        .then((response) => {
          console.log('Child deleted:', response.data);
          // Update the cows state by removing the deleted cow
          const updatedChild = children.filter((child) => child.id !== childId);
          setChild(updatedChild);
        })
        .catch((error) => {
          console.error('Error deleting cow:', error);
        });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      const childData = {
        number: child.number,
        cowNumber: child.cowNumber,
        birthday: child.birthday
  
      };
      axios.post("http://localhost:3001/children", childData).then((response) => {
        console.log(response.status, response.data);
      });
    };
  return (
    <div className='Cowlist mt-5'>
      <div className='title d-flex justify-content-between mt-4' >
        <h3>children Births</h3>
        <button type="button" class="btn btn-outline-primary m-1 " onClick={handleShow}>Add Child +</button>    
      </div>

      <table class="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Child's Number</th>
          <th scope="col">Mom's Number</th>


        </tr>
      </thead>
      <tbody>
        {children.map((child)=>(
          <tr key={child.id}>
            <td> {child.birthday} </td>
            <td> {child.number} </td>
            <td> {child.cowNumber}</td>
            <td>
                {/* Delete button */}
                <button
                  type="button"
                  className="btn btn-danger px-2 py-1"
                  onClick={() => handleDelete(child.id)}
                >
                  Delete
                </button>
              </td>
          </tr>
        ))}
       
      </tbody>
    </table>



    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Children production</Modal.Title>
    </Modal.Header>
    <form onSubmit={handleSubmit}>
    <Modal.Body>
        <div class="form-group ">
        <label for="text">Child's Number</label>
        <input type="text" class="form-control" id="text" name='number' value={child.number} onChange={handleChange} placeholder="Child's Number"/>
        </div>
        <div class="form-group mt-4 ">
        <label for="text">Mom's Number</label>
        <input type="text" class="form-control" id="text" name='cowNumber' value={child.cowNumber} onChange={handleChange} placeholder="Mom's Number"/>
        </div>
        <div class="form-group mt-4">
            <label for="number">Birthday</label>
            <input type="date" class="form-control" id="number" name="birthday" value={child.birthday} onChange={handleChange} placeholder=""/>
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

export default CowChildren