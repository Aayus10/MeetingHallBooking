import HallsList from "./HallsList";
import { useDispatch } from "react-redux";
import meetingHalls from "../../../HallData";
import React, { useEffect } from "react";
import { setHalls } from "../../redux/actions/hallActions";

export default function HallComponent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHalls(meetingHalls));
  }, [dispatch]);

  return (
    <>
      <HallsList />
    </>
  );
}
