import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CowsList(props) {
  const [cows, setCows] = useState([]);

  useEffect(() => {
    setCows(props.cows);
  }, [props.cows]);

  const handleDelete = (cowId) => {
    axios
      .delete(`http://localhost:3001/cows/${cowId}`)
      .then((response) => {
        console.log('Cow deleted:', response.data);
        // Update the cows state by removing the deleted cow
        const updatedCows = cows.filter((cow) => cow.id !== cowId);
        setCows(updatedCows);
      })
      .catch((error) => {
        console.error('Error deleting cow:', error);
      });
  };

  return (
    <div className="Cowlist mt-5">
      <div className="title d-flex justify-content-between mt-4">
        <h3>Cows list</h3>
        <Link to="/add">
          <button type="button" className="btn btn-outline-primary">
            Add Cow +
          </button>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Number</th>
            <th scope="col">Type</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
            <th scope="col"></th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {cows.map((cow) => (
            <tr key={cow.id}>
              <th scope="row">{cow.id.toString().split('-')[0]}</th>
              <td>
                <Link to="/cow/2">{cow.number}</Link>
              </td>
              <td>{cow.type}</td>
              <td>{cow.date}</td>
              <td>
                <Link to={`/cows/exams/${cow.id}`}>
                  <button type="button" className="btn btn-dark px-2 py-1">
                    Medical Examination
                  </button>
                </Link>
              </td>
              <td>
                {/* Delete button */}
                <button
                  type="button"
                  className="btn btn-danger px-2 py-1"
                  onClick={() => handleDelete(cow.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CowsList;
