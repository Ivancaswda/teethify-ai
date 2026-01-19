"use client";
import Image from "next/image";
import { AppointmentConfirmationModal } from "@/components/appointments/AppointmentConfirmationModal";
import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import Navbar from "@/components/Navbar";
import { APPOINTMENT_TYPES } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import DoctorSkeleton from "@/components/admin/DoctorSkeleton";
import { Button } from "@/components/ui/button";
import {ru} from "date-fns/locale";
function StarRating({ onRate }: { onRate: (n: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  return (
      <div className="flex gap-1 justify-center">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = hovered !== null ? n <= hovered : n <= (selected ?? 0);

          return (
              <button
                  key={n}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    setSelected(n);
                    onRate(n);
                  }}
                  className={`text-4xl transition-all ${
                      active ? "text-primary scale-110" : "text-gray-300"
                  }`}
              >
                ★
              </button>
          );
        })}
      </div>
  );
}
function AppointmentsPage() {
  const [rateDoctorId, setRateDoctorId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [doctorName, setDoctorName] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);
  const [userAppointments, setUserAppointments] = useState([]);

  const handleSelectDentist = (dentistId: string) => {
    setSelectedDentistId(dentistId);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  const handleBookAppointment = async () => {
    try {
      setIsBooking(true);

      if (!selectedDentistId || !selectedDate || !selectedTime) {
        toast.error("Пожалуйста, заполните все поля");
        return;
      }

      const appointmentType = APPOINTMENT_TYPES.find(
          (t) => t.id === selectedType
      );

      const { data } = await axios.post("/api/appointments/book", {
        doctorId: selectedDentistId,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentType?.name,
      });
      if (data?.doctorName) {
        setDoctorName(data?.doctorName)
      }

      if (data?.appointment) {
        setBookedAppointment(data.appointment);
        toast.success("Приём успешно забронирован!");
      }
      if (data?.emailSent === false) {
        toast.warning(
            "Приём создан, но письмо не отправлено. Проверьте VPN или сеть."
        );
      }



      setShowConfirmationModal(true);

      setSelectedDentistId(null);
      setSelectedDate("");
      setSelectedTime("");
      setSelectedType("");
      setCurrentStep(1);
    } catch (error) {
      toast.error("Не удалось забронировать приём");
    } finally {
      setIsBooking(false);
    }
  };

  useEffect(() => {
    getUserAppointments();
  }, [showConfirmationModal]);

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/appointments/getUserAll");
      setUserAppointments(data.appointments);
    } catch (error) {
      toast.error("Не удалось получить список приёмов");
    } finally {
      setLoading(false);
    }
  };
  const rateDoctor = async (doctorId: string, rating: number) => {
    try {
      const {data} =await axios.post("/api/doctors/rate", {
        doctorId,
        rating,
      });
      if (data.success) {
        toast.success("Спасибо за оценку врача!");
      }


    } catch (e: any) {
      if (e.response?.status === 400) {
        toast.warning('Оценить доктора можно только один раз!')
        return
      }

      toast.error(
         "Не удалось оценить врача"
      );
    }
  };

  return (
      <>
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Запись на приём</h1>
            <p className="text-muted-foreground">
              Выберите стоматолога и удобное время
            </p>
          </div>

          <ProgressSteps currentStep={currentStep} />

          {currentStep === 1 && (
              <DoctorSelectionStep
                  selectedDentistId={selectedDentistId}
                  onContinue={() => setCurrentStep(2)}
                  onSelectDentist={handleSelectDentist}
              />
          )}

          {currentStep === 2 && selectedDentistId && (
              <TimeSelectionStep
                  selectedDentistId={selectedDentistId}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedType={selectedType}
                  onBack={() => setCurrentStep(1)}
                  onContinue={() => setCurrentStep(3)}
                  onDateChange={setSelectedDate}
                  onTimeChange={setSelectedTime}
                  onTypeChange={setSelectedType}
              />
          )}

          {currentStep === 3 && selectedDentistId && (
              <BookingConfirmationStep
                  selectedDentistId={selectedDentistId}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedType={selectedType}
                  isBooking={isBooking}
                  onBack={() => setCurrentStep(2)}
                  onModify={() => setCurrentStep(2)}
                  onConfirm={handleBookAppointment}
              />
          )}
        </div>

        {bookedAppointment && (
            <AppointmentConfirmationModal
                open={showConfirmationModal}
                doctorName={doctorName}
                onOpenChange={setShowConfirmationModal}
                appointmentDetails={{
                  doctorName: bookedAppointment.doctorName,
                  appointmentDate: format(
                      new Date(bookedAppointment.date),
                      "EEEE, d MMMM yyyy"
                  ),
                  appointmentTime: bookedAppointment.time,
                  userEmail: bookedAppointment.patientEmail,
                }}
            />
        )}

        {userAppointments.length > 0 && (
            <div className="mb-8 mt-6 max-w-7xl mx-auto px-6 py-8">
              <h2 className="text-xl font-semibold mb-4">
                Ваши предстоящие приёмы
              </h2>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading
                    ? [1, 2, 3].map((i) => <DoctorSkeleton key={i} />)
                    : userAppointments.map((appointment: any) => (
                        <div
                            key={appointment.id}
                            className="bg-card border flex items-center justify-between rounded-lg p-4"
                        >


                          <div className='flex items-center gap-4'>
                           <Image className='w-[100px] h-[100px] rounded-full'  src={appointment.doctorImageUrl} alt={appointment.doctorName} width={120}  height={120}
                           />
                            <div className='flex flex-col gap-1'>
                              <p className="font-medium">{appointment.doctorName}</p>
                              <p className="text-sm text-muted-foreground">
                                📅{" "}
                                {format(
                                    new Date(appointment.date),
                                    "d MMMM yyyy", {locale: ru}
                                )}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                🕐 {appointment.time}
                              </p>
                              {appointment.status === "ПОДТВЕРЖДЕНО" && (
                                  <Button onClick={() => setRateDoctorId(appointment.doctorId)}>
                                    Оценить доктора
                                  </Button>
                              )}
                            </div>

                          </div>
                          <Button disabled>{appointment.status}</Button>
                        </div>
                    ))}
              </div>
            </div>
        )}
        {rateDoctorId && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-card rounded-xl p-6 w-[320px] text-center space-y-4">
                <h3 className="text-lg font-semibold">
                  Оцените доктора
                </h3>

                <StarRating
                    onRate={async (rating) => {
                      await rateDoctor(rateDoctorId, rating);
                      setRateDoctorId(null);
                    }}
                />

                <Button
                    variant="outline"
                    onClick={() => setRateDoctorId(null)}
                >
                  Отмена
                </Button>
              </div>
            </div>
        )}
      </>
  );
}

export default AppointmentsPage;
