import SecureLS from "secure-ls";
import { users } from "../../../users";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextInput } from "@mantine/core";

export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const ls = new SecureLS({ encodingType: "aes" });
  const accessTokenInterval = 5000;
  const refreshTokenInterval = 300000;

  const generateToken = () => {
    return "token-" + Math.random();
  };

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      ls.set("users", {
        username: user.username,
        role: user.role,
        accessToken: generateToken(),
        accessTokenExpiry: new Date().getTime() + accessTokenInterval,
        refreshToken: generateToken(),
        refreshTokenExpiry: new Date().getTime() + refreshTokenInterval,
      });
      if (user.role === "admin") {
        navigate("/adminhome");
      } else {
        navigate("/hallslist");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <Box className="pt-[10%] bg-[url('https://img.freepik.com/free-photo/room-used-official-event_23-2151054277.jpg')] bg-cover  h-screen">
        <Box className=" mx-[5%] md:mx-[15%]  bg-slate-200 py-10">
          <Box className="text-center text-lg md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold">
            Online Meeting Hall Booking System
          </Box>

          <Box className="flex flex-col  gap-3 mt-16">
            <Box className="flex flex-col lg:flex-row lg:justify-center text-center lg:gap-3">
              <p className="text-lg md:text-2xl xl:text-2xl text-center  font-semibold">
                Username
              </p>
              <TextInput
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="w-[60%] mx-[20%] lg:w-[30%] lg:mx-0"
                type="text"
              />
            </Box>
            <Box className="flex flex-col lg:flex-row lg:justify-center text-center lg:gap-3">
              <p className="text-lg md:text-2xl xl:text-2xl text-center  font-semibold">
                Password
              </p>
              <TextInput
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="w-[60%] mx-[20%] lg:w-[30%] lg:mx-0 lg:ml-2"
              />
            </Box>
            <p className="text-center text-red-900 font-bold lg:text-xl">
              {error}
            </p>

            <Button
              className="mx-[20%] w-[40%] lg:mx-[40%] lg:w-[30%]"
              color="teal"
              size="md"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
