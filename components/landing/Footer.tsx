import Image from "next/image";
import {FaTelegram, FaTiktok, FaVk, FaYandex} from "react-icons/fa";
import {GiToothbrush} from "react-icons/gi";

function Footer() {
  return (
      <footer className="py-16 px-6 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
              <GiToothbrush size={40} className='text-primary'/>
            <span className="font-bold">Teethify</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2026 Teethify — AI для здоровья вашей улыбки
          </p>
        </div>
        <div className='flex items-center mt-4 justify-center gap-4'>
            <FaVk className='size-4 hover:text-primary transition cursor-pointer'/>
            <FaYandex className='size-4 hover:text-primary transition cursor-pointer'/>
            <FaTelegram className='size-4 hover:text-primary transition cursor-pointer'/>
            <FaTiktok className='size-4 hover:text-primary transition cursor-pointer'/>
        </div>
      </footer>
  );
}
export default Footer;
