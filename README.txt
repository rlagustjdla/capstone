캡스톤디자인 프로젝트

자료공유 관련
models/Material.js
routes/material.js
server.js
controllers/materialController.js
middleware/uploadMiddleware.js
프로젝트에 upload 폴더 생성

게시판 관련
models/Post.js
controllers/postController.js
routes/postRoutes.js
server.js

삭제 관련 인증에 관한 수정
JWT 인증 방식으로 안하고 세션 사용해서 인증
npm install express-session connect-mongo 설치
server.js에 세션 미들웨어 추가
controllers/authController.js 파일에 로그인 부분에 세션 추가

front/scressn/LoginScreen.js 파일에 handleLogin 함수 변경
back/server.js, back/controllers/authController.js 파일에 loginUser 함수 변경