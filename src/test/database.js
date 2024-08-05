Firestore Database
│
├── users (collection)
│   └── userID (document)
│       ├── email: 사용자 이메일
│       ├── username: 사용자 이름
│       ├── state: user
│       └── joinDate: 가입 날짜
│
├── profileImages (collection)
│   └── userID (document)  // 'users' 컬렉션의 'userID'와 일치합니다.
│       └── url: 프로필 사진 URL
│
├── vocas (collection)
│   └── vocaID (document)
│       ├── category: 카테고리
│       ├── title: 단어장 제목
│       ├── content: 단어장 설명
│       ├── share: 공유 여부
│       ├── createdAt: 생성 날짜
│       ├── coverURL: 단어장 이미지
│       ├── photoURL: 프로필 이미지
│       └── userID: 작성자 ID
│
├── vocaImages (collection)
│   └── vocaID (document)  // 'vocas' 컬렉션의 'userID'와 일치합니다.
│       └── url: 단어장 사진 URL
│
├── favorites (collection)
│   └── favoriteID (document)
│       ├── userID: 즐겨찾기를 추가한 사용자 ID
│       ├── vocaID: 즐겨찾기에 추가된 단어장 ID
│       └── createdAt: 즐겨찾기에 추가된 날짜
│
├── likes (collection)
│   └── likeID (document)
│       ├── userID: 좋아요를 누른 사용자 ID
│       └── vocaID: 좋아요를 받은 단어장 ID
│
├── words (collection)
│   └── wordID (document)
│       ├── vocaID: 소속 단어장 ID
│       ├── userID: 작성자 ID
│       ├── createdAt: 작성 시간
│       ├── index: 단어 순서
│       ├── word: 단어
│       ├── mean: 뜻 (array)
│       └── examples: 예문 (array)
│ 

│
├── studiedWords (collection)
│   └── studiedWordID (document)
│       ├── userID: 학습한 사용자 ID
│       ├── vocaID: 학습된 단어장 ID
│       ├── wordID: 학습된 단어 ID
│       ├── studiedAt: 학습 날짜
│

