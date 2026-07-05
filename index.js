/**
 * ==========================================================================
 * 📂 VibeCoding Portfolio - Javascript Core (Firebase Config Updated)
 * --------------------------------------------------------------------------
 * 이 파일은 Firebase를 연동하여 포트폴리오 데이터를 불러오고 관리자 로그인을 처리합니다.
 * 
 * 💡 [보안 및 설정 가이드]
 * 1. 사용자의 실제 SciBit Firebase 프로젝트 설정 키가 정상적으로 기입되었습니다.
 * 2. 관리자 로그인 후 화면 상단의 [Firestore 데이터 초기 셋업] 버튼을 누르면
 *    12종의 초기 프로젝트 데이터가 사용자의 Firestore DB에 자동으로 즉시 적재됩니다.
 * ==========================================================================
 */

// 1. 🔥 Firebase 프로젝트 설정 정보 (실제 SciBit 프로젝트 연동 완료)
const firebaseConfig = {
    apiKey: "AIzaSyDRlGgmzwT8nVUXg82Kd60rumBrmMRzn10",
    authDomain: "scibit-7359f.firebaseapp.com",
    projectId: "scibit-7359f",
    storageBucket: "scibit-7359f.firebasestorage.app",
    messagingSenderId: "251134120206",
    appId: "1:251134120206:web:c53305635aaaa6fc50c75f",
    measurementId: "G-JY5E4PNVJ3"
};

let db = null;
let auth = null;
let projects = []; // DB 또는 백업 데이터가 채워질 프로젝트 목록 배열
let currentEditingProjectId = null; // 현재 상세 모달창에 열려있는 프로젝트 ID

// Firebase SDK 로드 확인 후 초기화 진행
if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== 'YOUR_API_KEY') {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
}

// 2. 🗄️ Firebase 연결이 안 되었을 때 사용할 로컬 백업 데이터 (안전장치)
const localBackupProjects = [
    {
        id: 2,
        title: "바탕화면 투명 달력 위젯",
        category: "widget",
        icon: "fa-regular fa-calendar-check",
        tags: ["Electron", "Google Calendar API", "Node.js"],
        summary: "구글 캘린더 연동 투명 데스크톱 달력",
        tech: "Electron, Google APIs Client, Node.js, HTML5/Vanilla CSS UI, 투명 윈도우 IPC 통신",
        details: "바탕화면 배경과 조화롭게 어우러지는 반투명 스타일의 데스크톱 달력 위젯입니다. Google Calendar API를 연동하여 개인 일정을 실시간 동기화하며, 마우스 클릭 관통(Click-through) 기능과 자동 배경 고정 설정을 적용해 일상적인 PC 사용에 간섭하지 않도록 특화 설계되었습니다.",
        blogUrl: "https://blog.naver.com/kfcman21/224322427336"
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
        blogUrl: ""
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
        blogUrl: "https://blog.naver.com/kfcman21/224308645434"
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
        blogUrl: "https://blog.naver.com/kfcman21/224329892022"
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
        blogUrl: ""
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
        blogUrl: ""
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
        blogUrl: ""
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
        blogUrl: "https://blog.naver.com/kfcman21/224322069875"
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
        blogUrl: ""
    },
    {
        id: 11,
        title: "MouseZoomIt",
        category: "widget",
        icon: "fa-solid fa-magnifying-glass-plus",
        tags: ["Electron", "Node.js", "ScreenCapture"],
        summary: "마우스 클릭 기반의 화면 프레젠테이션 및 캡처/녹화 도구",
        tech: "Electron 데스크톱 오버레이, desktopCapturer API, WebRTC 스트리밍, 글로벌 단축키 바인딩, 미디어 레코더",
        details: "화면을 강조하거나 확대해서 강의할 수 있는 강의/발표 지원용 데스크톱 유틸리티입니다. 화면 어둡게 스포트라이트 처리 및 클릭 잔물결 효과(Alt+1), 캡처 후 마우스 무브 줌 확대(Alt+2), 필기 및 주석을 더하는 영역 캡처(Alt+4) 및 화면 녹화(Alt+6) 기능을 매끄럽게 처리합니다.",
        blogUrl: ""
    },
    {
        id: 12,
        title: "SciBit - AI 과학 탐구 기록기",
        category: "backend",
        icon: "fa-solid fa-flask",
        tags: ["Supabase", "Firebase", "SQL"],
        summary: "그림 비밀번호 자체 로그인 및 학생용 과학 탐구 기록 시스템",
        tech: "Supabase Database, Row Level Security(RLS) 행 단위 보안 정책 설정, Firebase Hosting 배포, SQL 스키마",
        details: "초등학교 현장에서 복잡한 인증 절차 없이 학생들이 자신만의 그림 순서(패턴)로 로그인할 수 있는 맞춤형 탐구 관리 시스템입니다. 센서를 활용한 과학실험 측정치(JSON) 및 결론을 DB에 저장하며, 교사는 로그인 보안 및 데이터 RLS 설정을 통해 안전하게 학급 명단을 관리할 수 있습니다.",
        blogUrl: ""
    },
    {
        id: 13,
        title: "ChromeZI - 화면 줌 & 하이라이트",
        category: "education",
        icon: "fa-brands fa-chrome",
        tags: ["ChromeExtension", "ManifestV3", "JavaScript"],
        summary: "크롬북 수업 환경을 위한 Chrome용 ZoomIt 스타일 오버레이 도구",
        tech: "Chrome Extension API (Manifest V3), Content Script DOM 조작, Service Worker 백그라운드 이벤트 처리",
        details: "윈도우용 유틸리티 설치가 제한된 크롬북 수업 현장에서도 크롬 브라우저 상에서 화면 줌 및 강조 그리기 도구를 사용할 수 있도록 개발된 크롬 확장 프로그램입니다. 단축키(Ctrl+Shift+Z, Ctrl+Shift+H)를 사용해 브라우저 오버레이 창에 실시간으로 마우스 확대 및 그리기 캔버스를 띄워 줍니다.",
        blogUrl: ""
    }
];

