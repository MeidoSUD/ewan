import { useLanguage } from '@/contexts/LanguageContext';

const Disputes = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t('pages.disputes.title')}</h1>
      <p className="text-muted-foreground">{t('pages.disputes.subtitle')}</p>
    </div>
  );
};

export default Disputes;
