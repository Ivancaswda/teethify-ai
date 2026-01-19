import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  // оставляем только цифры
  let digits = value.replace(/\D/g, "");

  // если номер начинается с 8 → заменяем на 7
  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  }

  // если номер без кода страны
  if (digits.length === 10) {
    digits = "7" + digits;
  }

  // максимум 11 цифр (7XXXXXXXXXX)
  digits = digits.slice(0, 11);

  if (digits.length < 2) return `+${digits}`;

  let result = "+7";

  if (digits.length > 1) {
    result += " (" + digits.slice(1, 4);
  }
  if (digits.length >= 5) {
    result += ") " + digits.slice(4, 7);
  }
  if (digits.length >= 8) {
    result += "-" + digits.slice(7, 9);
  }
  if (digits.length >= 10) {
    result += "-" + digits.slice(9, 11);
  }

  return result;
};

//  ai generated 🎉
export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};



export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "Регулярная Проверка", duration: "60 минут", price: "11000р" },
  { id: "cleaning", name: "Чистка зубов", duration: "45 минут", price: "7000р" },
  { id: "consultation", name: "Консультация", duration: "30 минут", price: "6200р" },
  { id: "emergency", name: "Срочное посещение", duration: "30 минут", price: "15000р" },
];
// lib/utils.ts
export function getAvailableTimeSlots() {
  return [
    "09:00", "09:30",
    "10:00", "10:30",
    "11:00", "11:30",
    "12:00", "12:30",
    "13:00", "13:30",
    "14:00", "14:30",
    "15:00", "15:30",
    "16:00", "16:30",
    "17:00",
  ];
}