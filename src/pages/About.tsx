import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Award, Users, Globe } from "lucide-react";
import teamSarah from "@/assets/team-sarah.jpg";
import teamDavid from "@/assets/team-david.jpg";
import teamEmma from "@/assets/team-emma.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: Target,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Globe,
      title: t('about.values.accessibility.title'),
      description: t('about.values.accessibility.description')
    },
    {
      icon: Award,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Users,
      title: t('about.values.community.title'),
      description: t('about.values.community.description')
    }
  ];

  const team = [
    {
      name: t('about.team.sarah.name'),
      role: t('about.team.sarah.role'),
      image: teamSarah,
      description: t('about.team.sarah.description')
    },
    {
      name: t('about.team.david.name'),
      role: t('about.team.david.role'),
      image: teamDavid,
      description: t('about.team.david.description')
    },
    {
      name: t('about.team.emma.name'),
      role: t('about.team.emma.role'),
      image: teamEmma,
      description: t('about.team.emma.description')
    }
  ];

  const trustFeatures = [
    {
      icon: Users,
      title: t('about.trust.verifiedTutors.title'),
      description: t('about.trust.verifiedTutors.description')
    },
    {
      icon: Award,
      title: t('about.trust.securePayments.title'),
      description: t('about.trust.securePayments.description')
    },
    {
      icon: Globe,
      title: t('about.trust.qualityAssurance.title'),
      description: t('about.trust.qualityAssurance.description')
    },
    {
      icon: Heart,
      title: t('about.trust.support.title'),
      description: t('about.trust.support.description')
    }
  ];

  const stats = [
    { label: "Years of Experience", value: "8+" },
    { label: "Countries Served", value: "50+" },
    { label: "Success Stories", value: "25,000+" },
    { label: "Team Members", value: "150+" }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">{t('about.hero.title')}</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-gradient-card border-border shadow-soft">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">{t('about.mission.title')}</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.mission.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-soft">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <Eye className="h-8 w-8 text-accent" />
                  <h2 className="text-2xl font-bold text-foreground">{t('about.vision.title')}</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.vision.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('about.values.title')}</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="bg-card border-border shadow-soft hover:shadow-hover transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-education-light-blue rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('about.team.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-card border-border shadow-soft hover:shadow-hover transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('about.trust.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built our platform with security, reliability, and educational excellence at its core.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-card border-border text-center shadow-soft hover:shadow-hover transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-education-light-blue rounded-full flex items-center justify-center mx-auto">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center pt-12">
            <Button size="lg" variant="hero" className="text-lg px-8 py-4" asChild>
              <Link to="/register">Join Our Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;