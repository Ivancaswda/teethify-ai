import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MicIcon } from "lucide-react";
import Link from "next/link";

function CTA() {
  return (
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6">
              Начните заботиться о зубах уже сегодня
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              AI-консультации и запись к врачу — в одном месте
            </p>
            <Link href='/voice'>
              <Button size="lg">
                <MicIcon className="mr-2" /> Попробовать бесплатно
              </Button>
            </Link>

          </div>

          <Image src="/cta2.png" alt="Teethify" width={400} height={400} />
        </div>
      </section>
  );
}
export default CTA;
