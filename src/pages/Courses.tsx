import { useLanguage } from '@/contexts/LanguageContext';

const Courses = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t('pages.courses.title')}</h1>
      <p className="text-muted-foreground">{t('pages.courses.subtitle')}</p>
    </div>
  );
};

export default Courses;
