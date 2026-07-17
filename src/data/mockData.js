// Mock data for "MẬT MÃ SỬ VIỆT"

export const ADMIN_ACCOUNT = {
  email: "phanbg2003@gmail.com",
  username: "phanbg2003",
  password: "Nvpttbg2003@",
  session: {
    role: "admin",
    name: "Admin Phan",
    username: "phanbg2003",
    email: "phanbg2003@gmail.com",
    avatar: "🛡️",
    level: 99,
    xp: 999,
    score: 0,
    completedCount: 0,
    badgeCount: 0,
    maxStreak: 0,
    history: []
  }
};

export const INITIAL_USER_ACCOUNTS = [];

const BASE_QUIZZES = [
  {
    id: "dien-bien-phu",
    title: "Chiến thắng Điện Biên Phủ",
    description: "Khám phá chiến dịch lịch sử 'Lừng lẫy năm châu, chấn động địa cầu' dưới sự lãnh đạo tài tình của Đại tướng Võ Nguyên Giáp.",
    longDescription: "Bộ quiz này tái hiện lại diễn biến, các trận đánh then chốt và những quyết định lịch sử trong Chiến dịch Điện Biên Phủ năm 1954. Qua đó giúp người chơi khắc ghi xương máu anh hùng, hiểu thêm về chiến thuật quân sự đỉnh cao của Quân đội Nhân dân Việt Nam.",
    category: "Kháng chiến chống Pháp",
    period: "Kháng chiến chống Pháp (1945 - 1954)",
    difficulty: "Khó",
    questionCount: 10,
    playCount: 4520,
    rating: 4.9,
    author: "Ban Biên Tập Lịch Sử Việt",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
    decryptionMessage: "NƯỚC VIỆT NAM LÀ MỘT SÔNG CÓ THỂ CẠN ĐÁ CÓ THỂ MÒN",
    decryptionExplanation: "Đây là câu nói nổi tiếng của Chủ tịch Hồ Chí Minh trong Thư gửi đồng bào Nam Bộ ngày 1/6/1946. Thể hiện ý chí sắt đá, quyết tâm bảo vệ nền độc lập tự do và thống nhất toàn vẹn lãnh thổ đất nước của nhân dân Việt Nam.",
    learningPoints: [
      "Hiểu rõ hoàn cảnh lịch sử dẫn tới chiến dịch Điện Biên Phủ năm 1954.",
      "Nắm bắt được các cứ điểm cốt lõi và chiến thuật tiến công từng bước của ta.",
      "Biết về quyết định thay đổi phương châm từ 'Đánh nhanh thắng nhanh' sang 'Đánh chắc tiến chắc'.",
      "Tri ân gương chiến đấu anh dũng của các liệt sĩ: Phan Đình Giót, Tô Vĩnh Diện, Bế Văn Đàn..."
    ],
    rules: [
      "Bộ quiz gồm 10 câu hỏi trắc nghiệm.",
      "Trả lời đúng mỗi câu nhận được +100 điểm và mở khóa 1 từ khóa.",
      "Trả lời sai vẫn có thể tiếp tục nhưng không nhận được từ khóa câu đó (hiển thị khóa). Bạn có thể dùng 1 gợi ý để mở từ khóa bị lỡ.",
      "Sau khi hoàn thành 10 câu hỏi, bạn sẽ vào màn hình giải mã để ghép các từ khóa thành câu nói lịch sử hoàn chỉnh."
    ],
    badges: [
      { id: "ebp-master", name: "Dũng sĩ Điện Biên", icon: "🛡️", desc: "Đạt điểm tuyệt đối trong bộ quiz Điện Biên Phủ" },
      { id: "decrypter-ebp", name: "Nhà Giải Mã Tây Bắc", icon: "🔑", desc: "Giải mã thành công câu nói lịch sử của Bác Hồ" }
    ],
    questions: [
      {
        id: 1,
        question: "Chiến dịch Điện Biên Phủ diễn ra vào năm nào?",
        options: ["1945", "1950", "1954", "1975"],
        correctIndex: 2,
        explanation: "Chiến dịch Điện Biên Phủ chính thức bắt đầu từ ngày 13/3/1954 và kết thúc thắng lợi vào ngày 7/5/1954.",
        keyword: "NƯỚC",
        points: 100
      },
      {
        id: 2,
        question: "Ai là Tổng Tư lệnh quân đội nhân dân Việt Nam trực tiếp chỉ huy chiến dịch Điện Biên Phủ?",
        options: ["Đại tướng Võ Nguyên Giáp", "Đại tướng Nguyễn Chí Thanh", "Đại tướng Văn Tiến Dũng", "Chủ tịch Hồ Chí Minh"],
        correctIndex: 0,
        explanation: "Đại tướng Võ Nguyên Giáp là Tổng tư lệnh kiêm Chỉ huy trưởng chiến dịch Điện Biên Phủ. Ông đã đưa ra quyết định chuyển phương châm tác chiến quyết định thắng lợi chiến dịch.",
        keyword: "VIỆT NAM",
        points: 100
      },
      {
        id: 3,
        question: "Quyết định chuyển phương châm tác chiến lịch sử từ đâu sang đâu của Đại tướng Võ Nguyên Giáp?",
        options: [
          "Từ 'Đánh chắc tiến chắc' sang 'Đánh nhanh giải quyết nhanh'",
          "Từ 'Đánh nhanh thắng nhanh' sang 'Đánh chắc tiến chắc'",
          "Từ 'Phòng ngự chủ động' sang 'Tổng công kích trực diện'",
          "Từ 'Chiến tranh du kích' sang 'Chiến tranh chính quy'"
        ],
        correctIndex: 1,
        explanation: "Đây được coi là 'Quyết định khó khăn nhất' trong cuộc đời binh nghiệp của Đại tướng Võ Nguyên Giáp, giúp tránh tổn thất xương máu cực lớn và bảo toàn lực lượng để giành thắng lợi trọn vẹn.",
        keyword: "LÀ",
        points: 100
      },
      {
        id: 4,
        question: "Hành động anh hùng lấy thân mình lấp lỗ châu mai là của ai?",
        options: ["Tô Vĩnh Diện", "Bế Văn Đàn", "Phan Đình Giót", "Trần Can"],
        correctIndex: 2,
        explanation: "Anh hùng Phan Đình Giót đã lấy thân mình lấp lỗ châu mai của địch tại cứ điểm Him Lam vào ngày 13/3/1954, tạo điều kiện cho đồng đội xông lên tiêu diệt mục tiêu.",
        keyword: "MỘT",
        points: 100
      },
      {
        id: 5,
        question: "Người anh hùng lấy thân mình chèn pháo cứu khẩu cao xạ pháo 37mm không bị lăn xuống vực là ai?",
        options: ["Tô Vĩnh Diện", "Phan Đình Giót", "Bế Văn Đàn", "La Văn Cầu"],
        correctIndex: 0,
        explanation: "Anh hùng Tô Vĩnh Diện đã dũng cảm chèn lưng cứu pháo tại dốc Chuối trong chiến dịch kéo pháo vào Điện Biên Phủ.",
        keyword: "SÔNG",
        points: 100
      },
      {
        id: 6,
        question: "Tập đoàn cứ điểm Điện Biên Phủ được thực dân Pháp xây dựng gồm bao nhiêu phân khu?",
        options: ["2 phân khu", "3 phân khu", "4 phân khu", "5 phân khu"],
        correctIndex: 1,
        explanation: "Điện Biên Phủ được chia thành 3 phân khu (Bắc, Trung tâm, Nam) với 49 cứ điểm phòng thủ kiên cố liên hoàn.",
        keyword: "CÓ THỂ",
        points: 100
      },
      {
        id: 7,
        question: "Tên tướng chỉ huy tập đoàn cứ điểm Điện Biên Phủ của thực dân Pháp bị ta bắt sống là ai?",
        options: ["Tướng Navarre", "Tướng De Castries", "Tướng Cogny", "Tướng Salan"],
        correctIndex: 1,
        explanation: "Chiều ngày 7/5/1954, tổ trưởng tạ chỉ huy Tạ Quốc Luật đã bắt sống tướng De Castries (Đờ Cát-tơ-ri) cùng toàn bộ bộ tham mưu tập đoàn cứ điểm Điện Biên Phủ.",
        keyword: "CẠN",
        points: 100
      },
      {
        id: 8,
        question: "Điện Biên Phủ nằm ở vùng địa lý nào của Việt Nam?",
        options: ["Đông Bắc Bộ", "Tây Bắc Bộ", "Bắc Trung Bộ", "Tây Nguyên"],
        correctIndex: 1,
        explanation: "Điện Biên Phủ là một thung lũng lòng chảo rộng lớn nằm ở tỉnh Điện Biên, thuộc vùng núi phía Tây Bắc Việt Nam.",
        keyword: "ĐÁ",
        points: 100
      },
      {
        id: 9,
        question: "Trận chiến Điện Biên Phủ kéo dài trong bao nhiêu ngày đêm?",
        options: ["45 ngày đêm", "50 ngày đêm", "54 ngày đêm", "56 ngày đêm"],
        correctIndex: 3,
        explanation: "Trải qua 3 đợt tấn công từ 13/3 đến 7/5/1954, quân và dân ta đã chiến đấu liên tục trong '56 ngày đêm khoét núi, ngủ hầm, mưa dầm, cơm vắt, máu trộn bùn non'.",
        keyword: "CÓ THỂ",
        points: 100
      },
      {
        id: 10,
        question: "Hiệp định nào được ký kết ngay sau khi chiến dịch Điện Biên Phủ thắng lợi để chấm dứt chiến tranh tại Đông Dương?",
        options: ["Hiệp định Genève", "Hiệp định Paris", "Hiệp định sơ bộ 6/3", "Hiệp định Tạm ước 14/9"],
        correctIndex: 0,
        explanation: "Thắng lợi Điện Biên Phủ đập tan dã tâm thực dân Pháp, buộc họ phải ký Hiệp định Genève ngày 21/7/1954 công nhận độc lập, chủ quyền của Việt Nam, Lào, Campuchia.",
        keyword: "MÒN",
        points: 100
      }
    ]
  },
  {
    id: "trieu-dai-phong-kien",
    title: "Các triều đại phong kiến Việt Nam",
    description: "Điểm qua những cột mốc phát triển rực rỡ dưới các triều đại Đinh, Lê, Lý, Trần, Lê Sơ và Nguyễn.",
    longDescription: "Nhìn lại nghìn năm chế độ phong kiến Việt Nam, từ thuở dựng nước tự chủ Đinh Bộ Lĩnh dẹp loạn 12 sứ quân cho đến sự kết thúc của triều đại nhà Nguyễn năm 1945. Bộ câu hỏi tập trung vào các vị vua hiền minh, cải cách kinh tế, võ công oanh liệt và văn hóa rực rỡ.",
    category: "Triều đại phong kiến",
    period: "Thời kỳ Tự chủ (938 - 1945)",
    difficulty: "Trung bình",
    questionCount: 5,
    playCount: 3200,
    rating: 4.8,
    author: "Hội Nghiên Cứu Sử Học Trẻ",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    decryptionMessage: "DÂN TA PHẢI BIẾT SỬ TA",
    decryptionExplanation: "Câu thơ mở đầu trong tác phẩm 'Lịch sử nước ta' do Chủ tịch Hồ Chí Minh biên soạn năm 1942. Nhắc nhở thế hệ mai sau phải hiểu rõ cội nguồn dân tộc, những bài học hưng vong của lịch sử nước nhà để chấn hưng đất nước.",
    learningPoints: [
      "Nhận biết được người có công thống nhất giang sơn lập nên Đại Cồ Việt.",
      "Biết về tác giả của tác phẩm Nam quốc sơn hà và Chiếu dời đô.",
      "Ghi nhớ các võ công lẫy lừng của thời đại Lý - Trần chống ngoại xâm phương Bắc."
    ],
    rules: [
      "Bộ quiz gồm 5 câu hỏi trung bình.",
      "Mỗi câu trả lời đúng cộng 100 điểm và mở khóa từ khóa tương ứng.",
      "Giải mã câu tục ngữ 5 chữ ở cuối game."
    ],
    badges: [
      { id: "feudal-master", name: "Đại Thần Sử Học", icon: "👑", desc: "Đạt điểm tối đa bộ quiz triều đại phong kiến" }
    ],
    questions: [
      {
        id: 1,
        question: "Ai là người dẹp loạn 12 sứ quân, thống nhất đất nước, xưng hoàng đế mở ra triều Đinh?",
        options: ["Ngô Quyền", "Đinh Bộ Lĩnh", "Lê Hoàn", "Lý Công Uẩn"],
        correctIndex: 1,
        explanation: "Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, lên ngôi hoàng đế (Đinh Tiên Hoàng), đặt tên nước là Đại Cồ Việt, đóng đô ở Hoa Lư vào năm 968.",
        keyword: "DÂN TA",
        points: 100
      },
      {
        id: 2,
        question: "Vị vua nào đã viết Chiếu dời đô dời kinh đô từ Hoa Lư về Đại La (Hà Nội ngày nay) năm 1010?",
        options: ["Lý Thái Tổ", "Lý Thái Tông", "Lý Thánh Tông", "Lý Nhân Tông"],
        correctIndex: 0,
        explanation: "Lý Công Uẩn (Lý Thái Tổ) lập ra nhà Lý, nhìn thấy thế đất rồng cuộn hổ ngồi của Đại La đã quyết định dời đô lập kinh thành Thăng Long mở ra trang sử mới.",
        keyword: "PHẢI",
        points: 100
      },
      {
        id: 3,
        question: "Vị tướng quân triều Lý gắn liền với bài thơ thần 'Nam quốc sơn hà' bên sông Như Nguyệt chống quân Tống là ai?",
        options: ["Trần Hưng Đạo", "Lý Thường Kiệt", "Lê Lợi", "Nguyễn Huệ"],
        correctIndex: 1,
        explanation: "Thái úy Lý Thường Kiệt đã tổng chỉ huy kháng chiến chống Tống (1075-1077) và sáng tác/sử dụng bài thơ thần 'Nam quốc sơn hà' khẳng định chủ quyền dân tộc.",
        keyword: "BIẾT",
        points: 100
      },
      {
        id: 4,
        question: "Triều đại nào ở Việt Nam đã 3 lần đại thắng quân xâm lược Mông - Nguyên lừng lẫy thế giới?",
        options: ["Nhà Lý", "Nhà Trần", "Nhà Hồ", "Nhà Lê"],
        correctIndex: 1,
        explanation: "Vương triều Trần với sự đồng lòng của vua tôi ở hội nghị Diên Hồng và tài thao lược của Hưng Đạo Vương Trần Quốc Tuấn đã 3 lần đánh bại giặc Mông Nguyên (1258, 1285, 1288).",
        keyword: "SỬ",
        points: 100
      },
      {
        id: 5,
        question: "Vị hoàng đế nào lập ra vương triều phong kiến cuối cùng trong lịch sử Việt Nam?",
        options: ["Vua Lê Thái Tổ", "Vua Gia Long", "Vua Minh Mạng", "Vua Bảo Đại"],
        correctIndex: 1,
        explanation: "Nguyễn Ánh (Vua Gia Long) lên ngôi năm 1802 lập ra triều Nguyễn, triều đại phong kiến cuối cùng chấm dứt khi hoàng đế Bảo Đại thoái vị năm 1945.",
        keyword: "TA",
        points: 100
      }
    ]
  },
  {
    id: "anh-hung-dan-toc",
    title: "Các anh hùng dân tộc Việt Nam",
    description: "Nhớ ơn các bậc tiền nhân, danh tướng kiệt xuất đã hiến dâng cả đời cho bờ cõi bình yên.",
    longDescription: "Một góc nhìn chân thực về các nhân vật lịch sử lỗi lạc của Việt Nam từ thời Hai Bà Trưng, Ngô Quyền, Trần Hưng Đạo, Lê Lợi đến Quang Trung. Sự can trường và lòng yêu nước của họ là bài học vô giá.",
    category: "Anh hùng dân tộc",
    period: "Lịch sử ngàn năm",
    difficulty: "Dễ",
    questionCount: 4,
    playCount: 5120,
    rating: 5.0,
    author: "Đại học Sư phạm Lịch sử",
    image: "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?auto=format&fit=crop&w=600&q=80",
    decryptionMessage: "UỐNG NƯỚC NHỚ NGUỒN",
    decryptionExplanation: "Câu tục ngữ nhắc nhở lòng biết ơn sâu sắc đối với các thế hệ cha ông đã dựng nước và giữ nước, hy sinh cho sự hòa bình độc lập ngày nay.",
    learningPoints: [
      "Hiểu sâu về công tích đóng cọc sông Bạch Đằng của Ngô Quyền.",
      "Hiểu lý do khởi nghĩa Lam Sơn thành công dưới sự chỉ huy của Lê Lợi.",
      "Tinh thần tốc chiến tốc thắng thần tốc của Hoàng đế Quang Trung."
    ],
    rules: [
      "Bộ quiz gồm 4 câu hỏi dễ.",
      "Thu thập 4 từ khóa để ghép thành thông điệp lịch sử."
    ],
    badges: [
      { id: "hero-master", name: "Trái Tim Yêu Nước", icon: "❤️", desc: "Hoàn thành xuất sắc bộ câu hỏi Anh hùng dân tộc" }
    ],
    questions: [
      {
        id: 1,
        question: "Năm 938, Ngô Quyền đã dùng chiến thuật cọc gỗ trên sông nào để đập tan quân Nam Hán?",
        options: ["Sông Hồng", "Sông Bạch Đằng", "Sông Mã", "Sông Gianh"],
        correctIndex: 1,
        explanation: "Ngô Quyền dùng trận địa cọc nhọn dưới lòng sông Bạch Đằng, lợi dụng thủy triều lên xuống đánh tan chiến thuyền quân Nam Hán, kết thúc 1000 năm bắc thuộc.",
        keyword: "UỐNG",
        points: 100
      },
      {
        id: 2,
        question: "Nữ anh hùng dân tộc nào cưỡi voi xung trận, tuyên bố: 'Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông'?",
        options: ["Trưng Trắc", "Trưng Nhị", "Bà Triệu", "Thái hậu Dương Vân Nga"],
        correctIndex: 2,
        explanation: "Bà Triệu (Triệu Thị Trinh) khởi nghĩa chống quân Đông Ngô năm 248 đã để lại câu nói bất hủ thể hiện khí phách lẫm liệt vô song.",
        keyword: "NƯỚC",
        points: 100
      },
      {
        id: 3,
        question: "Anh hùng áo vải nào chỉ huy chiến dịch Ngọc Hồi - Đống Đa thần tốc đại phá 29 vạn quân Thanh vào dịp Tết Kỷ Dậu 1789?",
        options: ["Nguyễn Nhạc", "Nguyễn Huệ (Quang Trung)", "Nguyễn Lữ", "Trần Hưng Đạo"],
        correctIndex: 1,
        explanation: "Hoàng đế Quang Trung - Nguyễn Huệ chỉ huy cuộc hành quân thần tốc vô tiền khoáng hậu ra Bắc đại phá quân Thanh giải phóng kinh thành Thăng Long cực kỳ chớp nhoáng.",
        keyword: "NHỚ",
        points: 100
      },
      {
        id: 4,
        question: "Hội nghị Diên Hồng - biểu tượng của sự đoàn kết và quyết tâm chiến đấu chống ngoại xâm của toàn dân là dưới triều đại nào?",
        options: ["Nhà Lý", "Nhà Trần", "Nhà Hậu Lê", "Nhà Tây Sơn"],
        correctIndex: 1,
        explanation: "Thượng hoàng Trần Thánh Tông triệu họp các phụ lão trong cả nước về điện Diên Hồng năm 1284 hỏi ý kiến 'Nên hòa hay nên đánh?'. Các bô lão đồng thanh hô 'ĐÁNH!' vang dội bờ cõi.",
        keyword: "NGUỒN",
        points: 100
      }
    ]
  }
];

