"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import {PlusIcon, EditIcon, StethoscopeIcon, LogOutIcon, UserMinusIcon, Loader2Icon} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";
import {LoaderOne} from "@/components/ui/loader";
import DoctorSkeleton from "@/components/admin/DoctorSkeleton";
import {ImMan, ImWoman} from "react-icons/im";

export default function DoctorsManagement() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
    const [isFiring, setIsFiring] = useState<boolean>(false)
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("/api/doctors/getAll");
      setDoctors(res.data.doctors);
      setLoading(false);
    } catch {
      toast.error("Не удалось загрузить врачей");
      setLoading(false);
    }
  };
    console.log('doctors===')
    console.log(doctors)

  useEffect(() => {
    fetchDoctors();
  }, []);

    const onFire = async (id)   => {
        try {
            setIsFiring(true)
          const {data} =  await axios.delete(`/api/doctors/remove?id=${id}`)
            if (data.success) {

                toast.success('Вы успешно уволили врача!')
              await  fetchDoctors()
            }
            setIsFiring(false)
        } catch (error) {
            console.log(error)
            setIsFiring(false)
            toast.error('Не удалось уволить доктора!')
        }
    }
    console.log('selectedDoctor===')
    console.log(selectedDoctor)

  return (
      <>
        <Card className="mb-12">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="flex items-center gap-2">
              <StethoscopeIcon className="text-primary" />
              Управление врачами
            </CardTitle>

            <Button onClick={() => setIsAddOpen(true)}>
              <PlusIcon className="mr-2" />
              Добавить врача
            </Button>
          </CardHeader>

            <CardContent className="space-y-4">

                {loading ? (
                    <>
                        <DoctorSkeleton />
                        <DoctorSkeleton />
                        <DoctorSkeleton />
                        <DoctorSkeleton />
                    </>
                )  : (doctors && doctors?.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="flex justify-between items-center p-4 border rounded-xl"
                        >
                            <div className="flex gap-4 items-center">
                                <Image
                                    src={doctor.imageUrl || "/avatar.png"}
                                    alt={doctor.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />

                                <div>
                                    <div className="font-semibold">{doctor.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {doctor.speciality}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">

                                {doctor.gender === 'FEMALE' ?
                                    <Button size={'icon'} variant='outline'  >
                                        <ImWoman style={{color: 'crimson'}} className='text-pink-500'/>
                                    </Button>
                                     :    <Button size={'icon'} variant='outline'  >
                                        <ImMan style={{color: 'blue'}} className='text-blue-500'/>
                                     </Button>}

                                {doctor.isActive ? (
                                    <Badge className="bg-green-100 text-green-800">
                                        Активен
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary">Неактивен</Badge>
                                )}

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedDoctor(doctor);
                                        setIsEditOpen(true);
                                    }}
                                >
                                    <EditIcon className="mr-1 size-4" />
                                    Редактировать
                                </Button>
                                <Button disabled={isFiring}
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => {
                                        onFire(doctor.id)
                                    }}
                                >
                                    {isFiring ? <Loader2Icon className='animate-spin'/>
                                        : <UserMinusIcon className="mr-1 size-4" />}


                                </Button>
                            </div>
                        </div>
                    ))
                ) }
            </CardContent>
        </Card>

        <AddDoctorDialog
            isOpen={isAddOpen}
            onClose={() => {
              setIsAddOpen(false);
              fetchDoctors();
            }}
        />

        <EditDoctorDialog
            isOpen={isEditOpen}
            doctor={selectedDoctor}
            onClose={() => {
              setIsEditOpen(false);
              setSelectedDoctor(null);
              fetchDoctors();
            }}
        />
      </>
  );
}
