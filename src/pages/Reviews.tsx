import { useLanguage } from '@/contexts/LanguageContext';

const Reviews = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t('pages.reviews.title')}</h1>
      <p className="text-muted-foreground">{t('pages.reviews.subtitle')}</p>
    </div>
  );
};

export default Reviews;
