import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/services/api';
import { toast } from '@/hooks/use-toast';

const VerifyPhone: React.FC = () => {
  const [searchParams] = useSearchParams();
  const pending = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('pending_verification') || 'null') : null;
  const phone = pending?.phone_number || searchParams.get('phone') || '';
  const initialUserId = pending?.user_id || searchParams.get('user_id') || searchParams.get('userId') || searchParams.get('id') || '';
  const [userId, setUserId] = useState(initialUserId);
  const [code, setCode] = useState('');
  const [lastResponse, setLastResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!code || code.length < 4) return setError('Enter the verification code');
    setLoading(true);
    try {
      const payload: any = userId ? { user_id: userId, code } : { code };
      if (!userId && phone) payload.phone_number = phone.replace(/^\+/, '');

      const data = await api.verifyCode(payload);
      setLastResponse(data);
      try { toast({ title: 'Verify response', description: JSON.stringify(data), variant: 'default' }); } catch {}
      if (data && data.token) {
        try { localStorage.removeItem('pending_verification'); } catch {}
        localStorage.setItem('auth_token', data.token);
        const profile = await api.getProfile(data.token).catch(() => data.user || null);
        const id = profile?.role_id ?? profile?.roleId ?? profile?.role;
        const role = profile && (profile.role || (id === 3 ? 'teacher' : id === 4 ? 'student' : null));
        if (role === 'teacher') navigate('/dashboard/teacher');
        else if (role === 'admin') navigate('/admin');
        else navigate('/dashboard/student');
        return;
      }
      setError('Verification succeeded but no token was returned');
    } catch (err: any) {
      const desc = err?.data ?? err?.message ?? 'Verification failed';
      setLastResponse(desc);
      setError(err?.message || 'Verification failed');
      try { toast({ title: 'Verify error', description: JSON.stringify(desc), variant: 'destructive' }); } catch {}
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setError(null);
    setLoading(true);
    try {
      const payload: any = userIdParam ? { user_id: userIdParam } : {};
      if (!userIdParam && phone) payload.phone_number = phone.replace(/^\+/, '');
      const data = await api.resendCode(payload);
      setLastResponse(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-10 px-4">
      <h1 className="mb-6 text-2xl font-semibold">Verify Phone</h1>
      <p className="mb-4">A verification code was sent to {phone}</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userId">User ID (from registration)</Label>
          <Input id="userId" value={userId} onChange={(e) => setUserId(e.target.value.replace(/\D/g, ''))} placeholder="Optional: paste user id" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Code</Label>
          <Input id="code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0,6))} required />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        {lastResponse && (
          <pre className="bg-muted p-3 rounded text-xs max-h-48 overflow-auto">{JSON.stringify(lastResponse, null, 2)}</pre>
        )}
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify'}</Button>
          <Button type="button" variant="outline" onClick={resend} disabled={loading}>Resend</Button>
        </div>
      </form>
    </div>
  );
};

export default VerifyPhone;
