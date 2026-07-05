-- ==========================================================================
-- 011_create_portfolio_projects.sql
-- --------------------------------------------------------------------------
-- 바이브코딩 포트폴리오 프로젝트 테이블 생성 및 초기 데이터 적재
-- Supabase 대시보드 > SQL Editor 에서 이 쿼리를 복사하여 실행하시면 됩니다.
-- ==========================================================================

-- 1. 포트폴리오 프로젝트 테이블 생성
create table if not exists portfolio_projects (
    id int primary key, -- 2부터 13까지의 고유 ID를 관리합니다.
    title text not null,
    category text not null,
    icon text not null,
    tags text[] not null, -- 태그 배열
    summary text not null,
    tech text not null,
    details text not null,
    blog_url text, -- 네이버 블로그 주소 (수정 대상)
    created_at timestamptz default now()
);

-- 2. 행 단위 보안 정책(RLS) 활성화 (보안성 우선)
alter table portfolio_projects enable row level security;

-- 3. RLS 보안 정책 정의 (일반 사용자는 오직 읽기만, 인증된 관리자만 수정 가능)
-- (1) 누구나 프로젝트 목록을 조회할 수 있도록 허용
drop policy if exists "Allow public select access" on portfolio_projects;
create policy "Allow public select access" 
on portfolio_projects for select 
using (true);

-- (2) 로그인한 관리자만 블로그 주소(및 데이터)를 업데이트할 수 있도록 허용
drop policy if exists "Allow authenticated update access" on portfolio_projects;
create policy "Allow authenticated update access" 
on portfolio_projects for update 
to authenticated 
using (true) 
with check (true);

-- 4. 12종의 초기 프로젝트 데이터 일괄 적재 (Seed Data)
insert into portfolio_projects (id, title, category, icon, tags, summary, tech, details, blog_url)
values
(2, '바탕화면 투명 달력 위젯', 'widget', 'fa-regular fa-calendar-check', array['Electron', 'Google Calendar API', 'Node.js'], '구글 캘린더 연동 투명 데스크톱 달력', 'Electron, Google APIs Client, Node.js, HTML5/Vanilla CSS UI, 투명 윈도우 IPC 통신', '바탕화면 배경과 조화롭게 어우러지는 반투명 스타일의 데스크톱 달력 위젯입니다. Google Calendar API를 연동하여 개인 일정을 실시간 동기화하며, 마우스 클릭 관통(Click-through) 기능과 자동 배경 고정 설정을 적용해 일상적인 PC 사용에 간섭하지 않도록 특화 설계되었습니다.', 'https://blog.naver.com/kfcman21/224322427336'),

(3, '햄스터 로봇 조종기', 'hardware', 'fa-solid fa-robot', array['Python', 'CustomTkinter', 'Robomation'], '햄스터-S 로봇의 실시간 센서 시각화 및 제어 GUI', 'Python, Roboid 하드웨어 연동 라이브러리, CustomTkinter (현대적인 다크 테마 GUI), Threading 멀티태스킹', '로보메이션 사의 교육용 교구인 ''햄스터-S'' 로봇을 PC에서 무선으로 정밀 제어할 수 있는 프로그램입니다. 로봇의 조도 센서, 근접 센서, 가속도 센서 값을 화면에 실시간 그래프로 시각화해 주며, 키보드 및 가상 조이스틱을 사용해 손쉽게 주행과 LED 컬러 변경, 멜로디 연주가 가능합니다.', ''),

(4, 'KFCMan 시스템 및 인프라', 'backend', 'fa-solid fa-server', array['Docker', 'Nginx', 'Terraform', 'Python'], 'KFCMan 마인드맵/보드 기능 패치 및 OCI 서버 배포 인프라', 'Docker Compose, Nginx 리버스 프록시, Oracle Cloud Infrastructure, Terraform, Shell Scripting', 'KFCMan 시스템의 협업 보드 및 실시간 마인드맵 기능 버그 패치와 대규모 배포를 진행한 프로젝트입니다. 인프라를 수동 구성하지 않고 Terraform 코드로 작성해 OCI(오라클 클라우드) 인스턴스를 즉시 프로비저닝하고, Docker 컨테이너 오케스트레이션을 활용해 Nginx와 백엔드를 안전하게 가동시켰습니다.', 'https://blog.naver.com/kfcman21/224308645434'),

