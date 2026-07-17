import React, { useState, useEffect } from 'react';
import { 
  Play, ThumbsUp, Heart, Share2, Plus, Trash2, CheckCircle, AlertCircle, 
  Check, X, ArrowRight, ArrowLeft, Send, Lock, ChevronRight
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import { 
  ADMIN_ACCOUNT,
  INITIAL_USER_ACCOUNTS,
  INITIAL_QUIZZES, 
  MOCK_LEADERBOARD, 
  ALL_BADGES, 
  MOCK_COMMENTS, 
  MOCK_ADMIN_STATS 
} from './data/mockData';

const STORAGE_KEYS = {
  quizzes: 'mat-ma-su-viet:quizzes',
  leaderboard: 'mat-ma-su-viet:leaderboard',
  badges: 'mat-ma-su-viet:badges',
  comments: 'mat-ma-su-viet:comments',
  adminStats: 'mat-ma-su-viet:admin-stats',
  userAccounts: 'mat-ma-su-viet:user-accounts',
  session: 'mat-ma-su-viet:session'
};

const loadStoredValue = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const saveStoredValue = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in some browser privacy modes.
  }
};

const rankLeaderboard = (rows) =>
  [...rows]
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, 'vi'))
    .map((row, index) => ({ ...row, rank: index + 1 }));

const mergeInitialQuizzes = (storedQuizzes) => {
  if (!Array.isArray(storedQuizzes)) return INITIAL_QUIZZES;

  const initialIds = new Set(INITIAL_QUIZZES.map((quiz) => quiz.id));
  const customQuizzes = storedQuizzes.filter((quiz) => !initialIds.has(quiz.id));

  return [...INITIAL_QUIZZES, ...customQuizzes];
};

