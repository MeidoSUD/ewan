import { useLanguage } from '@/contexts/LanguageContext';

const Bookings = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t('pages.bookings.title')}</h1>
      <p className="text-muted-foreground">{t('pages.bookings.subtitle')}</p>
    </div>
  );
};

export default Bookings;
