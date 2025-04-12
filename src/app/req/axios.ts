import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://cybertechback.onrender.com";
const db = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "x-frontend-secret": process.env.NEXT_PUBLIC_FRONTEND_SECRET || "",
  },
});

export default db;
