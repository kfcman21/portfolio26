/**
 * ==========================================================================
 * 📂 VibeCoding Portfolio - Javascript Core
 * --------------------------------------------------------------------------
 * 이 파일은 10개의 바이브코딩 프로젝트 데이터를 관리하고, 화면에 동적으로 카드를 그리고,
 * 카테고리 필터링 및 상세 정보 모달 기능을 실행하는 스크립트입니다.
 * 
 * 💡 [사용법] 아래의 projects 배열에 있는 blogUrl을 네이버 블로그에 포스팅한
 * 실제 URL 주소로 변경해주면 해당 프로젝트 카드 클릭 시 블로그로 바로 연결됩니다.
 * ==========================================================================
 */

// 1. 프로젝트 10종 데이터베이스 정의
const projects = [
    {
        id: 1,
        title: "초등 사회 경제 지도안",
        category: "education",
        icon: "fa-solid fa-graduation-cap", // 카드에 보일 아이콘 (FontAwesome)
        tags: ["Education", "Markdown", "HWPX"],
        summary: "초등 4학년 합리적 선택 경제생활 수업 지도안 및 교육용 가이드",
        tech: "마크다운 기반 교육 자료 설계, HWPX 한글 표준 문서 변환 및 구성, 에듀테크 가이드 라인 최적화",
        details: "초등학교 4학년 사회 교과의 '합리적 선택' 단원을 주제로 개발된 모의 상점 및 가상 경제 체험 수업안입니다. 학생들이 놀이와 체험을 통해 합리적인 소비 결정을 스스로 내릴 수 있도록 학습지 양식과 교사용 발문 가이드를 꼼꼼히 구성하였습니다.",
        blogUrl: "https://blog.naver.com/your_naver_id" // 👈 실제 네이버 블로그 URL로 변경하세요!
    },
    {
        id: 2,
        title: "바탕화면 투명 달력 위젯",
        category: "widget",
        icon: "fa-regular fa-calendar-check",
        tags: ["Electron", "Google Calendar API", "Node.js"],
        summary: "구글 캘린더 연동 투명 데스크톱 달력",
        tech: "Electron, Google APIs Client, Node.js, HTML5/Vanilla CSS UI, 투명 윈도우 IPC 통신",
        details: "바탕화면 배경과 조화롭게 어우러지는 반투명 스타일의 데스크톱 달력 위젯입니다. Google Calendar API를 연동하여 개인 일정을 실시간 동기화하며, 마우스 클릭 관통(Click-through) 기능과 자동 배경 고정 설정을 적용해 일상적인 PC 사용에 간섭하지 않도록 특화 설계되었습니다.",
        blogUrl: "https://blog.naver.com/your_naver_id"
    },
    {
        id: 3,
        title: "햄스터 로봇 조종기",
        category: "hardware",
        icon: "fa-solid fa-robot",
        tags: ["Python", "CustomTkinter", "Robomation"],
        summary: "햄스터-S 로봇의 실시간 센서 시각화 및 제어 GUI",
        tech: "Python, Roboid 하드웨어 연동 라이브러리, CustomTkinter (현대적인 다크 테마 GUI), Threading 멀티태스킹",
        details: "로보메이션 사의 교육용 교구인 '햄스터-S' 로봇을 PC에서 무선으로 정밀 제어할 수 있는 프로그램입니다. 로봇의 조도 센서, 근접 센서, 가속도 센서 값을 화면에 실시간 그래프로 시각화해 주며, 키보드 및 가상 조이스틱을 사용해 손쉽게 주행과 LED 컬러 변경, 멜로디 연주가 가능합니다.",
        blogUrl: "https://blog.naver.com/your_naver_id"
    },
    {
        id: 4,
        title: "KFCMan 시스템 및 인프라",
        category: "backend",
        icon: "fa-solid fa-server",
        tags: ["Docker", "Nginx", "Terraform", "Python"],
        summary: "KFCMan 마인드맵/보드 기능 패치 및 OCI 서버 배포 인프라",
        tech: "Docker Compose, Nginx 리버스 프록시, Oracle Cloud Infrastructure, Terraform, Shell Scripting",
        details: "KFCMan 시스템의 협업 보드 및 실시간 마인드맵 기능 버그 패치와 대규모 배포를 진행한 프로젝트입니다. 인프라를 수동 구성하지 않고 Terraform 코드로 작성해 OCI(오라클 클라우드) 인스턴스를 즉시 프로비저닝하고, Docker 컨테이너 오케스트레이션을 활용해 Nginx와 백엔드를 안전하게 가동시켰습니다.",
        blogUrl: "https://blog.naver.com/your_naver_id"
    },
    {
        id: 5,
        title: "NFC 학생 출석 프로그램",
        category: "backend",
        icon: "fa-solid fa-id-card",
        tags: ["Electron", "SQLite3", "SerialPort"],
        summary: "CR-100 NFC 카드 리더기 연동 로컬 출석 체크 앱",
        tech: "Electron Deskop Framework, SQLite3(로컬 DB), Node-SerialPort(NFC 리더기 하드웨어 통신), HTML5/CSS",
        details: "학생들이 등하교 시 NFC 카드를 리더기에 접촉하면 자동으로 출석 기록이 SQLite 데이터베이스에 기록되는 데스크톱 프로그램입니다. 학년/반별 학생 명단 관리, 실시간 출결 현황 조회, Excel 파일 형태의 출결 데이터 내보내기 기능을 포함하여 학교 및 교육 기관에서 실용적으로 사용할 수 있습니다.",
        blogUrl: "https://blog.naver.com/your_naver_id"
    },
    {
        id: 6,
        title: "라쿤봇 카메라 손 제어기",
        category: "hardware",
        icon: "fa-solid fa-hand-pointer",
        tags: ["Python", "OpenCV", "MediaPipe Hands"],
        summary: "웹캠 손 인식 제스처 기반 3D 로봇 팔 실시간 제어기",
        tech: "Python, MediaPipe Hands(딥러닝 인공지능 비전), OpenCV(영상 처리), Serial 하드웨어 통신",
        details: "카메라 웹캠 영상 속 사람의 손마디 위치(Landmarks)를 AI로 실시간 감지하여, 로봇 팔(라쿤봇)의 각 관절각을 제어하는 미래지향적 제어기입니다. 손가락을 펴고 굽히는 제스처를 통해 집게(Gripper)를 잡거나 펴는 3D 동작을 부드럽게 구현해 냈습니다.",
        blogUrl: "https://blog.naver.com/your_naver_id"
    },
    {
        id: 7,
        title: "소프트랩 에듀테크 실증",
        category: "backend",
        icon: "fa-solid fa-chart-line",
        tags: ["Node.js", "Express", "Oracle Database"],
        summary: "서울 에듀테크 실증 평가 보고서 제출 및 관리 백엔드",
        tech: "Node.js, Express, Oracle SQL Developer DB 연동, RESTful API 설계, EJS 템플릿 엔진",
        details: "에듀테크 소프트웨어 실증 결과를 기록하고 분석하기 위한 웹 백엔드 시스템입니다. 실증 참여 기업들의 평가 결과 점수를 오라클 데이터베이스에 암호화하여 적재하고, 분석된 통계 결과를 차트로 확인할 수 있는 웹 어드민 대시보드 페이지를 포함하고 있습니다.",
        blogUrl: "https://blog.naver.com/your_naver_id"
    },
    {
        id: 8,
        title: "Uti 윈도우 시스템 관리자",
        category: "widget",
        icon: "fa-solid fa-sliders",
        tags: ["Electron", "PowerShell", "Windows API"],
        summary: "전원/화면/프로그램/시작 앱 원스톱 제어판 데스크톱 앱",
        tech: "Electron, Windows API(Node-ffi), PowerShell 스크립트 결합, Node.js OS 라이브러리",
        details: "복잡한 윈도우 제어판 설정에 접근할 필요 없이 간편하게 시스템을 유지보수할 수 있는 유틸리티 앱입니다. 모니터 절전모드 예약 해제, 불필요한 시작프로그램 및 서비스 일괄 정리, 네트워크 캐시 초기화 등 핵심 관리 명령을 윈도우 API 및 PowerShell 연동을 통해 원클릭으로 구동합니다.",
        blogUrl: "https://blog.naver.com/your_naver_id"
    },
    {
        id: 9,
        title: "바탕화면 디지털 시계",
        category: "widget",
        icon: "fa-regular fa-clock",
        tags: ["Electron", "Node.js", "Windows-API"],
        summary: "네온 투명 시계, D-day, 알람 및 PC 자동 종료 위젯",
        tech: "Electron Transparent Window, CSS3 Neon Keyframe Animation, Node OS 라이브러리",
        details: "바탕화면에 떠 있는 스타일리시한 네온 스타일 디지털 시계 위젯입니다. 사용자가 직접 투명도를 조절하고 윈도우 위에 항상 고정되게 만들 수 있습니다. D-Day 디데이 카운트다운 기능 및 지정된 시간이 되면 컴퓨터를 자동으로 종료하는 시스템 명령 타이머 기능이 탑재되어 있습니다.",
        blogUrl: "https://blog.naver.com/your_naver_id"
    },
    {
        id: 10,
        title: "기타 및 개인 자료",
        category: "education",
        icon: "fa-solid fa-folder-open",
        tags: ["HWPX", "PDF", "ChromeBook"],
        summary: "개인 포트폴리오 및 공용 크롬북 코딩 교육 안내문",
        tech: "교육 문서 패키징, 크롬북 리눅스 개발 환경 설정 가이드라인, HWPX 호환성 설계",
        details: "학교 현장의 크롬북 도입에 따른 웹 기반 코딩 개발 환경 설정 가이드라인 및 관련 포트폴리오 문서 모음입니다. 리눅스 가상 머신(Crostini) 설정과 교사용 기기 관리 가이드를 세세하게 한글 문서 및 PDF로 구조화하여 현장 선생님들이 바로 인쇄하여 배포할 수 있는 형태를 제공합니다.",
        blogUrl: "https://blog.naver.com/your_naver_id"
    }
];