export const HISTORY_QUESTION_BANK = [
  {
    quizId: "van-lang-au-lac",
    questions: [
      ["Nhà nước đầu tiên trong lịch sử Việt Nam thường được gọi là gì?", ["Văn Lang", "Đại Cồ Việt", "Đại Việt", "Nam Việt"], 0, "Văn Lang do các vua Hùng đứng đầu được xem là nhà nước sơ khai đầu tiên của cư dân Việt cổ.", "VĂN"],
      ["Kinh đô của nước Văn Lang được đặt ở đâu?", ["Phong Châu", "Hoa Lư", "Cổ Loa", "Thăng Long"], 0, "Phong Châu thuộc vùng Phú Thọ ngày nay là trung tâm chính trị của nước Văn Lang.", "LANG"],
      ["Người đứng đầu nhà nước Văn Lang được gọi là gì?", ["Hùng Vương", "An Dương Vương", "Lạc hầu", "Quan lang"], 0, "Hùng Vương là danh xưng của các vua thời Văn Lang.", "HÙNG"],
      ["Nước Âu Lạc gắn với vị vua nào?", ["An Dương Vương", "Lý Thái Tổ", "Mai Hắc Đế", "Triệu Quang Phục"], 0, "An Dương Vương lập nước Âu Lạc sau khi hợp nhất cư dân Âu Việt và Lạc Việt.", "VƯƠNG"],
      ["Thành Cổ Loa nổi tiếng với cấu trúc nào?", ["Thành nhiều vòng xoáy trôn ốc", "Thành xây hoàn toàn bằng đá", "Thành nổi trên sông", "Thành nằm trên núi cao"], 0, "Cổ Loa có nhiều vòng thành uốn lượn, là công trình quân sự đặc sắc của Âu Lạc.", "CỔ"],
      ["Truyền thuyết nỏ thần thời Âu Lạc gắn với nhân vật nào?", ["Cao Lỗ", "Yết Kiêu", "Dã Tượng", "Phạm Ngũ Lão"], 0, "Cao Lỗ thường được nhắc đến trong truyền thuyết chế tạo nỏ thần bảo vệ Cổ Loa.", "LOA"],
      ["Trống đồng Đông Sơn phản ánh nền văn hóa nào?", ["Văn hóa Đông Sơn", "Văn hóa Sa Huỳnh", "Văn hóa Óc Eo", "Văn hóa Chăm Pa"], 0, "Trống đồng là hiện vật tiêu biểu của văn hóa Đông Sơn, phản ánh đời sống cư dân Việt cổ.", "ĐÔNG"],
      ["Nghề kinh tế quan trọng nhất của cư dân Văn Lang - Âu Lạc là gì?", ["Trồng lúa nước", "Đánh bắt cá voi", "Buôn bán đường biển", "Khai thác than"], 0, "Cư dân Việt cổ sinh sống chủ yếu bằng nông nghiệp lúa nước.", "SƠN"],
      ["Lạc hầu, Lạc tướng là tầng lớp nào trong xã hội Văn Lang?", ["Quan lại giúp vua cai quản", "Thợ thủ công", "Nô lệ chiến tranh", "Thương nhân nước ngoài"], 0, "Lạc hầu, Lạc tướng giúp Hùng Vương quản lý các bộ.", "LẠC"],
      ["Sự tích Sơn Tinh - Thủy Tinh phản ánh điều gì của cư dân Việt cổ?", ["Cuộc đấu tranh chống lũ lụt", "Chiến tranh chống phương Bắc", "Nghề luyện kim", "Việc mở mang bờ cõi phía Nam"], 0, "Truyện thể hiện ước vọng chế ngự thiên tai, đặc biệt là lũ lụt vùng đồng bằng.", "VIỆT"]
    ]
  },
  {
    quizId: "bac-thuoc-dau-tranh",
    questions: [
      ["Cuộc khởi nghĩa Hai Bà Trưng bùng nổ vào năm nào?", ["40", "248", "542", "722"], 0, "Năm 40, Trưng Trắc và Trưng Nhị phất cờ khởi nghĩa chống ách đô hộ nhà Hán.", "HAI"],
      ["Hai Bà Trưng dựng cờ khởi nghĩa ở đâu?", ["Hát Môn", "Bạch Đằng", "Lam Sơn", "Tây Sơn"], 0, "Hát Môn là nơi Hai Bà Trưng làm lễ tế cờ trước khi tiến đánh quân Hán.", "BÀ"],
      ["Bà Triệu khởi nghĩa chống triều đại phương Bắc nào?", ["Đông Ngô", "Nhà Hán", "Nhà Đường", "Nhà Minh"], 0, "Bà Triệu lãnh đạo khởi nghĩa chống quân Đông Ngô vào năm 248.", "TRIỆU"],
      ["Lý Bí lập ra nhà nước độc lập nào vào thế kỷ VI?", ["Vạn Xuân", "Đại Việt", "Đại Ngu", "Đại Nam"], 0, "Sau thắng lợi khởi nghĩa, Lý Bí lên ngôi, đặt quốc hiệu là Vạn Xuân.", "VẠN"],
      ["Lý Bí xưng đế với hiệu là gì?", ["Lý Nam Đế", "Lý Thái Tổ", "Lý Nhân Tông", "Lý Thường Kiệt"], 0, "Lý Bí xưng là Lý Nam Đế, khẳng định nền độc lập tự chủ.", "XUÂN"],
      ["Triệu Quang Phục tiếp tục cuộc kháng chiến chống quân Lương ở căn cứ nào?", ["Dạ Trạch", "Hoa Lư", "Cổ Loa", "Tân Trào"], 0, "Dạ Trạch là vùng đầm lầy thuận lợi cho lối đánh du kích của Triệu Quang Phục.", "DẠ"],
      ["Mai Thúc Loan còn được gọi là gì?", ["Mai Hắc Đế", "Bố Cái Đại Vương", "Dạ Trạch Vương", "Tiền Ngô Vương"], 0, "Mai Thúc Loan được nhân dân tôn xưng là Mai Hắc Đế sau cuộc khởi nghĩa chống Đường.", "TRẠCH"],
      ["Phùng Hưng được nhân dân tôn xưng là gì?", ["Bố Cái Đại Vương", "Lý Nam Đế", "An Dương Vương", "Bình Định Vương"], 0, "Phùng Hưng lãnh đạo nhân dân chống nhà Đường và được gọi là Bố Cái Đại Vương.", "BỐ"],
      ["Khúc Thừa Dụ giành quyền tự chủ vào đầu thế kỷ nào?", ["Thế kỷ X", "Thế kỷ VIII", "Thế kỷ VI", "Thế kỷ XIII"], 0, "Năm 905, Khúc Thừa Dụ nắm quyền ở Tống Bình, mở đầu thời kỳ tự chủ lâu dài.", "TỰ"],
      ["Dương Đình Nghệ đánh bại quân Nam Hán năm 931 có ý nghĩa gì?", ["Củng cố nền tự chủ", "Mở đầu thời Nguyễn", "Chấm dứt chiến tranh chống Pháp", "Thành lập nhà Trần"], 0, "Chiến thắng của Dương Đình Nghệ tiếp tục củng cố quyền tự chủ trước trận Bạch Đằng 938.", "CHỦ"]
    ]
  },
  {
    quizId: "ly-tran-dai-viet",
    questions: [
      ["Lý Công Uẩn dời đô ra Đại La vào năm nào?", ["1010", "938", "1075", "1226"], 0, "Năm 1010, Lý Công Uẩn ban Chiếu dời đô, đổi Đại La thành Thăng Long.", "THĂNG"],
      ["Tên Thăng Long có nghĩa gắn với hình ảnh nào?", ["Rồng bay lên", "Hổ ngồi xuống", "Sông lớn", "Núi thiêng"], 0, "Theo truyền thuyết, vua thấy rồng bay lên khi thuyền đến thành Đại La nên đặt tên Thăng Long.", "LONG"],
      ["Triều Lý đổi quốc hiệu Đại Cồ Việt thành gì?", ["Đại Việt", "Đại Ngu", "Việt Nam", "Đại Nam"], 0, "Năm 1054, nhà Lý đặt quốc hiệu là Đại Việt.", "ĐẠI"],
      ["Văn Miếu ở Thăng Long được xây dựng dưới triều nào?", ["Nhà Lý", "Nhà Trần", "Nhà Hồ", "Nhà Nguyễn"], 0, "Văn Miếu được xây dựng năm 1070 dưới thời Lý Thánh Tông.", "VIỆT"],
      ["Quốc Tử Giám được xem là gì trong lịch sử giáo dục Việt Nam?", ["Trường đại học đầu tiên", "Xưởng đóng thuyền", "Kho vũ khí", "Nơi luyện quân"], 0, "Quốc Tử Giám là trung tâm giáo dục cao cấp đầu tiên của nhà nước phong kiến Việt Nam.", "VĂN"],
      ["Lý Thường Kiệt chủ động tiến công sang đất Tống nhằm mục đích gì?", ["Phá thế chuẩn bị xâm lược của Tống", "Mở rộng lãnh thổ đến Trường An", "Buôn bán với phương Bắc", "Tìm vua mới"], 0, "Cuộc tiến công năm 1075 nhằm đánh vào căn cứ chuẩn bị chiến tranh của nhà Tống.", "TỐNG"],
      ["Phòng tuyến Như Nguyệt gắn với cuộc kháng chiến chống quân nào?", ["Quân Tống", "Quân Minh", "Quân Thanh", "Quân Xiêm"], 0, "Năm 1077, quân dân Đại Việt chặn đứng quân Tống trên phòng tuyến sông Như Nguyệt.", "NHƯ"],
      ["Nhà Trần được thành lập vào năm nào?", ["1226", "1010", "1400", "1428"], 0, "Năm 1226, Trần Cảnh lên ngôi, mở đầu triều Trần.", "TRẦN"],
      ["Hội nghị Bình Than thời Trần bàn về vấn đề gì?", ["Kế sách chống quân Nguyên", "Dời đô vào Phú Xuân", "Mở khoa thi đầu tiên", "Cải cách ruộng đất"], 0, "Hội nghị Bình Than tập hợp vương hầu, tướng lĩnh để bàn kế chống quân Nguyên.", "BÌNH"],
      ["Trần Quốc Tuấn soạn tác phẩm nào để khích lệ tướng sĩ?", ["Hịch tướng sĩ", "Bình Ngô đại cáo", "Chiếu dời đô", "Nam quốc sơn hà"], 0, "Hịch tướng sĩ nêu cao lòng yêu nước và trách nhiệm chiến đấu chống ngoại xâm.", "HỊCH"]
    ]
  },
  {
    quizId: "ba-lan-chong-nguyen",
    questions: [
      ["Quân Mông Cổ xâm lược Đại Việt lần thứ nhất vào năm nào?", ["1258", "1285", "1288", "1077"], 0, "Năm 1258, quân Mông Cổ tiến vào Đại Việt nhưng bị nhà Trần đánh bại.", "MÔNG"],
      ["Tướng giặc nào chỉ huy cuộc xâm lược Đại Việt năm 1285?", ["Thoát Hoan", "Lưu Hoằng Tháo", "Sầm Nghi Đống", "De Castries"], 0, "Thoát Hoan chỉ huy đại quân Nguyên xâm lược Đại Việt lần thứ hai.", "NGUYÊN"],
      ["Hội nghị Diên Hồng thể hiện tinh thần gì?", ["Toàn dân quyết chiến", "Đầu hàng để giữ hòa bình", "Dời đô tránh giặc", "Chia cắt đất nước"], 0, "Tiếng hô 'Đánh' của các bô lão biểu tượng cho ý chí quyết chiến của toàn dân.", "DIÊN"],
      ["Trần Hưng Đạo có tên thật là gì?", ["Trần Quốc Tuấn", "Trần Quang Khải", "Trần Nhật Duật", "Trần Khánh Dư"], 0, "Hưng Đạo Vương Trần Quốc Tuấn là tổng chỉ huy nhiều trận đánh chống Nguyên - Mông.", "HỒNG"],
      ["Chiến thắng Hàm Tử năm 1285 gắn với câu nói nào?", ["Hàm Tử bắt quân thù", "Đánh một trận sạch không kình ngạc", "Thần tốc, táo bạo", "Không có gì quý hơn độc lập tự do"], 0, "Hàm Tử là một trong những chiến thắng quan trọng trong cuộc phản công năm 1285.", "HÀM"],
      ["Chiến thắng Chương Dương năm 1285 diễn ra trên tuyến sông nào?", ["Sông Hồng", "Sông Gianh", "Sông Lam", "Sông Tiền"], 0, "Chương Dương là bến sông trên tuyến sông Hồng, nơi quân Trần đánh bại quân Nguyên.", "CHƯƠNG"],
      ["Trận Vân Đồn do tướng nào lập công lớn khi đánh đoàn thuyền lương Trương Văn Hổ?", ["Trần Khánh Dư", "Yết Kiêu", "Dã Tượng", "Phạm Ngũ Lão"], 0, "Trần Khánh Dư đánh tan đoàn thuyền lương, làm quân Nguyên thiếu lương thực.", "VÂN"],
      ["Chiến thắng Bạch Đằng năm 1288 đánh bại đạo quân thủy của ai?", ["Ô Mã Nhi", "Thoát Hoan", "Liễu Thăng", "Tôn Sĩ Nghị"], 0, "Ô Mã Nhi chỉ huy thủy quân Nguyên và bị bắt trong trận Bạch Đằng năm 1288.", "ĐỒN"],
      ["Kế sách 'vườn không nhà trống' thời Trần nhằm mục đích gì?", ["Làm giặc thiếu lương thực", "Dời kinh đô vĩnh viễn", "Tăng thuế nông dân", "Mở đường buôn bán"], 0, "Nhà Trần rút lui chiến lược, sơ tán dân và lương thực để làm địch suy yếu.", "BẠCH"],
      ["Ba lần kháng chiến chống Nguyên - Mông thắng lợi chủ yếu nhờ yếu tố nào?", ["Đoàn kết toàn dân và chỉ huy tài giỏi", "Vũ khí hiện đại hơn hẳn", "Quân Nguyên tự rút lui", "Không có chiến sự lớn"], 0, "Sự đoàn kết vua tôi, quân dân cùng nghệ thuật quân sự linh hoạt tạo nên thắng lợi.", "ĐẰNG"]
    ]
  },
  {
    quizId: "ho-le-so-lam-son",
    questions: [
      ["Nhà Hồ được thành lập vào năm nào?", ["1400", "1226", "1428", "1527"], 0, "Năm 1400, Hồ Quý Ly lên ngôi, lập ra nhà Hồ.", "NHÀ"],
      ["Quốc hiệu Đại Ngu xuất hiện dưới triều đại nào?", ["Nhà Hồ", "Nhà Lý", "Nhà Trần", "Nhà Nguyễn"], 0, "Nhà Hồ đặt quốc hiệu là Đại Ngu với ý nghĩa mong muốn sự yên vui lớn.", "HỒ"],
      ["Quân Minh xâm lược nước ta vào đầu thế kỷ XV với chiêu bài gì?", ["Phù Trần diệt Hồ", "Bảo vệ Đại Việt", "Giúp Tây Sơn", "Chống quân Xiêm"], 0, "Nhà Minh lợi dụng danh nghĩa phù Trần diệt Hồ để xâm lược và đô hộ Đại Việt.", "MINH"],
      ["Khởi nghĩa Lam Sơn bùng nổ năm nào?", ["1418", "1407", "1428", "1789"], 0, "Năm 1418, Lê Lợi dựng cờ khởi nghĩa tại Lam Sơn, Thanh Hóa.", "LAM"],
      ["Lê Lợi xưng là gì khi khởi nghĩa Lam Sơn?", ["Bình Định Vương", "Quang Trung", "Lý Nam Đế", "Gia Long"], 0, "Lê Lợi xưng Bình Định Vương để hiệu triệu nhân dân chống quân Minh.", "SƠN"],
      ["Nguyễn Trãi là tác giả của văn kiện lịch sử nào?", ["Bình Ngô đại cáo", "Hịch tướng sĩ", "Chiếu dời đô", "Tuyên ngôn độc lập 1945"], 0, "Bình Ngô đại cáo tổng kết thắng lợi khởi nghĩa Lam Sơn và tuyên bố nền độc lập.", "BÌNH"],
      ["Chiến thắng Tốt Động - Chúc Động diễn ra trong cuộc kháng chiến nào?", ["Khởi nghĩa Lam Sơn", "Chống Tống thời Lý", "Chống Nguyên thời Trần", "Kháng chiến chống Pháp"], 0, "Đây là chiến thắng lớn của nghĩa quân Lam Sơn trước quân Minh.", "NGÔ"],
      ["Tướng Minh nào bị chém ở Chi Lăng năm 1427?", ["Liễu Thăng", "Thoát Hoan", "Ô Mã Nhi", "Sầm Nghi Đống"], 0, "Liễu Thăng tử trận ở Chi Lăng, làm viện binh Minh tan rã.", "CHI"],
      ["Nhà Lê sơ được thành lập sau thắng lợi nào?", ["Khởi nghĩa Lam Sơn", "Chiến thắng Bạch Đằng 938", "Chiến thắng Ngọc Hồi", "Cách mạng tháng Tám"], 0, "Năm 1428, Lê Lợi lên ngôi, mở đầu triều Lê sơ.", "LÊ"],
      ["Bộ luật nổi tiếng thời Lê sơ là gì?", ["Quốc triều hình luật", "Hồng Đức thiện chính thư", "Gia Long luật lệ", "Luật Hồng Bàng"], 0, "Quốc triều hình luật, thường gọi là Luật Hồng Đức, là bộ luật tiêu biểu thời Lê sơ.", "LUẬT"]
    ]
  },
  {
    quizId: "tay-son-quang-trung",
    questions: [
      ["Phong trào Tây Sơn bùng nổ ở vùng nào?", ["Bình Định", "Thanh Hóa", "Phú Thọ", "Cao Bằng"], 0, "Phong trào Tây Sơn khởi phát ở vùng Tây Sơn, Bình Định.", "TÂY"],
      ["Ba anh em lãnh đạo phong trào Tây Sơn là Nguyễn Nhạc, Nguyễn Huệ và ai?", ["Nguyễn Lữ", "Nguyễn Ánh", "Nguyễn Trãi", "Nguyễn Bỉnh Khiêm"], 0, "Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ là ba thủ lĩnh của phong trào Tây Sơn.", "SƠN"],
      ["Chiến thắng Rạch Gầm - Xoài Mút năm 1785 đánh bại quân nào?", ["Quân Xiêm", "Quân Thanh", "Quân Minh", "Quân Pháp"], 0, "Nguyễn Huệ chỉ huy quân Tây Sơn đánh tan quân Xiêm trên sông Tiền.", "RẠCH"],
      ["Quân Xiêm xâm lược nước ta năm 1785 theo lời cầu viện của ai?", ["Nguyễn Ánh", "Trịnh Sâm", "Lê Chiêu Thống", "Hồ Quý Ly"], 0, "Nguyễn Ánh cầu viện quân Xiêm trong cuộc tranh chấp với Tây Sơn.", "GẦM"],
      ["Nguyễn Huệ lên ngôi hoàng đế lấy niên hiệu là gì?", ["Quang Trung", "Gia Long", "Minh Mạng", "Cảnh Thịnh"], 0, "Cuối năm 1788, Nguyễn Huệ lên ngôi, lấy niên hiệu Quang Trung trước khi ra Bắc.", "QUANG"],
      ["Chiến thắng Ngọc Hồi - Đống Đa diễn ra vào mùa xuân năm nào?", ["1789", "1771", "1802", "1858"], 0, "Tết Kỷ Dậu 1789, Quang Trung đại phá quân Thanh ở Ngọc Hồi - Đống Đa.", "TRUNG"],
      ["Tướng Thanh nào thất bại phải rút chạy khỏi Thăng Long năm 1789?", ["Tôn Sĩ Nghị", "Liễu Thăng", "Ô Mã Nhi", "De Castries"], 0, "Tôn Sĩ Nghị chỉ huy quân Thanh nhưng thua lớn trước cuộc tiến công thần tốc của Quang Trung.", "ĐỐNG"],
      ["Vua Lê nào cầu viện quân Thanh chống Tây Sơn?", ["Lê Chiêu Thống", "Lê Thánh Tông", "Lê Lợi", "Lê Hoàn"], 0, "Lê Chiêu Thống cầu cứu nhà Thanh, tạo cớ cho quân Thanh kéo vào nước ta.", "ĐA"],
      ["Chính sách chữ viết được Quang Trung khuyến khích sử dụng là gì?", ["Chữ Nôm", "Chữ Hán", "Chữ Quốc ngữ hiện đại", "Chữ Phạn"], 0, "Quang Trung coi trọng chữ Nôm trong giáo dục và hành chính.", "CHỮ"],
      ["Điểm nổi bật trong nghệ thuật quân sự của Quang Trung là gì?", ["Hành quân thần tốc và đánh bất ngờ", "Chỉ phòng thủ trong thành", "Không dùng bộ binh", "Tránh mọi trận quyết chiến"], 0, "Quang Trung nổi tiếng với lối hành quân nhanh, táo bạo, đánh vào thời điểm bất ngờ.", "NÔM"]
    ]
  },
  {
    quizId: "nguyen-can-dai",
    questions: [
      ["Triều Nguyễn được thành lập vào năm nào?", ["1802", "1789", "1858", "1945"], 0, "Năm 1802, Nguyễn Ánh lên ngôi Gia Long, lập triều Nguyễn.", "NGUYỄN"],
      ["Kinh đô của triều Nguyễn đặt tại đâu?", ["Huế", "Thăng Long", "Hoa Lư", "Gia Định"], 0, "Huế là kinh đô của triều Nguyễn từ thời Gia Long.", "HUẾ"],
      ["Bộ luật chính thức thời Gia Long thường được gọi là gì?", ["Hoàng Việt luật lệ", "Quốc triều hình luật", "Hình thư", "Luật Hồng Đức"], 0, "Hoàng Việt luật lệ là bộ luật được ban hành dưới triều Gia Long.", "GIA"],
      ["Vua Minh Mạng nổi bật với chính sách nào?", ["Cải cách hành chính", "Dời đô ra Thăng Long", "Mở khoa thi đầu tiên", "Thành lập nước Vạn Xuân"], 0, "Minh Mạng tiến hành cải cách hành chính, chia cả nước thành các tỉnh.", "LONG"],
      ["Quốc hiệu Việt Nam được sử dụng chính thức đầu thời vua nào?", ["Gia Long", "Quang Trung", "Lê Thánh Tông", "Trần Nhân Tông"], 0, "Quốc hiệu Việt Nam được công nhận dưới thời Gia Long.", "VIỆT"],
      ["Năm 1838, vua Minh Mạng đổi quốc hiệu thành gì?", ["Đại Nam", "Đại Việt", "Đại Ngu", "Văn Lang"], 0, "Minh Mạng đổi quốc hiệu thành Đại Nam vào năm 1838.", "NAM"],
      ["Thực dân Pháp nổ súng xâm lược Việt Nam lần đầu tại đâu năm 1858?", ["Đà Nẵng", "Hà Nội", "Gia Định", "Huế"], 0, "Ngày 1/9/1858, liên quân Pháp - Tây Ban Nha nổ súng tấn công Đà Nẵng.", "ĐÀ"],
      ["Sau Đà Nẵng, Pháp chuyển hướng đánh chiếm nơi nào năm 1859?", ["Gia Định", "Thanh Hóa", "Cao Bằng", "Quảng Trị"], 0, "Pháp đánh Gia Định năm 1859 để chiếm vùng kinh tế quan trọng ở Nam Kỳ.", "NẴNG"],
      ["Hiệp ước Nhâm Tuất được ký năm nào?", ["1862", "1883", "1884", "1919"], 0, "Hiệp ước Nhâm Tuất 1862 buộc triều Nguyễn nhượng ba tỉnh miền Đông Nam Kỳ cho Pháp.", "NHÂM"],
      ["Phong trào Cần Vương bùng nổ sau sự kiện nào?", ["Chiếu Cần Vương năm 1885", "Cách mạng tháng Tám", "Khởi nghĩa Yên Bái", "Hiệp định Paris"], 0, "Sau biến cố kinh thành Huế 1885, Tôn Thất Thuyết đưa vua Hàm Nghi ra Chiếu Cần Vương.", "CẦN"]
    ]
  },
  {
    quizId: "phong-trao-yeu-nuoc",
    questions: [
      ["Khởi nghĩa Yên Thế do ai lãnh đạo trong giai đoạn nổi bật nhất?", ["Hoàng Hoa Thám", "Phan Bội Châu", "Phan Châu Trinh", "Nguyễn Thái Học"], 0, "Hoàng Hoa Thám, còn gọi Đề Thám, là thủ lĩnh tiêu biểu của khởi nghĩa Yên Thế.", "YÊN"],
      ["Khởi nghĩa Yên Thế chủ yếu diễn ra ở tỉnh nào hiện nay?", ["Bắc Giang", "Nghệ An", "Quảng Nam", "Bình Định"], 0, "Yên Thế thuộc Bắc Giang là căn cứ lâu dài của nghĩa quân chống Pháp.", "THẾ"],
      ["Phong trào Đông Du do ai khởi xướng?", ["Phan Bội Châu", "Phan Châu Trinh", "Huỳnh Thúc Kháng", "Lương Văn Can"], 0, "Phan Bội Châu vận động thanh niên sang Nhật học tập để tìm đường cứu nước.", "ĐÔNG"],
      ["Mục tiêu chính của phong trào Đông Du là gì?", ["Đưa thanh niên sang Nhật học tập", "Mở nhà máy dệt", "Đàm phán với nhà Thanh", "Lập trường Quốc Tử Giám"], 0, "Đông Du kỳ vọng đào tạo nhân tài và tranh thủ sự giúp đỡ quốc tế cho độc lập dân tộc.", "DU"],
      ["Phan Châu Trinh gắn với xu hướng cứu nước nào?", ["Duy tân cải cách", "Bạo động vũ trang là duy nhất", "Cầu viện quân Xiêm", "Phục hồi nhà Trần"], 0, "Phan Châu Trinh chủ trương khai dân trí, chấn dân khí, hậu dân sinh.", "DUY"],
      ["Đông Kinh Nghĩa Thục được thành lập năm nào?", ["1907", "1911", "1930", "1945"], 0, "Đông Kinh Nghĩa Thục ra đời năm 1907 tại Hà Nội, cổ vũ tư tưởng duy tân.", "TÂN"],
      ["Nguyễn Tất Thành ra đi tìm đường cứu nước từ bến cảng nào?", ["Nhà Rồng", "Hải Phòng", "Đà Nẵng", "Cửa Lò"], 0, "Ngày 5/6/1911, Nguyễn Tất Thành rời bến Nhà Rồng trên tàu Đô đốc Latouche-Tréville.", "NHÀ"],
      ["Nguyễn Tất Thành ra đi tìm đường cứu nước vào năm nào?", ["1911", "1905", "1920", "1930"], 0, "Năm 1911 đánh dấu hành trình tìm đường cứu nước của Nguyễn Tất Thành.", "RỒNG"],
      ["Việt Nam Quốc dân đảng gắn với cuộc khởi nghĩa nào năm 1930?", ["Yên Bái", "Ba Đình", "Hương Khê", "Bãi Sậy"], 0, "Khởi nghĩa Yên Bái do Việt Nam Quốc dân đảng phát động nhưng nhanh chóng thất bại.", "YÊN"],
      ["Lãnh tụ tiêu biểu của Việt Nam Quốc dân đảng là ai?", ["Nguyễn Thái Học", "Nguyễn Ái Quốc", "Trần Phú", "Lê Hồng Phong"], 0, "Nguyễn Thái Học là lãnh tụ của Việt Nam Quốc dân đảng và khởi nghĩa Yên Bái.", "BÁI"]
    ]
  },
  {
    quizId: "cach-mang-1930-1945",
    questions: [
      ["Đảng Cộng sản Việt Nam được thành lập vào ngày nào?", ["3/2/1930", "19/8/1945", "2/9/1945", "7/5/1954"], 0, "Ngày 3/2/1930, Hội nghị hợp nhất các tổ chức cộng sản thành lập Đảng Cộng sản Việt Nam.", "ĐẢNG"],
      ["Hội nghị thành lập Đảng năm 1930 diễn ra ở đâu?", ["Hương Cảng", "Pác Bó", "Tân Trào", "Hà Nội"], 0, "Nguyễn Ái Quốc chủ trì hội nghị hợp nhất tại Hương Cảng.", "CỘNG"],
      ["Cương lĩnh chính trị đầu tiên của Đảng do ai soạn thảo?", ["Nguyễn Ái Quốc", "Trần Phú", "Lê Duẩn", "Võ Nguyên Giáp"], 0, "Nguyễn Ái Quốc soạn thảo Cương lĩnh chính trị đầu tiên, nêu nhiệm vụ giải phóng dân tộc.", "SẢN"],
      ["Phong trào Xô viết Nghệ - Tĩnh diễn ra mạnh mẽ trong những năm nào?", ["1930-1931", "1936-1939", "1941-1945", "1954-1960"], 0, "Xô viết Nghệ - Tĩnh là cao trào cách mạng tiêu biểu giai đoạn 1930-1931.", "NGHỆ"],
      ["Mặt trận Việt Minh được thành lập năm nào?", ["1941", "1930", "1936", "1945"], 0, "Tháng 5/1941, Hội nghị Trung ương 8 quyết định thành lập Mặt trận Việt Minh.", "VIỆT"],
      ["Hội nghị Trung ương 8 năm 1941 diễn ra ở đâu?", ["Pác Bó", "Tân Trào", "Điện Biên", "Sài Gòn"], 0, "Hội nghị họp tại Pác Bó, Cao Bằng, đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.", "MINH"],
      ["Đội Việt Nam Tuyên truyền Giải phóng quân thành lập ngày nào?", ["22/12/1944", "19/8/1945", "3/2/1930", "2/9/1945"], 0, "Ngày 22/12/1944, đội quân chủ lực đầu tiên được thành lập tại Cao Bằng.", "GIẢI"],
      ["Ai là người chỉ huy Đội Việt Nam Tuyên truyền Giải phóng quân khi mới thành lập?", ["Võ Nguyên Giáp", "Trường Chinh", "Phạm Văn Đồng", "Hoàng Văn Thụ"], 0, "Võ Nguyên Giáp được giao tổ chức và chỉ huy đội quân này.", "PHÓNG"],
      ["Quốc dân Đại hội Tân Trào họp vào tháng 8 năm nào?", ["1945", "1941", "1930", "1954"], 0, "Quốc dân Đại hội Tân Trào tháng 8/1945 thông qua chủ trương Tổng khởi nghĩa.", "TÂN"],
      ["Tổng khởi nghĩa tháng Tám giành chính quyền ở Hà Nội vào ngày nào?", ["19/8/1945", "23/8/1945", "25/8/1945", "2/9/1945"], 0, "Ngày 19/8/1945, nhân dân Hà Nội giành chính quyền, tạo khí thế cho cả nước.", "TRÀO"]
    ]
  },
  {
    quizId: "doc-lap-khang-chien-hien-dai",
    questions: [
      ["Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập ở đâu?", ["Quảng trường Ba Đình", "Dinh Độc Lập", "Tân Trào", "Điện Biên Phủ"], 0, "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình.", "BA"],
      ["Nước Việt Nam Dân chủ Cộng hòa ra đời vào ngày nào?", ["2/9/1945", "19/8/1945", "6/3/1946", "7/5/1954"], 0, "Ngày 2/9/1945 là ngày khai sinh nước Việt Nam Dân chủ Cộng hòa.", "ĐÌNH"],
      ["Hiệp định Sơ bộ giữa Việt Nam và Pháp được ký ngày nào?", ["6/3/1946", "14/9/1946", "19/12/1946", "21/7/1954"], 0, "Hiệp định Sơ bộ 6/3/1946 là sách lược ngoại giao nhằm kéo dài thời gian hòa hoãn.", "SƠ"],
      ["Lời kêu gọi Toàn quốc kháng chiến được phát đi vào ngày nào?", ["19/12/1946", "2/9/1945", "7/5/1954", "30/4/1975"], 0, "Đêm 19/12/1946, Chủ tịch Hồ Chí Minh kêu gọi toàn dân đứng lên kháng chiến chống Pháp.", "KHÁNG"],
      ["Chiến dịch Việt Bắc Thu - Đông diễn ra năm nào?", ["1947", "1950", "1954", "1968"], 0, "Năm 1947, quân dân ta đánh bại cuộc tiến công của Pháp lên căn cứ Việt Bắc.", "VIỆT"],
      ["Chiến dịch Biên giới Thu - Đông năm 1950 mở màn bằng trận đánh nào?", ["Đông Khê", "Cao Bằng", "Thất Khê", "Hòa Bình"], 0, "Trận Đông Khê mở màn chiến dịch Biên giới, tạo thế chủ động trên chiến trường.", "BIÊN"],
      ["Chiến dịch Điện Biên Phủ kết thúc thắng lợi vào ngày nào?", ["7/5/1954", "13/3/1954", "21/7/1954", "30/4/1975"], 0, "Ngày 7/5/1954, tập đoàn cứ điểm Điện Biên Phủ bị tiêu diệt hoàn toàn.", "ĐIỆN"],
      ["Hiệp định Genève về Đông Dương được ký năm nào?", ["1954", "1946", "1968", "1973"], 0, "Hiệp định Genève năm 1954 công nhận các quyền dân tộc cơ bản của ba nước Đông Dương.", "GENÈVE"],
      ["Hiệp định Paris về Việt Nam được ký năm nào?", ["1973", "1954", "1968", "1975"], 0, "Hiệp định Paris 1973 buộc Mỹ cam kết chấm dứt chiến tranh, rút quân khỏi Việt Nam.", "PARIS"],
      ["Chiến dịch Hồ Chí Minh toàn thắng vào ngày nào?", ["30/4/1975", "2/9/1945", "7/5/1954", "27/1/1973"], 0, "Ngày 30/4/1975, chiến dịch Hồ Chí Minh kết thúc thắng lợi, đất nước thống nhất.", "THỐNG"]
    ]
  }
];

