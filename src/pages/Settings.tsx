import { useLanguage } from '@/contexts/LanguageContext';

const Settings = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t('pages.settings.title')}</h1>
      <p className="text-muted-foreground">{t('pages.settings.subtitle')}</p>
    </div>
  );
};

export default Settings;
