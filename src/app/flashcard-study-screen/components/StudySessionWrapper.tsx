'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, BookmarkPlus, Share2, Keyboard, CheckCircle2, XCircle, RefreshCw, LayoutGrid,  } from 'lucide-react';
import FlashCard from './FlashCard';
import SessionProgressBar from './SessionProgressBar';
import SessionCompleteBanner from './SessionCompleteBanner';
import KeyboardHint from './KeyboardHint';

// Backend integration point: fetch cards for collection by ID from API
const MOCK_COLLECTION = {
  id: 'col-001',
  name: '商業英語精選',
  totalCards: 24,
};

export interface WordCard {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  partOfSpeechZh: string;
  definition: string;
  definitionZh: string;
  examples: {
    en: string;
    zh: string;
  }[];
  masteryStatus: 'new' | 'learning' | 'familiar' | 'mastered';
  difficulty: 'easy' | 'medium' | 'hard';
}

const MOCK_CARDS: WordCard[] = [
  {
    id: 'card-001',
    word: 'ambiguous',
    phonetic: '/æmˈbɪɡjuəs/',
    partOfSpeech: 'adjective',
    partOfSpeechZh: '形容詞',
    definition: 'Open to more than one interpretation; not having one obvious meaning.',
    definitionZh: '模稜兩可的；意義不明確的；有多種解釋的',
    examples: [
      { en: 'The contract contained several ambiguous clauses that led to disputes.', zh: '合約中有幾個模稜兩可的條款，導致了爭議。' },
      { en: 'Her ambiguous response left us unsure whether she accepted the offer.', zh: '她含糊的回答讓我們不確定她是否接受了這個提議。' },
      { en: 'Scientists are trying to resolve the ambiguous data from the experiment.', zh: '科學家們正試圖解析實驗中那些意義不明的數據。' },
    ],
    masteryStatus: 'learning',
    difficulty: 'medium',
  },
  {
    id: 'card-002',
    word: 'leverage',
    phonetic: '/ˈlevərɪdʒ/',
    partOfSpeech: 'noun / verb',
    partOfSpeechZh: '名詞／動詞',
    definition: 'The power to influence a situation; to use something to maximum advantage.',
    definitionZh: '槓桿作用；影響力；充分利用（某事物）',
    examples: [
      { en: 'The startup used its user data as leverage in negotiations with investors.', zh: '這家新創公司將用戶數據作為與投資者談判的籌碼。' },
      { en: 'You can leverage your existing network to find new business opportunities.', zh: '你可以充分利用現有的人脈來尋找新的商業機會。' },
      { en: 'Financial leverage can amplify both gains and losses in investment.', zh: '財務槓桿可以在投資中同時放大收益和損失。' },
    ],
    masteryStatus: 'new',
    difficulty: 'medium',
  },
  {
    id: 'card-003',
    word: 'resilient',
    phonetic: '/rɪˈzɪliənt/',
    partOfSpeech: 'adjective',
    partOfSpeechZh: '形容詞',
    definition: 'Able to withstand or recover quickly from difficult conditions.',
    definitionZh: '有彈性的；能快速恢復的；堅韌的',
    examples: [
      { en: 'The resilient economy bounced back within two quarters after the crisis.', zh: '具有韌性的經濟在危機後兩個季度內就恢復了。' },
      { en: 'She proved to be incredibly resilient, returning to work after her injury.', zh: '她展現了驚人的韌性，受傷後重返工作崗位。' },
      { en: 'Building a resilient supply chain requires diversifying your suppliers.', zh: '建立具有韌性的供應鏈需要多元化你的供應商。' },
    ],
    masteryStatus: 'familiar',
    difficulty: 'easy',
  },
  {
    id: 'card-004',
    word: 'paradigm',
    phonetic: '/ˈpærədaɪm/',
    partOfSpeech: 'noun',
    partOfSpeechZh: '名詞',
    definition: 'A typical example or pattern of something; a model or framework.',
    definitionZh: '範例；典範；思維框架；模式',
    examples: [
      { en: 'The internet created a paradigm shift in how businesses reach customers.', zh: '網路創造了企業接觸客戶方式的典範轉移。' },
      { en: 'Agile development represents a new paradigm in software engineering.', zh: '敏捷開發代表了軟體工程中的新典範。' },
      { en: 'Scientists are questioning the existing paradigm about the origins of life.', zh: '科學家們正在質疑現有關於生命起源的思維框架。' },
    ],
    masteryStatus: 'new',
    difficulty: 'hard',
  },
  {
    id: 'card-005',
    word: 'concise',
    phonetic: '/kənˈsaɪs/',
    partOfSpeech: 'adjective',
    partOfSpeechZh: '形容詞',
    definition: 'Giving a lot of information clearly and in a few words; brief but comprehensive.',
    definitionZh: '簡潔的；扼要的；言簡意賅的',
    examples: [
      { en: 'A concise executive summary is essential for busy decision-makers.', zh: '簡潔的執行摘要對繁忙的決策者來說至關重要。' },
      { en: 'Please keep your presentation concise — we only have fifteen minutes.', zh: '請保持你的簡報簡潔——我們只有十五分鐘。' },
      { en: 'Her concise writing style made complex topics easy to understand.', zh: '她簡潔的寫作風格讓複雜的主題變得容易理解。' },
    ],
    masteryStatus: 'mastered',
    difficulty: 'easy',
  },
  {
    id: 'card-006',
    word: 'mitigate',
    phonetic: '/ˈmɪtɪɡeɪt/',
    partOfSpeech: 'verb',
    partOfSpeechZh: '動詞',
    definition: 'To make less severe, serious, or painful; to lessen or reduce.',
    definitionZh: '減輕；緩和；降低（風險、損害等）',
    examples: [
      { en: 'Diversification helps mitigate investment risk across your portfolio.', zh: '多元化有助於降低你投資組合中的投資風險。' },
      { en: 'The company took steps to mitigate the environmental impact of production.', zh: '該公司採取措施減輕生產對環境的影響。' },
      { en: 'Early intervention can significantly mitigate the severity of the problem.', zh: '早期介入可以顯著減輕問題的嚴重性。' },
    ],
    masteryStatus: 'learning',
    difficulty: 'hard',
  },
  {
    id: 'card-007',
    word: 'benchmark',
    phonetic: '/ˈbentʃmɑːrk/',
    partOfSpeech: 'noun / verb',
    partOfSpeechZh: '名詞／動詞',
    definition: 'A standard or point of reference against which things may be compared.',
    definitionZh: '基準；標竿；參照標準；以…為基準進行比較',
    examples: [
      { en: 'The quarterly report set a new benchmark for the team\'s performance targets.', zh: '季度報告為團隊績效目標設立了新的基準。' },
      { en: 'We benchmark our prices against competitors every six months.', zh: '我們每六個月將我們的價格與競爭對手進行基準比較。' },
      { en: 'Industry benchmarks show that our conversion rate is above average.', zh: '行業基準顯示我們的轉換率高於平均水準。' },
    ],
    masteryStatus: 'familiar',
    difficulty: 'medium',
  },
  {
    id: 'card-008',
    word: 'synergy',
    phonetic: '/ˈsɪnərdʒi/',
    partOfSpeech: 'noun',
    partOfSpeechZh: '名詞',
    definition: 'The combined effect of two or more elements that is greater than the sum of individual effects.',
    definitionZh: '協同效應；協力作用；相乘效果',
    examples: [
      { en: 'The merger created significant synergy between the two product lines.', zh: '這次合併在兩條產品線之間創造了顯著的協同效應。' },
      { en: 'True synergy requires trust and open communication between team members.', zh: '真正的協同效應需要團隊成員之間的信任和開放溝通。' },
      { en: 'The partnership produced unexpected synergies that boosted revenue by 40%.', zh: '這次合作產生了意想不到的協同效應，使收入增加了40%。' },
    ],
    masteryStatus: 'new',
    difficulty: 'medium',
  },
];

