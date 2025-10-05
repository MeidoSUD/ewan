import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const nationalities = [
  { code: 'SA', label: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'EG', label: 'Egypt', flag: '🇪🇬' },
  { code: 'US', label: 'United States', flag: '🇺🇸' },
];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth() as any;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [email, setEmail] = useState('');
  const [localPhone, setLocalPhone] = useState('');
  const [nationality, setNationality] = useState(nationalities[0].code);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validatePhone = (value: string) => /^5\d{8}$/.test(value);

  const mapRole = (resUser: any) => {
    if (!resUser) return 'student';
    if (resUser.role && typeof resUser.role === 'string') return resUser.role;
    const id = resUser.role_id ?? resUser.roleId ?? resUser.role;
    if (id === 3) return 'teacher';
    if (id === 4) return 'student';
    return 'student';
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!accepted) return setError('You must accept the Terms & Conditions');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirm) return setError('Passwords do not match');
    if (!validatePhone(localPhone)) return setError('Phone must be 9 digits and start with 5 (e.g. 5XXXXXXXX)');

    setLoading(true);
    try {
      const phone = '+966' + localPhone;
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: `966${localPhone}`,
        gender,
        nationality,
        role_id: 2,
        password,
      };
      const res = await api.register(payload);
      // show full API response for debugging
      try { toast({ title: 'Register response', description: JSON.stringify(res), variant: 'default' }); } catch {}

      if (res && (res.requires_verification || res.requires_verification === true)) {
        const userId = res?.user?.id ?? res?.id ?? res?.user_id ?? res?.userId ?? null;
        const redirectPhone = (res && (res.phone_number || res.user?.phone_number || res.phone || res.user?.phone)) || phone;
        try {
          localStorage.setItem('pending_verification', JSON.stringify({ user_id: userId, phone_number: redirectPhone }));
        } catch {}
        navigate('/verify-phone');
        return;
      }
      if (res && res.token) {
        localStorage.setItem('auth_token', res.token);
        const profile = await api.getProfile(res.token).catch(() => res.user || null);
        const role = mapRole(profile || res.user);
        if (role === 'teacher') navigate('/dashboard/teacher');
        else if (role === 'admin') navigate('/admin');
        else navigate('/dashboard/student');
      }
    } catch (err: any) {
      const desc = err?.data ? JSON.stringify(err.data) : err?.message || 'Registration failed';
      setError(err?.message || 'Registration failed');
      try { toast({ title: 'Register error', description: desc, variant: 'destructive' }); } catch {}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create an account</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <select id="gender" className="w-full border px-3 py-2 rounded" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-muted border border-input">+966</span>
            <Input id="phone" className="flex-1 rounded-r" value={localPhone} onChange={(e) => setLocalPhone(e.target.value.replace(/\D/g, ''))} placeholder="5XXXXXXXX" required />
          </div>
        </div>

        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <select id="nationality" className="w-full border px-3 py-2 rounded" value={nationality} onChange={(e) => setNationality(e.target.value)}>
            {nationalities.map(n => (<option key={n.code} value={n.code}>{n.flag} {n.label}</option>))}
          </select>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>

        <div className="flex items-center gap-2">
          <input id="terms" type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
          <Label htmlFor="terms" className="m-0">I accept the Terms & Conditions</Label>
        </div>

        {error && <div className="text-destructive">{error}</div>}

        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Please wait...' : 'Register'}</Button>
      </form>
    </div>
  );
};

export default Register;
