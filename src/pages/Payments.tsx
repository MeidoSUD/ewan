import { useLanguage } from '@/contexts/LanguageContext';

const Payments = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t('pages.payments.title')}</h1>
      <p className="text-muted-foreground">{t('pages.payments.subtitle')}</p>
    </div>
  );
};

export default Payments;