// 3. DOM 요소 선택
const projectsGrid = document.getElementById("projects-grid");
const filterTabs = document.querySelectorAll(".filter-tab");

// 모달창 요소들
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

// 관리자 로그인 모달 요소들
const loginModal = document.getElementById("login-modal");
const navLoginBtn = document.getElementById("nav-login-btn");
const navLogoutBtn = document.getElementById("nav-logout-btn");
const loginModalCloseBtn = document.getElementById("login-modal-close-btn");
const loginModalCloseBackdrop = document.getElementById("login-modal-close-backdrop");
const loginForm = document.getElementById("login-form");
const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const loginErrorMsg = document.getElementById("login-error-msg");

// 관리자 전용 편집 및 제어 요소들
const adminControlBar = document.querySelector(".admin-control-bar");
const adminModeIndicator = document.getElementById("admin-mode-indicator");
const adminSeedBtn = document.getElementById("admin-seed-btn");
const adminUrlEditContainer = document.getElementById("admin-url-edit-container");
const adminBlogUrlInput = document.getElementById("admin-blog-url-input");
const adminSaveBtn = document.getElementById("admin-save-btn");
const adminEditStatus = document.getElementById("admin-edit-status");

// 4. 🗄️ Firestore로부터 프로젝트 데이터 조회 함수
async function fetchProjects() {
    if (!db) {
        console.warn("Firebase가 연결되지 않았습니다. 로컬 백업 데이터를 사용합니다.");
        projects = [...localBackupProjects];
        renderProjects("all");
        return;
    }
    
    try {
        const snapshot = await db.collection('portfolio_projects').orderBy('id').get();
        const dataList = [];
        
        snapshot.forEach(doc => {
            dataList.push(doc.data());
        });
        
        if (dataList.length > 0) {
            projects = dataList.map(item => ({
                id: item.id,
                title: item.title,
                category: item.category,
                icon: item.icon,
                tags: item.tags,
                summary: item.summary,
                tech: item.tech,
                details: item.details,
                blogUrl: item.blogUrl || ""
            }));
            console.log("Firestore로부터 데이터를 정상적으로 불러왔습니다.");
        } else {
            console.log("Firestore 컬렉션이 비어있습니다. 백업 데이터를 노출합니다.");
            projects = [...localBackupProjects];
        }
    } catch (e) {
        console.error("데이터 로드 중 에러가 발생하여 백업 데이터를 사용합니다: ", e);
        projects = [...localBackupProjects];
    }
    
    renderProjects("all");
}

