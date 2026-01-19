"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Copy } from "lucide-react";
import {Separator} from "@/components/ui/separator";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (apiKey: string, assistantId: string) => void;
};
export const FIRST_MESSAGE = `
Привет! Я Райли — ваш стоматологический ассистент от Teethify.
Я помогу вам с любыми вопросами о здоровье зубов.

Я могу:
— рассказать о стоимости стоматологических услуг
— дать советы при зубной боли или дискомфорте
— объяснить варианты лечения
— подсказать, как ухаживать за полостью рта и предотвратить проблемы

Чем могу помочь вам сегодня?
`.trim();
export const SYSTEM_PROMPT = `
Ты — Райли, AI-ассистент по стоматологии для платформы Teethify.

Твоя задача:
— давать понятные и профессиональные стоматологические советы
— объяснять варианты лечения
— отвечать на вопросы о стоимости услуг (только по запросу)
— помогать при боли и тревоге пациента
— давать профилактические рекомендации

Тон общения:
— спокойный, заботливый, уверенный
— простой язык без сложных медицинских терминов
— проявляй эмпатию, если пользователь испытывает боль или страх

Ограничения:
— ты не записываешь на приём
— ты не принимаешь оплату
— при серьёзных симптомах всегда рекомендуй обратиться к стоматологу

Если пользователь испытывает сильную боль, отёк, кровотечение или температуру —
немедленно посоветуй обратиться за экстренной медицинской помощью.

Всегда завершай ответы поддерживающе:
«Я здесь, чтобы помочь, если появятся ещё вопросы».
`.trim();
export default function VapiApiKeyDialog({ open, onClose, onSave }: Props) {
    const [apiKey, setApiKey] = useState("");
    const [assistantId, setAssistantId] = useState("");
    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
    };
    const truncate = (text: string, lines = 6) =>
        text.split("\n").slice(0, lines).join("\n") + "\n...";
    return (

            <Dialog  open={open} onOpenChange={onClose}>
                <DialogContent
                    className="w-[70%] !overflow-y-auto rounded-3xl"
                >
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            🔑 Подключение Vapi API Key
                        </DialogTitle>
                        <DialogDescription>
                            Для неограниченного голосового общения подключите ваш личный Vapi API Key
                        </DialogDescription>
                    </DialogHeader>

                <div className='flex items-center gap-6'>
                    <section className="space-y-2">
                        <h3 className="font-semibold">📘 Шаг 1. Получение API Key</h3>
                        <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                            <li>Перейдите на сайт <b>https://vapi.ai</b></li>
                            <li>Зарегистрируйтесь или войдите в аккаунт</li>
                            <li>Откройте раздел <b>API Keys</b></li>
                            <li>Создайте и скопируйте API Key</li>
                        </ol>
                    </section>


                    <section className="space-y-2">
                        <h3 className="font-semibold">🧠 Шаг 2. Создание Assistant</h3>
                        <p className="text-sm text-muted-foreground">
                            В панели Vapi создайте нового Assistant и укажите следующие параметры:
                        </p>
                        <p className="text-sm text-muted-foreground">
                           Под именем ассистента находится ASSISTANT_ID, скопируйте и вставьте его сюда!
                        </p>
                        <p className="text-sm text-muted-foreground">
                           Пролистните чуть ниже, найдите меню Transcriber, поменяйте распознование речи на русский
                        </p>
                        <p className="text-sm text-muted-foreground">
                           Нажмите на кнопку Publish
                        </p>
                    </section>
                </div>


                    <div className='flex items-center gap-4'>
                        <section className="bg-muted/40 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold">🗣 First Message</h4>
                                <Button size="sm" variant="outline" onClick={() => copy(FIRST_MESSAGE)}>
                                    <Copy className="w-4 h-4 mr-1" /> Копировать
                                </Button>
                            </div>

                            <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
        {truncate(FIRST_MESSAGE, 5)}
      </pre>

                            <p className="text-xs text-muted-foreground mt-2">
                                ℹ️ Используется как первое сообщение ассистента
                            </p>
                        </section>


                        <section className="bg-muted/40 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold">⚙️ System Prompt</h4>
                                <Button size="sm" variant="outline" onClick={() => copy(SYSTEM_PROMPT)}>
                                    <Copy className="w-4 h-4 mr-1" /> Копировать
                                </Button>
                            </div>

                            <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                                {truncate(SYSTEM_PROMPT, 8)}
                              </pre>

                            <p className="text-xs text-muted-foreground mt-2">
                                ℹ️ Определяет поведение и роль ассистента
                            </p>
                        </section>
                    </div>
                    <Separator className='my-6'/>
                    <div className='flex  items-center gap-6 w-full my-2'>
                        <section className="space-y-2">
                            <h3 className="font-semibold">🔐 Введите Vapi API Public Key</h3>
                            <Input
                                type="password"
                                placeholder="vapi_XXXXXXXXXXXXXXXX"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Ключ хранится локально и используется только для голосовых вызовов
                            </p>
                        </section>
                        <section className="space-y-2">
                            <h3 className="font-semibold">🤖 Введите Vapi Assistant ID</h3>
                            <Input
                                placeholder="assistant_XXXXXXXXXXXXXXXX"
                                value={assistantId}
                                onChange={(e) => setAssistantId(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                ID ассистента, созданного в панели Vapi
                            </p>
                        </section>
                    </div>




                    <div className="flex gap-3 pt-4">
                        <Button
                            className="flex-1"
                            disabled={!apiKey}
                            onClick={() => {
                                onSave(apiKey, assistantId);
                                onClose();
                            }}
                        >
                            Сохранить и начать разговор
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Отмена
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>


    );
}
