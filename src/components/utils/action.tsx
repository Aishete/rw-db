// take in the user's details from the UI
import { setDoc } from "firebase/firestore";

const addNewUser = async ({ phoneNo, name, email, address, cars = "" }) => {
  const userId = uuid_v4(); // generate the userId
  const userRef = doc(db, "users", userId); // use the userId generated to create a docId
  const data = {
    phoneNo,
    name,
    email,
    address,
    cars,
    userId, // save the userId to the user record
  };
  try {
    // add a new Doc to the User's Collection
    await setDoc(userRef, data, { merge: true });
    console.log("Document written with ID: ", userRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
