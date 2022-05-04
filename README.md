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
    <img src="https://img.shields.io/badge/Styled components-^5.3.5-ff69b4?logo=styled-components"/>
    <img src="https://img.shields.io/badge/Swiper-^8.1.0-6332F6?logo=Swiper"/>
    <img src="https://img.shields.io/badge/Firebase-^9.6.11-yellow?logo=Firebase"/>
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

<br>

**_`22/04/15`_**

- **Navbar 메뉴에 따라 다른 영화 리스트 스타일링(v3) , Home 화면 Main slider 구현(v4)**

  - TMDB 사이트를 기반으로 Navbar 메뉴에 따라 다른 결과값의 영화를 보여주도록 구현

  - Main slider에 자동 재생 기능, 텍스트 박스 애니메이션 추가

<br>

**_`22/04/16`_**

- **Navbar 메뉴에 따라 다른 영화 리스트 스타일링(v4) , 영화 검색 기능 추가**

  - 창 크기가 줄어들면 레이아웃이 무너지는 문제가 발생하여 최상단 컨테이너에 최소 너비, 높이값을 고정값으로 주어 창 크기가 줄어도 움직이지 않도록 수정

  - 키워드를 입력하면 관련 영화를 찾아주는 검색 기능 추가

  - 포스터 이미지가 없는 영화의 경우에 대체하는 이미지 삽입

<br>

**_`22/04/18`_**

- **Movies Pagination 개선(v1)**

  - 전체 영화 페이지가 10페이지를 넘어도 10페이지까지만 보여주던 테스트 코드에 가깝던 상태에서 10페이지씩 나눠서 전체 페이지를 보여주는 로직을 구성하여 보여주도록 개선했지만 아직 다음의 문제가 있음

<br>

1. 페이지 그룹의 마지막 페이지 번호를 누르면 바로 다음 페이지 그룹으로 넘어가버리는 문제

2. 이전으로 가는 버튼 다음으로 가는 버튼의 부재 등의 문제

<br>

빠른 시일내에 모든 문제 해결 예정

<br>

**_`22/04/19`_**

- **Movies Pagination 개선(v2)**

  - 22/04/18의 2번 문제 해결: 맨 처음 페이지, 이전 페이지, 다음 페이지, 마지막 페이지로 갈 수 있는 버튼을 추가, 1페이지라서 이전 버튼을 못누른다거나 하는 등의 그 버튼을 누를 수 없는 상황이 되면 커서 이벤트가 사라지고 색깔이 흐릿하게 변하게 구현했음. 여기까지는 정상 작동. 하지만 아직 다음의 문제가 있음

<br>
  
1. 페이지 그룹의 마지막 페이지를 누르면 저절로 다음 페이지 그룹으로 넘어가는 문제

2. 페이지 번호를 눌러놓은 상태에서 다른 메뉴로 이동하면 눌러놓은 페이지 넘버의 메뉴가 호출되는 문제(예를 들면 Now Playing 메뉴에서 8번 페이지를 눌러 놓고 Top Rating 메뉴로 이동하면 1번 페이지가 아니라 8번 페이지의 Top Rating이 나옴)

<br>

**_`22/04/20`_**

- **Movies Pagination 개선(v3), Search페이지에도 Pagination 장착**

  - 22/04/19의 1번 문제 해결: 페이지 넘버 마지막 번호의 로직을 다음으로 수정 `let lastPaginationNumber = Math.ceil(currentPage / pagesPerList) * pagesPerList;` 기존 방식`let lastPaginationNumber = currentPage - (currentPage % pagesPerList) + pagesPerList;`에서는 마지막 페이지 넘버 ex)10, 20 , 30 ... 부분에서 현재 페이지가 10이면 `lastPaginationNumber`는 20이 출력 돼서 현재 페이지는 10인데 11부터 20이 출력됐다. 현재 방식은 현재 페이지가 1부터 10이면 마지막 페이지 넘버가 10으로 잘 나오게 된다.

  - 22/04/19의 2번 문제 해결: useParams 훅을 이용해서 url의 파라미터 값을 가져오고 그 파라미터 menu값이 바뀔 때마다 useEffect를 사용하여 현재 페이지 넘버 상태를 1로 세팅되게 바꿔서 해결

  ```
  useEffect(() => {
    setCurrentPage(1);
  }, [menu]);
  ```