// 2. DOM 요소 선택
const projectsGrid = document.getElementById("projects-grid");
const filterTabs = document.querySelectorAll(".filter-tab");

// 모달창 요소
const modal = document.getElementById("project-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalCloseBackdrop = document.getElementById("modal-close-backdrop");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalTags = document.getElementById("modal-tags");
const modalSummary = document.getElementById("modal-summary");
const modalTech = document.getElementById("modal-tech");
const modalDetails = document.getElementById("modal-details");
const modalBlogLink = document.getElementById("modal-blog-link");

// 3. 프로젝트 카드 동적 렌더링 함수
function renderProjects(filterCategory = "all") {
    // 컨테이너 초기화
    projectsGrid.innerHTML = "";
    
    // 카테고리 필터링
    const filteredProjects = filterCategory === "all" 
        ? projects 
        : projects.filter(p => p.category === filterCategory);
        
    // 필터링된 데이터를 순회하며 HTML 카드 생성
    filteredProjects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        
        // 카드 내부에 들어갈 HTML 구조 작성
        card.innerHTML = `
            <div>
                <div class="card-header">
                    <div class="card-icon-wrapper">
                        <i class="${project.icon}"></i>
                    </div>
                    <span class="card-badge">${getCategoryName(project.category)}</span>
                </div>
                <h3 class="card-title">${project.title}</h3>
                <p class="card-desc">${project.summary}</p>
                <div class="card-tags">
                    ${project.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            </div>
            <div class="card-footer">
                <button class="card-btn card-btn-detail" onclick="openProjectModal(${project.id})">
                    <i class="fa-solid fa-magnifying-glass"></i> 상세 정보
                </button>
                <a href="${project.blogUrl}" target="_blank" class="card-btn card-btn-blog">
                    <i class="fa-solid fa-square-n text-naver"></i> 블로그 보기
                </a>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });
}

// 4. 영문 카테고리명을 한국어로 변환해주는 헬퍼 함수
function getCategoryName(category) {
    switch (category) {
        case "widget": return "데스크톱 위젯";
        case "hardware": return "로봇 & AI (교구)";
        case "backend": return "에듀테크 & 백엔드";
        case "education": return "교육 자료";
        default: return "기타";
    }
}

// 5. 카테고리 필터 탭 클릭 이벤트 바인딩
filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // 기존 액티브 탭 클래스 제거
        filterTabs.forEach(t => t.classList.remove("active"));
        
        // 클릭한 탭 액티브 활성화
        tab.classList.add("active");
        
        // 필터 조건 읽어오기
        const filterValue = tab.getAttribute("data-filter");
        
        // 카드 렌더링
        renderProjects(filterValue);
    });
});

// 6. 모달 창 열기 함수
window.openProjectModal = function(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    // 모달 데이터 바인딩
    modalCategory.textContent = getCategoryName(project.category);
    modalTitle.textContent = project.title;
    modalSummary.textContent = project.summary;
    modalTech.textContent = project.tech;
    modalDetails.textContent = project.details;
    modalBlogLink.href = project.blogUrl;
    
    // 태그 리스트 생성
    modalTags.innerHTML = project.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
    
    // 모달 활성화 및 body 스크롤 차단
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
};

// 7. 모달 창 닫기 함수
function closeProjectModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
}

// 모달 닫기 이벤트 리스너 설정 (X 버튼 및 배경 클릭 시)
modalCloseBtn.addEventListener("click", closeProjectModal);
modalCloseBackdrop.addEventListener("click", closeProjectModal);

// ESC 키를 누르면 모달이 닫히도록 설정
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeProjectModal();
    }
});

// 8. 초기 로드 시 전체 리스트 렌더링
document.addEventListener("DOMContentLoaded", () => {
    renderProjects("all");
});