(5, 'NFC 학생 출석 프로그램', 'backend', 'fa-solid fa-id-card', array['Electron', 'SQLite3', 'SerialPort'], 'CR-100 NFC 카드 리더기 연동 로컬 출석 체크 앱', 'Electron Deskop Framework, SQLite3(로컬 DB), Node-SerialPort(NFC 리더기 하드웨어 통신), HTML5/CSS', '학생들이 등하교 시 NFC 카드를 리더기에 접촉하면 자동으로 출석 기록이 SQLite 데이터베이스에 기록되는 데스크톱 프로그램입니다. 학년/반별 학생 명단 관리, 실시간 출결 현황 조회, Excel 파일 형태의 출결 데이터 내보내기 기능을 포함하여 학교 및 교육 기관에서 실용적으로 사용할 수 있습니다.', 'https://blog.naver.com/kfcman21/224329892022'),

(6, '라쿤봇 카메라 손 제어기', 'hardware', 'fa-solid fa-hand-pointer', array['Python', 'OpenCV', 'MediaPipe Hands'], '웹캠 손 인식 제스처 기반 3D 로봇 팔 실시간 제어기', 'Python, MediaPipe Hands(딥러닝 인공지능 비전), OpenCV(영상 처리), Serial 하드웨어 통신', '카메라 웹캠 영상 속 사람의 손마디 위치(Landmarks)를 AI로 실시간 감지하여, 로봇 팔(라쿤봇)의 각 관절각을 제어하는 미래지향적 제어기입니다. 손가락을 펴고 굽히는 제스처를 통해 집게(Gripper)를 잡거나 펴는 3D 동작을 부드럽게 구현해 냈습니다.', ''),

(7, '소프트랩 에듀테크 실증', 'backend', 'fa-solid fa-chart-line', array['Node.js', 'Express', 'Oracle Database'], '서울 에듀테크 실증 평가 보고서 제출 및 관리 백엔드', 'Node.js, Express, Oracle SQL Developer DB 연동, RESTful API 설계, EJS 템플릿 엔진', '에듀테크 소프트웨어 실증 결과를 기록하고 분석하기 위한 웹 백엔드 시스템입니다. 실증 참여 기업들의 평가 결과 점수를 오라클 데이터베이스에 암호화하여 적재하고, 분석된 통계 결과를 차트로 확인할 수 있는 웹 어드민 대시보드 페이지를 포함하고 있습니다.', ''),

(8, 'Uti 윈도우 시스템 관리자', 'widget', 'fa-solid fa-sliders', array['Electron', 'PowerShell', 'Windows API'], '전원/화면/프로그램/시작 앱 원스톱 제어판 데스크톱 앱', 'Electron, Windows API(Node-ffi), PowerShell 스크립트 결합, Node.js OS 라이브러리', '복잡한 윈도우 제어판 설정에 접근할 필요 없이 간편하게 시스템을 유지보수할 수 있는 유틸리티 앱입니다. 모니터 절전모드 예약 해제, 불필요한 시작프로그램 및 서비스 일괄 정리, 네트워크 캐시 초기화 등 핵심 관리 명령을 윈도우 API 및 PowerShell 연동을 통해 원클릭으로 구동합니다.', ''),

(9, '바탕화면 디지털 시계', 'widget', 'fa-regular fa-clock', array['Electron', 'Node.js', 'Windows-API'], '네온 투명 시계, D-day, 알람 및 PC 자동 종료 위젯', 'Electron Transparent Window, CSS3 Neon Keyframe Animation, Node OS 라이브러리', '바탕화면에 떠 있는 스타일리시한 네온 스타일 디지털 시계 위젯입니다. 사용자가 직접 투명도를 조절하고 윈도우 위에 항상 고정되게 만들 수 있습니다. D-Day 디데이 카운트다운 기능 및 지정된 시간이 되면 컴퓨터를 자동으로 종료하는 시스템 명령 타이머 기능이 탑재되어 있습니다.', 'https://blog.naver.com/kfcman21/224322069875'),

