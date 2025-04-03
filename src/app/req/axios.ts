import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const db = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default db;
