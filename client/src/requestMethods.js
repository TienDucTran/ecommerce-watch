import axios from "axios";

const BASE_URL = "http://localhost:5500/api/";
const TOKEN =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjA3MjdlNmFiNjcxZjM5MDkzMTgwNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMDkxMTYwMCwiZXhwIjoxNzA5NTUxNjAwfQ.g2954eyKkWPuhTrly_pxJvIMgJ2RxEMunSXJ42qsZtY";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).userInfo.accessToken;

export const publicRequest = axios.create({ baseURL: BASE_URL });


export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
