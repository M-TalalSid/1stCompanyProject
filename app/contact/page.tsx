"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SpinnerLoader from "../loader/page";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      toast({
        title: "Please fill in required fields",
        description: "First name, last name, email, and message are required.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Message sent successfully!",
      description:
        "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    });

    setIsSubmitting(false);
  };
  if (loading) return <SpinnerLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-gray-900/80" />
        <div className="absolute inset-0">
          <Image
            src="/images/WhatsApp Image 2025-08-20 at 9.02.36 PM.jpeg"
            alt="Contact Us"
            fill
            className="object-fit"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-light mb-4">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            We're here to help. Get in touch with our customer service team.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 -mt-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="text-center shadow-xl border-0 bg-white">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold mb-2">Visit Our Store</h3>
                <p className="text-gray-600 text-xl leading-relaxed">
                  123 Fashion Avenue
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-xl border-0 bg-white">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 text-xl leading-relaxed">
                  Customer Service:
                  <br />
                  +1 (555) 123-4567
                  <br />
                  Mon-Fri 9AM-6PM EST
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-xl border-0 bg-white">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 text-xl leading-relaxed">
                  General: info@luxefashion.com
                  <br />
                  Support: support@luxefashion.com
                  <br />
                  Orders: orders@luxefashion.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-5xl font-playfair font-light">
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600 text-2xl">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleSelectChange("category", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="order">Order Support</SelectItem>
                          <SelectItem value="returns">
                            Returns & Exchanges
                          </SelectItem>
                          <SelectItem value="shipping">
                            Shipping Information
                          </SelectItem>
                          <SelectItem value="product">
                            Product Questions
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership Opportunities
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Brief subject line"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 min-h-32"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 py-3 text-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending Message...</>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="space-y-8">
              {/* FAQ Quick Links */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-5xl font-playfair font-light">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="ghost"
                    className="text-2xl w-full justify-start text-left p-0 h-auto"
                  >
                    <div>
                      <p className="font-medium">How do I track my order?</p>
                      <p className="text-xl text-gray-600">
                        Learn about order tracking and delivery updates
                      </p>
                    </div>
                  </Button>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="text-2xl w-full justify-start text-left p-0 h-auto"
                  >
                    <div>
                      <p className="font-medium">What is your return policy?</p>
                      <p className="text-xl text-gray-600">
                        60-day return policy details
                      </p>
                    </div>
                  </Button>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="text-2xl w-full justify-start text-left p-0 h-auto"
                  >
                    <div>
                      <p className="font-medium">
                        Do you offer international shipping?
                      </p>
                      <p className="text-xl text-gray-600">
                        Shipping options and rates
                      </p>
                    </div>
                  </Button>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="text-2xl w-full justify-start text-left p-0 h-auto"
                  >
                    <div>
                      <p className="font-medium">How do I find my size?</p>
                      <p className="text-xl text-gray-600">
                        Size guide and fitting tips
                      </p>
                    </div>
                  </Button>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="text-2xl w-full justify-start text-left p-0 h-auto"
                  >
                    <div>
                      <p className="font-medium">
                        Do you offer international shipping?
                      </p>
                      <p className="text-xl text-gray-600">
                        Shipping options and rates
                      </p>
                    </div>
                  </Button>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="text-2xl w-full justify-start text-left p-0 h-auto"
                  >
                    <div>
                      <p className="font-medium">
                        Do you offer international shipping?
                      </p>
                      <p className="text-xl text-gray-600">
                        Shipping options and rates
                      </p>
                    </div>
                  </Button>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="text-2xl w-full justify-start text-left p-0 h-auto"
                  >
                    <div>
                      <p className="font-medium">
                        Do you offer international shipping?
                      </p>
                      <p className="text-xl text-gray-600">
                        Shipping options and rates
                      </p>
                    </div>
                  </Button>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="text-2xl w-full justify-start text-left p-0 h-auto"
                  >
                    <div>
                      <p className="font-medium">
                        Do you offer international shipping?
                      </p>
                      <p className="text-xl text-gray-600">
                        Shipping options and rates
                      </p>
                    </div>
                  </Button>
                  <Separator />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
