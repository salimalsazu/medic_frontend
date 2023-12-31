"use client";
import About from "@/components/About/About";
import Apointment from "@/components/Apointment/Apointment";
import Banner from "@/components/Banner/Banner";
import BlogPage from "@/components/BlogPage/BlogPage";
import Faqs from "@/components/Faqs/Faqs";
import HealthCare from "@/components/HealthCare/HealthCare";
import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import UpComingService from "@/components/Services/UpComingService";
import Testimonial from "@/components/Testimonial/Testimonial";
import { FloatButton } from "antd";

export default function Home() {
  return (
    <div>
      <Hero />
      <Banner />
      <Apointment />
      <About />
      <Services />
      <UpComingService />
      {/* <HealthCare /> */}
      <Testimonial />
      <Faqs />
      <BlogPage />
      <FloatButton.BackTop type="primary" tooltip="Scroll to top" />
    </div>
  );
}
