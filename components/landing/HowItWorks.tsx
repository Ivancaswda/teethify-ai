import Image from "next/image";
import {Calendar, ZapIcon} from "lucide-react";
import {FaBrain, FaCalendar, FaMicrophone} from "react-icons/fa";

function HowItWorks() {
  return (
      <section id="how" className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <ZapIcon className="mx-auto mb-4 text-primary" />
          <h2 className="text-5xl font-bold mb-6">
            Как работает <span className="text-primary">Teethify</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Всего три шага к здоровой улыбке
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { title: "Задайте вопрос", icon: FaMicrophone },
            { title: "Получите AI-анализ", icon: FaBrain },
            { title: "Запишитесь к врачу", icon: FaCalendar },
          ].map((step, i) => (
              <div key={i} className="rounded-3xl p-8 bg-card border hover:shadow-xl transition">
                <step.icon style={{width: "60px", height: '60px'}} className="mx-auto mb-6 text-primary w-[90px]! h-[90px]!" />
                <h3 className="text-2xl text-center font-semibold">{step.title}</h3>
              </div>
          ))}
        </div>
      </section>
  );
}

export default HowItWorks;