type CardResult = 'known' | 'unknown' | null;

export default function StudySessionWrapper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<Record<string, CardResult>>({});
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const cards = MOCK_CARDS;
  const currentCard = cards[currentIndex];
  const knownCount = Object.values(results).filter((r) => r === 'known').length;
  const unknownCount = Object.values(results).filter((r) => r === 'unknown').length;

  const goToNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setIsFlipped(false);
        setIsAnimating(false);
      }, 200);
    } else if (Object.keys(results).length === cards.length) {
      setSessionComplete(true);
    }
  }, [currentIndex, cards.length, results]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((i) => i - 1);
        setIsFlipped(false);
        setIsAnimating(false);
      }, 200);
    }
  }, [currentIndex]);

  const handleFlip = useCallback(() => {
    setIsFlipped((f) => !f);
  }, []);

  const handleKnown = useCallback(() => {
    setResults((r) => ({ ...r, [currentCard.id]: 'known' }));
    toast.success('👍 標記為認識！', { duration: 1500 });
    setTimeout(goToNext, 300);
  }, [currentCard.id, goToNext]);

  const handleUnknown = useCallback(() => {
    setResults((r) => ({ ...r, [currentCard.id]: 'unknown' }));
    toast.error('📚 加入複習清單', { duration: 1500 });
    setTimeout(goToNext, 300);
  }, [currentCard.id, goToNext]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setResults({});
    setSessionComplete(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'k' || e.key === 'K') {
        if (isFlipped) handleKnown();
      } else if (e.key === 'u' || e.key === 'U') {
        if (isFlipped) handleUnknown();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleFlip, goToNext, goToPrev, handleKnown, handleUnknown, isFlipped]);

  if (sessionComplete) {
    return (
      <SessionCompleteBanner
        knownCount={knownCount}
        unknownCount={unknownCount}
        totalCards={cards.length}
        collectionName={MOCK_COLLECTION.name}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-4 min-h-[calc(100vh-120px)]">
      {/* Breadcrumb + Collection info */}
      <div className="w-full max-w-2xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/my-card-collections"
            className="text-gray-400 hover:text-primary-600 transition-colors flex items-center gap-1"
          >
            <LayoutGrid size={14} />
            我的單字集
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-primary-700 font-medium truncate max-w-[180px]">
            {MOCK_COLLECTION.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKeyboardHint(!showKeyboardHint)}
            className="p-2 rounded-xl text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-all duration-150"
            title="鍵盤快捷鍵"
            aria-label="顯示鍵盤快捷鍵"
          >
            <Keyboard size={16} />
          </button>
          <button
            onClick={() => toast.success('分享連結已複製！')}
            className="p-2 rounded-xl text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-all duration-150"
            title="分享此單字集"
            aria-label="分享單字集"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Keyboard hint dropdown */}
      {showKeyboardHint && (
        <div className="w-full max-w-2xl animate-fade-in">
          <KeyboardHint />
        </div>
      )}

      {/* Progress bar */}
      <div className="w-full max-w-2xl">
        <SessionProgressBar
          currentIndex={currentIndex}
          totalCards={cards.length}
          knownCount={knownCount}
          unknownCount={unknownCount}
          results={results}
          cards={cards}
        />
      </div>

      {/* Card navigation row */}
      <div className="flex items-center gap-4 w-full max-w-2xl justify-center">
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-2xl bg-white border border-primary-100 text-gray-500 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 active:scale-95 shadow-sm"
          aria-label="上一張"
        >
          <ChevronLeft size={20} />
        </button>

        {/* The Flashcard */}
        <div className={`flex-1 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <FlashCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            currentResult={results[currentCard.id] ?? null}
          />
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === cards.length - 1}
          className="p-3 rounded-2xl bg-white border border-primary-100 text-gray-500 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 active:scale-95 shadow-sm"
          aria-label="下一張"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Action buttons — only show after flip */}
      <div className="w-full max-w-2xl">
        {isFlipped ? (
          <div className="flex items-center gap-4 animate-slide-up">
            <button
              onClick={handleUnknown}
              className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-600 font-semibold text-base hover:bg-red-100 hover:border-red-300 transition-all duration-150 active:scale-95 group"
            >
              <XCircle size={22} className="group-hover:scale-110 transition-transform" />
              不認識
              <span className="hidden sm:inline text-xs font-normal text-red-400 ml-1">[U]</span>
            </button>
            <button
              onClick={handleKnown}
              className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-primary-600 border-2 border-primary-600 text-white font-semibold text-base hover:bg-primary-700 hover:border-primary-700 transition-all duration-150 active:scale-95 group shadow-md"
            >
              <CheckCircle2 size={22} className="group-hover:scale-110 transition-transform" />
              認識
              <span className="hidden sm:inline text-xs font-normal text-primary-200 ml-1">[K]</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleFlip}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-white border-2 border-primary-200 text-primary-600 font-semibold text-base hover:bg-primary-50 hover:border-primary-300 transition-all duration-150 active:scale-95 group"
          >
            <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            點擊翻轉查看定義
            <span className="hidden sm:inline text-xs font-normal text-primary-400 ml-1">[Space]</span>
          </button>
        )}
      </div>

      {/* Utility row */}
      <div className="flex items-center gap-3 text-sm text-gray-400">
        <button
          onClick={() => toast.success('已加入書籤！')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-all duration-150 active:scale-95"
        >
          <BookmarkPlus size={14} />
          加入書籤
        </button>
        <span className="text-gray-200">|</span>
        <button
          onClick={() => toast.success('已加入發音播放！')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-all duration-150 active:scale-95"
        >
          <Volume2 size={14} />
          播放發音
        </button>
        <span className="text-gray-200">|</span>
        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-all duration-150 active:scale-95"
        >
          <RefreshCw size={14} />
          重新開始
        </button>
      </div>
    </div>
  );
}