import { useLanguage } from '@/contexts/LanguageContext';

const Users = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t('pages.users.title')}</h1>
      <p className="text-muted-foreground">{t('pages.users.subtitle')}</p>
    </div>
  );
};

export default Users;
