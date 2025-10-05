import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const DEMO = [
  { email: 'admin@educonnect.com', password: 'password', label: 'Login as Admin' },
  { email: 'teacher@educonnect.com', password: 'password', label: 'Login as Teacher' },
  { email: 'student@educonnect.com', password: 'password', label: 'Login as Student' },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectAfterRole = (role?: string | null) => {
    if (role === 'admin') navigate('/dashboard');
    else if (role === 'teacher') navigate('/sessions');
    else navigate('/courses');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await login({ email, password });
    setLoading(false);
    if (!res.ok) {
      setError(res.error || '');
      return;
    }
    // If API returned token directly, ensure stored
    if (res.token) localStorage.setItem('auth_token', res.token);
    const to = location.state?.from?.pathname as string | undefined;
    if (to) return navigate(to, { replace: true });
    redirectAfterRole(res.user?.role || (res.user && res.user.role));
  };

  const quickLogin = async (emailVal: string, passwordVal: string) => {
    setError(null);
    setLoading(true);
    const res = await login({ email: emailVal, password: passwordVal });
    setLoading(false);
    if (!res.ok) {
      setError(res.error || '');
      return;
    }
    redirectAfterRole(res.user?.role);
  };

  return (
    <div className="mx-auto max-w-md py-10 px-4" dir={document.documentElement.getAttribute('dir') || 'ltr'}>
      <h1 className="mb-6 text-2xl font-semibold">{t('auth.login.title')}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t('auth.loading') : t('auth.login.submit')}
        </Button>
      </form>

      <div className="mt-4 grid grid-cols-1 gap-2">
        {DEMO.map((d) => (
          <Button key={d.email} variant="outline" onClick={() => quickLogin(d.email, d.password)}>
            {d.label}
          </Button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <Link to="/forgot-password" className="underline">{t('auth.login.forgot')}</Link>
        <Link to="/signup" className="underline">{t('auth.login.signup')}</Link>
      </div>
    </div>
  );
};

export default Login;
