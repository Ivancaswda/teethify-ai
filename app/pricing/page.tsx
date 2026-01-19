"use client";

import axios from "axios";
import {useAuth} from "@/context/useAuth";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

const plans = [
    {
        name: "Free",
        price: "0 ₽",
        description: "Базовый доступ",
        disabled: true,
    },
    {
        name: "Basic",
        price: "990 ₽",
        plan: "basic",
    },
    {
        name: "Premium",
        price: "1990 ₽",
        plan: "premium",
    },
];

export default function PricingPage() {
    const {user, loading} = useAuth()
    const router =useRouter()
    useEffect(() => {
        if (!user && !loading) {
            router.replace('/sign-up')
        }
    }, [router, user, loading]);
    const handleCheckout = async (plan: "basic" | "premium") => {
        const res = await axios.post("/api/stripe/create-checkout", {
            plan,
            userEmail: user?.email
        });
        const data = await res.data;
        window.location.href = data.url;
    };

    return (
        <div className="grid grid-cols-3 gap-6">
            {plans.map((p) => (
                <div key={p.name} className="border p-6 rounded-xl">
                    <h2>{p.name}</h2>
                    <p>{p.price}</p>

                    {p.plan ? (
                        <Button onClick={() => handleCheckout(p.plan)}>
                            Купить
                        </Button>
                    ) : (
                        <Button disabled>Текущий тариф</Button>
                    )}
                </div>
            ))}
        </div>
    );
}
