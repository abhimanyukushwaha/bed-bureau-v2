"use client"; // if using App Router

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAdmin } from "@/store/reducerSlice/adminReducer";
import { getProfile } from "@/store/actions/adminAction";
import type { AppDispatch } from "@/store/store"; // adjust path if needed

export default function AppInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const authDetail = localStorage.getItem("authorization");
    if (authDetail) {
      try {
        const parsed = JSON.parse(authDetail);
        // Pass parsed object, not raw string
        dispatch(checkAdmin(parsed));

        if (parsed.token) {
          dispatch(getProfile());
        }
      } catch (error) {
        console.error("Invalid authorization token in localStorage", error);
      }
    }
  }, [dispatch]);

  return null; // nothing to render
}
