import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const db = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default db;
