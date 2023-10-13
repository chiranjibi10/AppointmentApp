import React, { useState, useEffect } from "react";
import { Trash, Edit } from "react-feather";
import EditAppointment from "./EditAppointment";

const AppointmentList = (props) => {
  const {
    appointments,
    handleDelete,
    setAppointments,
    setToggleData,
    search,
    setSearch,
    searchAppointment,
    setSearchAppointment,
  } = props;
  const [editToggle, setEditToggle] = useState(false);
  const [id, setId] = useState();
  const handleEdit = (editId) => {
    setId(editId);
    setEditToggle(true);
  };
  return (
    <div className="mx-4 p-2">
      <div className="input-group mb-3 py-3">
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {searchAppointment?.length
        ? searchAppointment.map((data) => {
            return (
              <div className="card">
                <div className="card-body d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="d-flex align-items-center mr-2">
                      <Trash
                        style={{ color: "red" }}
                        onClick={() => handleDelete(data.id)}
                      />
                      <Edit
                        style={{ color: "blue" }}
                        onClick={() => handleEdit(data.id)}
                      />
                    </div>
                    <div>
                      <h3 className="card-title text-primary">
                        {data.petName}{" "}
                      </h3>
                      <h5 className="card-subtitle text-primary">
                        Owner Name:
                        <span className="text-dark ml-2">{data.ownerName}</span>
                      </h5>
                      <p className="">{data.details}</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="card-subtitle text-primary">
                      {data.apptDate}
                      <span className="text-dark ml-2">{data.apptTime}</span>
                    </h5>
                  </div>
                </div>
              </div>
            );
          })
        : appointments?.length
        ? appointments.map((data) => {
            return (
              <div className="card" key={data.id}>
                <div className="card-body d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="d-flex align-items-center mr-2">
                      <Trash
                        style={{ color: "red" }}
                        onClick={() => handleDelete(data.id)}
                      />
                      <Edit
                        style={{ color: "blue" }}
                        onClick={() => handleEdit(data.id)}
                      />
                    </div>
                    <div>
                      <h3 className="card-title text-primary">
                        {data.petName}{" "}
                      </h3>
                      <h5 className="card-subtitle text-primary">
                        Owner Name:
                        <span className="text-dark ml-2">{data.ownerName}</span>
                      </h5>
                      <p className="">{data.details}</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="card-subtitle text-primary">
                      {data.apptDate}
                      <span className="text-dark ml-2">{data.apptTime}</span>
                    </h5>
                  </div>
                </div>
              </div>
            );
          })
        : "No Appointment"}
      <EditAppointment
        editToggle={editToggle}
        setEditToggle={setEditToggle}
        editId={id}
        setToggleData={setToggleData}
      />
    </div>
  );
};

export default AppointmentList;
