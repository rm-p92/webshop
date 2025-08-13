export const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAuthorized() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/authorized`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.json();
}

export async function fetchDashboard() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.json();
}
