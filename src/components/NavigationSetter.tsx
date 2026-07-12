import { setNavigator } from "@/config/navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationSetter() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return null;
}
