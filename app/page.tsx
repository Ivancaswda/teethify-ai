'use client'
import React from 'react'
import {useAuth} from "@/context/useAuth";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import WhatToAsk from "@/components/landing/WhatToAsk";
import PricingSection from "@/components/landing/PricingSection";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const HomePage = () => {
    const {user} = useAuth()
    console.log(user)

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <Hero />
            <HowItWorks />
            <WhatToAsk />
            <PricingSection />
            <CTA />

        </div>
    )
}
export default HomePage