const ADDITIONAL_QUIZ_CONFIGS = [
  {
    id: "van-lang-au-lac",
    title: "Văn Lang - Âu Lạc",
    description: "Tìm hiểu buổi đầu dựng nước, trống đồng Đông Sơn, thành Cổ Loa và đời sống cư dân Việt cổ.",
    longDescription: "Bộ quiz đưa người học trở về thời đại Hùng Vương và An Dương Vương để nhận diện những nền tảng đầu tiên của lịch sử dân tộc Việt Nam.",
    category: "Dựng nước",
    period: "Thời kỳ dựng nước",
    difficulty: "Dễ",
    playCount: 980,
    rating: 4.7,
    decryptionMessage: "VĂN LANG HÙNG VƯƠNG CỔ LOA ĐÔNG SƠN LẠC VIỆT",
    decryptionExplanation: "Thông điệp tóm lược những dấu mốc, biểu tượng và cộng đồng cư dân tiêu biểu của buổi đầu dựng nước."
  },
  {
    id: "bac-thuoc-dau-tranh",
    title: "Một nghìn năm Bắc thuộc và đấu tranh tự chủ",
    description: "Ôn lại các cuộc khởi nghĩa từ Hai Bà Trưng, Bà Triệu đến Khúc Thừa Dụ và Dương Đình Nghệ.",
    longDescription: "Bộ quiz nhấn mạnh tinh thần không khuất phục của người Việt trong thời kỳ Bắc thuộc và quá trình giành lại quyền tự chủ.",
    category: "Đấu tranh tự chủ",
    period: "Bắc thuộc - tự chủ",
    difficulty: "Trung bình",
    playCount: 1120,
    rating: 4.8,
    decryptionMessage: "HAI BÀ TRIỆU VẠN XUÂN DẠ TRẠCH BỐ TỰ CHỦ",
    decryptionExplanation: "Các từ khóa gợi lại mạch đấu tranh bền bỉ giành quyền tự chủ trước thế kỷ X."
  },
  {
    id: "ly-tran-dai-viet",
    title: "Đại Việt thời Lý - Trần",
    description: "Từ Chiếu dời đô, Văn Miếu - Quốc Tử Giám đến Hịch tướng sĩ và hào khí Đông A.",
    longDescription: "Bộ quiz giới thiệu những thành tựu chính trị, văn hóa, giáo dục và quân sự rực rỡ của Đại Việt thời Lý - Trần.",
    category: "Triều đại phong kiến",
    period: "Thế kỷ XI - XIII",
    difficulty: "Trung bình",
    playCount: 1440,
    rating: 4.9,
    decryptionMessage: "THĂNG LONG ĐẠI VIỆT VĂN TỐNG NHƯ TRẦN BÌNH HỊCH",
    decryptionExplanation: "Thông điệp gợi các dấu mốc quan trọng của Đại Việt thời Lý - Trần."
  },
  {
    id: "ba-lan-chong-nguyen",
    title: "Ba lần kháng chiến chống Nguyên - Mông",
    description: "Theo dấu Diên Hồng, Hàm Tử, Chương Dương, Vân Đồn và Bạch Đằng 1288.",
    longDescription: "Bộ quiz giúp người học nắm các trận đánh, nhân vật và nghệ thuật quân sự đã làm nên thắng lợi trước đế quốc Nguyên - Mông.",
    category: "Kháng chiến thời Trần",
    period: "Thế kỷ XIII",
    difficulty: "Khó",
    playCount: 1710,
    rating: 5.0,
    decryptionMessage: "MÔNG NGUYÊN DIÊN HỒNG HÀM CHƯƠNG VÂN ĐỒN BẠCH ĐẰNG",
    decryptionExplanation: "Chuỗi từ khóa tái hiện những biểu tượng lớn của ba lần kháng chiến chống Nguyên - Mông."
  },
  {
    id: "ho-le-so-lam-son",
    title: "Nhà Hồ - Lam Sơn - Lê sơ",
    description: "Học về cải cách nhà Hồ, khởi nghĩa Lam Sơn, Bình Ngô đại cáo và nhà Lê sơ.",
    longDescription: "Bộ quiz đi qua thời kỳ chống Minh, thắng lợi Lam Sơn và bước phát triển của nhà nước Lê sơ.",
    category: "Khởi nghĩa Lam Sơn",
    period: "Thế kỷ XV",
    difficulty: "Trung bình",
    playCount: 1280,
    rating: 4.8,
    decryptionMessage: "NHÀ HỒ MINH LAM SƠN BÌNH NGÔ CHI LÊ LUẬT",
    decryptionExplanation: "Thông điệp tóm lược chặng đường từ biến động đầu thế kỷ XV đến nền độc lập thời Lê sơ."
  },
  {
    id: "tay-son-quang-trung",
    title: "Tây Sơn và Hoàng đế Quang Trung",
    description: "Ôn lại phong trào Tây Sơn, Rạch Gầm - Xoài Mút và chiến thắng Ngọc Hồi - Đống Đa.",
    longDescription: "Bộ quiz làm nổi bật tài thao lược của Nguyễn Huệ - Quang Trung và những thắng lợi quân sự cuối thế kỷ XVIII.",
    category: "Phong trào Tây Sơn",
    period: "Thế kỷ XVIII",
    difficulty: "Trung bình",
    playCount: 1960,
    rating: 4.9,
    decryptionMessage: "TÂY SƠN RẠCH GẦM QUANG TRUNG ĐỐNG ĐA CHỮ NÔM",
    decryptionExplanation: "Thông điệp kết nối phong trào Tây Sơn với những chiến công và cải cách tiêu biểu của Quang Trung."
  },
  {
    id: "nguyen-can-dai",
    title: "Triều Nguyễn và buổi đầu cận đại",
    description: "Tìm hiểu triều Nguyễn, kinh đô Huế, cải cách Minh Mạng và cuộc xâm lược của thực dân Pháp.",
    longDescription: "Bộ quiz giúp người học nắm bối cảnh Việt Nam đầu thế kỷ XIX đến khi Pháp nổ súng xâm lược.",
    category: "Cận đại",
    period: "1802 - 1885",
    difficulty: "Trung bình",
    playCount: 1010,
    rating: 4.6,
    decryptionMessage: "NGUYỄN HUẾ GIA LONG VIỆT NAM ĐÀ NẴNG NHÂM CẦN",
    decryptionExplanation: "Thông điệp gợi các dấu mốc từ triều Nguyễn đến phong trào Cần Vương."
  },
  {
    id: "phong-trao-yeu-nuoc",
    title: "Phong trào yêu nước đầu thế kỷ XX",
    description: "Từ Yên Thế, Đông Du, Duy Tân đến hành trình ra đi tìm đường cứu nước năm 1911.",
    longDescription: "Bộ quiz giới thiệu các khuynh hướng cứu nước tiêu biểu trước khi Đảng Cộng sản Việt Nam ra đời.",
    category: "Yêu nước cận đại",
    period: "Cuối XIX - đầu XX",
    difficulty: "Trung bình",
    playCount: 920,
    rating: 4.7,
    decryptionMessage: "YÊN THẾ ĐÔNG DU DUY TÂN NHÀ RỒNG YÊN BÁI",
    decryptionExplanation: "Thông điệp nối các phong trào yêu nước tiêu biểu đầu thế kỷ XX."
  },
  {
    id: "cach-mang-1930-1945",
    title: "Cách mạng Việt Nam 1930 - 1945",
    description: "Nắm các mốc thành lập Đảng, Xô viết Nghệ - Tĩnh, Việt Minh, Tân Trào và Tổng khởi nghĩa.",
    longDescription: "Bộ quiz hệ thống những sự kiện then chốt đưa tới thắng lợi Cách mạng tháng Tám năm 1945.",
    category: "Cách mạng Việt Nam",
    period: "1930 - 1945",
    difficulty: "Khó",
    playCount: 1540,
    rating: 4.9,
    decryptionMessage: "ĐẢNG CỘNG SẢN NGHỆ VIỆT MINH GIẢI PHÓNG TÂN TRÀO",
    decryptionExplanation: "Thông điệp khái quát con đường cách mạng từ năm 1930 đến thời cơ Tổng khởi nghĩa."
  },
  {
    id: "doc-lap-khang-chien-hien-dai",
    title: "Độc lập, kháng chiến và thống nhất",
    description: "Ôn lại Tuyên ngôn Độc lập, kháng chiến chống Pháp, Genève, Paris và ngày thống nhất đất nước.",
    longDescription: "Bộ quiz khép lại hành trình lịch sử hiện đại từ năm 1945 đến đại thắng mùa Xuân 1975.",
    category: "Lịch sử hiện đại",
    period: "1945 - 1975",
    difficulty: "Trung bình",
    playCount: 2230,
    rating: 5.0,
    decryptionMessage: "BA ĐÌNH SƠ KHÁNG VIỆT BIÊN ĐIỆN GENÈVE PARIS THỐNG",
    decryptionExplanation: "Thông điệp gợi lại các mốc lớn trong hành trình độc lập, kháng chiến và thống nhất đất nước."
  }
];

