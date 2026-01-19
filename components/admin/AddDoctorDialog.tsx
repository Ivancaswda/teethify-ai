
import {useRef, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { formatPhoneNumber } from "@/lib/utils";
import {toast} from "sonner";
import axios from "axios";
import {uploadDoctorImage} from "@/lib/imagekit";
import {Loader2Icon, PlusIcon, UploadCloud} from "lucide-react";

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddDoctorDialog({ isOpen, onClose }: AddDoctorDialogProps) {
  const [loading, setLoading]  =useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE" as 'MALE' | 'FEMALE',
    isActive: true,
  });

 // const createDoctorMutation = useCreateDoctor();

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setNewDoctor({ ...newDoctor, phone: formattedPhoneNumber });
  };

  const handleCreateDoctor = async () => {
    try {
      setLoading(true);
    let imageUrl = ''
      if (imageFile) {
        const uploaded = await uploadDoctorImage(imageFile);
        imageUrl = uploaded.url;
      }

      await axios.post("/api/doctors/create", {
        newDoctor: {
          ...newDoctor,
          imageUrl,
        },
      });

      setLoading(false);

      toast.success("Врач успешно добавлен");
        handleClose()
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Не удалось создать доктора!')
    }
  };

  const handleClose = () => {
    onClose();
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE",
      isActive: true,
    });
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="overflow-y-auto max-w-3xl">
          <DialogHeader>
            <DialogTitle>Добавить врача</DialogTitle>
            <DialogDescription>
              Добавьте нового врача в клинику
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Фото врача</Label>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }}
            />

            {/* кликабельная зона */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 text-neutral-500 transition hover:border-primary hover:bg-neutral-100"
            >
              {imagePreview ? (
                  <img
                      src={imagePreview}
                      alt="Preview"
                       style={{height: '100px', width: '100px'}}
                      className=" rounded-xl object-cover"
                  />
              ) : (
                  <>
                    <UploadCloud className="h-8 w-8 mb-2" />
                    <span className="text-sm text-center">
          Загрузить фото
        </span>
                  </>
              )}
            </div>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-name">Имя *</Label>
                <Input
                    id="new-name"
                    value={newDoctor.name}
                    onChange={(e) =>
                        setNewDoctor({ ...newDoctor, name: e.target.value })
                    }
                    placeholder="Д-р Иван Иванов"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-speciality">Специализация *</Label>
                <Input
                    id="new-speciality"
                    value={newDoctor.speciality}
                    onChange={(e) =>
                        setNewDoctor({ ...newDoctor, speciality: e.target.value })
                    }
                    placeholder="Терапевтическая стоматология"
                />
              </div>
            </div>


            <div className="space-y-2">
              <Label htmlFor="new-email">Email *</Label>
              <Input
                  id="new-email"
                  type="email"
                  value={newDoctor.email}
                  onChange={(e) =>
                      setNewDoctor({ ...newDoctor, email: e.target.value })
                  }
                  placeholder="doctor@clinic.ru"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-phone">Телефон</Label>
              <Input
                  id="new-phone"
                  value={newDoctor.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <Label>Пол</Label>
                <Select
                    value={newDoctor.gender || ""}
                    onValueChange={(value) =>
                        setNewDoctor({ ...newDoctor, gender: value })
                    }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пол" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Мужской</SelectItem>
                    <SelectItem value="FEMALE">Женский</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Статус</Label>
                <Select
                    value={newDoctor.isActive ? "active" : "inactive"}
                    onValueChange={(value) =>
                        setNewDoctor({
                          ...newDoctor,
                          isActive: value === "active",
                        })
                    }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Активен</SelectItem>
                    <SelectItem value="inactive">Неактивен</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Отмена
            </Button>

            <Button
                onClick={handleCreateDoctor}
                className="bg-primary hover:bg-primary/90"
                disabled={
                    !newDoctor.name ||
                    !newDoctor.email ||
                    !newDoctor.speciality || loading
                }
            >
              {loading ? <Loader2Icon className='animate-spin'/> : <PlusIcon/>}
              {loading ? 'Подождите...' : 'Добавить врача'}

            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}

export default AddDoctorDialog;
