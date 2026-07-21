import React from "react";
import { useMarginalia } from "../context/MarginaliaContext";
import ReadingCompanion from "../components/ReadingCompanion";

export const CompanionPage: React.FC = () => {
  const { 
    userProfile, 
    margens, 
    chatMessages, 
    setChatMessages, 
    companionLoading, 
    setCompanionLoading, 
    chatActiveMargem, 
    setChatActiveMargem, 
    triggerChallengeComplete 
  } = useMarginalia();

  const handleSendMessage = async (text: string) => {
    const userMsg = {
      role: "user" as const,
      content: text,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setCompanionLoading(true);
    triggerChallengeComplete("ch4");

    try {
      const formattedHistory = chatMessages.concat(userMsg).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/ai/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: formattedHistory,
          activeBook: chatActiveMargem ? { title: chatActiveMargem.bookTitle, author: chatActiveMargem.author } : null,
          activeMargem: chatActiveMargem ? { quote: chatActiveMargem.quote, thought: chatActiveMargem.thought } : null
        })
      });

      const data = await res.json();
      if (data.reply) {
        setChatMessages(prev => [...prev, {
          role: "companion",
          content: data.reply,
          timestamp: new Date()
        }]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, {
        role: "companion",
        content: "Desculpe, minhas páginas pareceram se misturar no escuro da biblioteca. Poderia sussurrar seu pensamento novamente?",
        timestamp: new Date()
      }]);
    } finally {
      setCompanionLoading(false);
    }
  };

  return (
    <div className="animate-page-turn">
      <ReadingCompanion 
        userProfile={userProfile}
        margens={margens}
        chatMessages={chatMessages}
        onSendMessage={handleSendMessage}
        companionLoading={companionLoading}
        activeContextMargem={chatActiveMargem}
        onClearContext={() => setChatActiveMargem(null)}
      />
    </div>
  );
};
