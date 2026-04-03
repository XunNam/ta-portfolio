export const defaultSiteSettings = {
  brandLogo: null,
  brandText: 'Portfolio.',
  footer: {
    copyrightText: 'Bùi Thế Anh.',
    customYear: 2026,
    links: [],
    noticeText:
      'LƯU Ý: TRANG WEB NÀY ĐƯỢC TẠO BỞI AI VÀ DÀNH CHO MỤC ĐÍCH NGHIÊN CỨU VÀ HỌC TẬP, CŨNG NHƯ CÁC THÔNG TIN TRÊN KHÔNG CÓ BẤT KỲ GIÁ TRỊ THỰC TẾ NÀO.\nTRANG WEB NÀY KHÔNG ĐƯỢC CÔNG KHAI, NẾU BẰNG CÁCH NÀO ĐÓ BẠN VÀO ĐƯỢC TRANG NÀY, HÃY THÔNG BÁO CHO MÌNH BIẾT QUA EMAIL SAU HOẶC RỜI ĐI. CẢM ƠN BẠN\n[bui.theanh@outlook.com]',
    showYear: true,
    socialLinks: [],
    useCurrentYear: false,
  },
  meta: {
    canonicalUrl: '',
    metaDescription:
      'Portfolio cá nhân của Bùi Thế Anh, tập trung vào trải nghiệm web mượt mà và thiết kế hiện đại.',
    metaKeywords: [
      { keyword: 'portfolio' },
      { keyword: 'payload cms' },
      { keyword: 'full stack developer' },
    ],
    metaTitle: 'Portfolio - Bùi Thế Anh',
    robots: 'index,follow',
  },
  navbarLinks: [
    { label: 'Giới thiệu', linkType: 'section', openInNewTab: false, sectionId: 'about' },
    { label: 'Kỹ năng', linkType: 'section', openInNewTab: false, sectionId: 'skills' },
    { label: 'Dự án', linkType: 'section', openInNewTab: false, sectionId: 'projects' },
    { label: 'Liên hệ', linkType: 'section', openInNewTab: false, sectionId: 'contact' },
  ],
  siteName: 'Portfolio - Bùi Thế Anh',
}

