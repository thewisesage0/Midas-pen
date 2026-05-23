import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/store/auth";
import { AuthGateway } from "@/components/AuthGateway";

export function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate({ to: user.role === "admin" ? "/admin" : "/" });
  }, [user, navigate]);

  if (user) return null;

  return <AuthGateway onAuthed={() => navigate({ to: "/" })} />;
}
