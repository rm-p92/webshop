export async function fetchAuthorized() {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/authorized', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.json();
}

export async function fetchDashboard() {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.json();
}