const createAdditionalQuizzes = () =>
  ADDITIONAL_QUIZ_CONFIGS.map((config) => {
    const bank = HISTORY_QUESTION_BANK.find((group) => group.quizId === config.id);
    const questions = bank.questions.map(([question, options, correctIndex, explanation, keyword], index) => ({
      id: index + 1,
      question,
      options,
      correctIndex,
      explanation,
      keyword,
      points: 100
    }));

    return {
      ...config,
      questionCount: questions.length,
      author: "Ban Biên Tập Lịch Sử Việt",
      image: "https://images.unsplash.com/photo-1528184039930-bd03972bd974?auto=format&fit=crop&w=600&q=80",
      learningPoints: [
        "Nhận diện các sự kiện, nhân vật và mốc thời gian tiêu biểu.",
        "Hiểu ý nghĩa lịch sử của từng giai đoạn trong tiến trình dân tộc.",
        "Ghi nhớ kiến thức qua cơ chế từ khóa và giải mã thông điệp cuối quiz."
      ],
      rules: [
        "Bộ quiz gồm 10 câu hỏi trắc nghiệm.",
        "Mỗi câu trả lời đúng cộng 100 điểm và mở khóa một từ khóa.",
        "Sau khi hoàn thành câu hỏi, sắp xếp các từ khóa thành thông điệp lịch sử."
      ],
      badges: [
        {
          id: `${config.id}-master`,
          name: "Học Giả " + config.title,
          icon: "📜",
          desc: "Hoàn thành xuất sắc bộ quiz " + config.title
        }
      ],
      questions
    };
  });

