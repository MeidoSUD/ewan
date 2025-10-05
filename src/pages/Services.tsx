import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  Video, 
  Award, 
  TrendingUp,
  Clock,
  Shield,
  Globe,
  Target,
  Gamepad2,
  FileText
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  
  const mainFeatures = [
    {
      icon: Users,
      title: t('services.core.studentBooking.title'),
      description: t('services.core.studentBooking.description'),
      features: ["Advanced tutor search", "Real-time availability", "Instant booking confirmation", "Flexible rescheduling"]
    },
    {
      icon: BookOpen,
      title: t('services.core.teacherProfiles.title'),
      description: t('services.core.teacherProfiles.description'),
      features: ["Verified credentials", "Student reviews & ratings", "Video introductions", "Teaching samples"]
    },
    {
      icon: CreditCard,
      title: t('services.core.walletPayment.title'),
      description: t('services.core.walletPayment.description'),
      features: ["Multiple payment options", "Secure transactions", "Digital wallet", "Transaction history"]
    },
    {
      icon: Video,
      title: t('services.core.videoClasses.title'),
      description: t('services.core.videoClasses.description'),
      features: ["HD video calls", "Screen sharing", "Digital whiteboard", "Session recordings"]
    },
    {
      icon: TrendingUp,
      title: t('services.additional.progressTracking.title'),
      description: t('services.additional.progressTracking.description'),
      features: ["Learning analytics", "Goal setting", "Performance reports", "Achievement badges"]
    },
    {
      icon: FileText,
      title: t('services.additional.projectSupport.title'),
      description: t('services.additional.projectSupport.description'),
      features: ["Project planning", "Milestone tracking", "Resource sharing", "Collaborative tools"]
    }
  ];

  const additionalFeatures = [
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Schedule lessons at your convenience with 24/7 availability."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All tutors are verified and undergo quality assessments."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with tutors from around the world in multiple languages."
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Customized learning paths based on individual goals and preferences."
    },
    {
      icon: Gamepad2,
      title: t('services.additional.gamification.title'),
      description: t('services.additional.gamification.description')
    },
    {
      icon: Award,
      title: "Certification",
      description: "Earn certificates and badges upon completing courses and milestones."
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">{t('services.title')}</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('services.core.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need for a successful online learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-card border-border shadow-soft hover:shadow-hover transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-education-light-blue rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('services.additional.title')}</h2>
            <p className="text-xl text-muted-foreground">
              Enhanced features that make learning more engaging and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-card border-border text-center shadow-soft hover:shadow-hover transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-education-light-green rounded-full flex items-center justify-center mx-auto">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Experience the Future of Learning
              </h2>
              <p className="text-xl text-white/90">
                Join our platform today and discover how technology can transform your educational journey
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;