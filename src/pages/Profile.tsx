import { useLanguage } from '@/contexts/LanguageContext';

const Profile = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t('pages.profile.title')}</h1>
      <p className="text-muted-foreground">{t('pages.profile.subtitle')}</p>
    </div>
  );
};

export default Profile;
