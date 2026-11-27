# SpeakUp English (React)

`../vanila` 정적 사이트를 Vite + React + React Router 로 옮긴 버전입니다. 화면·문구·CSS 는 원본과 동일합니다.

## 실행

```bash
npm install
npm run dev       # 개발 서버 (http://localhost:5173)
npm run build     # dist/ 에 배포용 빌드
npm run preview   # 빌드 결과 미리보기
```

## 구조

```
src/
├─ main.jsx, App.jsx    # 진입점, 라우트
├─ styles.css           # vanila/css/styles.css 그대로
├─ data/                # 강의·후기·FAQ·메뉴 데이터 (내용 수정은 여기서)
├─ components/          # Header, Footer, CourseCard, ReviewCard, Tabs, Reveal, CountUp …
├─ hooks/               # useInView, useHashFilter, usePageMeta
└─ pages/               # Home, About, Courses, CourseDetail, Reviews, Faq, Apply
```

## 경로

| 원본 | React |
|---|---|
| `index.html` | `/` |
| `about.html` · `courses.html` · `reviews.html` · `faq.html` | `/about` · `/courses` · `/reviews` · `/faq` |
| `apply.html?course=slug` | `/apply?course=slug` |
| `courses/beginner.html` 등 | `/courses/:slug` |

`/courses#speaking`, `/reviews#opic` 처럼 해시로 탭 필터를 지정할 수 있습니다.

## 배포 시 주의

BrowserRouter 를 쓰므로, 정적 호스팅에서는 모든 경로를 `index.html` 로 돌려주는 rewrite 설정이 필요합니다
(예: Netlify `_redirects` 에 `/* /index.html 200`, Vercel 은 SPA 자동 처리).
