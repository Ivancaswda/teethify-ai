"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {useAuth} from "@/context/useAuth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaBrain} from "react-icons/fa";
import VapiApiKeyDialog from "@/components/voice/VapiApiKeyDialog";
import Vapi from "@vapi-ai/web";
import {toast} from "sonner";

function VapiWidget() {
  const [showDialog, setShowDialog] = useState(false);
  const [vapiClient, setVapiClient] = useState<Vapi | null>(null);

  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);
  const visibleMessages = messages.slice(-8);
  const { user, loading } = useAuth();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // auto-scroll for messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // setup event listeners for VAPI
  useEffect(() => {
    if (!vapiClient) return;

    const handleCallStart = () => {
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [
          ...prev,
          { content: message.transcript, role: message.role },
        ]);
      }
    };

    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      toast.error('Ошибка VAPI!')
      setConnecting(false);
      setCallActive(false);
    };

    vapiClient
        .on("call-start", handleCallStart)
        .on("call-end", handleCallEnd)
        .on("speech-start", handleSpeechStart)
        .on("speech-end", handleSpeechEnd)
        .on("message", handleMessage)
        .on("error", handleError);

    return () => {
      vapiClient
          .off("call-start", handleCallStart)
          .off("call-end", handleCallEnd)
          .off("speech-start", handleSpeechStart)
          .off("speech-end", handleSpeechEnd)
          .off("message", handleMessage)
          .off("error", handleError);
    };
  }, [vapiClient]);

  const toggleCall = async () => {
    if (callActive && vapiClient) {
      vapiClient.stop();
      return;
    }

    // 👉 если нет API key — сначала dialog
    if (!vapiClient) {
      setShowDialog(true);
      return;
    }

    try {
      setConnecting(true);
      setMessages([]);
      setCallEnded(false);

      setShowDialog(true);

      setConnecting(false);
    } catch (error) {
      console.log("Failed to start call", error);
      setConnecting(false);
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 flex flex-col overflow-hidden pb-20 "
    style={{marginTop: '120px'}}
    >
      {/* TITLE */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-mono">
          <span className='text-4xl'>Поговорите с вашим </span>
          <span className="text-primary uppercase text-4xl">AI стоматологом</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Голосовое общение с AI-ассистентом для консультаций и советов
        </p>
      </div>

      {/* VIDEO CALL AREA */}

      <div className="flex items-center justify-center gap-6 mb-8">
        {/* AI ASSISTANT CARD */}

        <Card style={{width: '400px', height: '250px'}} className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* AI VOICE ANIMATION */}
            <div
              className={`absolute inset-0 ${
                isSpeaking ? "opacity-30" : "opacity-0"
              } transition-opacity duration-300`}
            >
              {/* voice wave animation when speaking */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`mx-1 h-16 w-1 bg-primary rounded-full ${
                      isSpeaking ? "animate-sound-wave" : ""
                    }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* AI LOGO */}
            <div className="relative size-32 mb-4">
              <div
                className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${
                  isSpeaking ? "animate-pulse" : ""
                }`}
              />

              <div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5"></div>
                <FaBrain style={{width: '80px', height: '80px'}} className='text-primary'/>
              </div>
            </div>

            <h2 className="text-xl font-bold text-foreground">Teethify AI</h2>
            <p className="text-sm text-muted-foreground mt-1">Зубной ассистент</p>

            {/* SPEAKING INDICATOR */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${
                isSpeaking ? "border-primary" : ""
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
                }`}
              />

              <span className="text-xs text-muted-foreground">
               {isSpeaking
                   ? "Говорит..."
                   : callActive
                       ? "Слушает..."
                       : callEnded
                           ? "Звонок завершён"
                           : "Ожидание..."}
              </span>
            </div>
          </div>
        </Card>

        {/* USER CARD */}
        <Card style={{width: '400px', height: '250px'}} className={`bg-card/90   backdrop-blur-sm border overflow-hidden relative`}>
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* User Image */}
            <div className="relative size-32 mb-4">
              <Avatar style={{width: '80px', height: '80px'}} className="cursor-pointer text-4xl ring-2 ring-primary/20 hover:ring-primary transition">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="bg-primary text-white font-semibold">
                  {user?.userName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <h2 className="text-xl font-bold text-foreground">Вы</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {user ? (user.userName).trim() : "Гость"}
            </p>

            {/* User Ready Text */}
            <div className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border`}>
              <div className={`w-2 h-2 rounded-full bg-muted`} />
              <span className="text-xs text-muted-foreground">Готов</span>
            </div>
          </div>
        </Card>
      </div>


      {visibleMessages.length > 0 && (
          <div
              ref={messageContainerRef}
              className="w-full max-w-4xl mx-auto bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 mb-8 h-64 overflow-y-auto scroll-smooth shadow-lg"
          >
            <div className="flex flex-col gap-3">
              {visibleMessages.map((msg, index) => {
                const isAssistant = msg.role === "assistant";

                return (
                    <div
                        key={index}
                        className={`flex ${
                            isAssistant ? "justify-start" : "justify-end"
                        } animate-in fade-in slide-in-from-bottom-1 duration-300`}
                    >
                      <div
                          className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
                ${
                              isAssistant
                                  ? "bg-muted text-foreground rounded-bl-sm"
                                  : "bg-primary text-white rounded-br-sm"
                          }
              `}
                      >
                        <div className="text-[10px] opacity-60 mb-1">
                          {isAssistant ? "Teethify AI" : "Вы"}
                        </div>
                        <p>{msg.content}</p>
                      </div>
                    </div>
                );
              })}

              {callEnded && (
                  <div className="flex justify-center animate-in fade-in duration-300">
                    <div className="text-xs text-muted-foreground italic mt-2">
                      Звонок завершён. Спасибо, что воспользовались Teethify AI 🦷
                    </div>
                  </div>
              )}
            </div>
          </div>
      )}

      {/* CALL CONTROLS */}
      <div className="w-full flex justify-center gap-4">
        <Button
          className={`w-44 mb-4 text-xl rounded-3xl ${
            callActive
              ? "bg-destructive hover:bg-destructive/90"
              : callEnded
              ? "bg-red-500 hover:bg-red-700"
              : "bg-primary hover:bg-primary/90"
          } text-white relative`}
          onClick={toggleCall}
          disabled={connecting || callEnded}
        >
          {connecting && (
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
          )}

          <span>
           {callActive
               ? "Завершить"
               : connecting
                   ? "Подключение..."
                   : callEnded
                       ? "Завершено"
                       : "Начать разговор"}
          </span>
        </Button>
      </div>
      <VapiApiKeyDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          onSave={async (key, assistantId) => {
            const client = new Vapi(key);

            setVapiClient(client);


            setShowDialog(false);
            setConnecting(true);
            setMessages([]);
            setCallEnded(false);

            try {
              await client.start(assistantId);
            } catch (e) {
              toast.error("Не удалось начать звонок");
              setConnecting(false);
            }
          }}
      />

    </div>
  );
}

export default VapiWidget;
