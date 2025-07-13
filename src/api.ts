import { exportPages } from "next/dist/export/worker";

async function getCsrfToken() {
  const res = await fetch("http://localhost:8000/csrf/", {
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
}

export async function login(username: string, password: string) {
  const csrfToken = await getCsrfToken();

  const res = await fetch("http://localhost:8000/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function signup(name: string, username: string, password: string) {
  const csrfToken = await getCsrfToken();

  const res = await fetch("http://localhost:8000/signup/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ name, username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signup failed");
  return data;
}

export async function logout() {
  const csrfToken = await getCsrfToken();

  const res = await fetch("http://localhost:8000/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");
  return true;
}
