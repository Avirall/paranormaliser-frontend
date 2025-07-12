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
