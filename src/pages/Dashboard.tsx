import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t('pages.dashboard.title')}</h1>
      <p className="text-muted-foreground">{t('pages.dashboard.subtitle')}</p>
    </div>
  );
};

export default Dashboard;
