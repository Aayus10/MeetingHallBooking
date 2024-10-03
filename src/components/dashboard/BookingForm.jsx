import dayjs from "dayjs";
import SecureLS from "secure-ls";
import { Controller } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import useFormValidate from "../../hooks/useForm";
import React, { useEffect, useState } from "react";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
// import { getHalls } from "../../redux/actions/hallActions";
import { bookHall, getBookings } from "../../redux/actions/bookActions";

export default function BookingForm({ selectedHall, onClose }) {
  const dispatch = useDispatch();
  // const halls = useSelector((state) => state.allHalls.halls);
  const booking = useSelector((state) => state.bookings.bookings);
  const currentBooking = booking.map((x) => x.info);

  // const hallNames =
  //   halls.length > 0 && halls[0].data ? halls[0].data.map((x) => x.name) : [];

  useEffect(() => {
    // Fetch names from db.json and sync with Redux store
    // dispatch(getHalls());
    dispatch(getBookings());
  }, [dispatch]);

  const {
    reset,
    watch,
    errors,
    control,
    register,
    setValue,
    clearErrors,
    handleSubmit,
  } = useFormValidate();

  useEffect(() => {
    if (selectedHall) {
      setValue("hall", selectedHall);
    }
  }, [selectedHall, setValue]);

  const currDate = dayjs().format("YYYY-MM-DD");
  const currTime = dayjs().format("HH:mm");

  const hall = watch("hall");
  const date = watch("date");
  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const ls = new SecureLS({ encodingType: "aes" });
  const user = ls.get("users");

  const [bookingId, setBookingId] = useState(1);

  useEffect(() => {
    const savedId = JSON.parse(localStorage.getItem("bookingId")) || 1;
    setBookingId(savedId);
  }, []);

  const bookingData = {
    id: bookingId,
    username: user?.username,
    hall: hall,
    bookedDate: date,
    eventStart: startTime,
    eventEnd: endTime,
  };

  const handleBooking = (data) => {
    const { hall, date, startTime, endTime } = data;
    const hasConflict = currentBooking.some((booking) => {
      return (
        booking.hall === hall &&
        booking.bookedDate === date &&
        ((booking.eventStart < endTime && booking.eventEnd > startTime) ||
          (startTime < booking.eventEnd && endTime > booking.eventStart))
      );
    });

    if (hasConflict) {
      toast.error("Sorry! Hall already booked for this date and time range.", {
        draggable: true,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        hideProgressBar: false,
        className: "text-black",
        position: "bottom-center",
      });
    } else {
      const nextId = bookingId + 1;
      setBookingId(nextId);
      localStorage.setItem("bookingId", JSON.stringify(nextId));
      dispatch(bookHall(bookingData));
      toast.success("Booking request submitted", {
        draggable: true,
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        hideProgressBar: false,
        className: "text-black",
        position: "bottom-center",
      });
      reset();
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <>
      <Box className="">
        <Box className="pb-10 border-2 border-blue-300 bg-slate-300  flex flex-col justify-center items-center">
          <form onSubmit={handleSubmit(handleBooking)}>
            <p className="mt-7 text-xl md:text-2xl  font-bold">Select Hall</p>
            <Controller
              name="hall"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  readOnly
                  value={field.value || ""} // Set value to field value from form state
                  placeholder="Select a hall"
                  className="border-1 border-black " // Placeholder for empty value
                />
              )}
            />
            <p>{errors.hall?.message}</p>
            <br />
            <p className="  text-xl md:text-2xl font-bold">Select Date</p>
            <input
              type="date"
              min={currDate}
              className=" border-1 border-black mt-2 w-56 sm:w-64 md:w-72 h-9 p-3"
              {...register("date", { required: "Date is required" })}
              onChange={(e) => setValue("date", e.target.value)}
            />
            <p>{errors.date?.message}</p>
            <br />
            <p className="text-xl md:text-2xl font-bold">
              Enter Meeting Start Time
            </p>
            <input
              type="time"
              {...register("startTime", {
                required: "Time is required",
                validate: (value) => {
                  if (date === currDate && value < currTime) {
                    return "Selected time is in the past";
                  }
                  return true;
                },
              })}
              onChange={(e) => {
                setValue("startTime", e.target.value);
                clearErrors("startTime");
              }}
              className="border-1 border-black mt-2 w-56 sm:w-64 md:w-72 h-9 p-3"
            />
            <p>{errors.startTime?.message}</p>
            <br />
            <p className=" text-xl md:text-2xl font-bold">
              Enter Meeting End Time
            </p>
            <input
              type="time"
              onChange={(e) => {
                setValue("endTime", e.target.value);
                clearErrors("endTime");
              }}
              className="border-1 border-black mt-2 w-56 sm:w-64 md:w-72 h-9 p-3"
              {...register("endTime", {
                required: "Time is required",
                validate: (val) => {
                  if (val <= startTime) {
                    return "Invalid timing.";
                  }
                  return true;
                },
              })}
            />
            <p>
              {" "}
              <p>{errors.endTime?.message}</p>
            </p>
            <br />
            <Box className="flex items-center justify-center">
              <Button type="submit" color="indigo" className="  ">
                Submit
              </Button>
            </Box>
            <ToastContainer />
          </form>
        </Box>
      </Box>
    </>
  );
}