export const INITIAL_QUIZZES = [
  ...BASE_QUIZZES,
  ...createAdditionalQuizzes()
];

export const MOCK_LEADERBOARD = [];

export const ALL_BADGES = [
  { id: "newbie", name: "Người Mới Tìm Hiểu Lịch Sử", icon: "🌱", desc: "Mở khóa khi hoàn thành bộ quiz đầu tiên.", unlocked: true, progress: 100 },
  { id: "explorer", name: "Nhà Khám Phá Lịch Sử", icon: "🧭", desc: "Chơi thử 5 bộ quiz lịch sử khác nhau.", unlocked: true, progress: 100 },
  { id: "expert", name: "Bậc Thầy Sử Việt", icon: "🏆", desc: "Đạt tỷ lệ đúng trên 90% ở 10 bộ quiz khác nhau.", unlocked: false, progress: 30 },
  { id: "ten-quiz", name: "Chiến Binh Bền Bỉ", icon: "🛡️", desc: "Hoàn thành xuất sắc 10 bộ quiz.", unlocked: false, progress: 40 },
  { id: "hundred-correct", name: "Học Giả Thông Thái", icon: "📜", desc: "Trả lời chính xác tổng cộng 100 câu hỏi.", unlocked: true, progress: 100 },
  { id: "streak-ten", name: "Bất Khả Chiến Bại", icon: "🔥", desc: "Đạt chuỗi trả lời đúng 10 câu liên tục trong một lượt chơi.", unlocked: false, progress: 80 },
  { id: "decrypt-twenty", name: "Đại Sứ Mật Mã", icon: "🔮", desc: "Giải mã thành công 20 câu thành ngữ/tục ngữ lịch sử.", unlocked: false, progress: 15 },
  { id: "top-one", name: "Đỉnh Cao Vinh Quang", icon: "👑", desc: "Đứng đầu bảng xếp hạng tuần hoặc tháng.", unlocked: false, progress: 0 }
];

export const MOCK_COMMENTS = [];

export const MOCK_ADMIN_STATS = {
  totalUsers: 1,
  totalQuizzes: INITIAL_QUIZZES.length,
  totalPlays: 25420,
  totalComments: 0,
  avgRating: 4.8,
  popularQuiz: "Chiến thắng Điện Biên Phủ",
  recentComments: [],
  playStatsByDay: [
    { date: "11/07", count: 320 },
    { date: "12/07", count: 450 },
    { date: "13/07", count: 390 },
    { date: "14/07", count: 520 },
    { date: "15/07", count: 680 },
    { date: "16/07", count: 810 },
    { date: "17/07", count: 950 }
  ],
  answerDistribution: {
    correct: 68, // %
    incorrect: 32 // %
  }
};
