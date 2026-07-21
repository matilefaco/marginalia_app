import React from "react";
import { BookOpen, X, Plus, ChevronRight } from "lucide-react";
import { OriginBook, BookSearchResult } from "../../../types";
import { searchBooks } from "../../../lib/booksApi";

interface OriginBooksStepProps {
  originBooks: OriginBook[];
  setOriginBooks: React.Dispatch<React.SetStateAction<OriginBook[]>>;
  bookQuery: string;
  setBookQuery: (q: string) => void;
  bookSearchResults: BookSearchResult[];
  setBookSearchResults: (results: BookSearchResult[]) => void;
  isSearchingBooks: boolean;
  setIsSearchingBooks: (loading: boolean) => void;
  selectedSearchBook: BookSearchResult | null;
  setSelectedSearchBook: (book: BookSearchResult | null) => void;
  manualTitle: string;
  setManualTitle: (title: string) => void;
  manualAuthor: string;
  setManualAuthor: (author: string) => void;
  emotionalResidue: string;
  setEmotionalResidue: (res: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const OriginBooksStep: React.FC<OriginBooksStepProps> = ({
  originBooks,
  setOriginBooks,
  bookQuery,
  setBookQuery,
  bookSearchResults,
  setBookSearchResults,
  isSearchingBooks,
  setIsSearchingBooks,
  selectedSearchBook,
  setSelectedSearchBook,
  manualTitle,
  setManualTitle,
  manualAuthor,
  setManualAuthor,
  emotionalResidue,
  setEmotionalResidue,
  onPrev,
  onNext
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h3 className="font-display text-lg text-[#1C1916] font-semibold font-serif">Quais livros ficaram morando em você?</h3>
        <p className="text-xs font-mono text-[#BDAB9C] uppercase tracking-wider leading-relaxed">
          Não escolha os melhores. Escolha os que deixaram vestígios. (Até 5 livros)
        </p>
      </div>

      {originBooks.length > 0 && (
        <div className="space-y-2 p-3 bg-[#1C1916]/5 rounded-xl border border-[#BDAB9C]/20">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#BDAB9C]">Seus Livros de Origem ({originBooks.length}/5)</p>
          <div className="space-y-2">
            {originBooks.map((book) => (
              <div key={book.id} className="flex gap-3 bg-[#FAF8F3] p-2.5 rounded-lg border border-[#BDAB9C]/30 items-start justify-between relative">
                <div className="flex gap-2 items-start">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} referrerPolicy="no-referrer" className="w-9 h-12 object-cover rounded shadow-sm" alt={book.title} />
                  ) : (
                    <div className="w-9 h-12 bg-[#1C1916]/10 rounded flex items-center justify-center text-[#BDAB9C]">
                      <BookOpen className="w-4 h-4" />
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <h4 className="font-serif font-bold text-xs text-[#1C1916]">{book.title}</h4>
                    <p className="text-[10px] font-sans text-[#3D3D3D]/85">por {book.author}</p>
                    <p className="font-serif italic text-[11px] text-[#3D3D3D]/70 mt-1">"{book.emotionalResidue}"</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOriginBooks(prev => prev.filter(b => b.id !== book.id))}
                  className="text-[#BDAB9C] hover:text-[#1C1916] p-1 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {originBooks.length < 5 && (
        <div className="space-y-4 p-4 rounded-xl border border-dashed border-[#BDAB9C]/60 bg-[#FAF8F3]">
          <p className="text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider">Adicionar Livro de Origem</p>
          
          <div className="space-y-2">
            <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider">
              Busca opcional via Open Library
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Busque por título ou autor..."
                value={bookQuery}
                onChange={(e) => setBookQuery(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setIsSearchingBooks(true);
                    const res = await searchBooks(bookQuery);
                    setBookSearchResults(res);
                    setIsSearchingBooks(false);
                  }
                }}
                className="flex-1 bg-white border border-[#BDAB9C]/50 focus:border-[#1C1916] rounded px-3 py-1.5 text-xs text-[#1C1916] focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={async () => {
                  setIsSearchingBooks(true);
                  const res = await searchBooks(bookQuery);
                  setBookSearchResults(res);
                  setIsSearchingBooks(false);
                }}
                className="bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] px-3 py-1.5 rounded text-xs font-sans font-medium transition-colors cursor-pointer"
              >
                {isSearchingBooks ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>

          {bookSearchResults.length > 0 && (
            <div className="bg-white border border-[#BDAB9C]/30 rounded-lg p-2 max-h-48 overflow-y-auto space-y-1">
              <p className="text-[9px] font-mono text-[#BDAB9C] uppercase tracking-wider mb-1 px-1">Resultados encontrados:</p>
              {bookSearchResults.map((res, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedSearchBook(res);
                    setManualTitle(res.title);
                    setManualAuthor(res.author);
                    setBookSearchResults([]);
                    setBookQuery("");
                  }}
                  className="w-full text-left p-1.5 hover:bg-[#1C1916]/5 rounded flex items-center gap-2 transition-all cursor-pointer"
                >
                  {res.coverUrl ? (
                    <img src={res.coverUrl} referrerPolicy="no-referrer" className="w-6 h-8 object-cover rounded shadow-xs" alt="" />
                  ) : (
                    <div className="w-6 h-8 bg-[#1C1916]/10 rounded flex items-center justify-center text-[#BDAB9C]">
                      <BookOpen className="w-3 h-3" />
                    </div>
                  )}
                  <div className="leading-tight">
                    <p className="text-xs font-serif font-bold text-[#1C1916]">{res.title}</p>
                    <p className="text-[10px] font-sans text-[#3D3D3D]/75">{res.author}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="space-y-3 pt-2 border-t border-[#BDAB9C]/20">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">Título do Livro</label>
                <input
                  type="text"
                  placeholder="Digite ou selecione..."
                  value={manualTitle}
                  onChange={(e) => {
                    setManualTitle(e.target.value);
                    if (selectedSearchBook && selectedSearchBook.title !== e.target.value) {
                      setSelectedSearchBook(null);
                    }
                  }}
                  className="w-full bg-white border border-[#BDAB9C]/50 focus:border-[#1C1916] rounded p-2 text-xs font-serif text-[#1C1916] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">Autor</label>
                <input
                  type="text"
                  placeholder="Nome do autor..."
                  value={manualAuthor}
                  onChange={(e) => {
                    setManualAuthor(e.target.value);
                    if (selectedSearchBook && selectedSearchBook.author !== e.target.value) {
                      setSelectedSearchBook(null);
                    }
                  }}
                  className="w-full bg-white border border-[#BDAB9C]/50 focus:border-[#1C1916] rounded p-2 text-xs font-serif text-[#1C1916] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
                O que ficou em você depois desse livro?
              </label>
              <textarea
                rows={2}
                placeholder="Uma memória sutil, uma angústia doce, um modo diferente de amar..."
                value={emotionalResidue}
                onChange={(e) => setEmotionalResidue(e.target.value)}
                className="w-full bg-white border border-[#BDAB9C]/50 focus:border-[#1C1916] rounded p-2 text-xs font-serif text-[#1C1916] placeholder-[#BDAB9C]/80 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                let title = "";
                let author = "";
                let coverUrl: string | undefined = undefined;
                let openLibraryKey: string | undefined = undefined;

                if (selectedSearchBook) {
                  title = selectedSearchBook.title;
                  author = selectedSearchBook.author;
                  coverUrl = selectedSearchBook.coverUrl;
                  openLibraryKey = selectedSearchBook.openLibraryKey;
                } else {
                  if (!manualTitle.trim()) {
                    alert("Por favor, informe o título do livro.");
                    return;
                  }
                  title = manualTitle.trim();
                  author = manualAuthor.trim() || "Autor Desconhecido";
                }

                if (!emotionalResidue.trim()) {
                  alert("Por favor, nos conte o que ficou em você depois desse livro.");
                  return;
                }

                const newBook: OriginBook = {
                  id: "origin_" + Date.now(),
                  title,
                  author,
                  coverUrl,
                  openLibraryKey,
                  emotionalResidue: emotionalResidue.trim()
                };

                setOriginBooks(prev => [...prev, newBook]);
                setBookQuery("");
                setBookSearchResults([]);
                setSelectedSearchBook(null);
                setManualTitle("");
                setManualAuthor("");
                setEmotionalResidue("");
              }}
              className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-2 rounded text-xs font-sans font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar à minha origem</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          onClick={onPrev}
          className="flex-1 border border-[#BDAB9C] hover:bg-[#1C1916]/5 text-[#3D3D3D] py-3 rounded-lg font-sans text-sm font-medium transition-all cursor-pointer"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          className="flex-[2] bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{originBooks.length === 0 ? "Pular e Mapear Rituais" : "Avançar para Rituais"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
