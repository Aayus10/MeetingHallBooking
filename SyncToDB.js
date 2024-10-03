import axios from "axios"; // Or fetch if preferred

export const syncStateToDB = async (halls) => {
  try {
    // Step 1: Fetch existing halls from the database
    const response = await axios.get("http://localhost:5000/halls");
    const existingHalls = response.data;

    console.log("Existing halls in db.json:", existingHalls);

    // Step 2: Filter out halls that already exist in the database
    const newHalls = halls.filter(
      (hall) => !existingHalls.some((existing) => existing.id === hall.id) // Check based on unique identifier (e.g., `id`)
    );

    console.log("New halls to be posted:", newHalls);

    // Step 3: If there are new halls, post them to the database
    if (newHalls.length > 0) {
      await axios.post("http://localhost:5000/halls", newHalls);
      console.log("New halls posted to db.json:", newHalls);
    } else {
      console.log("No new halls to post.");
    }
  } catch (error) {
    console.error("Error syncing state to db.json:", error);
  }
};
