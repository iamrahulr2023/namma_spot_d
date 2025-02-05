import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Myslots.css';

const Myslot = () => {
  const [slotsData, setSlotsData] = useState([]);
  const [editData, setEditData] = useState({
    id: '',
    locations: '',
    city: '',
    seat: '',
    place: '',
    company: '',
    price: '',
    des: ''
  });

  useEffect(() => {
    fetchSlotsData();
  }, []);

  const fetchSlotsData = async () => {
    try {
      const response = await axios.get('https://nammaspot-backend.onrender.com/getmapslots');
      setSlotsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (slot) => {
    setEditData({
      id: slot._id,
      locations: slot.locations,
      city: slot.city,
      seat: slot.seat,
      place: slot.place,
      company: slot.company,
      price: slot.price,
      des: slot.des
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://nammaspot-backend.onrender.com/getmapslots/${editData.id}`, editData);
      fetchSlotsData();
      setEditData({ id: '', locations: '', city: '', seat: '', place: '', company: '', price: '', des: '' });
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://nammaspot-backend.onrender.com/getmapslots/${id}`);
      setSlotsData(slotsData.filter(slot => slot._id !== id)); // Remove deleted slot from UI
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div>
      <h1 id="slotsdata">My Slots</h1>
      <div className="slots-container">
        {slotsData.map((slot) => (
          <div key={slot._id} className="slot-card">
            <div className="slot-details">
              <p><strong>Location:</strong> {slot.locations}</p>
              <p><strong>City:</strong> {slot.city}</p>
              <p><strong>Seat:</strong> {slot.seat}</p>
              <p><strong>Place:</strong> {slot.place}</p>
              <p><strong>Company:</strong> {slot.company}</p>
              <p><strong>Price:</strong> ${slot.price}</p>
              <p><strong>Description:</strong> {slot.des}</p>
            </div>
            <div className="slot-actions">
              <button className="edit-button" onClick={() => handleEdit(slot)}>Edit</button>
              <button className="deletebbutton" onClick={() => handleDelete(slot._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {editData.id && (
        <div className="edit-form">
          <h2 id="editslot">Edit Slot:</h2>
          <input type="text" name="locations" value={editData.locations} onChange={handleInputChange} placeholder="Location" />
          <input type="text" name="city" value={editData.city} onChange={handleInputChange} placeholder="City" />
          <input type="number" name="seat" value={editData.seat} onChange={handleInputChange} placeholder="Seat" />
          <input type="text" name="place" value={editData.place} onChange={handleInputChange} placeholder="Place" />
          <input type="text" name="company" value={editData.company} onChange={handleInputChange} placeholder="Company" />
          <input type="number" name="price" value={editData.price} onChange={handleInputChange} placeholder="Price" />
          <input type="text" name="des" value={editData.des} onChange={handleInputChange} placeholder="Description" />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default Myslot;
