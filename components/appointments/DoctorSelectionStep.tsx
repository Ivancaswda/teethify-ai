
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DoctorCardsLoading } from "./DoctorCardsLoading";
import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";
import axios from "axios";

interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onSelectDentist: (dentistId: string) => void;
  onContinue: () => void;
}

function DoctorSelectionStep({
  onContinue,
  onSelectDentist,
  selectedDentistId,
}: DoctorSelectionStepProps) {
    const [dentists, setDentists] = useState([])
    const [loading, setLoading] = useState<boolean>()

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);
    useEffect(() => {
        getAvailableDoctors()
    }, []);
    const getAvailableDoctors = async () => {
        try {
            setLoading(true)
            const {data} = await axios.get('/api/doctors/getAll')

            const available = data.doctors.filter((doctor: any) => doctor.isActive);

            setLoading(false)
            setDentists(available);
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error('Не удалось получить доступных стоматологов')
        }
    }

  if (loading)
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Выберите нужного стоматолога</h2>
        <DoctorCardsLoading />
      </div>
    );
    console.log(dentists)
  return (
    <div ref={containerRef} className="space-y-6">
      <h2 className="text-2xl font-semibold my-4">Выберите нужного стоматолога</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dentists.map((dentist) => (
          <Card
            key={dentist.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedDentistId === dentist.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectDentist(dentist.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Image
                  src={dentist.imageUrl!}
                  alt={dentist.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-lg">{dentist.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {dentist.speciality || "Главный Врач-Стоматолог"}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{dentist.rating ?? '??'}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({dentist.appointmentCount} приемов)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                <span>Teethify</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="w-4 h-4" />
                <span>{dentist.phone}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {dentist.bio || "Experienced dental professional providing quality care."}
              </p>
              <Badge variant="secondary">Лицензированный проффесионал</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDentistId && (
        <div className="flex justify-end my-6">
          <Button onClick={onContinue}>Продолжить к планировке времени</Button>
        </div>
      )}
    </div>
  );
}
export default DoctorSelectionStep;
