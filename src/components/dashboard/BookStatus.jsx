import dayjs from "dayjs";
import Header from "./Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDisclosure } from "@mantine/hooks";
import { Box, Drawer, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValidatedBookings } from "../../redux/actions/fetchBookings";
import { getHalls } from "../../redux/actions/hallActions";

const MeetingHallCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedDate, setSelectedDate] = useState(null); // For tracking the clicked date
  const dispatch = useDispatch();
  const halls = useSelector((state) => state.allHalls.halls);

  const [selectedHall, setSelectedHall] = useState("");

  const hallNames =
    halls.length > 0 && halls[0].data ? halls[0].data.map((x) => x.name) : [];

  useEffect(() => {
    dispatch(getHalls());
    dispatch(getValidatedBookings());
  }, [dispatch]);

  const validatedList =
    useSelector((state) => state.validatedBookings.successfulBookings) || [];
  const bookings = validatedList.map((x) => x.info);
  const selectedBookings = bookings.filter((x) => x.hall === selectedHall);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const formatTime = (time) => {
    const formattedTime = dayjs(
      `2024-01-01 ${time}`,
      "YYYY-MM-DD HH:mm"
    ).format("h:mm A");
    return formattedTime;
  };

  const getBookingsForDate = (selectedDate) => {
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const booking = selectedBookings.filter(
      (b) => b.bookedDate === formattedDate
    );

    return booking.length > 0 ? (
      <>
        {booking.map((x, i) => (
          <span key={i} className="font-semibold text-[14px]">
            {formatTime(x.eventStart)}-{formatTime(x.eventEnd)}
            {i !== booking.length - 1 && ", "}
          </span>
        ))}
      </>
    ) : (
      <></>
    );
  };

  const displayBookingsForSelectedDate = () => {
    return selectedBookings
      .filter((b) => b.bookedDate === dayjs(selectedDate).format("YYYY-MM-DD"))
      .map((x, i) => (
        <div key={i} className="p-2">
          <p>
            <strong>{x.hall}</strong> - {formatTime(x.eventStart)} to{" "}
            {formatTime(x.eventEnd)} by User: {x.username}
          </p>
        </div>
      ));
  };

  return (
    <>
      <Header />
      <Box className="  min-h-screen bg-opacity-0 bg-[url('https://i.pinimg.com/736x/57/81/54/57815429f55b70dce6eb75187235c369.jpg')] bg-cover">
        <Box className="md:pt-3 flex flex-col md:flex-row text-center justify-center md:gap-4 w-[50%] mx-[25%]">
          <p className="font-bold text-2xl">Select Your preferred hall</p>
          <Select
            data={hallNames}
            value={selectedHall}
            onChange={(e) => {
              setSelectedHall(e);
            }}
          />
        </Box>

        <Box className="flex flex-col justify-center items-center pt-10">
          <Box className="mx-[10%] w-[80%]">
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileContent={({ date, view }) =>
                view === "month" && getBookingsForDate(date) ? (
                  <div
                    onClick={() => {
                      setSelectedDate(date); // Set the clicked date
                      open(); // Open the drawer
                    }}
                    className="booked-slots text-xs text-center p-2"
                  >
                    {getBookingsForDate(date)}
                  </div>
                ) : (
                  <></>
                )
              }
              className="custom-calendar min-w-full text-2xl"
            />
          </Box>

          <Drawer
            position="right"
            opened={opened}
            onClose={close}
            title={`Confirmed Bookings for ${dayjs(selectedDate).format(
              "DD MMM, YYYY"
            )}`}
          >
            {selectedDate ? displayBookingsForSelectedDate() : <></>}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default MeetingHallCalendar;
