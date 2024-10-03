import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

export default function UserHome() {
  const booking = useSelector((x) => x.validatedBookings.successfulBookings);

  return (
    <>
      <Header />
      <h1>Welcome to User Panel</h1>
    </>
  );
}