export const defaultHomePage = {
  about: {
    items: [
      {
        description: 'Giải quyết vấn đề phức tạp bằng những giải pháp đơn giản và hiệu quả.',
        iconName: 'cpu',
        title: 'Tư duy Logic',
        visualType: 'namedIcon',
      },
      {
        description: 'Luôn đảm bảo deadline và chất lượng code cao nhất trong mọi dự án.',
        iconName: 'briefcase',
        title: 'Chuyên nghiệp',
        visualType: 'namedIcon',
      },
      {
        description: 'Hòa đồng, tích cực và luôn sẵn sàng hỗ trợ đồng đội cùng phát triển.',
        iconName: 'users',
        title: 'Làm việc nhóm',
        visualType: 'namedIcon',
      },
    ],
    sectionIntro: '',
    sectionTitle: 'Về bản thân',
  },
  contact: {
    copyValue: 'bui.theanh@outlook.com',
    description:
      'Nếu cậu đang tìm kiếm một lập trình viên tâm huyết hoặc chỉ muốn trò chuyện về công nghệ, đừng ngần ngại liên hệ nhé!',
    emailAddress: 'bui.theanh@outlook.com',
    primaryCTA: {
      emailAddress: 'bui.theanh@outlook.com',
      label: 'Gửi Email Ngay',
      linkType: 'email',
      openInNewTab: false,
    },
    secondaryCTA: {
      label: 'Sao chép Email',
      linkType: 'custom',
      openInNewTab: false,
      url: '',
    },
    sectionTitle: 'Sẵn sàng cho dự án mới?',
  },
  hero: {
    avatar: null,
    description:
      'Tớ là một lập trình viên đam mê tạo ra những trải nghiệm web mượt mà và đẹp mắt. Luôn tìm kiếm những thử thách mới và cơ hội để học hỏi công nghệ tiên tiến.',
    eyebrow: '👋 Xin chào, tớ là',
    floatingBadge: {
      enabled: true,
      iconName: 'code',
      iconType: 'named',
      label: 'Kinh nghiệm',
      value: '1+ Năm',
    },
    name: 'Bùi Thế Anh',
    primaryCTA: {
      label: 'Liên hệ ngay',
      linkType: 'section',
      openInNewTab: false,
      sectionId: 'contact',
    },
    roleTitle: 'Full Stack Developer',
    secondaryCTA: {
      label: 'Xem CV',
      linkType: 'custom',
      openInNewTab: true,
      url: '',
    },
    socialLinks: [
      {
        iconName: 'github',
        iconType: 'named',
        label: 'GitHub',
        linkType: 'custom',
        openInNewTab: true,
        url: 'https://github.com/XunNam',
      },
      {
        emailAddress: 'bui.theanh@outlook.com',
        iconName: 'mail',
        iconType: 'named',
        label: 'Email',
        linkType: 'email',
        openInNewTab: false,
      },
    ],
  },
  projectsSection: {
    featuredOnly: true,
    limit: 3,
    sectionIntro: 'Một số sản phẩm tâm đắc mà tớ đã thực hiện',
    sectionTitle: 'Dự án tiêu biểu',
    viewAllLink: {
      label: 'Xem tất cả',
      linkType: 'custom',
      openInNewTab: false,
      url: '',
    },
  },
  skills: {
    sectionIntro: 'Công nghệ tớ sử dụng để xây dựng sản phẩm',
    sectionTitle: 'Kỹ năng chuyên môn',
    softSkills: [
      { label: 'Giao tiếp', sortOrder: 0 },
      { label: 'Quản lý thời gian', sortOrder: 1 },
      { label: 'Tiếng Anh', sortOrder: 2 },
      { label: 'Tự học', sortOrder: 3 },
      { label: 'Thuyết trình', sortOrder: 4 },
      { label: 'Agile/Scrum', sortOrder: 5 },
    ],
    technicalSkills: [
      { name: 'React / Next.js', sortOrder: 0 },
      { name: 'TypeScript', sortOrder: 1 },
      { name: 'Node.js', sortOrder: 2 },
      { name: 'Tailwind CSS', sortOrder: 3 },
    ],
    workPhilosophyQuote: '"Code không chỉ là viết mã, mà là nghệ thuật giải quyết vấn đề."',
    workPhilosophyTitle: 'Phương châm làm việc 🚀',
  },
}

export const defaultProjects = [
  {
    buttonLabel: 'Xem chi tiết',
    buttonUrl: '',
    featured: true,
    iconName: 'briefcase',
    openInNewTab: false,
    shortDescription:
      'Hệ thống quản lý bán hàng với giao diện trực quan, tích hợp thống kê real-time.',
    slug: 'e-commerce-dashboard',
    sortOrder: 0,
    status: 'published',
    tags: [{ tag: 'React' }, { tag: 'Node.js' }, { tag: 'MongoDB' }],
    title: 'E-Commerce Dashboard',
    visualType: 'namedIcon',
  },
  {
    buttonLabel: 'Xem chi tiết',
    buttonUrl: '',
    featured: true,
    iconName: 'smartphone',
    openInNewTab: false,
    shortDescription:
      'Ứng dụng đặt vé du lịch, khách sạn với trải nghiệm người dùng tối ưu trên mobile.',
    slug: 'travel-booking-app',
    sortOrder: 1,
    status: 'published',
    tags: [{ tag: 'React Native' }, { tag: 'Firebase' }],
    title: 'Travel Booking App',
    visualType: 'namedIcon',
  },
  {
    buttonLabel: 'Xem chi tiết',
    buttonUrl: '',
    featured: true,
    iconName: 'layout',
    openInNewTab: false,
    shortDescription:
      'Trang web giới thiệu bản thân với thiết kế hiện đại, tối giản và hiệu năng cao.',
    slug: 'portfolio-ca-nhan',
    sortOrder: 2,
    status: 'published',
    tags: [{ tag: 'React' }, { tag: 'Tailwind' }],
    title: 'Portfolio Cá Nhân',
    visualType: 'namedIcon',
  },
]
