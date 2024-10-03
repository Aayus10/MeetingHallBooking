import React, { useEffect, useState } from "react";
import Header from "./Header";
import SecureLS from "secure-ls";
import { useDispatch, useSelector } from "react-redux";
import { Box, Notification, Pagination } from "@mantine/core";
import {
  getRejectedBookings,
  getValidatedBookings,
} from "../../redux/actions/fetchBookings";

export default function Notifications() {
  const ls = new SecureLS({ encodingType: "aes" });
  const user = ls.get("users");
  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(getValidatedBookings());
    dispatch(getRejectedBookings());
  }, [dispatch]);

  const validatedList =
    useSelector((state) => state.validatedBookings.successfulBookings) || [];
  console.log(validatedList);
  const validatedInfo = validatedList.map((x) => x.info);

  const newBooking = validatedInfo?.filter(
    (x) => user && x.username === user.username
  );

  const rejectedList =
    useSelector((state) => state.cancelledBookings.rejectedBookings) || [];
  const rejectedInfo = rejectedList.map((x) => x.info);

  const newRejectedBooking = rejectedInfo?.filter(
    (x) => user && x.username === user.username
  );

  const allNotifications = [
    ...newBooking.map((booking) => ({ ...booking, type: "success" })),
    ...newRejectedBooking.map((booking) => ({ ...booking, type: "failure" })),
  ];

  const totalPages = Math.ceil(allNotifications.length / itemsPerPage);
  const paginatedNotifications = allNotifications.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <>
      <Header />

      <Box className="min-h-screen bg-opacity-0 bg-[url('https://i.pinimg.com/736x/57/81/54/57815429f55b70dce6eb75187235c369.jpg')] bg-cover">
        <p className="text-3xl text-center font-bold text-red-950">
          YOUR NOTIFICATIONS
        </p>

        <Box className="flex flex-col items-center justify-center mt-5 w-[90%] mx-[5%] md:w-[70%] md:mx-[15%] lg:w-[50%] lg:mx-[25%]">
          {paginatedNotifications.map((booking, i) => {
            const { hall, bookedDate, eventStart, eventEnd } = booking || {};
            const notificationType =
              booking.type === "success" ? "teal" : "red";
            const message =
              booking.type === "success"
                ? `Dear ${user?.username}, Your booking of ${hall} on ${bookedDate} from ${eventStart} to ${eventEnd} was confirmed.`
                : `Dear ${user?.username}, Your booking of ${hall} on ${bookedDate} from ${eventStart} to ${eventEnd} was rejected.`;

            return (
              <Notification
                className="mt-3"
                key={i}
                size="xl"
                withCloseButton={false}
                color={notificationType}
              >
                <p
                  className={`font-bold text-2xl text-${notificationType}-900`}
                >
                  {booking.type === "success"
                    ? "Booking Success"
                    : "Booking Failed"}
                </p>
                <p className="text-xl mt-1">{message}</p>
              </Notification>
            );
          })}

          <Pagination
            color="rgba(23, 5, 5, 1)"
            size="lg"
            className="mt-5"
            page={activePage}
            total={totalPages}
            onChange={setActivePage}
          />
        </Box>
      </Box>
    </>
  );
}
