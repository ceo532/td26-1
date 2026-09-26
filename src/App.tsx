import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Sparkles,
  HelpCircle,
  GraduationCap,
  Award,
  Check,
  Volume2,
  Info
} from 'lucide-react';

interface QuestionItem {
  cau: number;
  hoi: string;
  A: string;
  B: string;
  C: string;
  D: string;
  dapAn: 'A' | 'B' | 'C' | 'D';
  ipa: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  giaiThich: string;
}

const QUESTIONS: QuestionItem[] = [
  {
    cau: 1,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "books",
    B: "cats",
    C: "dogs",
    D: "maps",
    dapAn: "C",
    ipa: {
      A: "/bʊks/ (-s phát âm là /s/)",
      B: "/kæts/ (-s phát âm là /s/)",
      C: "/dɒɡz/ (-s phát âm là /z/)",
      D: "/mæps/ (-s phát âm là /s/)"
    },
    giaiThich: "Từ 'dogs' tận cùng là âm hữu thanh /ɡ/ nên đuôi '-s' được phát âm là /z/. Các từ còn lại tận cùng bằng âm vô thanh /k, t, p/ nên đuôi '-s' được phát âm là /s/."
  },
  {
    cau: 2,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "watches",
    B: "boxes",
    C: "brushes",
    D: "beds",
    dapAn: "D",
    ipa: {
      A: "/ˈwɒtʃ.ɪz/ (-es phát âm là /ɪz/)",
      B: "/ˈbɒk.sɪz/ (-es phát âm là /ɪz/)",
      C: "/ˈbrʌʃ.ɪz/ (-es phát âm là /ɪz/)",
      D: "/bedz/ (-s phát âm là /z/)"
    },
    giaiThich: "Từ 'beds' có đuôi '-s' phát âm là /z/ (sau âm hữu thanh /d/). Các từ 'watches', 'boxes', 'brushes' tận cùng bằng các âm xuýt /tʃ, s, ʃ/ nên đuôi '-es' được phát âm là /ɪz/."
  },
  {
    cau: 3,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "wanted",
    B: "needed",
    C: "played",
    D: "planted",
    dapAn: "C",
    ipa: {
      A: "/ˈwɒn.tɪd/ (-ed phát âm là /ɪd/)",
      B: "/ˈniː.dɪd/ (-ed phát âm là /ɪd/)",
      C: "/pleɪd/ (-ed phát âm là /d/)",
      D: "/ˈplɑːn.tɪd/ (-ed phát âm là /ɪd/)"
    },
    giaiThich: "Từ 'played' tận cùng là nguyên âm đôi /eɪ/ (âm hữu thanh) nên đuôi '-ed' phát âm là /d/. Các từ 'wanted', 'needed', 'planted' tận cùng bằng /t/ hoặc /d/ nên đuôi '-ed' phát âm là /ɪd/."
  },
  {
    cau: 4,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "looked",
    B: "watched",
    C: "stopped",
    D: "opened",
    dapAn: "D",
    ipa: {
      A: "/lʊkt/ (-ed phát âm là /t/)",
      B: "/wɒtʃt/ (-ed phát âm là /t/)",
      C: "/stɒpt/ (-ed phát âm là /t/)",
      D: "/ˈəʊ.pənd/ (-ed phát âm là /d/)"
    },
    giaiThich: "Từ 'opened' tận cùng là phụ âm hữu thanh /n/ nên đuôi '-ed' phát âm là /d/. Các từ 'looked', 'watched', 'stopped' tận cùng bằng âm vô thanh /k, tʃ, p/ nên đuôi '-ed' phát âm là /t/."
  },
  {
    cau: 5,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "pens",
    B: "rulers",
    C: "bags",
    D: "hats",
    dapAn: "D",
    ipa: {
      A: "/penz/ (-s phát âm là /z/)",
      B: "/ˈruː.ləz/ (-s phát âm là /z/)",
      C: "/bæɡz/ (-s phát âm là /z/)",
      D: "/hæts/ (-s phát âm là /s/)"
    },
    giaiThich: "Từ 'hats' tận cùng là âm vô thanh /t/ nên đuôi '-s' phát âm là /s/. Các từ 'pens', 'rulers', 'bags' tận cùng là các âm hữu thanh /n, ə, ɡ/ nên đuôi '-s' phát âm là /z/."
  },
  {
    cau: 6,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "buses",
    B: "glasses",
    C: "classes",
    D: "tables",
    dapAn: "D",
    ipa: {
      A: "/ˈbʌs.ɪz/ (-es phát âm là /ɪz/)",
      B: "/ˈɡlɑː.sɪz/ (-es phát âm là /ɪz/)",
      C: "/ˈklɑː.sɪz/ (-es phát âm là /ɪz/)",
      D: "/ˈteɪ.bəlz/ (-s phát âm là /z/)"
    },
    giaiThich: "Từ 'tables' có đuôi '-s' phát âm là /z/ (sau âm hữu thanh /l/). Các từ 'buses', 'glasses', 'classes' tận cùng bằng âm /s/ nên đuôi '-es' phát âm là /ɪz/."
  },
  {
    cau: 7,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "washed",
    B: "worked",
    C: "missed",
    D: "called",
    dapAn: "D",
    ipa: {
      A: "/wɒʃt/ (-ed phát âm là /t/)",
      B: "/wɜːkt/ (-ed phát âm là /t/)",
      C: "/mɪst/ (-ed phát âm là /t/)",
      D: "/kɔːld/ (-ed phát âm là /d/)"
    },
    giaiThich: "Từ 'called' tận cùng là phụ âm hữu thanh /l/ nên đuôi '-ed' phát âm là /d/. Các từ 'washed', 'worked', 'missed' tận cùng bằng các âm vô thanh /ʃ, k, s/ nên đuôi '-ed' phát âm là /t/."
  },
  {
    cau: 8,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "decided",
    B: "visited",
    C: "waited",
    D: "cleaned",
    dapAn: "D",
    ipa: {
      A: "/dɪˈsaɪ.dɪd/ (-ed phát âm là /ɪd/)",
      B: "/ˈvɪz.ɪ.tɪd/ (-ed phát âm là /ɪd/)",
      C: "/ˈweɪ.tɪd/ (-ed phát âm là /ɪd/)",
      D: "/kliːnd/ (-ed phát âm là /d/)"
    },
    giaiThich: "Từ 'cleaned' tận cùng là âm hữu thanh /n/ nên đuôi '-ed' phát âm là /d/. Các từ 'decided', 'visited', 'waited' tận cùng bằng /d, t/ nên đuôi '-ed' phát âm là /ɪd/."
  },
  {
    cau: 9,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "cups",
    B: "stamps",
    C: "desks",
    D: "trees",
    dapAn: "D",
    ipa: {
      A: "/kʌps/ (-s phát âm là /s/)",
      B: "/stæmps/ (-s phát âm là /s/)",
      C: "/desks/ (-s phát âm là /s/)",
      D: "/triːz/ (-s phát âm là /z/)"
    },
    giaiThich: "Từ 'trees' tận cùng là nguyên âm dài /iː/ (âm hữu thanh) nên đuôi '-s' phát âm là /z/. Các từ 'cups', 'stamps', 'desks' tận cùng bằng âm vô thanh /p, k/ nên đuôi '-s' phát âm là /s/."
  },
  {
    cau: 10,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "lived",
    B: "loved",
    C: "smiled",
    D: "laughed",
    dapAn: "D",
    ipa: {
      A: "/lɪvd/ (-ed phát âm là /d/)",
      B: "/lʌvd/ (-ed phát âm là /d/)",
      C: "/smaɪld/ (-ed phát âm là /d/)",
      D: "/lɑːft/ (-ed phát âm là /t/)"
    },
    giaiThich: "Từ 'laughed' có đuôi 'gh' phát âm là âm vô thanh /f/, nên đuôi '-ed' phát âm là /t/. Các từ 'lived', 'loved', 'smiled' tận cùng là âm hữu thanh /v, l/ nên đuôi '-ed' phát âm là /d/."
  },
  {
    cau: 11,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "washes",
    B: "teaches",
    C: "goes",
    D: "catches",
    dapAn: "C",
    ipa: {
      A: "/ˈwɒʃ.ɪz/ (-es phát âm là /ɪz/)",
      B: "/ˈtiː.tʃɪz/ (-es phát âm là /ɪz/)",
      C: "/ɡəʊz/ (-es phát âm là /z/)",
      D: "/ˈkætʃ.ɪz/ (-es phát âm là /ɪz/)"
    },
    giaiThich: "Từ 'goes' có tận cùng là nguyên âm đôi /əʊ/ nên đuôi '-es' phát âm là /z/. Các từ 'washes', 'teaches', 'catches' tận cùng bằng âm /ʃ, tʃ/ nên đuôi '-es' phát âm là /ɪz/."
  },
  {
    cau: 12,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "days",
    B: "boys",
    C: "toys",
    D: "months",
    dapAn: "D",
    ipa: {
      A: "/deɪz/ (-s phát âm là /z/)",
      B: "/bɔɪz/ (-s phát âm là /z/)",
      C: "/tɔɪz/ (-s phát âm là /z/)",
      D: "/mʌnθs/ (-s phát âm là /s/)"
    },
    giaiThich: "Từ 'months' có âm tận cùng là /θ/ (âm vô thanh) nên đuôi '-s' phát âm là /s/. Các từ 'days', 'boys', 'toys' đều tận cùng bằng nguyên âm đôi /eɪ, ɔɪ/ nên đuôi '-s' phát âm là /z/."
  },
  {
    cau: 13,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "started",
    B: "ended",
    C: "painted",
    D: "helped",
    dapAn: "D",
    ipa: {
      A: "/ˈstɑː.tɪd/ (-ed phát âm là /ɪd/)",
      B: "/ˈen.dɪd/ (-ed phát âm là /ɪd/)",
      C: "/ˈpeɪn.tɪd/ (-ed phát âm là /ɪd/)",
      D: "/helpt/ (-ed phát âm là /t/)"
    },
    giaiThich: "Từ 'helped' tận cùng bằng âm vô thanh /p/ nên đuôi '-ed' phát âm là /t/. Các từ 'started', 'ended', 'painted' tận cùng bằng /t, d/ nên đuôi '-ed' phát âm là /ɪd/."
  },
  {
    cau: 14,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "cooked",
    B: "finished",
    C: "liked",
    D: "used",
    dapAn: "D",
    ipa: {
      A: "/kʊkt/ (-ed phát âm là /t/)",
      B: "/ˈfɪn.ɪʃt/ (-ed phát âm là /t/)",
      C: "/laɪkt/ (-ed phát âm là /t/)",
      D: "/juːzd/ (-ed phát âm là /d/)"
    },
    giaiThich: "Từ 'used' (dạng động từ của use: /juːz/) tận cùng là âm hữu thanh /z/ nên đuôi '-ed' phát âm là /d/. Các từ 'cooked', 'finished', 'liked' tận cùng bằng các âm vô thanh /k, ʃ/ nên đuôi '-ed' phát âm là /t/."
  },
  {
    cau: 15,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "potatoes",
    B: "tomatoes",
    C: "photos",
    D: "matches",
    dapAn: "D",
    ipa: {
      A: "/pəˈteɪ.təʊz/ (-es phát âm là /z/)",
      B: "/təˈmɑː.təʊz/ (-es phát âm là /z/)",
      C: "/ˈfəʊ.təʊz/ (-s phát âm là /z/)",
      D: "/ˈmætʃ.ɪz/ (-es phát âm là /ɪz/)"
    },
    giaiThich: "Từ 'matches' tận cùng là âm /tʃ/ nên đuôi '-es' phát âm là /ɪz/. Các từ 'potatoes', 'tomatoes', 'photos' tận cùng bằng nguyên âm đôi /əʊ/ nên đuôi '-s/-es' phát âm là /z/."
  },
  {
    cau: 16,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "learned",
    B: "stayed",
    C: "enjoyed",
    D: "walked",
    dapAn: "D",
    ipa: {
      A: "/lɜːnd/ (-ed phát âm là /d/)",
      B: "/steɪd/ (-ed phát âm là /d/)",
      C: "/ɪnˈdʒɔɪd/ (-ed phát âm là /d/)",
      D: "/wɔːkt/ (-ed phát âm là /t/)"
    },
    giaiThich: "Từ 'walked' tận cùng là âm vô thanh /k/ nên đuôi '-ed' phát âm là /t/. Các từ 'learned', 'stayed', 'enjoyed' tận cùng bằng âm hữu thanh /n, eɪ, ɔɪ/ nên đuôi '-ed' phát âm là /d/."
  },
  {
    cau: 17,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "students",
    B: "teachers",
    C: "farmers",
    D: "drivers",
    dapAn: "A",
    ipa: {
      A: "/ˈstjuː.dənts/ (-s phát âm là /s/)",
      B: "/ˈtiː.tʃəz/ (-s phát âm là /z/)",
      C: "/ˈfɑː.məz/ (-s phát âm là /z/)",
      D: "/ˈdraɪ.vəz/ (-s phát âm là /z/)"
    },
    giaiThich: "Từ 'students' tận cùng là âm vô thanh /t/ nên đuôi '-s' phát âm là /s/. Các từ 'teachers', 'farmers', 'drivers' tận cùng bằng nguyên âm schwa /ə/ (âm hữu thanh) nên đuôi '-s' phát âm là /z/."
  },
  {
    cau: 18,
    hoi: "Choose the word whose '-s' or '-es' ending is pronounced differently.",
    A: "friends",
    B: "girls",
    C: "boys",
    D: "shirts",
    dapAn: "D",
    ipa: {
      A: "/frendz/ (-s phát âm là /z/)",
      B: "/ɡɜːlz/ (-s phát âm là /z/)",
      C: "/bɔɪz/ (-s phát âm là /z/)",
      D: "/ʃɜːts/ (-s phát âm là /s/)"
    },
    giaiThich: "Từ 'shirts' tận cùng là âm vô thanh /t/ nên đuôi '-s' phát âm là /s/. Các từ 'friends', 'girls', 'boys' tận cùng bằng các âm hữu thanh /d, l, ɔɪ/ nên đuôi '-s' phát âm là /z/."
  },
  {
    cau: 19,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "arrived",
    B: "happened",
    C: "listened",
    D: "invited",
    dapAn: "D",
    ipa: {
      A: "/əˈraɪvd/ (-ed phát âm là /d/)",
      B: "/ˈhæp.ənd/ (-ed phát âm là /d/)",
      C: "/ˈlɪs.ənd/ (-ed phát âm là /d/)",
      D: "/ɪnˈvaɪ.tɪd/ (-ed phát âm là /ɪd/)"
    },
    giaiThich: "Từ 'invited' tận cùng là âm /t/ nên đuôi '-ed' phát âm là /ɪd/. Các từ 'arrived', 'happened', 'listened' tận cùng bằng các âm hữu thanh /v, n/ nên đuôi '-ed' phát âm là /d/."
  },
  {
    cau: 20,
    hoi: "Choose the word whose '-ed' ending is pronounced differently.",
    A: "hoped",
    B: "washed",
    C: "talked",
    D: "rained",
    dapAn: "D",
    ipa: {
      A: "/həʊpt/ (-ed phát âm là /t/)",
      B: "/wɒʃt/ (-ed phát âm là /t/)",
      C: "/tɔːkt/ (-ed phát âm là /t/)",
      D: "/reɪnd/ (-ed phát âm là /d/)"
    },
    giaiThich: "Từ 'rained' tận cùng là âm hữu thanh /n/ nên đuôi '-ed' phát âm là /d/. Các từ 'hoped', 'washed', 'talked' tận cùng bằng các âm vô thanh /p, ʃ, k/ nên đuôi '-ed' phát âm là /t/."
  }
];

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwR-qt3yItcs-NyP99caiZ2Fw83ScFVfGh-vsMaPr5GCPM7_TpkIaJI6yx3TB2GjuNPEQ/exec";

