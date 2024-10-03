import { Box, Button, Notification } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";

export default function Header() {
  const navigate = useNavigate();
  const ls = new SecureLS({ encodingType: "aes" });
  const user = ls.get("users");

  const logout = () => {
    ls.remove("users");
    window.location.href = "/";
  };

  return (
    <Box className="flex justify-center gap-5">
      <Button
        variant="outline"
        color="indigo"
        onClick={() => {
          navigate("/adminhome");
        }}
      >
        Home
      </Button>
      <Button
        onClick={() => {
          navigate("/validatebooking");
        }}
        variant="outline"
        color="indigo"
      >
        Validate Bookings
      </Button>

      <Button onClick={logout} variant="outline" color="indigo">
        Log Out
      </Button>
    </Box>
  );
}
