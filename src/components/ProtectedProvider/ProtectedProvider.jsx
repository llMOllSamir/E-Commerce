import React from 'react'
import { Navigate } from "react-router-dom";


export default function ProtectedProvider(probs) {
  if (localStorage.getItem("userToken")) {
    return probs.children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
