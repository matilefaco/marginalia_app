import React, { useState, useRef } from "react";
import { RefreshIcon } from "./icons/MarginaliaIcons";
import Tesseract from "tesseract.js";

interface QuoteCaptureProps {
  onCaptureComplete: (quote: string) => void;
  onSelectManual: () => void;
  onCancel: () => void;
}

export default function QuoteCapture({ onCaptureComplete, onSelectManual, onCancel }: QuoteCaptureProps) {
  const [step, setStep] = useState<"choose" | "photo" | "paste">("choose");
  const [pastedText, setPastedText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("");
  const [ocrResult, setOcrResult] = useState("");
  const [ocrError, setOcrError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setOcrResult("");
      setOcrError(null);
      // Automatically run OCR
      runOCR(file);
    }
  };

  // Run client-side OCR
  const runOCR = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setProgressStatus("Iniciando o leitor de páginas...");
    try {
      // We try with 'por' (Portuguese) first, falling back to 'eng' if needed
      const result = await Tesseract.recognize(file, "por", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
            setProgressStatus("Decifrando as palavras impressas...");
          } else {
            setProgressStatus("Preparando o dicionário literário...");
          }
        },
      });

      const extractedText = result.data.text.trim();
      if (extractedText) {
        setOcrResult(extractedText);
      } else {
        throw new Error("Não foi possível identificar nenhum texto legível na imagem.");
      }
    } catch (err: any) {
      console.error("Erro no OCR:", err);
      // Retry with 'eng' just in case, or fallback
      try {
        setProgressStatus("Tentando com mecanismo alternativo...");
        const resultAlt = await Tesseract.recognize(file, "eng");
        const extractedTextAlt = resultAlt.data.text.trim();
        if (extractedTextAlt) {
          setOcrResult(extractedTextAlt);
        } else {
          setOcrError("Não conseguimos ler a imagem automaticamente. Você pode digitar ou colar o trecho.");
        }
      } catch (altErr) {
        setOcrError("Não conseguimos ler a imagem automaticamente. Você pode digitar ou colar o trecho.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedText.trim()) {
      onCaptureComplete(pastedText.trim());
    }
  };

  const handleOcrSubmit = () => {
    if (ocrResult.trim()) {
      onCaptureComplete(ocrResult.trim());
    }
  };

  return (
    <div className="space-y-6">
      {step === "choose" && (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#BDAB9C]">Novas Margens</p>
            <h3 className="font-display text-xl text-[#1C1916] font-semibold font-serif">Como você quer trazer esse trecho para a margem?</h3>
            <p className="text-xs font-sans text-[#3D3D3D]/70 max-w-sm mx-auto">
              Escolha a forma mais confortável para registrar a frase que te tocou.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5 pt-2">
            {/* Option: Photo */}
            <button
              onClick={() => setStep("photo")}
              className="w-full text-left p-4 rounded-xl border border-[#BDAB9C]/40 bg-[#FAF8F3] hover:bg-[#1C1916]/5 transition-all flex gap-4 items-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1C1916]/5 flex items-center justify-center text-[#1C1916] group-hover:bg-[#1C1916] group-hover:text-[#FAF8F3] transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-sans font-semibold text-sm text-[#1C1916]">Fotografar página</h4>
                <p className="text-xs font-serif italic text-[#3D3D3D]/70 mt-0.5">
                  Para livros físicos, páginas marcadas e frases encontradas no papel.
                </p>
              </div>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#BDAB9C] group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            {/* Option: Paste */}
            <button
              onClick={() => setStep("paste")}
              className="w-full text-left p-4 rounded-xl border border-[#BDAB9C]/40 bg-[#FAF8F3] hover:bg-[#1C1916]/5 transition-all flex gap-4 items-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1C1916]/5 flex items-center justify-center text-[#1C1916] group-hover:bg-[#1C1916] group-hover:text-[#FAF8F3] transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-sans font-semibold text-sm text-[#1C1916]">Colar trecho</h4>
                <p className="text-xs font-serif italic text-[#3D3D3D]/70 mt-0.5">
                  Para Kindle, PDFs, apps de leitura ou notas já copiadas.
                </p>
              </div>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#BDAB9C] group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            {/* Option: Manual */}
            <button
              onClick={onSelectManual}
              className="w-full text-left p-4 rounded-xl border border-[#BDAB9C]/40 bg-[#FAF8F3] hover:bg-[#1C1916]/5 transition-all flex gap-4 items-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1C1916]/5 flex items-center justify-center text-[#1C1916] group-hover:bg-[#1C1916] group-hover:text-[#FAF8F3] transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="6" y1="8" x2="6" y2="8"/><line x1="10" y1="8" x2="10" y2="8"/><line x1="14" y1="8" x2="14" y2="8"/><line x1="18" y1="8" x2="18" y2="8"/><line x1="6" y1="12" x2="6" y2="12"/><line x1="10" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="14" y2="12"/><line x1="18" y1="12" x2="18" y2="12"/><line x1="7" y1="16" x2="17" y2="16"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-sans font-semibold text-sm text-[#1C1916]">Digitar manualmente</h4>
                <p className="text-xs font-serif italic text-[#3D3D3D]/70 mt-0.5">
                  Para quando a frase já vive decorada em você.
                </p>
              </div>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#BDAB9C] group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-sans font-medium text-[#BDAB9C] hover:text-[#1C1916] transition-colors cursor-pointer"
            >
              Cancelar e voltar
            </button>
          </div>
        </div>
      )}

      {/* STEP: Photo / Upload with OCR */}
      {step === "photo" && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setStep("choose")}
              className="text-xs font-sans font-medium text-[#BDAB9C] hover:text-[#1C1916] transition-colors cursor-pointer"
            >
              ← Voltar para opções
            </button>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#BDAB9C]">Fotografar página</p>
          </div>

          {!imagePreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#BDAB9C]/50 hover:border-[#1C1916] rounded-xl p-8 text-center bg-[#1C1916]/5 cursor-pointer transition-all space-y-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1C1916]/5 flex items-center justify-center text-[#BDAB9C] group-hover:text-[#1C1916] mx-auto transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
              <div className="space-y-1">
                <p className="font-sans font-semibold text-xs text-[#1C1916]">Clique para carregar ou tirar uma foto</p>
                <p className="text-[10px] font-mono text-[#BDAB9C] uppercase tracking-wider">PNG, JPG ou JPEG</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-4 bg-[#1C1916]/5 p-3 rounded-lg border border-[#BDAB9C]/20 items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={imagePreview} className="w-10 h-14 object-cover rounded shadow-sm border border-[#BDAB9C]/20" alt="Página" />
                  <div>
                    <p className="text-xs font-sans font-bold text-[#1C1916]">{imageFile?.name}</p>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-[#BDAB9C]">Imagem Carregada</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                    setOcrResult("");
                    setOcrError(null);
                  }}
                  className="text-xs font-sans text-red-600 hover:underline cursor-pointer"
                >
                  Substituir
                </button>
              </div>

              {/* Processing State */}
              {isProcessing && (
                <div className="p-6 border border-[#BDAB9C]/40 rounded-xl bg-white space-y-4 text-center">
                  <RefreshIcon className="w-6 h-6 text-[#1C1916] animate-spin mx-auto" />
                  <div className="space-y-1.5">
                    <p className="font-serif italic text-sm text-[#1C1916]">“Lendo a página em silêncio…”</p>
                    <p className="text-[10px] font-mono text-[#BDAB9C] uppercase tracking-widest">{progressStatus}</p>
                  </div>
                  <div className="w-full bg-[#1C1916]/5 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto">
                    <div
                      className="bg-[#1C1916] h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Success Result */}
              {!isProcessing && ocrResult && (
                <div className="space-y-3">
                  <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider">
                    Texto Extraído (Ajuste se necessário)
                  </label>
                  <textarea
                    rows={4}
                    value={ocrResult}
                    onChange={(e) => setOcrResult(e.target.value)}
                    className="w-full bg-[#1C1916]/5 border border-[#BDAB9C]/40 rounded-xl p-3 text-xs font-serif text-[#1C1916] focus:outline-none focus:border-[#1C1916] leading-relaxed"
                  />
                  <button
                    onClick={handleOcrSubmit}
                    className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-2.5 rounded-lg font-sans text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer"
                  >
                    Usar esse trecho na Margem
                  </button>
                </div>
              )}

              {/* Error fallback */}
              {ocrError && (
                <div className="p-4 border border-red-200 bg-red-500/5 rounded-xl space-y-3">
                  <div className="flex gap-2 items-center text-red-800">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <p className="text-xs font-sans font-semibold">Tivemos um contratempo</p>
                  </div>
                  <p className="text-xs font-serif text-[#3D3D3D]/80 leading-relaxed">{ocrError}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep("paste")}
                      className="flex-1 bg-white border border-[#BDAB9C] hover:bg-[#1C1916]/5 text-[#3D3D3D] py-2 rounded text-xs font-sans font-semibold transition-colors"
                    >
                      Colar Trecho
                    </button>
                    <button
                      onClick={onSelectManual}
                      className="flex-1 bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-2 rounded text-xs font-sans font-semibold transition-colors"
                    >
                      Digitar Manual
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* STEP: Paste Trecho */}
      {step === "paste" && (
        <form onSubmit={handlePasteSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep("choose")}
              className="text-xs font-sans font-medium text-[#BDAB9C] hover:text-[#1C1916] transition-colors cursor-pointer"
            >
              ← Voltar para opções
            </button>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#BDAB9C]">Colar trecho</p>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider">
              Trecho copiado do livro
            </label>
            <textarea
              required
              rows={4}
              placeholder="Cole aqui a frase que ficou em você... Sem pressa."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              className="w-full bg-[#1C1916]/5 border border-[#BDAB9C]/40 rounded-xl p-3 text-xs font-serif text-[#1C1916] placeholder-[#BDAB9C]/70 focus:outline-none focus:border-[#1C1916] leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-2.5 rounded-lg font-sans text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer"
          >
            Usar esse trecho na Margem
          </button>
        </form>
      )}
    </div>
  );
}