// 5. 프로젝트 카드 동적 렌더링 함수
function renderProjects(filterCategory = "all") {
    projectsGrid.innerHTML = "";
    
    const filteredProjects = filterCategory === "all" 
        ? projects 
        : projects.filter(p => p.category === filterCategory);
        
    filteredProjects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        
        const blogButtonHtml = project.blogUrl && project.blogUrl.trim() !== ""
            ? `<a href="${project.blogUrl}" target="_blank" class="card-btn card-btn-blog" id="btn-blog-${project.id}">
                   <i class="fa-solid fa-square-n text-naver"></i> 블로그 보기
               </a>`
            : "";
        
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
                ${blogButtonHtml}
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });
}

function getCategoryName(category) {
    switch (category) {
        case "widget": return "데스크톱 위젯";
        case "hardware": return "로봇 & AI (교구)";
        case "backend": return "에듀테크 & 백엔드";
        case "education": return "교육 자료";
        default: return "기타";
    }
}

// 6. 카테고리 필터 탭 클릭 이벤트 바인딩
filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        filterTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const filterValue = tab.getAttribute("data-filter");
        renderProjects(filterValue);
    });
});

// 7. 프로젝트 상세 정보 모달 열기 함수
window.openProjectModal = function(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    currentEditingProjectId = projectId;
    
    modalCategory.textContent = getCategoryName(project.category);
    modalTitle.textContent = project.title;
    modalSummary.textContent = project.summary;
    modalTech.textContent = project.tech;
    modalDetails.textContent = project.details;
    
    if (project.blogUrl && project.blogUrl.trim() !== "") {
        modalBlogLink.href = project.blogUrl;
        modalBlogLink.style.display = "inline-flex";
    } else {
        modalBlogLink.href = "#";
        modalBlogLink.style.display = "none";
    }
    
    adminBlogUrlInput.value = project.blogUrl;
    adminEditStatus.textContent = "";
    
    modalTags.innerHTML = project.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
    
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
};

// 모달 닫기
function closeProjectModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
    currentEditingProjectId = null;
}

modalCloseBtn.addEventListener("click", closeProjectModal);
modalCloseBackdrop.addEventListener("click", closeProjectModal);

// 8. 🔑 관리자 로그인/로그아웃 로직 구현

// 로그인 모달 열기
navLoginBtn.addEventListener("click", () => {
    loginErrorMsg.style.display = "none";
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
    loginModal.classList.add("active");
    loginModal.setAttribute("aria-hidden", "false");
});

// 로그인 모달 닫기
function closeLoginModal() {
    loginModal.classList.remove("active");
    loginModal.setAttribute("aria-hidden", "true");
}

loginModalCloseBtn.addEventListener("click", closeLoginModal);
loginModalCloseBackdrop.addEventListener("click", closeLoginModal);

// 로그인 폼 제출 이벤트 처리
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginErrorMsg.style.display = "none";
    
    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value;
    
    if (!auth) {
        loginErrorMsg.textContent = "Firebase Auth가 구성되지 않았습니다.";
        loginErrorMsg.style.display = "block";
        return;
    }
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log("관리자 로그인 성공:", userCredential.user.email);
        closeLoginModal();
    } catch (error) {
        console.error("로그인 실패:", error);
        loginErrorMsg.textContent = "이메일 또는 비밀번호가 올바르지 않습니다.";
        loginErrorMsg.style.display = "block";
    }
});

// 로그아웃 처리
navLogoutBtn.addEventListener("click", async () => {
    if (auth) {
        await auth.signOut();
        console.log("로그아웃 되었습니다.");
    }
});

