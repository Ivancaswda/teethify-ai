'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/useAuth";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { GoogleLoginButton } from "@/app/(auth)/_components/GoogleLoginButton";

function Signup() {
    const { user, loading, setUser } = useAuth()
    const [form, setForm] = useState({
        userName: '',
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await axios.post('/api/auth/register', form)
            const data = await res.data

            localStorage.setItem("token", data.token)

            const userRes = await fetch("/api/auth/user", {
                headers: { Authorization: `Bearer ${data.token}` },
            })

            const userData = await userRes.json()
            setUser(userData.user)

            toast.success('Добро пожаловать в Teethify!')
            router.replace('/')
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Ошибка при регистрации")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!loading && user) router.replace('/')
    }, [user, loading, router])

    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* LEFT – FORM */}
            <div className="flex items-center justify-center px-6">
                <div className="w-full max-w-md space-y-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-4xl font-bold">
                            Регистрация в <span className="text-primary">Teethify</span>
                        </h2>
                        <p className="text-sm text-muted-foreground my-2">
                            Создайте аккаунт для записи к стоматологам и работы с AI
                        </p>
                    </div>

                    <form className="space-y-4 mt-4" onSubmit={handleRegister}>
                        <LabelInputContainer>
                            <Label>Имя пользователя</Label>
                            <Input
                                type="text"
                                placeholder="alex_dev"
                                value={form.userName}
                                onChange={(e) => setForm({ ...form, userName: e.target.value })}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label>Пароль</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </LabelInputContainer>

                        <button
                            type="submit"
                            className="flex h-10 w-full items-center justify-center rounded-md bg-primary text-white font-medium transition hover:opacity-90"
                        >
                            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                            Создать аккаунт
                        </button>
                    </form>

                    <p className="text-sm text-muted-foreground mt-2 mb-2 text-center">
                        Уже есть аккаунт?{" "}
                        <Link href="/sign-in" className="text-primary hover:underline">
                            Войти
                        </Link>
                    </p>

                    <GoogleLoginButton />
                </div>
            </div>


            <div className="flex-col flex lg:flex-row items-center justify-center bg-gradient-to-br from-primary via-green-400 to-blue-200 text-white px-10">
                <Image
                    src="/logo.png"
                    alt="Teethify Logo"
                    width={160}
                    height={160}
                    className="rounded-2xl bg-white mb-6"
                />
                <h3 className="text-3xl font-bold mb-4">Teethify</h3>
                <p className="text-center text-white/90 max-w-sm">
                    Современная AI-платформа для стоматологических приёмов,
                    консультаций и заботы о вашей улыбке.
                </p>
            </div>
        </div>
    )
}

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode
    className?: string
}) => (
    <div className={cn("flex flex-col space-y-2", className)}>
        {children}
    </div>
)

export default Signup