export default function App() {
  const [screen, setScreen] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  const [showTips, setShowTips] = useState(false);
  const webhookSentRef = useRef(false);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen, currentIndex]);

  const currentQ = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.cau]: option
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.cau] === q.dapAn) {
        correct++;
      }
    });
    return correct;
  };

  const handleFinish = () => {
    const correctCount = calculateScore();
    setScreen('result');

    // Send webhook if not yet sent
    if (!webhookSentRef.current) {
      webhookSentRef.current = true;
      try {
        const payload = {
          buoi: "Tuần 4",
          loai: "Quy tắc phát âm đuôi -s/-es và -ed",
          dung: correctCount,
          tong: 20,
          url: window.location.href
        };

        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        })
          .then((res) => {
            console.log("Gửi kết quả lên webhook thành công:", res.status);
          })
          .catch((err) => {
            console.error("Lỗi khi gửi webhook (không ảnh hưởng điểm số):", err);
          });
      } catch (err) {
        console.error("Lỗi gửi webhook:", err);
      }
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    webhookSentRef.current = false;
    setReviewFilter('all');
    setScreen('start');
  };

  const correctCount = calculateScore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/70 via-indigo-50/30 to-white text-slate-800 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-200 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-snug truncate">
                Luyện Thi Vào 10 — Môn Tiếng Anh
              </h1>
              <p className="text-xs text-slate-500 font-medium truncate">
                Tuần 4 — Quy tắc phát âm đuôi -s/-es và -ed
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowTips(!showTips)}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60 rounded-lg transition-colors cursor-pointer"
            title="Xem mẹo ghi nhớ nhanh"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mẹo phát âm</span>
          </button>
        </div>

        {/* Quick Tips Collapsible Banner */}
        {showTips && (
          <div className="border-t border-indigo-100 bg-indigo-50/80 px-4 py-3 transition-all animate-fadeIn">
            <div className="max-w-4xl mx-auto text-xs space-y-2.5">
              <div className="flex items-center justify-between font-bold text-indigo-950">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Bí quyết ghi nhớ phát âm thần tốc:
                </span>
                <button
                  onClick={() => setShowTips(false)}
                  className="text-slate-500 hover:text-slate-800 font-normal underline"
                >
                  Đóng lại
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="p-2.5 bg-white rounded-lg border border-indigo-100/80 shadow-2xs">
                  <p className="font-semibold text-indigo-900 mb-1">
                    1. Đuôi -s / -es:
                  </p>
                  <p className="text-slate-600">
                    <span className="font-bold text-emerald-700">/s/:</span> Tận cùng bằng /p, k, f, t, θ/ (Mẹo: <i>Thời phong kiến phương Tây</i>).
                  </p>
                  <p className="text-slate-600">
                    <span className="font-bold text-blue-700">/ɪz/:</span> Tận cùng bằng /s, z, ʃ, tʃ, dʒ, ʒ/ (Mẹo: <i>Sáu chạy xe sh zui zẻ</i>).
                  </p>
                  <p className="text-slate-600">
                    <span className="font-bold text-amber-700">/z/:</span> Các nguyên âm và phụ âm hữu thanh còn lại.
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-indigo-100/80 shadow-2xs">
                  <p className="font-semibold text-indigo-900 mb-1">
                    2. Đuôi -ed:
                  </p>
                  <p className="text-slate-600">
                    <span className="font-bold text-emerald-700">/ɪd/:</span> Tận cùng bằng /t/ hoặc /d/ (Mẹo: <i>Tiền Đô</i>).
                  </p>
                  <p className="text-slate-600">
                    <span className="font-bold text-blue-700">/t/:</span> Tận cùng bằng /p, k, f, s, ʃ, tʃ/ (Mẹo: <i>Tiền khao phở chính sợ chết</i>).
                  </p>
                  <p className="text-slate-600">
                    <span className="font-bold text-amber-700">/d/:</span> Các âm hữu thanh còn lại.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl w-full mx-auto px-4 py-6 md:py-8 flex-1 flex flex-col justify-center">
        {/* ========================================================= */}
        {/* 1. MÀN HÌNH BẮT ĐẦU */}
        {/* ========================================================= */}
        {screen === 'start' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/60 border border-slate-200/80 text-center animate-fadeIn">
            {/* Visual Header */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-200 mb-6">
              <Award className="w-10 h-10" />
            </div>

            <div className="inline-block px-3.5 py-1 mb-3 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-full tracking-wide uppercase">
              Chuyên đề luyện thi vào 10
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Tuần 4 — Quy tắc phát âm đuôi -s/-es và -ed
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
              Bài kiểm tra gồm <strong>20 câu trắc nghiệm chuẩn đề thi vào 10</strong> giúp em củng cố vững chắc điểm số phần Ngữ âm (Phonetics). Hãy tự tin làm bài nhé!
            </p>

            {/* Quick overview cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8 text-left">
              <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-xs">
                  20
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Số lượng câu</div>
                  <div className="text-sm font-bold text-slate-800">20 câu hỏi</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-xs">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Hình thức</div>
                  <div className="text-sm font-bold text-slate-800">Trắc nghiệm A/B/C/D</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Kết quả</div>
                  <div className="text-sm font-bold text-slate-800">Chấm điểm & Lời giải</div>
                </div>
              </div>
            </div>

            {/* Start CTA Button */}
            <button
              onClick={() => setScreen('quiz')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-lg rounded-2xl shadow-lg shadow-indigo-300/60 hover:shadow-indigo-300/90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>Bắt đầu làm bài</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. MÀN HÌNH LÀM BÀI — 20 CÂU TRẮC NGHIỆM */}
        {/* ========================================================= */}
        {screen === 'quiz' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Progress Bar & Header */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
                <span className="text-indigo-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse inline-block"></span>
                  Câu {currentIndex + 1} / {totalQuestions}
                </span>
                <span className="text-slate-500">
                  Đã trả lời: <span className="font-semibold text-slate-800">{answeredCount}</span>/{totalQuestions}
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Quick Jump Bar */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = answers[q.cau] !== undefined;

                  return (
                    <button
                      key={q.cau}
                      onClick={() => setCurrentIndex(idx)}
                      className={`min-w-8 h-8 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center justify-center ${
                        isCurrent
                          ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-300'
                          : isAnswered
                          ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                      title={`Câu ${q.cau}${isAnswered ? ' (Đã chọn)' : ''}`}
                    >
                      {q.cau}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-lg shadow-slate-200/50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                  Câu hỏi số {currentQ.cau}
                </span>
              </div>

              {/* Exact question text without modification */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-6">
                {currentQ.hoi}
              </h3>

              {/* Options A, B, C, D */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                  const isSelected = answers[currentQ.cau] === optKey;
                  const optionWord = currentQ[optKey];

                  return (
                    <button
                      key={optKey}
                      onClick={() => handleSelectOption(optKey)}
                      className={`w-full min-h-[60px] p-4 rounded-2xl border-2 text-left flex items-center gap-3.5 transition-all cursor-pointer group active:scale-[0.99] ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-sm shadow-indigo-100'
                          : 'border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50/80 text-slate-800'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                        }`}
                      >
                        {optKey}
                      </div>

                      <div className="flex-1 font-semibold text-base sm:text-lg">
                        {optionWord}
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-1.5 transition-colors ${
                    currentIndex === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Câu trước</span>
                </button>

                {currentIndex === totalQuestions - 1 ? (
                  <button
                    onClick={handleFinish}
                    className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Nộp bài</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. MÀN HÌNH KẾT QUẢ */}
        {/* ========================================================= */}
        {screen === 'result' && (
          <div className="space-y-6 animate-fadeIn pb-12">
            {/* Score Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/80 text-center relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-100/50 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-sky-100/50 rounded-full blur-2xl pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-3 shadow-2xs">
                  {correctCount >= 18 ? (
                    <Award className="w-8 h-8 text-amber-500" />
                  ) : (
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                  )}
                </div>

                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                  Kết quả bài làm
                </div>

                {/* Requirement: Hiện "Em đúng X/20 câu" */}
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                  Em đúng {correctCount}/20 câu
                </h2>

                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-sm mb-4">
                  Điểm số: {(correctCount * 0.5).toFixed(1)} / 10 điểm ({(correctCount / 20 * 100).toFixed(0)}%)
                </div>

                {/* Feedback note for student */}
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  {correctCount >= 18
                    ? "🎉 Xuất sắc! Kiến thức quy tắc phát âm của em cực kỳ vững vàng. Hãy tiếp tục giữ vững phong độ này nhé!"
                    : correctCount >= 14
                    ? "👏 Rất tốt! Em đã nắm chắc phần lớn các quy tắc. Hãy xem kỹ lại các câu sai bên dưới để đạt điểm tuyệt đối nhé!"
                    : correctCount >= 10
                    ? "💪 Khá tốt! Em hãy đọc kỹ phần giải thích chi tiết bên dưới để nhớ sâu các mẹo phát âm nhé!"
                    : "📖 Đừng nản lòng! Hãy đọc kỹ phần giải thích chi tiết bên dưới và làm lại để thành thạo quy tắc nhé!"}
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleRestart}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm lại từ đầu</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter review buttons */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <span>Chi tiết đáp án & Giải thích</span>
                <span className="text-xs font-medium text-slate-500">
                  (20 câu)
                </span>
              </h3>

              <div className="inline-flex p-1 bg-slate-200/70 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    reviewFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả (20)
                </button>
                <button
                  onClick={() => setReviewFilter('correct')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    reviewFilter === 'correct'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đúng ({correctCount})
                </button>
                <button
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    reviewFilter === 'wrong'
                      ? 'bg-white text-rose-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sai ({20 - correctCount})
                </button>
              </div>
            </div>

            {/* List of 20 questions with green check / red X and correct answer */}
            <div className="space-y-4">
              {QUESTIONS.filter((q) => {
                const isCorrect = answers[q.cau] === q.dapAn;
                if (reviewFilter === 'correct') return isCorrect;
                if (reviewFilter === 'wrong') return !isCorrect;
                return true;
              }).map((q) => {
                const userChoice = answers[q.cau];
                const isCorrect = userChoice === q.dapAn;

                return (
                  <div
                    key={q.cau}
                    className={`bg-white rounded-2xl p-5 border transition-all ${
                      isCorrect
                        ? 'border-emerald-200 shadow-xs'
                        : 'border-rose-200 shadow-xs'
                    }`}
                  >
                    {/* Status header */}
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <span>Câu {q.cau}: Đúng (+0.5đ)</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-rose-700 font-bold text-sm">
                            <XCircle className="w-5 h-5 text-rose-600" />
                            <span>Câu {q.cau}: Sai</span>
                          </div>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-slate-500">
                        Đáp án đúng: <span className="text-emerald-700 font-bold text-sm">{q.dapAn}</span>
                      </div>
                    </div>

                    {/* Question text */}
                    <p className="font-semibold text-slate-900 text-sm sm:text-base mb-4">
                      {q.hoi}
                    </p>

                    {/* Options Breakdown with pronunciation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                        const isCorrectOption = q.dapAn === optKey;
                        const isUserChoice = userChoice === optKey;

                        let optStyles = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (isCorrectOption) {
                          optStyles = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold ring-1 ring-emerald-400/50';
                        } else if (isUserChoice && !isCorrect) {
                          optStyles = 'bg-rose-50 border-rose-300 text-rose-950 font-medium ring-1 ring-rose-400/50';
                        }

                        return (
                          <div
                            key={optKey}
                            className={`p-3 rounded-xl border text-xs sm:text-sm flex flex-col gap-1 ${optStyles}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold flex items-center gap-1.5">
                                <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                                  isCorrectOption ? 'bg-emerald-600 text-white' : isUserChoice ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                                }`}>
                                  {optKey}
                                </span>
                                {q[optKey]}
                              </span>

                              {isCorrectOption && (
                                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <Check className="w-3 h-3 stroke-[3]" /> Đáp án đúng
                                </span>
                              )}
                              {!isCorrectOption && isUserChoice && (
                                <span className="text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  Em chọn
                                </span>
                              )}
                            </div>

                            {/* IPA pronunciation */}
                            <div className="text-[11px] text-slate-500 font-mono pl-6">
                              {q.ipa[optKey]}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed explanation */}
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950 leading-relaxed flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-900">Giải thích: </strong>
                        {q.giaiThich}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Restart Button for quick access */}
            <div className="pt-4 text-center">
              <button
                onClick={handleRestart}
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-indigo-200 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Làm lại từ đầu</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70 backdrop-blur-sm py-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Tuần 4 — Quy tắc phát âm đuôi -s/-es và -ed (Luyện thi vào 10)</span>
          <span className="text-slate-400">Thiết kế thân thiện cho học sinh THCS</span>
        </div>
      </footer>
    </div>
  );
}
