"use client"
import Navbar from "@/components/Navbar";
import FeatureCards from "@/components/voice/FeatureCards";
import ProPlanRequired from "@/components/voice/ProPlanRequired";
import VapiWidget from "@/components/voice/VapiWidget";
import WelcomeSection from "@/components/voice/WelcomeSection";


import {useAuth} from "@/context/useAuth";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {LoaderOne} from "@/components/ui/loader";

function VoicePage() {
    const {user, loading} = useAuth()
    const router  =useRouter()
    console.log(user)
    useEffect(() => {
        if (!user && !loading) {
            router.replace('/')
        }
    }, [user, loading, router]);
    if (!user && loading) {
        return  <div className='flex items-center justify-center w-screen h-screen'>
            <LoaderOne/>
        </div>
    }
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection />
        <FeatureCards />
      </div>
        {user?.isBasic === 1 || user?.isPremium === 1 ? <VapiWidget /> : <ProPlanRequired/>}

    </div>
  );
}

export default VoicePage;
