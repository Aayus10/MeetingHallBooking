import SecureLS from "secure-ls";
import { Nav } from "react-bootstrap";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import { Box, Burger, Title } from "@mantine/core";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const Header = () => {
  const [activeLink, setActiveLink] = useState("view");
  const [opened, setOpened] = useState(false); // Set default to false for smaller screens
  const navigate = useNavigate();
  const ls = new SecureLS({ encodingType: "aes" });

  const logout = () => {
    ls.remove("users");
    window.location.href = "/";
  };

  const toggle = () => {
    setOpened(!opened);
  };

  const links = [
    { name: "ViewHalls", key: "view", navigate: "/hallslist" },
    { name: "Bookings", key: "bookings", navigate: "/bookstatus" },
    { name: "Notifications", key: "notifications", navigate: "/notifications" },
    { name: "Log Out", key: "logout", navigate: "" },
  ];

  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-light flex flex-col lg:flex-row">
      <Box className="w-12/12 lg:w-5/12 ">
        <Nav.Item>
          <Marquee
            className="p-1 ml-2 text-red-950 "
            speed={50}
            gradient={false}
            pauseOnHover
            pauseOnClick
          >
            <Title order={2} style={{ color: "#3C0000", fontWeight: "bold" }}>
              Efficient Hall Booking, Simplified for You!{" "}
            </Title>
          </Marquee>
          <Burger
            hiddenFrom="sm"
            className="w-2/12 lg:w-0 m-3"
            opened={opened}
            onClick={toggle}
          />
        </Nav.Item>
      </Box>

      <Box
        className={`${
          opened ? "flex" : "hidden"
        } flex-col text-center md:flex-row md:w-12/12 md:justify-between lg:w-7/12 lg:justify-end xl:gap-12 md:flex`} // Always visible on large screens
      >
        <Nav.Item>
          <Nav.Link
            className={activeLink === "view" ? "active" : ""}
            onClick={() => {
              setActiveLink("view");
              navigate("/hallslist");
            }}
          >
            <span className="font-bold text-2xl">View Halls</span>
          </Nav.Link>
        </Nav.Item>

        {links.slice(1).map((link) => (
          <Nav.Item key={link.key}>
            <Nav.Link
              href="#"
              onClick={() => {
                if (link.key === "logout") {
                  logout();
                } else {
                  setActiveLink(link.key);
                  navigate(link.navigate);
                }
              }}
              className={activeLink === link.key ? "active" : ""}
            >
              <span className="font-bold text-2xl">{link.name}</span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Box>
    </Nav>
  );
};

export default Header;
