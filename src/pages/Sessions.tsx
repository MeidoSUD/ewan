import { useLanguage } from '@/contexts/LanguageContext';

const Sessions = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t('pages.sessions.title')}</h1>
      <p className="text-muted-foreground">{t('pages.sessions.subtitle')}</p>
    </div>
  );
};

export default Sessions;
