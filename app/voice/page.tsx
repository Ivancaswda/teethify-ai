import Navbar from "@/components/Navbar";
import FeatureCards from "@/components/voice/FeatureCards";
import ProPlanRequired from "@/components/voice/ProPlanRequired";
import VapiWidget from "@/components/voice/VapiWidget";
import WelcomeSection from "@/components/voice/WelcomeSection";

import getServerUser from "@/lib/auth-server";
import {redirect} from "next/navigation";

async function VoicePage() {
    const user = await getServerUser()


    if (!user) {
        redirect('/sign-up')
    }
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection />
        <FeatureCards />
      </div>
        {user?.isPremium ? <VapiWidget /> : <ProPlanRequired/>}

    </div>
  );
}

export default VoicePage;
