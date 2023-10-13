import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/AddAppointment.css";
import { ShoppingBag } from "react-feather";

const AddAppointment = (props) => {
  const { setToggleData } = props;
  const [toggle, setToggle] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [petName, setPetName] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [apptTime, setApptTime] = useState("");
  const [details, setDetails] = useState("");
  function handleCancel() {
    setOwnerName("");
    setPetName("");
    setApptDate("");
    setApptTime("");
    setDetails("");
    setToggle(!toggle);
  }
  const handleSave = () => {
    const existingData = localStorage.getItem("ApptData");
    let appointments = [];

    if (existingData) {
      appointments = JSON.parse(existingData);
    }

    const newAppointment = {
      id: uuidv4(),
      ownerName: ownerName,
      petName: petName,
      apptDate: apptDate,
      apptTime: apptTime,
      details: details,
    };

    appointments.push(newAppointment);

    localStorage.setItem("ApptData", JSON.stringify(appointments));
    setToggleData(true);
    handleCancel();
  };
  return (
    <div className="mt-2 w-100 mx-4 p-2">
      <div className="w-100">
        <button
          type="button"
          className="btn btn-primary w-100 text-left"
          onClick={() => setToggle(!toggle)}
        >
          <span className="mr-1">
            <ShoppingBag style={{ color: "red" }} />
          </span>
          Add Appointment
        </button>
      </div>
      {toggle && (
        <div className="w-100 mt-4">
          <div className="d-flex-justify-content-center mx-4 ">
            <div className="d-flex justify-content-between input-group my-2">
              <label>Owner Name</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Name"
                onChange={(e) => setOwnerName(e.target.value)}
                value={ownerName}
              />
            </div>
            <div className="d-flex justify-content-between   input-group my-2">
              <label>Pet Name</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="PetName Please"
                onChange={(e) => setPetName(e.target.value)}
                value={petName}
              />
            </div>
            <div className="d-flex justify-content-between  input-group my-2">
              <label>Appointment Date</label>
              <input
                type="date"
                className="form-control"
                required
                onChange={(e) => setApptDate(e.target.value)}
                value={apptDate}
              />
            </div>
            <div className="d-flex justify-content-between input-group my-2">
              <label>Appointment Time</label>
              <input
                type="time"
                className="form-control"
                required
                onChange={(e) => setApptTime(e.target.value)}
                value={apptTime}
              />
            </div>
            <div className="d-flex justify-content-between input-group my-2">
              <label>Details</label>
              <textarea
                className="form-control"
                required
                placeholder="write the problem"
                onChange={(e) => setDetails(e.target.value)}
                value={details}
              ></textarea>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-success mt-3 mr-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger mt-3 "
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAppointment;
