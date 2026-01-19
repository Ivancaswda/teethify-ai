"use client";

import Navbar from "@/components/Navbar";
import AdminStats from "@/components/admin/AdminStats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import RecentAppointments from "@/components/admin/RecentAppointments";

import { SettingsIcon } from "lucide-react";
import { useAuth } from "@/context/useAuth";
import {useEffect, useMemo, useState} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {LoaderOne} from "@/components/ui/loader";

function AdminDashboardClient() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [doctors, setDoctors] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/sign-up");
    }
    if (user && !loading && !user.email.includes("admin@gmail.com")) {
      router.replace("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsRes = await axios.get("/api/doctors/getAll");
        setDoctors(doctorsRes.data.doctors);


         const appointmentsRes = await axios.get("/api/appointments/getAll");
         setAppointments(appointmentsRes.data.appointments);

        setLoadingData(false);
      } catch (error) {
        console.error(error);
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);
  const stats = useMemo(() => ({
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter(d => d.isActive).length,
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter(
        a => a.status === "ЗАВЕРШЕНО"
    ).length,
  }), [doctors, appointments]);

  if (loading || loadingData) {
    return (
        <div style={{ height: "96vh" }} className="flex items-center justify-center">
          <LoaderOne />
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div style={{marginTop: '80px'}} className="max-w-7xl flex flex-col gap-6 mx-auto px-6 py-8 pt-24">
          <div className="mb-12 flex justify-between bg-gradient-to-br from-primary/10 to-background rounded-3xl p-8 border">
            <div>
              <h1 className="text-4xl font-bold">
                Добро пожаловать, {user?.userName || "Администратор"} 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Управление врачами и статистикой клиники
              </p>
            </div>

            <SettingsIcon className="w-16 h-16 text-primary hidden lg:block" />
          </div>

          <AdminStats {...stats} />

          <DoctorsManagement />

          <RecentAppointments   />
        </div>
      </div>
  );
}

export default AdminDashboardClient;