(10, '기타 및 개인 자료', 'education', 'fa-solid fa-folder-open', array['HWPX', 'PDF', 'ChromeBook'], '개인 포트폴리오 및 공용 크롬북 코딩 교육 안내문', '교육 문서 패키징, 크롬북 리눅스 개발 환경 설정 가이드라인, HWPX 호환성 설계', '학교 현장의 크롬북 도입에 따른 웹 기반 코딩 개발 환경 설정 가이드라인 및 관련 포트폴리오 문서 모음입니다. 리눅스 가상 머신(Crostini) 설정과 교사용 기기 관리 가이드를 세세하게 한글 문서 및 PDF로 구조화하여 현장 선생님들이 바로 인쇄하여 배포할 수 있는 형태를 제공합니다.', ''),

(11, 'MouseZoomIt', 'widget', 'fa-solid fa-magnifying-glass-plus', array['Electron', 'Node.js', 'ScreenCapture'], '마우스 클릭 기반의 화면 프레젠테이션 및 캡처/녹화 도구', 'Electron 데스크톱 오버레이, desktopCapturer API, WebRTC 스트리밍, 글로벌 단축키 바인딩, 미디어 레코더', '화면을 강조하거나 확대해서 강의할 수 있는 강의/발표 지원용 데스크톱 유틸리티입니다. 화면 어둡게 스포트라이트 처리 및 클릭 잔물결 효과(Alt+1), 캡처 후 마우스 무브 줌 확대(Alt+2), 필기 및 주석을 더하는 영역 캡처(Alt+4) 및 화면 녹화(Alt+6) 기능을 매끄럽게 처리합니다.', ''),

(12, 'SciBit - AI 과학 탐구 기록기', 'backend', 'fa-solid fa-flask', array['Supabase', 'Firebase', 'SQL'], '그림 비밀번호 자체 로그인 및 학생용 과학 탐구 기록 시스템', 'Supabase Database, Row Level Security(RLS) 행 단위 보안 정책 설정, Firebase Hosting 배포, SQL 스키마', '초등학교 현장에서 복잡한 인증 절차 없이 학생들이 자신만의 그림 순서(패턴)로 로그인할 수 있는 맞춤형 탐구 관리 시스템입니다. 센서를 활용한 과학실험 측정치(JSON) 및 결론을 DB에 저장하며, 교사는 로그인 보안 및 데이터 RLS 설정을 통해 안전하게 학급 명단을 관리할 수 있습니다.', ''),

(13, 'ChromeZI - 화면 줌 & 하이라이트', 'education', 'fa-brands fa-chrome', array['ChromeExtension', 'ManifestV3', 'JavaScript'], '크롬북 수업 환경을 위한 Chrome용 ZoomIt 스타일 오버레이 도구', 'Chrome Extension API (Manifest V3), Content Script DOM 조작, Service Worker 백그라운드 이벤트 처리', '윈도우용 유틸리티 설치가 제한된 크롬북 수업 현장에서도 크롬 브라우저 상에서 화면 줌 및 강조 그리기 도구를 사용할 수 있도록 개발된 크롬 확장 프로그램입니다. 단축키(Ctrl+Shift+Z, Ctrl+Shift+H)를 사용해 브라우저 오버레이 창에 실시간으로 마우스 확대 및 그리기 캔버스를 띄워 줍니다.', '')
on conflict (id) do update set
    title = excluded.title,
    category = excluded.category,
    icon = excluded.icon,
    tags = excluded.tags,
    summary = excluded.summary,
    tech = excluded.tech,
    details = excluded.details,
    blog_url = case when portfolio_projects.blog_url is null or portfolio_projects.blog_url = '' then excluded.blog_url else portfolio_projects.blog_url end;
