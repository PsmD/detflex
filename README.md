# DETFLEX

### 유저를 위한 영화 추천 웹

<br>

## 🛠 Using

<p align='center'>
    <img src="https://img.shields.io/badge/React-^17.0.2-blue?logo=React"/>
    <img src="https://img.shields.io/badge/react_dom-^17.0.2-blueviolet?logo=ReactOS"/>
    <img src="https://img.shields.io/badge/react_router_dom-^6.3.0-critical?logo=React Table"/>
    <img src="https://img.shields.io/badge/Recoil-^0.6.1-green?logo=recoil"/>
    <img src="https://img.shields.io/badge/Framer Motion-^4.1.17-purple?logo=Framer"/>
    <img src="https://img.shields.io/badge/styled components-^5.3.5-ff69b4?logo=styled-components"/>
</p>

<br>

## 🔖 Development log

<br>

**_`22/04/01`_**

- **Navbar 구현(v1)**

  - hover시 텍스트 박스 scale이 1.1배 증가하는 효과 구현

  - Top에서 투명색인 Navbar 백그라운드 컬러를 스크롤을 60이상 내리면 서서히 애니메이션과 함께 지정한 rgb 색이 나오는 효과 구현 (position을 fixed로 두어 스크롤을 내려도 Navbar가 사라지지 않는다)

<br>

**_`22/04/02`_**

- **Sign In, Sign Up을 위한 Modal창 구현**

  - modal창 위에 Overlay 박스를 두어서 클릭하면 창이 닫히도록 구현

<br>

**_`22/04/03`_**

- **Modal 구현 코드 리팩토링 및 재사용성 증가**

  - ~~공통 modal을 두고 자식 컴포넌트만 변화를 주어 재사용성을 높임~~ 2022/04/04: Sign In과 Sign up modal의 modal 크기가 달라 굳이 할 필요가 없어서 공통 modal 방식 코드 삭제

  - 반복적인 코드 정리

<br>

**_`22/04/04`_**

- **Sign In Modal 스타일 설정**

  - Email adress와 Password로 구성

  - google 로그인 기능 추가 예정

<br>

**_`22/04/05`_**

- **Sign Up Modal 스타일 설정 및 스크롤 방지**

  - User name, Email adress, Password, Confirm password로 구성

  - google 회원가입 기능 추가 예정

  - modal이 켜진 상태에서 스크롤이 작동하던 문제 해결

<br>

**_`22/04/06`_**

- **Navbar Menu에 따라 다른 Movie data fetching**

  - React Hook useEffect has a missing dependency(exhaustive-deps-warning) warning 문구 해결 (usecallback 사용)

  - useParams를 사용하여 구현

<br>

**_`22/04/07`_**

- **API를 가져오는 방식을 fetch에서 axios 방식으로 변경**

  - 기타 Movie cards 내용 수정(Movie detail에만 영화 줄거리 렌더링)

  - e.target.name undefined 문제 getAttribute()로 해결(DOM API가 있는 태그는 그냥 써도 되지만 다른 요소에서는 DOM에 접근할 수 없어서 e.target.name 방식이 작동하지 않는데, 그런 경우 getAttribute()로 원하는 속성 값을 가져올 수 있다)

<br>

**_`22/04/08`_**

- **Navbar 메뉴에 따라 다른 영화 리스트 스타일링(v1)**

  - 영화를 Rating(평점)순으로 정렬하고 20위 까지만 보여준 뒤 밑에 숫자바를 설치해 다음 영화 리스트 페이지로 이동 가능하게 구현

<br>

**_`22/04/09`_**

- **Navbar 메뉴에 따라 다른 영화 리스트 스타일링(v2)**

  - 하단 page number bar 스타일링 (현재 페이지에 해당하는 number는 css zoom을 이용하여 강조)

  - Home 화면 Main slider 초기 세팅 작업

<br>

**_`22/04/11`_**

- **Home 화면 Main slider 구현(v1)**

  - 오른쪽으로 이동할 때와 왼쪽으로 이동할 때 자연스러운 애니메이션 방향 구현

  - 사용자가 슬라이드 이동 버튼을 여러번 빠르게 눌러도 애니메이션이 끝나기 전에는 여러번 눌러지지 않도록 구현

  - index값이 끝에 도달해도 다시 처음으로 돌아오는 무한 슬라이드 구현

  - 슬라이드 왼쪽에 absolute 속성을 준 박스를 두어 텍스트를 작성할 수 있게 세팅하고 이미지는 오른쪽에 정렬

<br>

**_`22/04/12`_**

- **css module --> styled-components 방식으로 변경, Home 화면 Main slider 구현(v2)**

  - 기능에 변화를 주지 않고 styled-components 방식만 채택 (css 코드에 props를 주기 쉽게하기 위함)

  - linear-gradient를 사용하여 텍스트 박스와 슬라이더 사이의 경계선을 흐릿하게 처리

<br>

**_`22/04/14`_**

- **슬라이더 framer-motion --> swiper 방식으로 변경, 영화 데이터 api 사이트 변경 , Home 화면 Main slider 구현(v3)**

  - 기존 api 사이트는 배너 사진이 고해상도가 없고 자료도 너무 한정적이라 변경

  - framer-motion으로는 슬라이더를 만들 때 제한사항이 많아 변경

<br>

**_`22/04/15`_**

- **Navbar 메뉴에 따라 다른 영화 리스트 스타일링(v3) , Home 화면 Main slider 구현(v4)**

  - TMDB 사이트를 기반으로 Navbar 메뉴에 따라 다른 결과값의 영화를 보여주도록 구현

  - Main slider에 자동 재생 기능, 텍스트 박스 애니메이션 기능 추가
