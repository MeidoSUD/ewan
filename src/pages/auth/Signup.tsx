import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const nationalities = [
  { code: 'SA', label: 'Saudi Arabia', flag: '��🇦' },
  { code: 'EG', label: 'Egypt', flag: '🇪🇬' },
  { code: 'US', label: 'United States', flag: '🇺🇸' },
  { code: 'GB', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'IN', label: 'India', flag: '🇮🇳' },
];

const Signup: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [localPhone, setLocalPhone] = useState(''); // 9 digits, starting with 5
  const [nationality, setNationality] = useState(nationalities[0].code);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validatePhone(phone: string) {
    return /^5\d{8}$/.test(phone);
  }

  function mapRoleFromProfile(profile: any) {
    if (!profile) return null;
    if (profile.role && typeof profile.role === 'string') return profile.role;
    const id = profile.role_id ?? profile.roleId ?? profile.roleId;
    if (id === 4) return 'student';
    if (id === 3) return 'teacher';
    if (id === 2) return 'student';
    return null;
  }

  const showToast = (title: string, description?: string, variant?: 'default'|'destructive') => {
    try {
      toast({ title, description, variant: variant || 'default' });
    } catch { /* ignore */ }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!terms) return setError('You must accept the Terms & Conditions');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirmPassword) return setError('Passwords do not match');
    if (!validatePhone(localPhone)) return setError('Phone number must be 9 digits and start with 5');

    const phone = `+966${localPhone}`;

    const payload: any = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: `966${localPhone}`,
      gender,
      nationality,
      role_id: 2,
      password,
    };

    setLoading(true);
    try {
      const data = await api.register(payload);
      // show full response as toast for debugging
      showToast('Registration response', JSON.stringify(data, null, 2), 'default');

      // If backend returned a token, consider user logged in
      if (data && data.token) {
        localStorage.setItem('auth_token', data.token);
        // try to fetch profile to determine role
        const profile = await api.getProfile(data.token).catch(() => data.user || null);
        const role = mapRoleFromProfile(profile) || (data.user && data.user.role) || 'student';
        if (role === 'teacher') navigate('/dashboard/teacher');
        else if (role === 'admin') navigate('/admin');
        else navigate('/dashboard/student');
        return;
      }

      // No token -> assume verification required and redirect to verify page
      const userId = data?.user?.id ?? data?.id ?? data?.user_id ?? data?.userId ?? null;
      const redirectPhone = (data && (data.phone_number || data.user?.phone_number || data.phone || data.user?.phone)) || phone;
      // Store pending verification details in localStorage (sent in POST body during verify)
      try {
        localStorage.setItem('pending_verification', JSON.stringify({ user_id: userId, phone_number: redirectPhone }));
      } catch {}
      navigate('/verify-phone');
    } catch (err: any) {
      const desc = err?.data ? JSON.stringify(err.data) : err?.message || 'Registration failed';
      setError(err?.message || 'Registration failed');
      showToast('Registration error', desc, 'destructive');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-10 px-4" dir={document.documentElement.getAttribute('dir') || 'ltr'}>
      <h1 className="mb-6 text-2xl font-semibold">{t('auth.signup.title')}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t('auth.first_name') || 'First Name'}</Label>
            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{t('auth.last_name') || 'Last Name'}</Label>
            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t('auth.email') || 'Email'}</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">{t('auth.gender') || 'Gender'}</Label>
          <select id="gender" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">{t('auth.male') || 'Male'}</option>
            <option value="female">{t('auth.female') || 'Female'}</option>
            <option value="other">{t('auth.other') || 'Other'}</option>
          </select>
        </div>

        <div>
          <Label htmlFor="phone">{t('auth.phone') || 'Phone'}</Label>
          <div className="flex gap-2 items-center">
            <span className="inline-flex items-center px-3 py-2 rounded-l-md border bg-muted">+966</span>
            <Input id="phone" value={localPhone} onChange={(e) => setLocalPhone(e.target.value.replace(/\D/g, '').slice(0,9))} placeholder="5XXXXXXXX" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">{t('auth.nationality') || 'Nationality'}</Label>
          <select id="nationality" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={nationality} onChange={(e) => setNationality(e.target.value)}>
            {nationalities.map(n => (
              <option key={n.code} value={n.code}>{n.flag} {n.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{t('auth.password') || 'Password'}</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t('auth.confirm_password') || 'Confirm Password'}</Label>
          <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <div className="flex items-center gap-2">
          <input id="terms" type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <Label htmlFor="terms" className="m-0">I accept the Terms & Conditions</Label>
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t('auth.loading') || 'Loading...' : t('auth.signup.submit') || 'Sign up'}
        </Button>
      </form>

      <div className="mt-4 text-sm text-muted-foreground">
        <Link to="/login" className="underline">{t('auth.signup.login') || 'Already have an account? Log in'}</Link>
      </div>
    </div>
  );
};

export default Signup;
