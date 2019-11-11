import * as React from "react";
import { useAuth } from "./Auth/authContext";

export default function Home() {
  let auth = useAuth();
  let userName = auth.currentUser ? auth.currentUser!.login : "Guest";
  return <h1 className="text-center text-light mt-5">Welcome {userName}</h1>;
}
