const API_BASE = "https://portal.ewan-geniuses.com/api";

async function handleResponse(res) {
  const text = await res.text().catch(() => "");
  let data = null;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    const err = new Error((data && data.message) || `Request failed with status ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

async function postAuth(path, body) {
  const url = `${API_BASE}/auth/${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function register(data) {
  return postAuth('register', data);
}

// Compatibility: some modules import `signup`; provide alias
export async function signup(data) {
  return register(data);
}

export async function login(credentials) {
  return postAuth('login', credentials);
}

export async function logout(token) {
  const url = `${API_BASE}/auth/logout`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
  });
  return handleResponse(res);
}

export async function forgotPassword(email) {
  return postAuth('forgot-password', { email });
}

export async function resendCode({ phone, user_id }) {
  const body = {};
  if (user_id) body.user_id = user_id;
  if (typeof phone === 'string' && phone.length) body.phone_number = phone.replace(/^\+/, '');
  return postAuth('resend-code', body);
}

export async function verifyCode({ phone, code, user_id }) {
  const body = { code };
  if (user_id) body.user_id = user_id;
  else if (typeof phone === 'string' && phone.length) body.phone_number = phone.replace(/^\+/, '');
  return postAuth('verify', body);
}

export async function getProfile(token) {
  // Try the preferred endpoint first (/auth/profile) then fallback to /user/profile
  const authUrl = `${API_BASE}/auth/profile`;
  const userUrl = `${API_BASE}/user/profile`;
  const headers = { 'Accept': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(authUrl, { headers });
    return await handleResponse(res);
  } catch (e) {
    const res = await fetch(userUrl, { headers });
    return handleResponse(res);
  }
}

// Generic GET helper for unauthenticated or token-based requests
async function get(path, token) {
  const url = `${API_BASE}/${path}`;
  const headers = { 'Accept': 'application/json' };
  const stored = token || (typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null);
  if (stored) headers.Authorization = `Bearer ${stored}`;
  const res = await fetch(url, { headers });
  return handleResponse(res);
}

export async function getCourses(token) {
  return get('courses', token);
}

export async function getTeachers(token) {
  return get('teachers', token);
}

export async function getServices(token) {
  return get('services', token);
}

export default { API_BASE, postAuth, register, login, logout, forgotPassword, resendCode, verifyCode, getProfile, getCourses, getTeachers, getServices };