export default function App() {
  // Navigation & Workspace Mode States
  const [currentScreen, setCurrentScreen] = useState('home'); // home, explore, quiz-detail, play-quiz, decrypt, quiz-result, leaderboard, profile, admin, create-quiz
  const [searchQuery, setSearchQuery] = useState('');
  
  // Database States
  const [quizzes, setQuizzes] = useState(() => mergeInitialQuizzes(loadStoredValue(STORAGE_KEYS.quizzes, INITIAL_QUIZZES)));
  const [leaderboard, setLeaderboard] = useState(() => loadStoredValue(STORAGE_KEYS.leaderboard, MOCK_LEADERBOARD));
  const [badges, setBadges] = useState(() => loadStoredValue(STORAGE_KEYS.badges, ALL_BADGES));
  const [comments, setComments] = useState(() => loadStoredValue(STORAGE_KEYS.comments, MOCK_COMMENTS));
  const [adminStats, setAdminStats] = useState(() => loadStoredValue(STORAGE_KEYS.adminStats, MOCK_ADMIN_STATS));
  const [userAccounts, setUserAccounts] = useState(() => loadStoredValue(STORAGE_KEYS.userAccounts, INITIAL_USER_ACCOUNTS));
  
  // User Session State
  const [userSession, setUserSession] = useState(() => loadStoredValue(STORAGE_KEYS.session, null));
  const isAdmin = userSession?.role === 'admin';

  // Modal Auth States
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [adminSection, setAdminSection] = useState('overview');
  const [profileSection, setProfileSection] = useState('badges');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', username: '', password: '', confirmPassword: '', agree: false });

  // Quiz Gameplay States
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // null, index
  const [isAnswered, setIsAnswered] = useState(false);
  const [collectedKeywords, setCollectedKeywords] = useState([]); // list of strings
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  
  // Decryption States
  const [decryptionSlots, setDecryptionSlots] = useState([]); // arranged keywords
  const [decryptionBank, setDecryptionBank] = useState([]); // words left to pick
  const [decryptionStatus, setDecryptionStatus] = useState('idle'); // idle, correct, incorrect
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Comment Section state
  const [newCommentRating, setNewCommentRating] = useState(5);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentFilter, setCommentFilter] = useState('newest');

  // Admin Create Quiz Form States
  const [newQuizMetadata, setNewQuizMetadata] = useState({
    title: '', description: '', longDescription: '', category: 'Kháng chiến chống Pháp',
    period: 'Thời kỳ Tự chủ (938 - 1945)', difficulty: 'Trung bình', image: '',
    decryptionMessage: '', decryptionExplanation: '', author: 'Quản trị viên'
  });
  const [newQuizQuestions, setNewQuizQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '', keyword: '', points: 100 }
  ]);

  // Alert State
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (msg, type = "success") => {
    setAlertMessage({ text: msg, type });
    setTimeout(() => setAlertMessage(null), 3000);
  };

  useEffect(() => saveStoredValue(STORAGE_KEYS.quizzes, quizzes), [quizzes]);
  useEffect(() => saveStoredValue(STORAGE_KEYS.leaderboard, leaderboard), [leaderboard]);
  useEffect(() => saveStoredValue(STORAGE_KEYS.badges, badges), [badges]);
  useEffect(() => saveStoredValue(STORAGE_KEYS.comments, comments), [comments]);
  useEffect(() => saveStoredValue(STORAGE_KEYS.adminStats, adminStats), [adminStats]);
  useEffect(() => saveStoredValue(STORAGE_KEYS.userAccounts, userAccounts), [userAccounts]);
  useEffect(() => {
    setAdminStats(prev => (
      prev.totalQuizzes === quizzes.length
        ? prev
        : { ...prev, totalQuizzes: quizzes.length }
    ));
  }, [quizzes.length]);
  useEffect(() => {
    if (userSession) {
      saveStoredValue(STORAGE_KEYS.session, userSession);
    } else {
      localStorage.removeItem(STORAGE_KEYS.session);
    }
  }, [userSession]);

  useEffect(() => {
    if ((currentScreen === 'admin' || currentScreen === 'create-quiz') && !isAdmin) {
      setCurrentScreen('home');
      setLoginModalOpen(true);
      showAlert("Chỉ tài khoản role admin mới được vào trang quản trị.", "error");
    }
  }, [currentScreen, isAdmin]);

  const createUserSession = ({ name, username, email }) => ({
    role: 'user',
    name,
    username,
    email,
    avatar: '🎓',
    level: 1,
    xp: 0,
    totalXp: 0,
    score: 0,
    completedCount: 0,
    badgeCount: 0,
    maxStreak: 0,
    history: []
  });

  const syncUserProgress = (updatedSession) => {
    setUserSession(updatedSession);
    setUserAccounts(prev => prev.map(account => (
      account.username === updatedSession.username
        ? { ...account, session: updatedSession }
        : account
    )));
    setLeaderboard(prev => {
      const withoutCurrentUser = prev.filter(row => row.username !== updatedSession.username);
      return rankLeaderboard([
        ...withoutCurrentUser,
        {
          username: updatedSession.username,
          name: updatedSession.name,
          score: updatedSession.score,
          completedCount: updatedSession.completedCount,
          badgeCount: updatedSession.badgeCount,
          maxStreak: updatedSession.maxStreak,
          avatar: updatedSession.avatar
        }
      ]);
    });
  };

  // Timer runner
  useEffect(() => {
    if (currentScreen === 'play-quiz' && !isAnswered) {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentScreen, isAnswered]);

  useEffect(() => {
    if (!showConfetti) return;

    const timeout = setTimeout(() => setShowConfetti(false), 4500);
    return () => clearTimeout(timeout);
  }, [showConfetti]);

  // Format timer helper
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      showAlert("Vui lòng điền đầy đủ email và mật khẩu!", "error");
      return;
    }

    const accountId = loginForm.email.trim().toLowerCase();
    const isAdminLogin =
      (accountId === ADMIN_ACCOUNT.email.toLowerCase() || accountId === ADMIN_ACCOUNT.username.toLowerCase()) &&
      loginForm.password === ADMIN_ACCOUNT.password;

    if (isAdminLogin) {
      setUserSession(ADMIN_ACCOUNT.session);
      setLoginModalOpen(false);
      setLoginForm({ email: '', password: '', remember: false });
      showAlert("Đăng nhập admin thành công!");
      return;
    }

    const matchedUser = userAccounts.find(account => {
      const email = account.email.toLowerCase();
      const username = account.username.toLowerCase();
      return (accountId === email || accountId === username) && loginForm.password === account.password;
    });

    if (!matchedUser) {
      showAlert("Sai tài khoản hoặc mật khẩu.", "error");
      return;
    }

    setUserSession(matchedUser.session);
    setLoginModalOpen(false);
    setLoginForm({ email: '', password: '', remember: false });
    showAlert("Đăng nhập người dùng thành công!");
  };

  // Handle Register submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.username || !registerForm.password) {
      showAlert("Vui lòng nhập đầy đủ thông tin đăng ký!", "error");
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      showAlert("Mật khẩu xác nhận không khớp!", "error");
      return;
    }
    if (!registerForm.agree) {
      showAlert("Vui lòng đồng ý điều khoản dịch vụ.", "error");
      return;
    }

    const email = registerForm.email.trim().toLowerCase();
    const username = registerForm.username.trim().toLowerCase();
    const adminEmail = ADMIN_ACCOUNT.email.toLowerCase();
    const adminUsername = ADMIN_ACCOUNT.username.toLowerCase();
    const isTaken =
      email === adminEmail ||
      username === adminUsername ||
      userAccounts.some(account => account.email.toLowerCase() === email || account.username.toLowerCase() === username);

    if (isTaken) {
      showAlert("Email hoặc tên đăng nhập đã tồn tại.", "error");
      return;
    }

    const session = createUserSession({
      name: registerForm.name.trim(),
      username,
      email
    });
    const newAccount = {
      role: 'user',
      email,
      username,
      password: registerForm.password,
      session
    };

    setUserAccounts(prev => [...prev, newAccount]);
    setLeaderboard(prev => rankLeaderboard([
      ...prev,
      {
        username: session.username,
        name: session.name,
        score: 0,
        completedCount: 0,
        badgeCount: 0,
        maxStreak: 0,
        avatar: session.avatar
      }
    ]));
    setUserSession(session);
    setRegisterForm({ name: '', email: '', username: '', password: '', confirmPassword: '', agree: false });
    setRegisterModalOpen(false);
    showAlert("Tạo tài khoản người dùng thành công!");
  };

  // Start Playing a Quiz
  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setElapsedTime(0);
    setCorrectAnswersCount(0);
    setHintsRemaining(3);
    
    // Initialize collected keywords as locked placeholders
    const keywords = quiz.questions.map(q => ({
      word: q.keyword,
      unlocked: false
    }));
    setCollectedKeywords(keywords);
    setCurrentScreen('play-quiz');
  };

  // Submit Answer
  const handleAnswerSubmit = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const question = activeQuiz.questions[currentQuestionIndex];
    const isCorrect = optionIndex === question.correctIndex;
    
    if (isCorrect) {
      setScore(prev => prev + question.points);
      setCorrectAnswersCount(prev => prev + 1);
      
      // Unlock keyword
      setCollectedKeywords(prev => {
        const updated = [...prev];
        updated[currentQuestionIndex] = { word: question.keyword, unlocked: true };
        return updated;
      });
      showAlert("Chính xác! Bạn được cộng " + question.points + " điểm.");
    } else {
      showAlert("Chưa chính xác!", "error");
    }
  };

  // Move to Next Question or Decrypt
  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Setup Decryption Game
      // Extract unique words from the decryption message
      const textMessage = activeQuiz.decryptionMessage;
      // To simulate dragging, let's split the keywords
      const words = textMessage.split(' ');
      // Shuffle bank
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      
      setDecryptionBank(shuffled);
      setDecryptionSlots([]);
      setDecryptionStatus('idle');
      setCurrentScreen('decrypt');
    }
  };

  // Use a hint to unlock a missed keyword
  const useHint = () => {
    if (hintsRemaining <= 0) {
      showAlert("Bạn đã dùng hết gợi ý!", "error");
      return;
    }
    
    // Find first locked keyword
    const lockedIndex = collectedKeywords.findIndex(kw => !kw.unlocked);
    if (lockedIndex === -1) {
      showAlert("Tất cả từ khóa đều đã được mở khóa!");
      return;
    }

    setCollectedKeywords(prev => {
      const updated = [...prev];
      updated[lockedIndex] = { ...updated[lockedIndex], unlocked: true };
      return updated;
    });

    setHintsRemaining(prev => prev - 1);
    showAlert("Đã dùng 1 gợi ý để mở khóa từ khóa: " + collectedKeywords[lockedIndex].word);
  };

  // Drag-and-drop keyword actions (represented via clicking to append/remove)
  const pickWord = (word, index) => {
    setDecryptionSlots(prev => [...prev, word]);
    setDecryptionBank(prev => prev.filter((_, idx) => idx !== index));
  };

  const removeWord = (word, index) => {
    setDecryptionBank(prev => [...prev, word]);
    setDecryptionSlots(prev => prev.filter((_, idx) => idx !== index));
  };

  const clearDecryption = () => {
    const textMessage = activeQuiz.decryptionMessage;
    const words = textMessage.split(' ');
    setDecryptionBank(words.sort(() => Math.random() - 0.5));
    setDecryptionSlots([]);
    setDecryptionStatus('idle');
  };

  // Verify Decrypted Message
  const verifyDecryption = () => {
    if (decryptionStatus === 'correct') return;

    const userPhrase = decryptionSlots.join(' ');
    const correctPhrase = activeQuiz.decryptionMessage;

    if (userPhrase === correctPhrase) {
      setDecryptionStatus('correct');
      setShowConfetti(true);
      const finalScore = score + 500;
      setScore(finalScore);
      
      if (userSession?.role === 'user') {
        const totalXp = (userSession.totalXp || 0) + finalScore;
        const updatedHistory = [
          {
            id: activeQuiz.id,
            title: activeQuiz.title,
            score: finalScore,
            date: new Date().toLocaleDateString('vi-VN'),
            correctCount: correctAnswersCount,
            total: activeQuiz.questions.length
          },
          ...(userSession.history || [])
        ];
        const updatedSession = {
          ...userSession,
          totalXp,
          xp: totalXp % 1000,
          level: Math.floor(totalXp / 1000) + 1,
          score: (userSession.score || 0) + finalScore,
          completedCount: (userSession.completedCount || 0) + 1,
          badgeCount: Math.max(userSession.badgeCount || 0, 1),
          maxStreak: Math.max(userSession.maxStreak || 0, correctAnswersCount),
          history: updatedHistory
        };
        syncUserProgress(updatedSession);
      }

      setAdminStats(prev => ({ ...prev, totalPlays: prev.totalPlays + 1 }));
      
      // Unlock related badges
      const targetBadgeId = activeQuiz.id === 'dien-bien-phu' ? 'ebp-master' : 'feudal-master';
      setBadges(prev => prev.map(badge => {
        if (badge.id === targetBadgeId || badge.id === 'newbie') {
          return { ...badge, unlocked: true, progress: 100 };
        }
        return badge;
      }));

      showAlert("Giải mã thành công! Bạn nhận được +500 điểm thưởng.");
    } else {
      setDecryptionStatus('incorrect');
      showAlert("Giải mật mã chưa chính xác. Vui lòng sắp xếp lại!", "error");
    }
  };

  // Submit Comments
  const submitComment = (e) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return;
    if (!userSession) {
      setLoginModalOpen(true);
      showAlert("Vui lòng đăng nhập để gửi bình luận.", "error");
      return;
    }

    const newCommentObj = {
      id: comments.length + 1,
      quizId: activeQuiz ? activeQuiz.id : 'dien-bien-phu',
      user: userSession.name,
      avatar: userSession.avatar,
      rating: newCommentRating,
      time: 'Vừa xong',
      content: newCommentContent,
      likes: 0,
      replies: []
    };

    setComments(prev => [newCommentObj, ...prev]);
    setAdminStats(prev => ({
      ...prev,
      totalComments: prev.totalComments + 1,
      recentComments: [
        {
          id: newCommentObj.id,
          user: newCommentObj.user,
          quizTitle: activeQuiz ? activeQuiz.title : 'Quiz lịch sử',
          content: newCommentObj.content,
          time: newCommentObj.time
        },
        ...prev.recentComments
      ].slice(0, 5)
    }));
    setNewCommentContent('');
    showAlert("Cảm ơn bạn đã gửi đánh giá!");
  };

  const handleLikeComment = (commentId) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return { ...c, likes: c.likes + 1 };
      }
      return c;
    }));
  };

  const handleDeleteUser = (username) => {
    const account = userAccounts.find(item => item.username === username);
    setUserAccounts(prev => prev.filter(account => account.username !== username));
    setLeaderboard(prev => rankLeaderboard(prev.filter(row => row.username !== username)));
    if (account) {
      setComments(prev => prev.filter(comment => comment.user !== account.session.name));
    }
    showAlert("Đã xóa tài khoản người dùng.");
  };

  const handleDeleteComment = (commentId) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    setAdminStats(prev => ({
      ...prev,
      totalComments: Math.max(0, prev.totalComments - 1),
      recentComments: prev.recentComments.filter(comment => comment.id !== commentId)
    }));
    showAlert("Đã xóa bình luận.");
  };

  // Admin - Add Question to builder
  const addQuestionToBuilder = () => {
    setNewQuizQuestions(prev => [
      ...prev,
      { question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '', keyword: '', points: 100 }
    ]);
  };

  const removeQuestionFromBuilder = (index) => {
    if (newQuizQuestions.length === 1) return;
    setNewQuizQuestions(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    setNewQuizQuestions(prev => prev.map((q, idx) => {
      if (idx === index) {
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  const handleQuestionOptionChange = (qIndex, oIndex, val) => {
    setNewQuizQuestions(prev => prev.map((q, idx) => {
      if (idx === qIndex) {
        const newOpts = [...q.options];
        newOpts[oIndex] = val;
        return { ...q, options: newOpts };
      }
      return q;
    }));
  };

  // Submit new Quiz (Admin)
  const handlePublishQuiz = (e) => {
    e.preventDefault();
    if (!newQuizMetadata.title || !newQuizMetadata.description || !newQuizMetadata.decryptionMessage) {
      showAlert("Vui lòng điền đầy đủ tiêu đề, mô tả và câu mật mã!", "error");
      return;
    }

    const newQuizId = newQuizMetadata.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    if (quizzes.some(quiz => quiz.id === newQuizId)) {
      showAlert("Tiêu đề này đã tồn tại. Vui lòng đổi tên bộ Quiz.", "error");
      return;
    }
    const hasInvalidQuestion = newQuizQuestions.some(q => (
      !q.question.trim() ||
      !q.explanation.trim() ||
      !q.keyword.trim() ||
      q.options.some(option => !option.trim())
    ));
    if (hasInvalidQuestion) {
      showAlert("Vui lòng nhập đầy đủ nội dung, đáp án, từ khóa và giải thích cho từng câu hỏi.", "error");
      return;
    }

    const newQuizObj = {
      id: newQuizId,
      ...newQuizMetadata,
      questionCount: newQuizQuestions.length,
      playCount: 0,
      rating: 5.0,
      image: newQuizMetadata.image || "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
      questions: newQuizQuestions,
      learningPoints: [
        "Hiểu thêm về bối cảnh lịch sử của chủ đề: " + newQuizMetadata.title,
        "Đúc kết kiến thức thông qua " + newQuizQuestions.length + " câu đố trắc nghiệm.",
        "Mở khóa mật mã từ khóa: " + newQuizMetadata.decryptionMessage
      ],
      rules: [
        "Quiz gồm " + newQuizQuestions.length + " câu hỏi trắc nghiệm.",
        "Trả lời đúng nhận điểm tương ứng và thu thập chữ cái giải mật mã."
      ],
      badges: []
    };

    setQuizzes(prev => [...prev, newQuizObj]);
    setAdminStats(prev => ({ ...prev, totalQuizzes: prev.totalQuizzes + 1 }));
    showAlert("Bộ Quiz '" + newQuizMetadata.title + "' đã được tạo thành công!");
    
    // Reset admin form
    setNewQuizMetadata({
      title: '', description: '', longDescription: '', category: 'Kháng chiến chống Pháp',
      period: 'Thời kỳ Tự chủ (938 - 1945)', difficulty: 'Trung bình', image: '',
      decryptionMessage: '', decryptionExplanation: '', author: 'Quản trị viên'
    });
    setNewQuizQuestions([
      { question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '', keyword: '', points: 100 }
    ]);
    
    setCurrentScreen('explore');
  };

  // Filter quizzes based on category selection or search
  const filteredQuizzes = quizzes.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Main Alert Notification */}
      {alertMessage && (
        <div style={{
          position: 'fixed',
          top: '90px',
          right: '24px',
          backgroundColor: alertMessage.type === 'success' ? 'var(--accent-moss)' : 'var(--primary-red)',
          color: 'var(--text-light)',
          padding: '16px 24px',
          borderRadius: 'var(--border-radius-sm)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1001,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideUp 0.3s ease'
        }}>
          {alertMessage.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {alertMessage.text}
        </div>
      )}

      {/* Header Component */}
      <Header 
        currentScreen={currentScreen} 
        setCurrentScreen={setCurrentScreen} 
        userSession={userSession} 
        setUserSession={setUserSession}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openLoginModal={() => setLoginModalOpen(true)}
        openRegisterModal={() => setRegisterModalOpen(true)}
      />

      {/* SCREEN CONTENT */}
      <main style={{ flexGrow: 1, padding: '40px 0' }}>
            
            {/* 1. MÀN HÌNH TRANG CHỦ */}
            {currentScreen === 'home' && (
              <div className="animate-fade-in">
                {/* Hero Banner */}
                <section className="hero-section bronze-drum-bg">
                  <div className="container hero-grid">
                    <div>
                      <div className="hero-badge">Hành trình giải mã quá khứ</div>
                      <h1 className="hero-title">Khám phá lịch sử qua những <span>mật mã thú vị</span></h1>
                      <p className="hero-description">
                        Trả lời câu hỏi trắc nghiệm, thu thập các từ khóa bí mật và sắp xếp chúng để giải mã những thông điệp hào hùng, ý nghĩa của dân tộc Việt Nam.
                      </p>
                      <div className="hero-cta">
                        <button 
                          onClick={() => {
                            const mainQuiz = quizzes.find(q => q.id === 'dien-bien-phu') || quizzes[0];
                            startQuiz(mainQuiz);
                          }} 
                          className="btn btn-primary"
                        >
                          Chơi ngay <ArrowRight size={16} />
                        </button>
                        <button onClick={() => setCurrentScreen('explore')} className="btn btn-outline">
                          Khám phá các chủ đề
                        </button>
                      </div>
                    </div>
                    <div className="hero-image-container">
                      <div className="hero-backdrop"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80" 
                        alt="Trống đồng & Sách cổ" 
                        className="hero-img animate-float"
                      />
                    </div>
                  </div>
                </section>

                {/* Quick stats counter */}
                <div className="quick-stats">
                  <div className="container quick-stats-grid">
                    <div className="stat-item">
                      <div className="stat-icon">📜</div>
                      <div>
                        <div className="stat-val">1,200+</div>
                        <div className="stat-label">Câu hỏi sử Việt</div>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">🔥</div>
                      <div>
                        <div className="stat-val">45K+</div>
                        <div className="stat-label">Học sinh tham gia</div>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">🏆</div>
                      <div>
                        <div className="stat-val">150+</div>
                        <div className="stat-label">Bộ Quiz độc đáo</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quizzes nổi bật */}
                <section style={{ padding: '60px 0' }}>
                  <div className="container">
                    <div className="section-title-wrapper">
                      <span className="section-subtitle">Chủ đề đặc sắc</span>
                      <h2 className="section-title">Quiz Nổi Bật</h2>
                    </div>

                    <div className="quiz-grid">
                      {quizzes.map((quiz) => (
                        <div key={quiz.id} className="quiz-card">
                          <div className="quiz-card-image" style={{ backgroundImage: `url(${quiz.image})` }}>
                            <div className="quiz-card-overlay">
                              <span className="quiz-card-tag">{quiz.category}</span>
                              <h3 className="quiz-card-title" style={{ color: 'var(--text-light)', margin: 0 }}>{quiz.title}</h3>
                            </div>
                            <span className={`quiz-card-difficulty ${quiz.difficulty.toLowerCase()}`}>
                              {quiz.difficulty}
                            </span>
                          </div>
                          <div className="quiz-card-body">
                            <p className="quiz-card-desc">{quiz.description}</p>
                            <div className="quiz-card-meta">
                              <div className="quiz-card-stats">
                                <span>❓ {quiz.questionCount} câu hỏi</span>
                                <span>👤 {quiz.playCount} lượt chơi</span>
                              </div>
                              <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>★ {quiz.rating}</span>
                            </div>
                          </div>
                          <div className="quiz-card-footer">
                            <button onClick={() => { setActiveQuiz(quiz); setCurrentScreen('quiz-detail'); }} className="btn btn-outline" style={{ flexGrow: 1, padding: '10px' }}>
                              Chi tiết
                            </button>
                            <button onClick={() => startQuiz(quiz)} className="btn btn-primary" style={{ padding: '10px 16px' }}>
                              <Play size={14} /> Chơi ngay
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Hướng dẫn chơi 3 bước */}
                <section className="container">
                  <div className="guide-section">
                    <div className="section-title-wrapper">
                      <span className="section-subtitle">Bắt đầu học vui</span>
                      <h2 className="section-title">Cách Chơi Thế Nào?</h2>
                    </div>
                    <div className="guide-grid">
                      <div className="guide-item">
                        <div className="guide-step">1</div>
                        <h3 style={{ margin: '15px 0 10px' }}>Trả lời Quiz</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Vượt qua các câu hỏi trắc nghiệm hấp dẫn để ôn lại kiến thức và tích luỹ điểm số kinh nghiệm.
                        </p>
                      </div>
                      <div className="guide-item">
                        <div className="guide-step">2</div>
                        <h3 style={{ margin: '15px 0 10px' }}>Thu thập từ khóa</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Mỗi câu trả lời đúng sẽ mở khóa một từ khóa lịch sử ẩn giấu trong mật mã.
                        </p>
                      </div>
                      <div className="guide-item">
                        <div className="guide-step">3</div>
                        <h3 style={{ margin: '15px 0 10px' }}>Giải mã thông điệp</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Sắp xếp các mảnh ghép từ khóa để hoàn chỉnh câu danh ngôn, thành ngữ hoặc mốc lịch sử vĩ đại.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Danh mục chủ đề lịch sử */}
                <section style={{ padding: '40px 0' }}>
                  <div className="container">
                    <div className="section-title-wrapper">
                      <span className="section-subtitle">Khám phá theo thời kỳ</span>
                      <h2 className="section-title">Danh mục Chủ đề</h2>
                    </div>
                    <div className="category-grid">
                      <div className="category-card" onClick={() => { setSearchQuery('Cổ đại'); setCurrentScreen('explore'); }}>
                        <div className="category-icon">🏺</div>
                        <h3>Lịch sử Cổ đại</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Từ thời các Vua Hùng dựng nước đến thời kỳ sơ khởi.</p>
                      </div>
                      <div className="category-card" onClick={() => { setSearchQuery('Triều đại phong kiến'); setCurrentScreen('explore'); }}>
                        <div className="category-icon">👑</div>
                        <h3>Các triều đại phong kiến</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Các cuộc cải cách hưng vong dưới triều Lý, Trần, Lê, Nguyễn.</p>
                      </div>
                      <div className="category-card" onClick={() => { setSearchQuery('Kháng chiến'); setCurrentScreen('explore'); }}>
                        <div className="category-icon">🛡️</div>
                        <h3>Kháng chiến cứu quốc</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Kháng chiến chống thực dân Pháp, chống Mỹ anh dũng.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Bảng xếp hạng thu gọn */}
                <section style={{ padding: '40px 0', backgroundColor: 'var(--bg-cream)' }}>
                  <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Học giả xuất sắc nhất</h2>
                      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                        Bảng xếp hạng cập nhật liên tục những học sinh, sinh viên đạt điểm số tích lũy cao nhất khi giải mã các bộ mật mã lịch sử Việt Nam.
                      </p>
                      <button onClick={() => setCurrentScreen('leaderboard')} className="btn btn-primary">
                        Xem toàn bộ bảng xếp hạng
                      </button>
                    </div>
                    <div style={{ backgroundColor: 'var(--bg-white)', padding: '24px', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-md)' }}>
                      <h3 style={{ borderBottom: '2px solid var(--bg-cream-dark)', paddingBottom: '12px', marginBottom: '16px' }}>🏆 Top 5 Tuần này</h3>
                      {leaderboard.slice(0, 5).map((user, idx) => (
                        <div key={user.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx < 4 ? '1px solid #f3f4f6' : 'none' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontWeight: 800, color: idx === 0 ? 'var(--accent-gold)' : 'var(--text-muted)', width: '20px' }}>{idx + 1}</span>
                            <span>{user.avatar}</span>
                            <span style={{ fontWeight: 600 }}>{user.name}</span>
                          </div>
                          <span style={{ fontWeight: 'bold', color: 'var(--primary-red)' }}>{user.score} XP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* 4. MÀN HÌNH DANH SÁCH QUIZ */}
            {currentScreen === 'explore' && (
              <div className="container animate-fade-in">
                <div className="section-title-wrapper" style={{ textAlign: 'left', marginBottom: '30px' }}>
                  <span className="section-subtitle">Danh mục tất cả câu đố</span>
                  <h2 className="section-title">Khám phá Lịch sử Việt Nam</h2>
                </div>

                <div className="explore-layout">
                  {/* Sidebar Filters */}
                  <aside className="filter-sidebar">
                    <div className="filter-group">
                      <h4 className="filter-title">📍 Giai đoạn</h4>
                      <div className="filter-options">
                        <label className="checkbox-label"><input type="checkbox" className="checkbox-input" defaultChecked /> Tất cả giai đoạn</label>
                        <label className="checkbox-label"><input type="checkbox" className="checkbox-input" /> Hùng Vương dựng nước</label>
                        <label className="checkbox-label"><input type="checkbox" className="checkbox-input" /> Triều đại Tự chủ</label>
                        <label className="checkbox-label"><input type="checkbox" className="checkbox-input" /> Kháng chiến chống Pháp</label>
                        <label className="checkbox-label"><input type="checkbox" className="checkbox-input" /> Kháng chiến chống Mỹ</label>
                      </div>
                    </div>
                    <div className="filter-group">
                      <h4 className="filter-title">⚡ Độ khó</h4>
                      <div className="filter-options">
                        <label className="checkbox-label"><input type="checkbox" className="checkbox-input" defaultChecked /> Tất cả độ khó</label>
                        <label className="checkbox-label"><input type="checkbox" className="checkbox-input" /> Dễ (Dưới 5 câu)</label>
                        <label className="checkbox-label"><input type="checkbox" className="checkbox-input" /> Trung bình</label>
                        <label className="checkbox-label"><input type="checkbox" className="checkbox-input" /> Khó (10+ câu)</label>
                      </div>
                    </div>
                    <div className="filter-group">
                      <h4 className="filter-title">🌟 Sắp xếp</h4>
                      <div className="filter-options">
                        <label className="checkbox-label"><input type="radio" name="sort" className="checkbox-input" defaultChecked /> Lượt chơi nhiều nhất</label>
                        <label className="checkbox-label"><input type="radio" name="sort" className="checkbox-input" /> Điểm đánh giá cao nhất</label>
                        <label className="checkbox-label"><input type="radio" name="sort" className="checkbox-input" /> Bộ Quiz mới nhất</label>
                      </div>
                    </div>
                  </aside>

                  {/* Quiz Cards container */}
                  <div>
                    {filteredQuizzes.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'var(--bg-cream)', borderRadius: 'var(--border-radius-md)' }}>
                        <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Không tìm thấy bộ Quiz nào phù hợp với từ khóa.</p>
                        <button onClick={() => setSearchQuery('')} className="btn btn-outline" style={{ marginTop: '16px' }}>
                          Xóa bộ lọc tìm kiếm
                        </button>
                      </div>
                    ) : (
                      <div className="quiz-grid">
                        {filteredQuizzes.map((quiz) => (
                          <div key={quiz.id} className="quiz-card">
                            <div className="quiz-card-image" style={{ backgroundImage: `url(${quiz.image})` }}>
                              <div className="quiz-card-overlay">
                                <span className="quiz-card-tag">{quiz.category}</span>
                                <h3 className="quiz-card-title" style={{ color: 'var(--text-light)', margin: 0 }}>{quiz.title}</h3>
                              </div>
                              <span className={`quiz-card-difficulty ${quiz.difficulty.toLowerCase()}`}>
                                {quiz.difficulty}
                              </span>
                            </div>
                            <div className="quiz-card-body">
                              <p className="quiz-card-desc">{quiz.description}</p>
                              <div className="quiz-card-meta">
                                <div className="quiz-card-stats">
                                  <span>❓ {quiz.questionCount} câu hỏi</span>
                                  <span>👤 {quiz.playCount} lượt</span>
                                </div>
                                <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>★ {quiz.rating}</span>
                              </div>
                            </div>
                            <div className="quiz-card-footer">
                              <button onClick={() => { setActiveQuiz(quiz); setCurrentScreen('quiz-detail'); }} className="btn btn-outline" style={{ flexGrow: 1, padding: '10px' }}>
                                Xem Chi Tiết
                              </button>
                              <button onClick={() => startQuiz(quiz)} className="btn btn-primary" style={{ padding: '10px 16px' }}>
                                <Play size={14} /> Chơi ngay
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 5. MÀN HÌNH CHI TIẾT QUIZ */}
            {currentScreen === 'quiz-detail' && activeQuiz && (
              <div className="container animate-fade-in">
                {/* Back button */}
                <button onClick={() => setCurrentScreen('explore')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-red)', fontWeight: 'bold', marginBottom: '24px' }}>
                  <ArrowLeft size={16} /> Quay lại danh sách
                </button>

                {/* Banner Header */}
                <div className="detail-banner" style={{ backgroundImage: `url(${activeQuiz.image})` }}>
                  <div className="detail-banner-overlay">
                    <span className="quiz-card-tag" style={{ width: 'fit-content' }}>{activeQuiz.category}</span>
                    <h1 style={{ color: 'var(--text-light)', fontSize: '2.5rem', margin: '8px 0' }}>{activeQuiz.title}</h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', fontSize: '0.95rem' }}>{activeQuiz.description}</p>
                  </div>
                </div>

                <div className="detail-grid">
                  {/* Left Column: Info, learning targets */}
                  <div>
                    <div className="detail-section">
                      <h2 style={{ fontSize: '1.4rem', borderBottom: '2px solid var(--bg-cream-dark)', paddingBottom: '10px', marginBottom: '20px' }}>Giới thiệu bộ mật mã</h2>
                      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{activeQuiz.longDescription}</p>
                      
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>💡 Bạn sẽ học được gì?</h3>
                      <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {activeQuiz.learningPoints.map((pt, index) => (
                          <li key={index}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-section">
                      <h2 style={{ fontSize: '1.4rem', borderBottom: '2px solid var(--bg-cream-dark)', paddingBottom: '10px', marginBottom: '20px' }}>Quy tắc chơi và tính điểm</h2>
                      <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {activeQuiz.rules.map((rule, idx) => (
                          <li key={idx}>{rule}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 10. MÀN HÌNH ĐÁNH GIÁ VÀ BÌNH LUẬN */}
                    <div className="detail-section">
                      <h2 style={{ fontSize: '1.4rem', borderBottom: '2px solid var(--bg-cream-dark)', paddingBottom: '10px', marginBottom: '20px' }}>
                        Đánh giá từ người học ({comments.filter(c => c.quizId === activeQuiz.id).length})
                      </h2>
                      
                      {/* Submit comment form */}
                      <form onSubmit={submitComment} style={{ marginBottom: '30px', borderBottom: '1px solid #f3f4f6', paddingBottom: '24px' }}>
                        <h4 style={{ marginBottom: '10px' }}>Cảm nhận của bạn về bộ quiz này:</h4>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Chọn số sao:</span>
                          <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button 
                                key={star} 
                                type="button"
                                onClick={() => setNewCommentRating(star)} 
                                style={{ fontSize: '1.4rem', color: star <= newCommentRating ? 'var(--accent-gold)' : '#e5e7eb' }}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                          <textarea 
                            rows="3" 
                            className="form-input" 
                            style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', resize: 'vertical', width: '100%' }}
                            placeholder="Nhập ý kiến đóng góp hoặc cảm tưởng của bạn tại đây..."
                            value={newCommentContent}
                            onChange={(e) => setNewCommentContent(e.target.value)}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '12px' }}>
                          Gửi bình luận <Send size={14} />
                        </button>
                      </form>

                      {/* Comment filter */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: 600 }}>Tất cả bình luận</span>
                        <select 
                          className="search-input" 
                          style={{ maxWidth: '140px', border: '1px solid var(--bg-cream-dark)', padding: '4px', borderRadius: '4px' }}
                          value={commentFilter}
                          onChange={(e) => setCommentFilter(e.target.value)}
                        >
                          <option value="newest">Mới nhất</option>
                          <option value="likes">Yêu thích nhất</option>
                        </select>
                      </div>

                      {/* Comment list */}
                      <div className="comment-list">
                        {comments.filter(c => c.quizId === activeQuiz.id).map(comment => (
                          <div key={comment.id} className="comment-item">
                            <div className="comment-header">
                              <div className="comment-user-info">
                                <span className="user-avatar" style={{ width: '36px', height: '36px', fontSize: '1.1rem' }}>{comment.avatar}</span>
                                <div>
                                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{comment.user}</div>
                                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comment.time}</span>
                                </div>
                              </div>
                              <div className="rating-stars">
                                {Array.from({ length: comment.rating }).map((_, i) => <span key={i}>★</span>)}
                              </div>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', marginBottom: '12px' }}>{comment.content}</p>
                            <div style={{ display: 'flex', gap: '14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              <button onClick={() => handleLikeComment(comment.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }} onMouseOver={(e) => e.target.style.color = 'var(--primary-red)'}>
                                <ThumbsUp size={12} /> Hữu ích ({comment.likes})
                              </button>
                              <span>•</span>
                              <button style={{ color: 'var(--text-muted)' }}>Trả lời</button>
                            </div>
                            {comment.replies && comment.replies.map((rep, idx) => (
                              <div key={idx} style={{ backgroundColor: 'var(--bg-cream)', borderRadius: '6px', padding: '12px', marginTop: '12px', fontSize: '0.85rem' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--primary-red)' }}>{rep.user}</div>
                                <div>{rep.content}</div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Quick info & Action button */}
                  <div>
                    <div className="detail-section" style={{ border: '2px solid var(--accent-gold)', position: 'sticky', top: '100px' }}>
                      <div className="detail-info-list">
                        <div className="detail-info-card">
                          <span style={{ fontSize: '1.5rem' }}>⚡</span>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Độ khó</div>
                            <div style={{ fontWeight: 'bold' }}>{activeQuiz.difficulty}</div>
                          </div>
                        </div>
                        <div className="detail-info-card">
                          <span style={{ fontSize: '1.5rem' }}>❓</span>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Số câu hỏi</div>
                            <div style={{ fontWeight: 'bold' }}>{activeQuiz.questionCount} câu</div>
                          </div>
                        </div>
                        <div className="detail-info-card">
                          <span style={{ fontSize: '1.5rem' }}>⏱️</span>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Thời gian</div>
                            <div style={{ fontWeight: 'bold' }}>10-15 phút</div>
                          </div>
                        </div>
                        <div className="detail-info-card">
                          <span style={{ fontSize: '1.5rem' }}>👤</span>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lượt chơi</div>
                            <div style={{ fontWeight: 'bold' }}>{activeQuiz.playCount} lượt</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ borderTop: '1.5px solid var(--bg-cream-dark)', paddingTop: '20px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Tác giả biên soạn:</div>
                        <div style={{ fontWeight: 700, color: 'var(--primary-red)' }}>{activeQuiz.author}</div>
                      </div>

                      <button onClick={() => startQuiz(activeQuiz)} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1rem', marginBottom: '14px' }}>
                        <Play size={18} /> Bắt đầu chơi ngay
                      </button>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-outline" style={{ flexGrow: 1, padding: '10px' }}>
                          <Heart size={14} /> Yêu thích
                        </button>
                        <button className="btn btn-outline" style={{ flexGrow: 1, padding: '10px' }}>
                          <Share2 size={14} /> Chia sẻ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. MÀN HÌNH CHƠI QUIZ */}
            {currentScreen === 'play-quiz' && activeQuiz && (
              <div className="container animate-fade-in">
                <div className="play-layout">
                  {/* Left: main question panel */}
                  <div className="play-main">
                    
                    {/* Header stats */}
                    <div className="play-header">
                      <div>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Bộ Quiz: </span>
                        <strong style={{ color: 'var(--primary-red)' }}>{activeQuiz.title}</strong>
                      </div>
                      <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold' }}>
                        <span>⏱️ {formatTime(elapsedTime)}</span>
                        <span>⭐ Điểm: {score}</span>
                      </div>
                    </div>

                    {/* Progress tracking */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                      <span>Tiến trình câu hỏi:</span>
                      <span>Câu {currentQuestionIndex + 1}/{activeQuiz.questions.length}</span>
                    </div>
                    <div className="progress-track">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%` }}
                      ></div>
                    </div>

                    {/* Question Content */}
                    <div className="question-area">
                      <div className="question-text">
                        {currentQuestionIndex + 1}. {activeQuiz.questions[currentQuestionIndex].question}
                      </div>

                      {/* Question image placeholder simulation */}
                      <div style={{
                        height: '180px',
                        backgroundColor: 'var(--bg-cream)',
                        borderRadius: 'var(--border-radius-md)',
                        marginBottom: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)',
                        border: '1.5px dashed var(--bg-cream-dark)',
                        overflow: 'hidden'
                      }}>
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>📜</span>
                          <span style={{ fontSize: '0.85rem' }}>Hình ảnh tư liệu lịch sử liên quan đến câu hỏi</span>
                        </div>
                      </div>

                      {/* 4 Answers Grid */}
                      <div className="options-grid">
                        {activeQuiz.questions[currentQuestionIndex].options.map((option, idx) => {
                          const prefix = String.fromCharCode(65 + idx);
                          let optionClass = "";
                          if (isAnswered) {
                            if (idx === activeQuiz.questions[currentQuestionIndex].correctIndex) {
                              optionClass = "correct";
                            } else if (idx === selectedOption) {
                              optionClass = "incorrect";
                            }
                          }

                          return (
                            <button 
                              key={idx}
                              disabled={isAnswered}
                              onClick={() => handleAnswerSubmit(idx)}
                              className={`option-btn ${optionClass}`}
                            >
                              <span className="option-prefix">{prefix}</span>
                              <span>{option}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Help and skips */}
                      {!isAnswered && (
                        <div style={{ display: 'flex', gap: '14px', marginTop: '24px', justifyContent: 'flex-end' }}>
                          <button onClick={useHint} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                            🔑 Dùng gợi ý ({hintsRemaining})
                          </button>
                          <button onClick={() => setIsAnswered(true)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem', border: '1.5px dashed #6B5547' }}>
                            Bỏ qua câu này
                          </button>
                        </div>
                      )}

                      {/* 7. MÀN HÌNH KẾT QUẢ SAU MỖI CÂU HỎI (EXPLANATION INLINE) */}
                      {isAnswered && (
                        <div className="explanation-box">
                          <h4 className="explanation-title">
                            {selectedOption === activeQuiz.questions[currentQuestionIndex].correctIndex ? (
                              <span style={{ color: 'var(--accent-moss)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Check size={18} /> Chính xác! (+100 điểm)
                              </span>
                            ) : (
                              <span style={{ color: 'var(--primary-red)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <X size={18} /> Chưa chính xác
                              </span>
                            )}
                          </h4>
                          
                          {/* Received keyword display */}
                          <div style={{
                            margin: '14px 0',
                            padding: '10px 16px',
                            backgroundColor: 'rgba(255,253,249,0.7)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            border: '1px solid var(--bg-cream-dark)'
                          }}>
                            <span>Mật mã từ khóa mở khóa:</span>
                            <span style={{
                              fontWeight: 900,
                              color: selectedOption === activeQuiz.questions[currentQuestionIndex].correctIndex || collectedKeywords[currentQuestionIndex].unlocked ? 'var(--accent-moss)' : 'var(--text-muted)',
                              backgroundColor: selectedOption === activeQuiz.questions[currentQuestionIndex].correctIndex || collectedKeywords[currentQuestionIndex].unlocked ? 'rgba(46,79,58,0.1)' : '#e5e7eb',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              letterSpacing: '1px'
                            }}>
                              {selectedOption === activeQuiz.questions[currentQuestionIndex].correctIndex || collectedKeywords[currentQuestionIndex].unlocked 
                                ? activeQuiz.questions[currentQuestionIndex].keyword 
                                : '🔒 BỊ KHÓA'}
                            </span>
                            {!(selectedOption === activeQuiz.questions[currentQuestionIndex].correctIndex || collectedKeywords[currentQuestionIndex].unlocked) && (
                              <button onClick={useHint} style={{ fontSize: '0.8rem', color: 'var(--primary-red)', textDecoration: 'underline', fontWeight: 600 }}>
                                Sử dụng 1 gợi ý để mở khóa
                              </button>
                            )}
                          </div>

                          <div style={{ fontSize: '0.9rem', color: 'var(--text-dark)', marginBottom: '16px' }}>
                            <b>Bạn có biết?</b> <br/>
                            {activeQuiz.questions[currentQuestionIndex].explanation}
                          </div>

                          <button onClick={handleNextQuestion} className="btn btn-primary" style={{ float: 'right' }}>
                            Câu tiếp theo <ChevronRight size={16} />
                          </button>
                          <div style={{ clear: 'both' }}></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Collected Keyword Vault */}
                  <aside className="play-sidebar">
                    <h3 className="vault-title">🔑 Kho từ khóa ({collectedKeywords.filter(k => k.unlocked).length}/{collectedKeywords.length})</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      Các từ khóa sẽ được dùng để giải mã thành ngữ lịch sử cuối cùng.
                    </p>
                    <div className="vault-grid">
                      {collectedKeywords.map((kw, idx) => (
                        <div key={idx} className={`vault-key ${kw.unlocked ? 'unlocked' : ''}`}>
                          {kw.unlocked ? (
                            <>
                              <span className="vault-key-icon">🔑</span>
                              <span style={{ fontSize: '0.85rem' }}>{kw.word}</span>
                            </>
                          ) : (
                            <>
                              <Lock size={18} style={{ marginBottom: '6px', color: 'var(--text-muted)' }} />
                              <span style={{ fontSize: '0.7rem' }}>Câu {idx + 1}</span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            )}

            {/* 8. MÀN HÌNH GIẢI MÃ TỪ KHÓA */}
            {currentScreen === 'decrypt' && activeQuiz && (
              <div className="container animate-fade-in">
                <div className="decrypt-board">
                  <span style={{ fontSize: '3rem' }}>🔮</span>
                  <h1 style={{ marginTop: '10px', fontSize: '2rem' }}>Giải mã thông điệp lịch sử</h1>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '8px auto 30px' }}>
                    Sắp xếp các từ khóa đã thu thập được ở bên dưới vào các ô trống để ghép thành câu hoàn chỉnh và giải khóa mật mã sử học.
                  </p>

                  {/* Drag-drop target slots */}
                  <div className="slots-container">
                    {decryptionSlots.map((word, index) => (
                      <div 
                        key={index} 
                        className="word-card animate-slide-up"
                        onClick={() => removeWord(word, index)}
                      >
                        {word}
                      </div>
                    ))}
                    {Array.from({ length: Math.max(0, activeQuiz.decryptionMessage.split(' ').length - decryptionSlots.length) }).map((_, idx) => (
                      <div key={idx} className="empty-slot"></div>
                    ))}
                  </div>

                  {/* Keyword bank containing words to click */}
                  <h4 style={{ textAlign: 'left', marginBottom: '10px' }}>Các từ khóa thu thập được:</h4>
                  <div className="keyword-bank">
                    {decryptionBank.map((word, index) => (
                      <div 
                        key={index} 
                        className="word-card"
                        style={{ backgroundColor: 'var(--bg-light-brown)', borderColor: 'var(--bg-cream-dark)' }}
                        onClick={() => pickWord(word, index)}
                      >
                        {word}
                      </div>
                    ))}
                    {decryptionBank.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Đã chọn hết tất cả các từ khóa.</span>}
                  </div>

                  {/* Decryption status panel */}
                  {decryptionStatus === 'correct' && (
                    <div style={{
                      backgroundColor: 'var(--accent-moss-light)',
                      border: '2px solid var(--accent-moss)',
                      color: 'var(--accent-moss)',
                      padding: '24px',
                      borderRadius: 'var(--border-radius-md)',
                      marginBottom: '30px',
                      animation: 'slideUp 0.3s ease'
                    }}>
                      <h3 style={{ color: 'var(--accent-moss)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
                        🎉 GIẢI MÃ HOÀN TOÀN CHÍNH XÁC!
                      </h3>
                      <p style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '14px', letterSpacing: '1px' }}>
                        "{activeQuiz.decryptionMessage}"
                      </p>
                      <div style={{ fontSize: '0.9rem', textAlign: 'left', color: 'var(--text-dark)' }}>
                        <b>Ý nghĩa lịch sử:</b> <br/>
                        {activeQuiz.decryptionExplanation}
                      </div>
                    </div>
                  )}

                  {decryptionStatus === 'incorrect' && (
                    <div style={{
                      backgroundColor: 'var(--primary-red-light)',
                      border: '2px solid var(--primary-red)',
                      color: 'var(--primary-red)',
                      padding: '16px',
                      borderRadius: 'var(--border-radius-md)',
                      marginBottom: '30px',
                      fontWeight: 'bold'
                    }}>
                      ⚠️ Sắp xếp chưa đúng! Hãy thử sắp xếp lại trật tự các từ khóa.
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <button onClick={clearDecryption} className="btn btn-outline">
                      Xóa sắp xếp
                    </button>
                    {decryptionStatus === 'correct' ? (
                      <button onClick={() => setCurrentScreen('quiz-result')} className="btn btn-secondary">
                        Xem kết quả chung cuộc <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button onClick={verifyDecryption} className="btn btn-primary">
                        Kiểm tra đáp án
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 9. MÀN HÌNH KẾT QUẢ QUIZ */}
            {currentScreen === 'quiz-result' && activeQuiz && (
              <div className="container animate-fade-in">
                <div className="result-card">
                  <div className="result-trophy">🏆</div>
                  <h1 style={{ fontSize: '2.2rem', marginBottom: '6px' }}>Hoàn thành xuất sắc!</h1>
                  <p style={{ color: 'var(--text-muted)' }}>Bạn đã hoàn thành việc giải đố mật mã lịch sử.</p>
                  
                  {/* Circle progress diagram */}
                  <div 
                    className="result-circle-progress"
                    style={{
                      backgroundImage: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(var(--accent-moss) ${(correctAnswersCount / activeQuiz.questions.length) * 100}%, var(--bg-cream) 0)`
                    }}
                  >
                    <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-moss)' }}>
                      {Math.round((correctAnswersCount / activeQuiz.questions.length) * 100)}%
                    </span>
                  </div>

                  <h3 style={{ margin: '14px 0', color: 'var(--primary-red)' }}>
                    {correctAnswersCount === activeQuiz.questions.length ? "Danh hiệu: Đại Thần Sử Học" : "Danh hiệu: Nhà Khám Phá Lịch Sử"}
                  </h3>

                  {/* Statistics */}
                  <div className="result-stats-row">
                    <div className="result-stat-card">
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Điểm số</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>+{score}</div>
                    </div>
                    <div className="result-stat-card">
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Đúng / Tổng</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{correctAnswersCount}/{activeQuiz.questions.length}</div>
                    </div>
                    <div className="result-stat-card">
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Thời gian chơi</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{formatTime(elapsedTime)}</div>
                    </div>
                  </div>

                  {/* Unlocked badges info */}
                  <div style={{
                    backgroundColor: 'var(--bg-cream)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '20px',
                    marginBottom: '30px',
                    textAlign: 'left'
                  }}>
                    <h4 style={{ marginBottom: '10px' }}>🏅 Huy hiệu mới mở khóa:</h4>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '2.5rem' }}>🛡️</span>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Dũng sĩ Điện Biên</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Đạt điểm tuyệt đối trong bộ quiz Điện Biên Phủ</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => startQuiz(activeQuiz)} className="btn btn-outline" style={{ flexGrow: 1 }}>
                        Chơi lại
                      </button>
                      <button onClick={() => setCurrentScreen('explore')} className="btn btn-primary" style={{ flexGrow: 1 }}>
                        Chơi quiz khác
                      </button>
                    </div>
                    <button onClick={() => setCurrentScreen('home')} className="btn btn-outline" style={{ width: '100%' }}>
                      Về Trang Chủ
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 11. MÀN HÌNH BẢNG XẾP HẠNG */}
            {currentScreen === 'leaderboard' && (
              <div className="container animate-fade-in">
                <div className="section-title-wrapper">
                  <span className="section-subtitle">Vinh danh bảng vàng</span>
                  <h2 className="section-title">Bảng Xếp Hạng Học Giả</h2>
                </div>

                {leaderboard.length >= 3 ? (
                  <div className="podium-container">
                    <div className="podium-step second">
                      <span className="podium-avatar">{leaderboard[1].avatar}</span>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', textAlign: 'center', padding: '0 8px' }}>{leaderboard[1].name}</span>
                      <div className="podium-rank-badge">2</div>
                      <span className="podium-points">{leaderboard[1].score} XP</span>
                    </div>

                    <div className="podium-step first">
                      <div style={{ position: 'absolute', top: '-85px', fontSize: '2.5rem' }}>👑</div>
                      <span className="podium-avatar">{leaderboard[0].avatar}</span>
                      <span style={{ fontWeight: 800, fontSize: '1rem', textAlign: 'center', padding: '0 8px' }}>{leaderboard[0].name}</span>
                      <div className="podium-rank-badge" style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--bg-dark-brown)' }}>1</div>
                      <span className="podium-points" style={{ color: 'var(--primary-red)' }}>{leaderboard[0].score} XP</span>
                    </div>

                    <div className="podium-step third">
                      <span className="podium-avatar">{leaderboard[2].avatar}</span>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', textAlign: 'center', padding: '0 8px' }}>{leaderboard[2].name}</span>
                      <div className="podium-rank-badge">3</div>
                      <span className="podium-points">{leaderboard[2].score} XP</span>
                    </div>
                  </div>
                ) : (
                  <div className="kpi-card" style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ fontSize: '2.6rem', marginBottom: '10px' }}>🛡️</div>
                    <h3>Chưa có tài khoản người học</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                      Hãy đăng ký tài khoản người dùng và hoàn thành quiz để xuất hiện trên bảng xếp hạng.
                    </p>
                  </div>
                )}

                {/* Table search and sorting tabs */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div className="profile-tabs" style={{ margin: 0, borderBottom: 'none' }}>
                    <button className="profile-tab active" style={{ padding: '8px 16px' }}>Tuần này</button>
                    <button className="profile-tab" style={{ padding: '8px 16px' }}>Tháng này</button>
                    <button className="profile-tab" style={{ padding: '8px 16px' }}>Toàn thời gian</button>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Cập nhật mới nhất lúc: {new Date().toLocaleTimeString('vi-VN')}
                  </div>
                </div>

                {/* Leaderboard Table list */}
                <div style={{ backgroundColor: 'var(--bg-white)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--bg-cream-dark)', overflow: 'hidden' }}>
                  <table className="leaderboard-table">
                    <thead>
                      <tr>
                        <th>Thứ hạng</th>
                        <th>Học giả</th>
                        <th>Tổng số điểm (XP)</th>
                        <th>Quiz đã giải</th>
                        <th>Huy hiệu</th>
                        <th>Chuỗi đúng max</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.length > 0 ? (
                        leaderboard.map((user) => (
                          <tr key={user.rank}>
                            <td style={{ fontWeight: 800 }}>{user.rank}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.4rem' }}>{user.avatar}</span>
                                <span style={{ fontWeight: 600 }}>{user.name}</span>
                              </div>
                            </td>
                            <td style={{ fontWeight: 800, color: 'var(--primary-red)' }}>{user.score} XP</td>
                            <td>{user.completedCount} bộ</td>
                            <td>🏅 {user.badgeCount}</td>
                            <td>🔥 {user.maxStreak} câu</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '28px' }}>
                            Chưa có người học nào có điểm xếp hạng.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 12. MÀN HÌNH HỒ SƠ NGƯỜI CHƠI & 13. HUY HIỆU */}
            {currentScreen === 'profile' && userSession && (
              <div className="container animate-fade-in">
                {/* Profile header card */}
                <div className="profile-card">
                  <span className="user-avatar" style={{ width: '80px', height: '80px', fontSize: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
                    {userSession.avatar}
                  </span>
                  <div style={{ flexGrow: 1 }}>
                    <h2 style={{ fontSize: '1.6rem' }}>{userSession.name}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      @{userSession.username} • Role: <b>{isAdmin ? 'Admin' : 'Người dùng'}</b> • Đã tham gia từ tháng 7/2026
                    </p>
                    
                    {/* XP Track */}
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                        <span>Cấp độ {userSession.level}</span>
                        <span>{userSession.xp}/1000 XP để lên cấp kế tiếp</span>
                      </div>
                      <div className="xp-bar-container">
                        <div className="xp-bar-fill" style={{ width: `${(userSession.xp / 1000) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Summary Stats */}
                  <div style={{ display: 'flex', gap: '20px', borderLeft: '2px solid var(--bg-cream-dark)', paddingLeft: '30px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-red)' }}>{userSession.completedCount}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Đã hoàn thành</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-red)' }}>{userSession.score}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tổng điểm</div>
                    </div>
                  </div>
                </div>

                {/* Tabs navigation */}
                <div className="profile-tabs">
                  <button className={`profile-tab ${profileSection === 'badges' ? 'active' : ''}`} onClick={() => setProfileSection('badges')}>Huy hiệu thành tích</button>
                  <button className={`profile-tab ${profileSection === 'history' ? 'active' : ''}`} onClick={() => setProfileSection('history')}>Lịch sử chơi</button>
                  <button className={`profile-tab ${profileSection === 'settings' ? 'active' : ''}`} onClick={() => setProfileSection('settings')}>Thiết lập tài khoản</button>
                </div>

                {/* 13. MÀN HÌNH HUY HIỆU */}
                {profileSection === 'badges' && (
                <div>
                  <h3 style={{ marginBottom: '20px' }}>🏆 Kho Huy Hiệu của tôi</h3>
                  <div className="badge-grid">
                    {badges.map((badge) => (
                      <div key={badge.id} className={`badge-card ${badge.unlocked ? '' : 'locked'}`}>
                        <div className="badge-icon">{badge.icon}</div>
                        <h4 style={{ fontSize: '0.95rem', marginBottom: '8px' }}>{badge.name}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{badge.desc}</p>
                        
                        {/* Progress Bar inside badge */}
                        <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', backgroundColor: badge.unlocked ? 'var(--accent-moss)' : 'var(--text-muted)', width: `${badge.progress}%` }}></div>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                          {badge.unlocked ? "Đã hoàn thành" : `Tiến trình: ${badge.progress}%`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                )}

                {profileSection === 'history' && (
                  <div className="kpi-card">
                    <h3 style={{ marginBottom: '16px' }}>📜 Lịch sử chơi</h3>
                    {userSession.history?.length > 0 ? (
                      <div style={{ display: 'grid', gap: '12px' }}>
                        {userSession.history.map((item, index) => (
                          <div key={`${item.id}-${index}`} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '14px', backgroundColor: '#fafbfc', borderRadius: '8px' }}>
                            <div>
                              <div style={{ fontWeight: 800 }}>{item.title}</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.date} • Đúng {item.correctCount}/{item.total}</div>
                            </div>
                            <div style={{ fontWeight: 800, color: 'var(--primary-red)' }}>+{item.score} XP</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: 'var(--text-muted)' }}>Bạn chưa hoàn thành quiz nào.</p>
                    )}
                  </div>
                )}

                {profileSection === 'settings' && (
                  <div className="kpi-card">
                    <h3 style={{ marginBottom: '16px' }}>⚙️ Thiết lập tài khoản</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Dữ liệu tài khoản đang được lưu trong localStorage của trình duyệt.</p>
                    <button className="btn btn-outline" style={{ color: 'var(--primary-red)', borderColor: 'var(--primary-red)' }} onClick={() => {
                      setUserSession(null);
                      setCurrentScreen('home');
                      showAlert("Bạn đã đăng xuất.");
                    }}>
                      Đăng xuất tài khoản này
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 14. MÀN HÌNH QUẢN TRỊ (ADMIN DASHBOARD) */}
            {currentScreen === 'admin' && isAdmin && (
              <div className="admin-layout animate-fade-in" style={{ margin: '-40px 0' }}>
                {/* Left sidebar admin */}
                <aside className="admin-sidebar">
                  <div style={{ padding: '0 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
                    <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.1rem' }}>🛡️ Quản trị viên</h3>
                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Quản lý hệ thống Mật Mã Sử</span>
                  </div>
                  <nav>
                    <div className={`admin-nav-item ${adminSection === 'overview' ? 'active' : ''}`} onClick={() => setAdminSection('overview')}>📊 Tổng quan</div>
                    <div className="admin-nav-item" onClick={() => setCurrentScreen('create-quiz')}>➕ Tạo bộ Quiz mới</div>
                    <div className={`admin-nav-item ${adminSection === 'users' ? 'active' : ''}`} onClick={() => setAdminSection('users')}>👤 Quản lý người dùng</div>
                    <div className={`admin-nav-item ${adminSection === 'comments' ? 'active' : ''}`} onClick={() => setAdminSection('comments')}>📝 Quản lý bình luận</div>
                    <div className={`admin-nav-item ${adminSection === 'settings' ? 'active' : ''}`} onClick={() => setAdminSection('settings')}>⚙️ Cài đặt hệ thống</div>
                  </nav>
                </aside>

                {/* Right dashboard main */}
                <div className="admin-main">
                  <h2 style={{ marginBottom: '24px' }}>
                    {adminSection === 'overview' && 'Hệ thống thống kê'}
                    {adminSection === 'users' && 'Quản lý người dùng'}
                    {adminSection === 'comments' && 'Quản lý bình luận'}
                    {adminSection === 'settings' && 'Cài đặt hệ thống'}
                  </h2>

                  {adminSection === 'overview' && (
                    <>
                  {/* KPI Row cards */}
                  <div className="admin-kpis">
                    <div className="kpi-card">
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tổng tài khoản</div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0' }}>{userAccounts.length + 1}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-moss)' }}>1 admin • {userAccounts.length} người dùng</div>
                    </div>
                    <div className="kpi-card">
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tổng bộ Quiz</div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0' }}>{quizzes.length} bộ</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hoạt động ổn định</div>
                    </div>
                    <div className="kpi-card">
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lượt chơi game</div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0' }}>{adminStats.totalPlays}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-moss)' }}>📈 +8% hôm nay</div>
                    </div>
                    <div className="kpi-card">
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Đánh giá trung bình</div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0' }}>★ {adminStats.avgRating}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>Cực kỳ tích cực</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', marginBottom: '30px' }}>
                    {/* Activity graph */}
                    <div className="kpi-card">
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>📈 Biểu đồ lượt chơi trong tuần</h3>
                      <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '20px', paddingBottom: '20px', borderBottom: '2px solid #e5e7eb' }}>
                        {adminStats.playStatsByDay.map(day => (
                          <div key={day.date} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                            <div 
                              style={{ 
                                backgroundColor: 'var(--primary-red)', 
                                width: '100%', 
                                height: `${(day.count / 1000) * 160}px`,
                                borderRadius: '4px 4px 0 0',
                                position: 'relative'
                              }}
                            >
                              <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                {day.count}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>{day.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right distribution chart */}
                    <div className="kpi-card">
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>📊 Tỷ lệ trả lời chính xác</h3>
                      <div style={{ position: 'relative', width: '130px', height: '130px', margin: '20px auto', borderRadius: '50%', background: 'radial-gradient(closest-side, white 69%, transparent 70% 100%), conic-gradient(var(--accent-moss) 68%, var(--primary-red) 0)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-moss)' }}>68%</span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Chính xác</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.8rem', marginTop: '10px' }}>
                        <span style={{ color: 'var(--accent-moss)' }}>● Đúng (68%)</span>
                        <span style={{ color: 'var(--primary-red)' }}>● Sai (32%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent comments moderation */}
                  <div className="kpi-card">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>💬 Bình luận gần đây cần duyệt</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {adminStats.recentComments.length > 0 ? (
                        adminStats.recentComments.map(comment => (
                          <div key={comment.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #f3f4f6', backgroundColor: '#fafbfc', borderRadius: '6px' }}>
                            <div>
                              <div style={{ fontSize: '0.85rem' }}>
                                <b>{comment.user}</b> trên bài <i>{comment.quizTitle}</i>
                              </div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>"{comment.content}"</p>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => {
                                setAdminStats(prev => ({
                                  ...prev,
                                  recentComments: prev.recentComments.filter(item => item.id !== comment.id)
                                }));
                                showAlert("Bình luận đã được phê duyệt!");
                              }}>Duyệt</button>
                              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem', color: 'var(--primary-red)', borderColor: 'var(--primary-red)' }} onClick={() => handleDeleteComment(comment.id)}>Xóa</button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ padding: '18px', color: 'var(--text-muted)', backgroundColor: '#fafbfc', borderRadius: '6px', textAlign: 'center' }}>
                          Không còn bình luận từ tài khoản cũ cần duyệt.
                        </div>
                      )}
                    </div>
                  </div>
                    </>
                  )}

                  {adminSection === 'users' && (
                    <div className="kpi-card">
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Danh sách tài khoản</h3>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: 'var(--bg-cream)', borderRadius: '8px' }}>
                          <div>
                            <div style={{ fontWeight: 800 }}>{ADMIN_ACCOUNT.session.name}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{ADMIN_ACCOUNT.email} • role admin</div>
                          </div>
                          <span style={{ color: 'var(--accent-moss)', fontWeight: 700 }}>Tài khoản hệ thống</span>
                        </div>

                        {userAccounts.length > 0 ? (
                          userAccounts.map(account => (
                            <div key={account.username} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: '#fafbfc', borderRadius: '8px', border: '1px solid #eef0f3' }}>
                              <div>
                                <div style={{ fontWeight: 800 }}>{account.session.name}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                  @{account.username} • {account.email} • {account.session.score} XP
                                </div>
                              </div>
                              <button className="btn btn-outline" style={{ padding: '8px 12px', color: 'var(--primary-red)', borderColor: 'var(--primary-red)' }} onClick={() => handleDeleteUser(account.username)}>
                                Xóa user
                              </button>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: '#fafbfc', borderRadius: '8px' }}>
                            Chưa có tài khoản người dùng nào.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {adminSection === 'comments' && (
                    <div className="kpi-card">
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Tất cả bình luận</h3>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        {comments.length > 0 ? (
                          comments.map(comment => (
                            <div key={comment.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '14px', backgroundColor: '#fafbfc', borderRadius: '8px', border: '1px solid #eef0f3' }}>
                              <div>
                                <div style={{ fontWeight: 800 }}>{comment.user} • {'★'.repeat(comment.rating)}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0' }}>Quiz: {comment.quizId} • {comment.time}</div>
                                <p>{comment.content}</p>
                              </div>
                              <button className="btn btn-outline" style={{ alignSelf: 'center', padding: '8px 12px', color: 'var(--primary-red)', borderColor: 'var(--primary-red)' }} onClick={() => handleDeleteComment(comment.id)}>
                                Xóa
                              </button>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: '#fafbfc', borderRadius: '8px' }}>
                            Chưa có bình luận nào.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {adminSection === 'settings' && (
                    <div className="kpi-card">
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Thông tin cấu hình</h3>
                      <div style={{ display: 'grid', gap: '12px', color: 'var(--text-muted)' }}>
                        <p><b style={{ color: 'var(--text-dark)' }}>Admin:</b> {ADMIN_ACCOUNT.email}</p>
                        <p><b style={{ color: 'var(--text-dark)' }}>Lưu dữ liệu:</b> localStorage của trình duyệt</p>
                        <p><b style={{ color: 'var(--text-dark)' }}>Phân quyền:</b> admin quản trị hệ thống, user chơi quiz và lưu tiến trình.</p>
                        <p>Để đổi tài khoản admin mặc định, chỉnh `ADMIN_ACCOUNT` trong `src/data/mockData.js` rồi build lại.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 15. MÀN HÌNH TẠO BỘ QUIZ (ADMIN CREATE QUIZ) */}
            {currentScreen === 'create-quiz' && isAdmin && (
              <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
                {/* Back Link */}
                <button onClick={() => setCurrentScreen('admin')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-red)', fontWeight: 'bold', marginBottom: '24px' }}>
                  <ArrowLeft size={16} /> Quay lại trang quản trị
                </button>

                <div style={{ backgroundColor: 'var(--bg-white)', padding: '40px', borderRadius: 'var(--border-radius-lg)', border: '1.5px solid var(--bg-cream-dark)' }}>
                  <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Tạo bộ Quiz mới</h1>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Thiết kế bộ câu hỏi trắc nghiệm lịch sử và bộ mật mã đi kèm.</p>

                  <form onSubmit={handlePublishQuiz}>
                    {/* Metadata Section */}
                    <h3 style={{ borderBottom: '2px solid var(--bg-cream-dark)', paddingBottom: '8px', marginBottom: '20px' }}>1. Thông tin chung bộ Quiz</h3>
                    
                    <div className="form-group">
                      <label className="form-label">Tên bộ Quiz *</label>
                      <input 
                        type="text" 
                        required
                        className="form-input" 
                        style={{ paddingLeft: '16px' }}
                        placeholder="Ví dụ: Chiến dịch Tây Nguyên 1975"
                        value={newQuizMetadata.title}
                        onChange={(e) => setNewQuizMetadata(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label className="form-label">Chủ đề *</label>
                        <select 
                          className="form-input"
                          style={{ paddingLeft: '16px' }}
                          value={newQuizMetadata.category}
                          onChange={(e) => setNewQuizMetadata(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="Kháng chiến chống Pháp">Kháng chiến chống Pháp</option>
                          <option value="Kháng chiến chống Mỹ">Kháng chiến chống Mỹ</option>
                          <option value="Triều đại phong kiến">Triều đại phong kiến</option>
                          <option value="Anh hùng dân tộc">Anh hùng dân tộc</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Độ khó *</label>
                        <select 
                          className="form-input"
                          style={{ paddingLeft: '16px' }}
                          value={newQuizMetadata.difficulty}
                          onChange={(e) => setNewQuizMetadata(prev => ({ ...prev, difficulty: e.target.value }))}
                        >
                          <option value="Dễ">Dễ</option>
                          <option value="Trung bình">Trung bình</option>
                          <option value="Khó">Khó</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Mô tả ngắn *</label>
                      <textarea 
                        rows="2" 
                        required
                        className="form-input" 
                        style={{ paddingLeft: '16px', paddingTop: '10px' }}
                        placeholder="Mô tả tóm tắt nội dung bộ câu đố..."
                        value={newQuizMetadata.description}
                        onChange={(e) => setNewQuizMetadata(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <div className="form-group" style={{ backgroundColor: 'var(--bg-cream-light)', padding: '20px', borderRadius: '8px', border: '1.5px dashed var(--bg-cream-dark)' }}>
                      <h4 style={{ color: 'var(--primary-red)', marginBottom: '14px' }}>🔑 MẬT MÃ GIẢI MÃ CUỐI CÙNG</h4>
                      
                      <div className="form-group">
                        <label className="form-label">Câu mật mã (Viết hoa cách nhau bằng khoảng trắng) *</label>
                        <input 
                          type="text" 
                          required
                          className="form-input" 
                          style={{ paddingLeft: '16px' }}
                          placeholder="Ví dụ: UỐNG NƯỚC NHỚ NGUỒN"
                          value={newQuizMetadata.decryptionMessage}
                          onChange={(e) => setNewQuizMetadata(prev => ({ ...prev, decryptionMessage: e.target.value }))}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Giải thích ý nghĩa lịch sử *</label>
                        <textarea 
                          rows="2" 
                          required
                          className="form-input" 
                          style={{ paddingLeft: '16px', paddingTop: '10px' }}
                          placeholder="Khi giải mã thành công, hiển thị ý nghĩa lịch sử và giáo dục cho học sinh..."
                          value={newQuizMetadata.decryptionExplanation}
                          onChange={(e) => setNewQuizMetadata(prev => ({ ...prev, decryptionExplanation: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Question List Section */}
                    <h3 style={{ borderBottom: '2px solid var(--bg-cream-dark)', paddingBottom: '8px', marginBottom: '20px', marginTop: '40px' }}>2. Danh sách câu hỏi</h3>
                    
                    {newQuizQuestions.map((q, qIndex) => (
                      <div key={qIndex} style={{ border: '1px solid var(--bg-cream-dark)', padding: '20px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#fafbfc' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <h4 style={{ color: 'var(--text-dark)' }}>Câu hỏi số {qIndex + 1}</h4>
                          {newQuizQuestions.length > 1 && (
                            <button type="button" onClick={() => removeQuestionFromBuilder(qIndex)} style={{ color: 'var(--primary-red)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                              <Trash2 size={14} /> Xóa câu này
                            </button>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">Nội dung câu hỏi *</label>
                          <input 
                            type="text" 
                            required
                            className="form-input" 
                            style={{ paddingLeft: '16px' }}
                            placeholder="Ví dụ: Ai viết hịch tướng sĩ?"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                          />
                        </div>

                        {/* 4 options inputs */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                          {q.options.map((opt, oIndex) => (
                            <div key={oIndex} className="form-group" style={{ margin: 0 }}>
                              <label className="form-label">Đáp án {String.fromCharCode(65 + oIndex)} *</label>
                              <input 
                                type="text" 
                                required
                                className="form-input" 
                                style={{ paddingLeft: '16px' }}
                                placeholder={`Nhập đáp án ${String.fromCharCode(65 + oIndex)}`}
                                value={opt}
                                onChange={(e) => handleQuestionOptionChange(qIndex, oIndex, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
                          <div className="form-group">
                            <label className="form-label">Chọn đáp án đúng *</label>
                            <select 
                              className="form-input"
                              style={{ paddingLeft: '16px' }}
                              value={q.correctIndex}
                              onChange={(e) => handleQuestionChange(qIndex, 'correctIndex', parseInt(e.target.value))}
                            >
                              <option value={0}>Đáp án A</option>
                              <option value={1}>Đáp án B</option>
                              <option value={2}>Đáp án C</option>
                              <option value={3}>Đáp án D</option>
                            </select>
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">Từ khóa mở khóa của câu này *</label>
                            <input 
                              type="text" 
                              required
                              className="form-input" 
                              style={{ paddingLeft: '16px' }}
                              placeholder="Từ khóa (Ví dụ: NƯỚC)"
                              value={q.keyword}
                              onChange={(e) => handleQuestionChange(qIndex, 'keyword', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Giải thích chi tiết (Bạn có biết?) *</label>
                          <textarea 
                            rows="2" 
                            required
                            className="form-input" 
                            style={{ paddingLeft: '16px', paddingTop: '10px' }}
                            placeholder="Nhập thông tin lịch sử giải thích vì sao đáp án đó đúng..."
                            value={q.explanation}
                            onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}

                    <button 
                      type="button" 
                      onClick={addQuestionToBuilder}
                      className="btn btn-outline" 
                      style={{ width: '100%', marginBottom: '30px' }}
                    >
                      <Plus size={16} /> Thêm câu hỏi tiếp theo
                    </button>

                    {/* Publish Actions */}
                    <div style={{ display: 'flex', gap: '14px', borderTop: '2px solid var(--bg-cream-dark)', paddingTop: '24px' }}>
                      <button type="button" onClick={() => setCurrentScreen('admin')} className="btn btn-outline" style={{ flexGrow: 1 }}>
                        Hủy bỏ
                      </button>
                      <button type="submit" className="btn btn-primary" style={{ flexGrow: 2 }}>
                        Xuất bản bộ Quiz
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
      </main>

      {/* Footer Component */}
      <Footer setCurrentScreen={setCurrentScreen} />

      {/* 2. AUTH MODAL - LOGIN */}
      {loginModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(51, 34, 25, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div className="animate-slide-up" style={{
            backgroundColor: 'var(--bg-white)',
            borderRadius: 'var(--border-radius-lg)',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '850px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div className="auth-grid">
              {/* Left Column Decor */}
              <div className="auth-sidebar">
                <span className="auth-sidebar-art">📜</span>
                <h2 style={{ color: 'var(--accent-gold)', marginBottom: '16px', zIndex: 1 }}>Mật Mã Sử Việt</h2>
                <p style={{ zIndex: 1, fontSize: '0.9rem', opacity: 0.9 }}>
                  Nơi hội tụ những học giả trẻ đam mê lịch sử. Đăng nhập để lưu lại tiến trình, điểm số và mở khóa các huy hiệu danh giá.
                </p>
              </div>

              {/* Right Column Form */}
              <div className="auth-form-wrapper" style={{ position: 'relative' }}>
                <button 
                  onClick={() => setLoginModalOpen(false)}
                  style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-muted)' }}
                >
                  <X size={24} />
                </button>
                <div className="auth-form">
                  <h2 style={{ marginBottom: '6px' }}>Chào mừng trở lại</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Đăng nhập bằng tài khoản admin hoặc người dùng.</p>

                  <form onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                      <label className="form-label">Email hoặc tên đăng nhập</label>
                      <input 
                        type="text" 
                        required
                        className="form-input" 
                        placeholder="email hoặc username"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mật khẩu</label>
                      <input 
                        type="password" 
                        required
                        className="form-input" 
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      />
                    </div>

                    <div className="form-actions">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="checkbox" 
                          checked={loginForm.remember}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, remember: e.target.checked }))}
                        /> Nhớ mật khẩu
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginBottom: '14px' }}>
                      Đăng nhập
                    </button>
                    <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      Chưa có tài khoản người dùng?{' '}
                      <a href="#" onClick={(e) => { e.preventDefault(); setLoginModalOpen(false); setRegisterModalOpen(true); }} style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>Đăng ký ngay</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. AUTH MODAL - REGISTER */}
      {registerModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(51, 34, 25, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div className="animate-slide-up" style={{
            backgroundColor: 'var(--bg-white)',
            borderRadius: 'var(--border-radius-lg)',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '850px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div className="auth-grid">
              {/* Left Column Decor */}
              <div className="auth-sidebar">
                <span className="auth-sidebar-art">📜</span>
                <h2 style={{ color: 'var(--accent-gold)', marginBottom: '16px', zIndex: 1 }}>Mật Mã Sử Việt</h2>
                <p style={{ zIndex: 1, fontSize: '0.9rem', opacity: 0.9 }}>
                  Tạo tài khoản học sử để được cấp danh hiệu, ghi nhận thứ hạng trên bảng xếp hạng cả nước và mở các rương kho báu mật mã.
                </p>
              </div>

              {/* Right Column Form */}
              <div className="auth-form-wrapper" style={{ position: 'relative' }}>
                <button 
                  onClick={() => setRegisterModalOpen(false)}
                  style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-muted)' }}
                >
                  <X size={24} />
                </button>
                <div className="auth-form" style={{ padding: '10px 0' }}>
                  <h2 style={{ marginBottom: '6px' }}>Tạo tài khoản học sử</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Đăng ký nhanh chóng trong 1 phút.</p>

                  <form onSubmit={handleRegisterSubmit}>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Họ và tên *</label>
                      <input 
                        type="text" 
                        required
                        className="form-input" 
                        placeholder="Nguyễn Văn A"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Email đăng ký *</label>
                      <input 
                        type="email" 
                        required
                        className="form-input" 
                        placeholder="vana@gmail.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Tên đăng nhập *</label>
                      <input 
                        type="text" 
                        required
                        className="form-input" 
                        placeholder="vana_suhoc"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, username: e.target.value }))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Mật khẩu *</label>
                      <input 
                        type="password" 
                        required
                        className="form-input" 
                        placeholder="••••••••"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Xác nhận mật khẩu *</label>
                      <input 
                        type="password" 
                        required
                        className="form-input" 
                        placeholder="••••••••"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                    </div>

                    <div className="form-actions" style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                        <input 
                          type="checkbox" 
                          required
                          checked={registerForm.agree}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, agree: e.target.checked }))}
                        /> Đồng ý các điều khoản dịch vụ học tập
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginBottom: '10px' }}>
                      Tạo tài khoản
                    </button>

                    <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      Đã có tài khoản?{' '}
                      <a href="#" onClick={(e) => { e.preventDefault(); setRegisterModalOpen(false); setLoginModalOpen(true); }} style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>Quay lại đăng nhập</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confetti simulation layer */}
      {showConfetti && (
        <div className="confetti-container" onClick={() => setShowConfetti(false)}>
          {Array.from({ length: 100 }).map((_, i) => {
            const size = Math.random() * 8 + 4;
            const left = Math.random() * 100;
            const duration = Math.random() * 2 + 1.5;
            const delay = Math.random() * 1.5;
            const colors = ['#D4AF37', '#8B0C14', '#2E4F3A', '#332219', '#EBC046'];
            const bg = colors[Math.floor(Math.random() * colors.length)];
            return (
              <div 
                key={i} 
                className="confetti-piece"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  backgroundColor: bg,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            );
          })}
        </div>
      )}

    </div>
  );
}
