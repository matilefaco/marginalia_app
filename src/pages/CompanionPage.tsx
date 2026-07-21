import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMarginalia } from "../context/MarginaliaContext";
import ReadingCompanion from "../components/ReadingCompanion";

interface ChatMessage {
  role: "user" | "companion";
  content: string;
  timestamp: Date;
}

export const CompanionPage: React.FC = () => {
  const { 
    userProfile, 
    margens, 
    triggerChallengeComplete 
  } = useMarginalia();

  const location = useLocation();
  const navigate = useNavigate();

  if (!userProfile) return null;

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        role: "companion",
        content: "Olá, alma leitora. Sou sua Companheira de Leitura. Que segredos de papel você trouxe para desvendar comigo hoje? Podemos falar sobre seus autores favoritos, debater o subtexto de um livro ou refinar uma anotação que você queira registrar nas margens.",
        timestamp: new Date()
      }
    ];
  });

  const [companionLoading, setCompanionLoading] = useState(false);
  const [chatActiveMargem, setChatActiveMargem] = useState<any | null>(null);

  const handleSendMessage = async (text: string, activeMargemContext = chatActiveMargem) => {
    const userMsg = {
      role: "user" as const,
      content: text,
      timestamp: new Date()
    };
    
    // We update local message state
    setChatMessages(prev => [...prev, userMsg]);
    setCompanionLoading(true);
    triggerChallengeComplete("ch4");

    try {
      // Use state callback or immediate variable to get latest messages correctly
      setChatMessages(prevHistory => {
        const formattedHistory = prevHistory.map(m => ({
          role: m.role,
          content: m.content
        }));

        fetch("/api/ai/companion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: formattedHistory,
            activeBook: activeMargemContext ? { title: activeMargemContext.bookTitle, author: activeMargemContext.author } : null,
            activeMargem: activeMargemContext ? { quote: activeMargemContext.quote, thought: activeMargemContext.thought } : null
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.reply) {
            setChatMessages(current => [...current, {
              role: "companion",
              content: data.reply,
              timestamp: new Date()
            }]);
          }
        })
        .catch(err => {
          console.error(err);
          setChatMessages(current => [...current, {
            role: "companion",
            content: "Desculpe, minhas páginas pareceram se misturar no escuro da biblioteca. Poderia sussurrar seu pensamento novamente?",
            timestamp: new Date()
          }]);
        })
        .finally(() => {
          setCompanionLoading(false);
        });

        return prevHistory;
      });
    } catch (err) {
      console.error(err);
      setCompanionLoading(false);
    }
  };

  // Consume route state on mount
  useEffect(() => {
    if (location.state && location.state.marginId && location.state.initialMessage) {
      const margin = margens.find(m => m.id === location.state.marginId);
      if (margin) {
        setChatActiveMargem(margin);
        handleSendMessage(location.state.initialMessage, margin);
        // Clear router state to prevent re-triggering on refresh
        navigate(location.pathname, { replace: true, state: null });
      }
    }
  }, [location.state, margens]);

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

export default CompanionPage;