// 관리자 로그인 상태에 따른 UI 제어 함수
function updateUIForAuth(user) {
    const isLoggedIn = !!user;
    
    if (isLoggedIn) {
        navLoginBtn.style.display = "none";
        navLogoutBtn.style.display = "inline-flex";
        
        if (adminControlBar) adminControlBar.style.display = "flex";
        adminModeIndicator.style.display = "inline-flex";
        adminUrlEditContainer.style.display = "block";
    } else {
        navLoginBtn.style.display = "inline-flex";
        navLogoutBtn.style.display = "none";
        
        if (adminControlBar) adminControlBar.style.display = "none";
        adminModeIndicator.style.display = "none";
        adminUrlEditContainer.style.display = "none";
    }
}

// 9. 💾 실시간 블로그 주소 저장 기능
adminSaveBtn.addEventListener("click", async () => {
    if (!db || !currentEditingProjectId) return;
    
    adminEditStatus.className = "edit-status-msg";
    adminEditStatus.textContent = "저장 중...";
    
    const newUrl = adminBlogUrlInput.value.trim();
    
    try {
        await db.collection('portfolio_projects').doc(currentEditingProjectId.toString()).update({
            blogUrl: newUrl
        });
            
        const targetProject = projects.find(p => p.id === currentEditingProjectId);
        if (targetProject) {
            targetProject.blogUrl = newUrl;
        }
        
        const activeTab = document.querySelector(".filter-tab.active");
        const currentFilter = activeTab ? activeTab.getAttribute("data-filter") : "all";
        renderProjects(currentFilter);
        
        if (newUrl !== "") {
            modalBlogLink.href = newUrl;
            modalBlogLink.style.display = "inline-flex";
        } else {
            modalBlogLink.href = "#";
            modalBlogLink.style.display = "none";
        }
        
        adminEditStatus.className = "edit-status-msg edit-status-success";
        adminEditStatus.innerHTML = "<i class='fa-solid fa-check'></i> 성공적으로 Firestore에 저장되었습니다!";
        
    } catch (e) {
        console.error("데이터 저장 오류:", e);
        adminEditStatus.className = "edit-status-msg edit-status-error";
        adminEditStatus.innerHTML = "<i class='fa-solid fa-circle-exclamation'></i> 저장에 실패했습니다. (권한 없음 또는 규칙 차단)";
    }
});

// 10. 🛠️ Firestore 초기 데이터 일괄 셋업 기능 (Seed Data)
adminSeedBtn.addEventListener("click", async () => {
    if (!db) {
        alert("Firebase DB가 초기화되지 않았습니다. config 설정을 확인해 주세요.");
        return;
    }
    
    if (!confirm("Firestore에 12개의 바이브코딩 초기 프로젝트 데이터를 일괄 생성하시겠습니까?\n(이미 존재하는 문서는 덮어씁니다.)")) {
        return;
    }
    
    adminSeedBtn.disabled = true;
    adminSeedBtn.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> 세팅 진행 중...";
    
    try {
        const batch = db.batch();
        
        localBackupProjects.forEach(project => {
            const docRef = db.collection('portfolio_projects').doc(project.id.toString());
            batch.set(docRef, project);
        });
        
        await batch.commit();
        
        alert("🎉 성공적으로 Firestore에 12대 프로젝트 초기 데이터가 셋업되었습니다!");
        fetchProjects();
    } catch (e) {
        console.error("초기 데이터 생성 중 에러:", e);
        alert("데이터 생성에 실패했습니다. Firebase Console의 보안 규칙(Rules) 설정을 확인해 주세요.");
    } finally {
        adminSeedBtn.disabled = false;
        adminSeedBtn.innerHTML = "<i class='fa-solid fa-cloud-arrow-up'></i> Firestore 데이터 초기 셋업";
    }
});

// ESC 및 모달 닫기
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (modal.classList.contains("active")) closeProjectModal();
        if (loginModal.classList.contains("active")) closeLoginModal();
    }
});

// 11. 🚀 페이지 초기 로드 시 동작 실행
document.addEventListener("DOMContentLoaded", () => {
    if (auth) {
        auth.onAuthStateChanged((user) => {
            console.log(`인증 세션 이벤트 감지: ${user ? '로그인됨' : '로그아웃됨'}`);
            updateUIForAuth(user);
        });
    }
    
    fetchProjects();
});
