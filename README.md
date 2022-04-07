# React.JS-movie-web-service (DGFLEX)

### 유저를 위한 영화 추천 웹

<br>

## 🛠 Using

<p align='center'>
    <img src="https://img.shields.io/badge/React-^17.0.2-blue?logo=React"/>
    <img src="https://img.shields.io/badge/react_dom-^17.0.2-blueviolet?logo=ReactOS"/>
    <img src="https://img.shields.io/badge/react_router_dom-^6.3.0-critical?logo=React Table"/>
    <img src="https://img.shields.io/badge/Recoil-^0.6.1-green?logo=recoil"/>
    <img src="https://img.shields.io/badge/Framer Motion-^4.1.17-purple?logo=Framer"/>
</p>

<br>

## 🔖 Development log

<br>

**_`22/04/01`_**

- **Navbar 구현(v1)**

  - hover시 텍스트 박스 scale이 1.1배 증가하는 효과 구현

  - Top에서 투명색인 Navbar 백그라운드 컬러를 스크롤을 60이상 내리면 서서히 애니메이션과 함께 지정한 rgb 색이 나오는 효과 구현 (position을 fixed로 두어 스크롤을 내려도 Navnar가 사라지지 않는다)

<br>

**_`22/04/02`_**

- **Sign In, Sign Up을 위한 Modal창 구현**

  - modal창 위에 Overlay 박스를 두어서 클릭하면 창이 닫히도록 구현

<br>

**_`22/04/03`_**

- **Modal 구현 코드 리팩토링 및 재사용성 증가**

  - 공통 modal을 두고 자식 컴포넌트만 변화를 주어 재사용성을 높임

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

  - e.target.name undefined 문제 getAttribute()로 해결(DOM API가 있는 태그는 그냥 써도 되지만 다른 요소에서는 DOM에 접근할 수 없어서 e.target.name 방식이 작동하지 않는데, 그런 경우 getAttribute()로 원하는 속성 값을 가져올 수 있다!)
