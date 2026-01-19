"use client";

import { formatPhoneNumber } from "@/lib/utils";
import {useEffect, useRef, useState} from "react";
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
import axios from "axios";
import { toast } from "sonner";
import {EditIcon, Loader2Icon, UploadCloud, XIcon} from "lucide-react";
import { uploadDoctorImage } from "@/lib/imagekit";
import {Textarea} from "@/components/ui/textarea";

interface EditDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: any;
}

function EditDoctorDialog({ doctor, isOpen, onClose }: EditDoctorDialogProps) {
  const [editingDoctor, setEditingDoctor] = useState<any>(doctor);
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setEditingDoctor(doctor);
    setImagePreview(doctor?.imageUrl || null);
  }, [doctor]);

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setEditingDoctor({ ...editingDoctor, phone: formattedPhoneNumber });
  };

  const handleSave = async () => {
    if (!editingDoctor) return;

    try {
      setLoading(true);

      let imageUrl = editingDoctor.imageUrl;

      // 🔥 если выбрали новое фото — загружаем
      if (imageFile) {
        const uploadRes = await uploadDoctorImage(imageFile);
        imageUrl = uploadRes.url;
      }

      await axios.put("/api/doctors/update", {
        id: editingDoctor.id,
        data: {
          ...editingDoctor,
          imageUrl,
        },
      });

      toast.success("Врач успешно обновлён");
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка обновления врача");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setEditingDoctor(null);
    setImageFile(null);
    setImagePreview(null);
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Редактировать врача</DialogTitle>
            <DialogDescription>
              Обновите информацию, фото и статус врача
            </DialogDescription>
          </DialogHeader>

          {editingDoctor && (
              <div className="grid gap-4 py-4">
                {/* Фото */}
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


                  <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 text-neutral-500 transition hover:border-primary hover:bg-neutral-100"
                  >
                    {imagePreview ? (
                        <div className='relative'>
                          <XIcon
                              onClick={() => {
                                setImageFile(null)
                                setImagePreview('')
                              }}
                              className=' absolute top-1 transition right-1 cursor-pointer hover:text-muted-foreground'/>
                          <img style={{height: '100px', width: '100px'}}
                               src={imagePreview}
                               alt="Preview"
                               className=" rounded-xl object-cover"
                          />
                        </div>

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

                {/* Имя / Специализация */}
                <div className="flex items-center  gap-4">
                  <div className="space-y-2">
                    <Label>Имя</Label>
                    <Input
                        value={editingDoctor.name}
                        onChange={(e) =>
                            setEditingDoctor({ ...editingDoctor, name: e.target.value })
                        }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Специальность</Label>
                    <Input
                        value={editingDoctor.speciality}
                        onChange={(e) =>
                            setEditingDoctor({ ...editingDoctor, speciality: e.target.value })
                        }
                    />
                  </div>
                </div>


                <div className="space-y-2">
                  <Label>Описание (Bio)</Label>
                  <Textarea
                      value={editingDoctor.bio || ""}
                      onChange={(e) =>
                          setEditingDoctor({ ...editingDoctor, bio: e.target.value })
                      }
                      placeholder="Опыт, образование, специализация"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                      type="email"
                      value={editingDoctor.email}
                      onChange={(e) =>
                          setEditingDoctor({ ...editingDoctor, email: e.target.value })
                      }
                  />
                </div>

                {/* Телефон */}
                <div className="space-y-2">
                  <Label>Телефон</Label>
                  <Input
                      value={editingDoctor.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                  />
                </div>

                {/* Пол / Статус */}
                <div className="flex items-center gap-4">
                  <div className="space-y-2">
                    <Label>Пол</Label>
                    <Select
                        value={editingDoctor.gender}
                        onValueChange={(value) =>
                            setEditingDoctor({ ...editingDoctor, gender: value })
                        }
                    >
                      <SelectTrigger>
                        <SelectValue />
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
                        value={editingDoctor.isActive ? "active" : "inactive"}
                        onValueChange={(value) =>
                            setEditingDoctor({ ...editingDoctor, isActive: value === "active" })
                        }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Активный</SelectItem>
                        <SelectItem value="inactive">Неактивный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Отмена
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2" />
                    Сохранение...
                  </>
              ) : (
                  <>
                    <EditIcon className="mr-2" />
                    Сохранить
                  </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}

export default EditDoctorDialog;
