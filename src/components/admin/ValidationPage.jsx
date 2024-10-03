import Header from "./Header";
import { Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookings,
  validateBooking,
  rejectBooking,
} from "../../redux/actions/bookActions";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  getRejectedBookings,
  getValidatedBookings,
} from "../../redux/actions/fetchBookings";

export default function ValidationPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings());
    dispatch(getValidatedBookings());
    dispatch(getRejectedBookings());
  }, [dispatch]);

  const bookingList = useSelector((state) => state.bookings.bookings) || [];
  const bookings = bookingList.map((x) => x.info);

  const validatedList =
    useSelector((state) => state.validatedBookings.successfulBookings) || [];
  const validatedInfo = validatedList.map((x) => x.info);

  const rejectedList =
    useSelector((state) => state.cancelledBookings.rejectedBookings) || [];
  const rejectedInfo = rejectedList.map((x) => x.info);

  const filteredBookings = bookings.filter(
    (booking) =>
      !validatedInfo.some((validated) => validated.id === booking.id) &&
      !rejectedInfo.some((rejected) => rejected.id === booking.id)
  );

  const handleValidate = (booking) => {
    dispatch(validateBooking(booking));
  };

  const handleReject = (booking) => {
    dispatch(rejectBooking(booking));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Hall Name",
        accessorKey: "hall",
        id: "hall",
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        Header: "Requested By",
        accessorKey: "username",
        id: "username",
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        Header: "Date",
        accessorKey: "bookedDate",
        id: "bookedDate",
        cell: (props) => <p>{props.getValue()}</p>,
        enableSorting: true,
      },
      {
        Header: "Start Time",
        accessorKey: "eventStart",
        id: "eventStart",
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        Header: "End Time",
        accessorKey: "eventEnd",
        id: "eventEnd",
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        Header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <>
            <Button
              onClick={() => handleValidate(row.original)}
              className="mr-2"
            >
              Validate
            </Button>
            <Button onClick={() => handleReject(row.original)} color="red">
              Reject
            </Button>
          </>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredBookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderTableHeaders = () => (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="bg-gray-100">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              width={header.getSize()}
              onClick={header.column.getToggleSortingHandler()}
              className="px-4 py-2 text-left border-b border-gray-300 cursor-pointer"
            >
              {header.column.columnDef.Header}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );

  const renderTableBody = () => (
    <tbody>
      {table.getRowModel().rows.map((row, rowIndex) => (
        <tr
          key={row.id}
          className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
        >
          {row.getVisibleCells().map((c) => (
            <td
              key={c.id}
              width={c.column.getSize()}
              className="px-4 py-2 border-b border-gray-300"
            >
              {flexRender(c.column.columnDef.cell, c.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <>
      <Header />
      <table className="min-w-full border border-gray-300 mt-12">
        {renderTableHeaders()}
        {renderTableBody()}
      </table>
    </>
  );
}
