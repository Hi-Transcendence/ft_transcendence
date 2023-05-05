# ft_transcendence

<img src="https://user-images.githubusercontent.com/40191730/236456603-e3865efd-e3fe-476b-89bc-f9c6ed811d9d.gif"/><br/>

과학기술정보통신부가 운영하는 [42Seoul](https://42seoul.kr/seoul42/main/view)의 **2년 교육과정의 마지막 프로젝트** 입니다. <br/>
5인 팀 프로젝트로, 회원제 실시간 핑퐁 게임 매칭 서비스로서 친구 관리, 채팅, 게임, 랭킹 등의 기능을 제공합니다.<br/>

## 팀 소개 (5인)

-   [`KimDae-hyun`](https://github.com/KimDae-hyun) 프로젝트 매니저, 프론트엔드 개발
-   [`jyhyun97`](https://github.com/jyhyun97) 프론트엔드 개발
-   [`benelus94`](https://github.com/benelus94) 백엔드 개발 - 채팅
-   [`dev-samin`](https://github.com/dev-samin) 백엔드 개발 - 인증
-   [`owel-dev`](https://github.com/owel-dev) 백엔드 개발 - 게임

## 기술 스택

### Client

`HTML` `CSS` `TypeScript` `React`

### Server

`TypeScript` `Nest.js` `PostgreSQL` `Nginx` `Docker` `Docker-compose`

## 디렉토리 구조

-   `client` React 프로젝트 파일
    -   `public` 이미지 파일, index.html
    -   `src`
        -   `components`
        -   `pages`
        -   `styles`
        -   `types`
        -   `utils`
-   `Server` NestJS 프로젝트 파일
    -   `src`
        -   `auth-jwt`
        -   `auth` 로그인, 로그아웃, 2차 인증
        -   `ban` 유저 차단
        -   `channel` 로비에 방 목록 표시와 관련된 기능
        -   `chat` 채팅 방 설정, 채팅 기능
        -   `common`
        -   `connect`
        -   `database`
        -   `friend` 친구 관련 기능
        -   `game` 게임 관련 기능
        -   `match` 게임 매칭과 유저 전적 관련 기능
        -   `stats` 랭킹 관련 기능
        -   `users` 유저 프로필과 관련된 기능

## 실행 방법

1. `git clone git@github.com:Hi-Transcendence/ft_transcendence.git`
2. `cd ft_transcendence`
3. `루트`, `client`, `server` 경로에 각각 `.env` 파일 추가.
4. 루트 경로에서 `docker compose up` 실행.

## 기능

### 보안

-   사용자 비밀번호는 DB에 암호화 되어 저장됩니다.
-   사용자 입력에 대한 SQL Injection 방어.

### 회원

-   42seoul Oauth 로그인 기능.
-   로그인 후 이메일 발송을 통해 2차 인증 기능 제공.
-   사용자 아이콘에 로컬 이미지 업로드 기능 제공.

### 친구

-   다른 사용자 친구 추가.
-   친구 추가한 사용자의 상태 추적 가능(온 오프라인, 대기 중, 게임 중).
-   친구 추가한 사용자에게 게임 신청 기능 제공.
-   친구 추가한 사용자에게 DM 보내기 기능 제공.

### 채팅

-   채팅방에 참여한 사람들과 채팅 기능 제공.
-   채팅방에 참여한 사람들에게 게임 신청 기능 제공.
-   특정 사용자 차단 기능.
-   게임방 관리자의 특정 유저 강퇴 및 음소거 기능 제공.

### 게임

-   로비에서 실시간 게임 매칭 기능 제공.
-   3가지 게임 모드 제공 (일반, 우주 맵, 게임 속도 증가)
-   브라우저 새로고침 되어도 게임 재개 기능 제공

### 랭킹

-   랭킹 페이지에서 사용자별 승,패,순위 보기 기능 제공.
