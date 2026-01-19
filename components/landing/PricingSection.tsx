'use client'
import { Button } from "@/components/ui/button";
import {useAuth} from "@/context/useAuth";
import {useRouter} from "next/navigation";

function PricingSection() {

  const {user} = useAuth()
  const router =useRouter()
  return (
      <section id="pricing" className="py-32 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">Тарифы Teethify</h2>
          <p className="text-xl text-muted-foreground">
            Честные цены без скрытых платежей
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* FREE */}
          <div className="p-8 rounded-3xl bg-card border">
            <h3 className="text-2xl font-bold mb-2">Бесплатно</h3>
            <p className="text-4xl font-bold mb-6">0 ₽</p>
            <Button disabled={true} className="w-full">Уже есть</Button>
          </div>

          {/* BASIC */}
          <div className="p-8 rounded-3xl bg-card border-2 border-primary scale-105">
            <h3 className="text-2xl font-bold mb-2">Teethify Basic</h3>
            <p className="text-4xl font-bold mb-6 text-primary">990 ₽</p>
            <Button
                onClick={() => {
                  router.replace('/pricing')
                }}
                disabled={user?.isBasic === 1} className="w-full">

              {user?.isBasic === 1 ? 'Уже есть' : 'Подключить'}
                  </Button>
          </div>

          {/* PRO */}
          <div className="p-8 rounded-3xl bg-card border">
            <h3 className="text-2xl font-bold mb-2">Teethify Premium</h3>
            <p className="text-4xl font-bold mb-6">1 990 ₽</p>
            <Button  onClick={() => {
              router.replace('/pricing')
            }} disabled={user?.isPremium === 1} variant="outline" className="w-full">
              {user?.isPremium === 1 ? 'Уже есть' : 'Апгрэйд'}

            </Button>
          </div>
        </div>
      </section>
  );
}

export default PricingSection;
