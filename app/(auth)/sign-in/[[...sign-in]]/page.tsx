'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useAuth";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import {GoogleLoginButton} from "@/app/(auth)/_components/GoogleLoginButton";

function SignIn() {
    const { user, setUser } = useAuth()
    const [form, setForm] = useState({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post('/api/auth/login', form)
            const data = await res.data

            localStorage.setItem("token", data.token)

            const userRes = await fetch("/api/auth/user", {
                headers: { Authorization: `Bearer ${data.token}` },
            })

            const userData = await userRes.json()
            setUser(userData.user)

            toast.success('Добро пожаловать обратно в Teethify!')
            router.replace('/')
        } catch (error) {
            toast.error('Ошибка входа! Проверьте данные.')
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (user) router.replace("/")
    }, [user, router])

    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* LEFT – FORM */}
            <div className="flex items-center justify-center px-6">
                <div className="w-full max-w-md space-y-6">
                    <div className='flex flex-col gap-2'>
                        <h2 className="text-4xl font-bold">
                            Вход в <span className="text-primary">Teethify</span>
                        </h2>
                        <p className="text-sm text-muted-foreground my-2">
                            Управляйте приёмами и общением с AI-ассистентом
                        </p>
                    </div>

                    <form  className="space-y-4 mt-4" onSubmit={handleLogin}>
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
                            Войти
                        </button>
                    </form>

                    <p className="text-sm text-muted-foreground mt-2 mb-2 text-center">
                        Нет аккаунта?{" "}
                        <Link href="/sign-up" className="text-primary hover:underline">
                            Создать аккаунт
                        </Link>
                    </p>
                    <GoogleLoginButton/>
                </div>
            </div>


            <div className="flex-col flex  items-center justify-center bg-gradient-to-br from-primary via-green-400 to-blue-200 text-white px-10">
                <Image
                    src="/logo.png"
                    alt="Teethify Logo"
                    width={160}
                    height={160}
                    className="rounded-2xl mb-6 bg-white"
                />
                <h3 className="text-3xl font-bold mb-4">Teethify</h3>
                <p className="text-center text-white/90 max-w-sm">
                    AI-платформа для удобного бронирования стоматологов и умных звонков
                    для заботы о вашей улыбке.
                </p>
            </div>
        </div>
    )
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("flex flex-col space-y-2", className)}>
        {children}
    </div>
)

export default SignIn
