import React, {useState, useEffect}  from 'react'

import axios from 'axios'

function AddCow() {
  const [newCow, setNewCow] = useState({
    number: "",
    date: "",
    type:""
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setNewCow({
      ...newCow,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cowData = {
      number:  newCow.number,
      date:  newCow.date,
      type: newCow.type
    };
    axios.post("http://localhost:3001/cows", cowData).then((response) => {
      console.log(response.status, response.data);
    });
  };

  return (
    <>

    <form className='d-flex flex-column addcow justify-content-between' onSubmit={handleSubmit}>
    <div className='title d-flex justify-content-between mt-4' >
        <h3>Add a New Cow</h3>       
      </div>
    <div class="form-group mt-4">
        <label for="number">Cow Number:</label>
        <input name="number" type="Number" class="form-control" id="number" value={newCow.number} onChange={handleChange} placeholder="Enter The Cow Number"/>
   </div>
   <div class="form-group mt-4">
        <label for="number">Entry Date:</label>
        <input name="date" type="date" class="form-control" id="number"  value={newCow.date} onChange={handleChange} placeholder="Enter The Cow Number"/>
   </div>

    <div class="d-flex flex-column form-group col-auto my-1">
        <label class="mr-sm-2" for="inlineFormCustomSelect">Breed</label>
        <select  value={newCow.type} onChange={handleChange} name ="type" class="form-control mr-sm-2" id="inlineFormCustomSelect">
            <option selected>Choose Type</option>
            <option value="holstein">holstein</option>
            <option value="montbeliarde">montbeliarde </option>
        </select>
        </div>


    <button type="submit" class="btn btn-primary mt-4">Submit</button>
    </form>
    </>
  )
}

export default AddCow