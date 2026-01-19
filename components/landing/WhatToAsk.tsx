import { MessageCircleIcon, MessageSquareIcon } from "lucide-react";
import Image from "next/image";

function WhatToAsk() {
  return (
      <section id='faq' className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div  className="relative z-10 max-w-7xl mx-auto">

          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm mb-6">
              <MessageSquareIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
              Диалоги на базе AI
            </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Спрашивайте
            </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              о чём угодно — про зубы
            </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Teethify обучен на тысячах реальных стоматологических кейсов и
              даёт понятные, практичные рекомендации — от простых вопросов до
              сложных симптомов
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">

            <div className="space-y-10">
              <h3 className="text-2xl font-bold">
                Популярные вопросы, которые задают Teethify:
              </h3>

              {/* QUESTION CARD */}
              {[
                {
                  q: "У меня болит зуб, когда я накусываю",
                  a: "AI подскажет возможные причины боли, способы облегчить состояние и когда нужно срочно обратиться к стоматологу",
                  tags: ["Быстрый ответ", "Обезболивание"],
                },
                {
                  q: "Сколько стоит отбеливание зубов?",
                  a: "Сравнение методов отбеливания, ценовых диапазонов и подбор оптимального варианта под ваш бюджет",
                  tags: ["Цены", "Методы лечения"],
                },
                {
                  q: "Когда нужно менять пломбу?",
                  a: "Срок службы пломб, тревожные признаки и рекомендации по своевременной замене",
                  tags: ["Профилактика", "Уход"],
                },
              ].map((item, i) => (
                  <div
                      key={i}
                      className="group bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                        <MessageSquareIcon className="h-6 w-6 text-primary" />
                      </div>

                      <div className="space-y-4 flex-1">
                        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                          <p className="font-semibold text-primary">
                            «{item.q}»
                          </p>
                        </div>

                        <div className="bg-muted/30 rounded-2xl p-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.a}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                >
                            {tag}
                          </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            {/* RIGHT — ILLUSTRATION */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

              <div className="relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-10 border border-border/50 hover:border-primary/30 transition-all duration-500">
                <Image
                    src="/confused2.png"
                    alt="Teethify AI"
                    width={520}
                    height={520}
                    className="w-full h-auto max-w-lg mx-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default WhatToAsk;
