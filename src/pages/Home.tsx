import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, BookOpen, CreditCard, Video, Award, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Users,
      title: t('home.howItWorks.findMatch.title'),
      description: t('home.howItWorks.findMatch.description')
    },
    {
      icon: BookOpen,
      title: t('home.howItWorks.bookLessons.title'),
      description: t('home.howItWorks.bookLessons.description')
    },
    {
      icon: CreditCard,
      title: t('home.howItWorks.securePayments.title'),
      description: t('home.howItWorks.securePayments.description')
    },
    {
      icon: Video,
      title: t('home.howItWorks.onlineClasses.title'),
      description: t('home.howItWorks.onlineClasses.description')
    }
  ];

  const stats = [
    { label: t('home.stats.activeStudents'), value: "10,000+" },
    { label: t('home.stats.expertTeachers'), value: "2,500+" },
    { label: t('home.stats.subjectsAvailable'), value: "150+" },
    { label: t('home.stats.successRate'), value: "98%" }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {t('home.hero.title')} <span className="text-education-light-green">{t('home.hero.titleHighlight')}</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-lg">
                  {t('home.hero.subtitle')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                  <Link to="/register">{t('home.hero.getStarted')}</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary" asChild>
                  <Link to="/services">{t('home.hero.exploreServices')}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Students and teachers connecting through EduConnect platform"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('home.howItWorks.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.howItWorks.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-card border-border shadow-soft hover:shadow-hover transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-education-light-blue rounded-full flex items-center justify-center mx-auto">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('home.cta.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('home.cta.subtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="hero" className="text-lg px-8 py-4" asChild>
                <Link to="/register">{t('home.cta.signUp')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                <Link to="/contact">{t('home.cta.contactUs')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;