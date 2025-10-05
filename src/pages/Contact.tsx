import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit the form.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: [t('contact.info.address'), "Learning City, LC 12345", "United States"]
    },
    {
      icon: Mail,
      title: "Email",
      details: [t('contact.info.email'), "support@educonnect.com"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: [t('contact.info.phone'), "+1 (555) 123-4568"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [t('contact.info.hours'), "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"]
    }
  ];

  const faqData = [
    {
      question: t('contact.faq.q1.question'),
      answer: t('contact.faq.q1.answer')
    },
    {
      question: t('contact.faq.q2.question'),
      answer: t('contact.faq.q2.answer')
    },
    {
      question: t('contact.faq.q3.question'),
      answer: t('contact.faq.q3.answer')
    },
    {
      question: t('contact.faq.q4.question'),
      answer: t('contact.faq.q4.answer')
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">{t('contact.title')}</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <Card className="bg-card border-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center space-x-2">
                  <Send className="h-6 w-6 text-primary" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.form.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.form.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.messagePlaceholder')}
                      className="w-full min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    {t('contact.form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t('contact.info.title')}</h2>
                <p className="text-muted-foreground text-lg">
                  Whether you're a student looking for the perfect tutor or an educator 
                  wanting to join our platform, we're excited to hear from you!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} className="bg-card border-border shadow-soft">
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-education-light-blue rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="font-semibold text-foreground">{info.title}</h3>
                        </div>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-sm text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Find Us</h2>
            <p className="text-xl text-muted-foreground">
              Visit our office or connect with us online
            </p>
          </div>

          {/* Google Map Placeholder */}
          <Card className="bg-card border-border shadow-soft overflow-hidden">
            <div className="h-96 bg-muted flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-16 w-16 text-primary mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Interactive Map</h3>
                  <p className="text-muted-foreground">
                    Google Maps integration would be displayed here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('contact.info.address')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">{t('contact.faq.title')}</h2>
            <p className="text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqData.map((faq, index) => (
              <Card key={index} className="bg-card border-border shadow-soft">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;