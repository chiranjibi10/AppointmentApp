import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import AddAppointment from "./components/AddAppointment";
import AppointmentList from "./components/AppointmentList";

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [toggleData, setToggleData] = useState(false);
  const [search, setSearch] = useState("");
  const [searchAppointment, setSearchAppointment] = useState([]);
  useEffect(() => {
    const filteredAppointments = appointments.filter((appointment) => {
      const appointmentData = Object.values(appointment)
        .join(" ")
        .toLowerCase();
      return appointmentData.includes(search.toLowerCase());
    });
    setSearchAppointment(filteredAppointments);
  }, [search]);
  useEffect(() => {
    setToggleData(true);
    const storedData = localStorage.getItem("ApptData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setAppointments(parsedData);
    }
    setToggleData(false);
  }, [toggleData]);
  const handleDelete = (id) => {
    setToggleData(true);
    const updatedAppointments = appointments.filter((appt) => appt.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem("ApptData", JSON.stringify(updatedAppointments));
    setToggleData(false);
  };
  return (
    <div>
      <NavBar />
      <AddAppointment setToggleData={setToggleData} />
      <AppointmentList
        appointments={appointments}
        handleDelete={handleDelete}
        setAppointments={setAppointments}
        search={search}
        setSearchAppointment={setSearchAppointment}
        searchAppointment={searchAppointment}
        setSearch={setSearch}
        setToggleData={setToggleData}
      />
    </div>
  );
};

export default App;