<br>

**_`22/04/21`_**

- **Home 화면에 서브 슬라이더 추가**

  - 메인 슬라이더 밑에 Up Coming, Popular, Top Rating 슬라이더 추가 구현. View당 5개의 영화가 배치되었고 좌우 네비게이션과 드래그로 카드 이동 가능

  - 일단 지금은 기능 구현 중심으로 코딩을 했지만, 추후 리팩토링 예정

<br>

**_`22/04/22`_**

- **404 페이지 세팅, Firebase 세팅**

  - 지금은 `"/"`로 시작하는 경로에서만 404페이지가 처리 되는 문제가 있음. 빠른 시일 내에 해결 예정

  - Firebase로 회원가입, 로그인 구현 준비 중 예전에 써봤을 때랑 버전이 달라서 아직은 문제가 있음. 빠른 시일 내에 해결 예정

<br>

**_`22/04/23`_**

- **Firebase 기반 회원가입, 로그인 구현(v1)**

  - 회원가입을 하면 firebase Authentication에 유저가 저장되고 로그인할 때 이메일과 비밀번호가 일치하면 로그인 되게 구현했지만, 아직 로그인을 한다고 해서 어떤 것도 바뀌는 것은 없는 상태. 로그인 상태라면 할 수 있는 것들을 추가할 예정

<br>

**_`22/04/26`_**

- **Firebase 기반 회원가입, 로그인 구현(v2) + 로그아웃**

  - 로그인, 회원가입을 할 때 사용자가 틀린 정보를 입력하면 에러 메시지를 커스텀해서 알맞은 자리에 나타나도록 구현

  - 로그인하게 되면 토큰을 지급하고 로그인 상태를 구독하면서 useContext를 사용하여 유저 정보를 담아놓고 전역으로 쓸 수 있게 함. 관련 코드 : `UseAuth.jsx`

  - 로그인 상태라면 Navbar의 Sign In, Sign Up 자리에 My Page, Sign Out이 나오도록 구현했고, My page에서는 User name을 변경하거나, 해당 사용자가 영화 관심(좋아요) 목록, 리뷰를 작성한 영화 카드 링크를 띄울 예정

<br>

**_`22/04/30`_**

- **Movie detail page 댓글 구현(v1)**

  - 댓글을 쓴 장소의 파라미터와 comment value를 Cloud firebase `comments` collection에 문서로 보내놓고 firebase query문을 활용하여 현재 페이지 파라미터 `movieId` 와 같다면 가져오도록 하여 각각의 Movie detail 마다 다른 댓글을 달 수 있도록 구현. 프로필 이미지도 넣을 수 있게하고 댓글에도 좋아요 기능을 추가할 예정

<br>

**_`22/05/02`_**

- **Movie cast(출연진) 슬라이더 초기 세팅**

  - 출연진 이름과 캐릭터 이름을 나타낸 카드를 5장씩 보여주는 슬라이더로 만들어서 Movie detail 페이지에 나타냄

<br>

**_`22/05/04`_**

- **Movie cast(출연진) 슬라이더 구현, Movie detail 페이지 css 수정**

  - 출연진 이름과 캐릭터 이름을 나타낸 카드를 4장씩 보여주는 슬라이더로 만들어서 Movie detail 페이지에 나타냈고 슬라이더 하단에 스크롤바를 이용하거나 드래그 액션으로 슬라이드 이동 가능

<br>

## 📑 Reference

<br>

- 참고 강의: https://nomadcoders.co/react-for-beginners

- 영화 API 제공 사이트: https://www.themoviedb.org/
