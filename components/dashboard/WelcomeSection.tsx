import getServerUser from "@/lib/auth-server";
import { GiToothbrush } from "react-icons/gi";

export default async function WelcomeSection() {
  const user = await getServerUser();
  const hour = new Date().getHours();

  const greeting =
      hour < 12 ? "Доброе утро" : hour < 18 ? "Добрый день" : "Добрый вечер";

  return (
      <div style={{marginTop: '80px'}} className=" flex items-center justify-between bg-primary/10 rounded-3xl p-8 border">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {greeting}, {user?.userName}!
          </h1>
          <p className="text-muted-foreground">
            Ваш персональный AI-стоматолог всегда готов помочь
          </p>
        </div>

        <div className="hidden lg:flex size-32 items-center justify-center bg-primary/20 rounded-full">
          <GiToothbrush size={100} />
        </div>
      </div>
  );
}
