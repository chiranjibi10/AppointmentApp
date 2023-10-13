import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditAppointment = (props) => {
  const { editToggle, setEditToggle, editId, setToggleData } = props;
  const [editedData, setEditedData] = useState(null);
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    apptDate: "",
    apptTime: "",
    details: "",
  });
  useEffect(() => {
    if (editToggle && editId) {
      const existingData = localStorage.getItem("ApptData");
      if (existingData) {
        const appointments = JSON.parse(existingData);
        const appointmentToEdit = appointments.find(
          (appointment) => appointment.id === editId
        );

        if (appointmentToEdit) {
          setFormData(appointmentToEdit);
        }
      }
    }
  }, [editToggle, editId]);

  const Toggle = () => {
    setEditToggle(!editToggle);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleUpdate = () => {
    // Fetch the data from localStorage
    const existingData = localStorage.getItem("ApptData");
    if (existingData) {
      let appointments = JSON.parse(existingData);

      // Find the index of the appointment to be updated
      const appointmentIndex = appointments.findIndex(
        (appointment) => appointment.id === editId
      );

      if (appointmentIndex !== -1) {
        // Update the appointment data in the array
        appointments[appointmentIndex] = formData;

        // Save the updated appointments back to localStorage
        localStorage.setItem("ApptData", JSON.stringify(appointments));
        setToggleData(true);
        setEditedData(formData);
        setEditToggle(false);
      }
    }
  };

  return (
    <div>
      <Modal isOpen={editToggle} toggle={Toggle}>
        <ModalHeader toggle={Toggle}>Please Change what to change</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-between input-group my-2">
            <label>Owner Name</label>
            <input
              type="text"
              className="form-control"
              name="ownerName"
              required
              placeholder="Name"
              onChange={handleInputChange}
              value={formData.ownerName}
            />
          </div>
          <div className="d-flex justify-content-between   input-group my-2">
            <label>Pet Name</label>
            <input
              type="text"
              className="form-control"
              name="petName"
              required
              placeholder="PetName Please"
              onChange={handleInputChange}
              value={formData.petName}
            />
          </div>
          <div className="d-flex justify-content-between  input-group my-2">
            <label>Appointment Date</label>
            <input
              type="date"
              className="form-control"
              name="apptDate"
              required
              onChange={handleInputChange}
              value={formData.apptDate}
            />
          </div>
          <div className="d-flex justify-content-between input-group my-2">
            <label>Appointment Time</label>
            <input
              type="time"
              className="form-control"
              name="apptTime"
              required
              onChange={handleInputChange}
              value={formData.apptTime}
            />
          </div>
          <div className="d-flex justify-content-between input-group my-2">
            <label>Details</label>
            <textarea
              className="form-control"
              name="details"
              required
              placeholder="write the problem"
              onChange={handleInputChange}
              value={formData.details}
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={Toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditAppointment;
