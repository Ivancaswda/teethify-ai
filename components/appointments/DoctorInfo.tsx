import { useAvailableDoctors } from "@/hooks/use-doctors";
import Image from "next/image";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import axios from "axios";

function DoctorInfo({ doctorId }: { doctorId: string }) {
    const [loading, setLoading] = useState<boolean>()
    const [doctor, setDoctor]  = useState()
    useEffect(() => {
        doctorId && getDoctorInfo()
    }, [doctorId]);
    const getDoctorInfo = async () => {
        try {
            setLoading(true)
            const {data}  = await axios.get(`/api/doctors/getOne?id=${doctorId}`)

            setDoctor(data.doctor)


            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error('Не удалось получить информацию о докторе')
        }
    }

  if (!doctor) return null;

  return (
    <div className="flex items-center gap-4">

      <Image
        src={doctor.imageUrl!}
        alt={doctor.name}
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium">{doctor.name}</h3>
        <p className="text-sm text-muted-foreground">{doctor.speciality || "Стоматолог-врач"}</p>
      </div>
    </div>
  );
}

export default DoctorInfo;
