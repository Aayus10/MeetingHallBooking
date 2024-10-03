import Header from "./Header";
import { Modal } from "@mantine/core";
import React, { useState } from "react";
import BookingForm from "./BookingForm";
import meetingHalls from "../../../HallData";
import { useDisclosure } from "@mantine/hooks";
import { Box, Card, Grid, Image, Text } from "@mantine/core";

export default function HallsList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedHall, setSelectedHall] = useState("");

  const handleCardClick = (hall) => {
    setSelectedHall(hall);
    open();
  };

  return (
    <>
      <Header />
      <Box className="mt-0 min-h-screen bg-opacity-0 bg-[url('https://i.pinimg.com/736x/57/81/54/57815429f55b70dce6eb75187235c369.jpg')] bg-cover">
        <p className="text-3xl text-center font-bold text-red-950">
          AVAILABLE HALLS
        </p>
        <Modal
          title="Booking Form"
          centered
          styles={{
            title: {
              color: "black",
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: "1px",
            },
          }}
          opened={opened}
          onClose={close}
        >
          <BookingForm selectedHall={selectedHall} onClose={close} />
        </Modal>

        <Grid>
          {meetingHalls &&
            meetingHalls.map((x) => {
              const { image, name, address, capacity } = x;
              return (
                <>
                  <Grid.Col key={name} span={{ base: 12, xs: 6, md: 4 }}>
                    <Card
                      shadow="lg"
                      padding="xl"
                      component="a"
                      target="_blank"
                      className="mx-[10%] md:mx-[8%] border-2 border-b-gray-800 mt-8"
                      onClick={() => handleCardClick(name)}
                    >
                      <Card.Section>
                        <Image src={image} h={160} alt="No way!" />
                      </Card.Section>
                      <Text
                        className="text-yellow-950 text-xl lg:text-2xl"
                        fw={500}
                        size="lg"
                        mt="md"
                      >
                        <strong>{name}</strong> <br />
                        <i className="text-blue-950 font-semibold text-lg lg:text-xl">
                          Capacity: {capacity} persons
                        </i>
                      </Text>
                      <Text
                        className="text-lg font-semibold font-serif lg:text-xl"
                        mt="xs"
                        size="sm"
                      >
                        {address}
                      </Text>

                      <p className="ml-2 mt-4 font-sans text-lg font-semibold text-teal-900 underline cursor-pointer">
                        BOOK NOW
                      </p>
                    </Card>
                  </Grid.Col>
                </>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}
