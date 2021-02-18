# API

- Application Programming Interfaces(API) : 소프트웨어 프로그램(애플리케이션) 내부에 존재하는 기능 및 규칙의 집합
- OS, 플랫폼(유튜브 등등)에서 제공하는 API를 이용해서 간단한 웹 어플리케이션 또는 모바일 어플리케이션을 만들 수 있음
- User Storage 라는 클래스에서 로그인을 할 수 있고 로그아웃을 할 수 있는 함수들이 있다면, User Storage 라는 클래스 안에 login, logout 두 가지의 API가 있다고 말할 수 있음
    - **API를 통해서 로그인을 하고 로그아웃을 할 수 있는 기능을 수행할 수 있다..**

# WEB APIs

- 브라우저마다 공통적으로 제공하기로 약속한 API들이 굉장히 많음
    - DOM APIs
        - DOM(Document Object Model)은 웹페이지에 있는 요소들을 생성하거나 삭제하거나 또는 스타일을 바꾸는, 조작하는 기능을 제공
    - Network APIs
        - 서버와 통신할 수 있는 기능
    - Graphics APIs
        - ex) Canvas, WebGL 등과 같은 그래픽에 관련된 API
    - Audio/Video APIs
        - 오디오, 비디오를 재생하거나 중지하는 등 멀티미디어에 관련된 API
    - Device APIs
        - Device가 오프라인인지, 온라인인지 디바이스의 상태정보를 받아볼 수 있는 API
    - File APIs
        - 사용자의 파일을 읽거나 저장하는 API
    - Storage APIs
        - 사용자의 정보를 저장할 수 있는 Storage 관련 API

- **API들을 이용하기 위해서 브라우저에서 제공하는 인터페이스나 오브젝트를 사용**
    - 객체에 들어있는 함수를 통해서 우리가 원하는 기능을 수행

- Web APIs Security
    - 브라우저는 사용자의 정보를 보호할 의무가 있기 때문에 정보보안에 민감!!
    - 어떤 Web APIs는 사용자의 권한 요청이나 HTTPs에서만 동작할 수 있는 API가 있음
    - **HTTP는 서버가 어떻게 통신하는지에 관한 통신규약을 정해 놓은 것**인데,
    - Hypertext Transfer Protocal, 클라이언트가 서버에게 정보를 요청하고(request) 받아오는(response) 방식으로 이루어져 있음
    - **HTTPs(Hypertext Transfer Protocal Secure)는 정보를 주고 받는 상황에서 보안처리가 잘 된**

# Browswer 구조 분석
- 브라우저에서 웹페이지를 열게 되면 **Window 라는 전체적인 오브젝트가 존재(현재 열려있는 전체적인 창을 의미)**
- **페이지가 표기되는 부분이 Document 오브젝트**
- DOM(Document Object Model)을 통해서 새로운 요소를 추가하거나 삭제하는 것들이 가능
- BOM(Browser Object Model)안에 브라우저와 관련된 navigator, location 등등의 API가 있음
- Window 는 글로벌 오브젝트


# 윈도우 사이즈

- window.screen : 해상도, 모니터 사이즈(브라우저 바깥까지 다 포함)
- window.outer : 전체적인 브라우저 사이즈(url, tab 모두 포함)
- window.inner : url, tab 뺀 브라우저 사이즈 (스크롤바 포함)
- documentElement.clientWidth : 문서 자체를 의미(스크롤바 제외한 영역 사이즈)

# 코드

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Window Size</title>
    <style>
        .tag {
            display: inline-block;
            background: thistle;
            padding: 16px;
            margin-top: 16px;
            font-size: 48px;
        }
    </style>
</head>
<body>
    <div class="tag">Window Size</div>
    <script>
        function updateTag() {
            tag.innerHTML = `
                window.screen: ${window.screen.width}, ${window.screen.height} <br/>
                window.outer: ${window.outerWidth}, ${window.outerHeight} <br/>
                window.inner: ${window.innerWidth}, ${window.innerHeight} <br/>
                documentElement.clientWidth: ${document.documentElement.clientWidth}, document.documentElement.clientHeight: ${window.innerHeight}
            `;
        }

        const tag = document.querySelector('.tag');

        window.addEventListener('resize', () => {
            updateTag();
        });
        updateTag();
    </script>
</body>
</html>
```

# 좌표

- 왼쪽 상단이 기준(0,0)으로 좌표

# Element.getBoudingClientRect()

- getBoudingClientRect는 element 오브젝트 안에 들어 있는 API, 즉 함수
- Element는 브라우저 위에 올라가 있는 DOM

- 주의할 점
    - CSS의 bottom은 요소가 브라우저 아래 기준으로 얼마나 떨어져 있는지
    - CSS의 right는 요소가 브라우저 오른쪽에서 얼마나 떨어져 있는지
    - Element의 getBoundingClientRect bottom은 브라우저 위에서 얼만큼 떨어져 있는지
    - Element의 getBoundingClientRect rightsms 브라우저 왼쪽에서 얼만큼 떨어져 있는지

# Client x,y vs Page x,y

- 사용자가 클릭을 하면 **`event`** 발생
- **`event`** 라는 오브젝트가 → 리스너에 전달됨
- **`event`** 에는 Client X와 Y라는 값이 들어감
    - ClientX, Y : 사용자가 보는 페이지에 상관없이 **브라우저에서  window 창에서 X와 Y 값**
    - PageX, Y : **페이지 자체, 문서 자체에서 떨어져 있는 X와 Y를 의미**

```jsx
event.clientX
event.clientY
event.pageX
event.pageY
```

[Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

# 실습

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Window Coordinates</title>
    <style>
        body {
            background-color: black;
            /* overflow: hidden; */
        }
        div {
            width: 250px;
            height: 250px;
            background-color: blanchedalmond;
            margin-bottom: 4px;
            border-radius: 4px;
        }
        .special {
            background-color: lightsalmon;
        }
    </style>
</head>
<body>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div class="special"></div>
    <div></div>
    <div></div>
    <script>
        const special = document.querySelector('.special');
        special.addEventListener('click', (event) => {
            const rect = special.getBoundingClientRect();
            console.log(rect);
            console.log(`client : ${event.clientX}, ${event.clientY}`);
            console.log(`page : ${event.pageX}, ${event.pageY}`);
        });
    </script>
</body>
</html>
```

참고 링크 : 

[Window.scroll()](https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll)

# Scroll

- window.scroll(x-coord, y-coord)
- window.scroll(options)

# ScrollBy()

- 파라미터 값만큼 씩 스크롤 됨
- window.scrollBy(x-coord, y-coord)

# ScrollTo()

- 괄호 안 좌표로 이동
- window.scrollTo(x-coord, y-coord)

# ScrollIntoView

- 요소(element) 위치로 이동
- element.scrollIntoView()

# Window load

```html
/* DOMContentLoaded */
// only document, HTML만 로딩이 완료되면 호출
// javascript 파일이 이미지나 폰트에 대해서 뭔가 수행하지 않는 이상 DOMContentLoaded 안에서 동작을 수행하는 것이 조금 더 빠름
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
});

/* load */
// after resources, window에서 페이지에 필요한 모든 리소스(css, images)가 다운 완료된 이후에 호출
window.addEventListener('load', () => {
    console.log('load');
});

/* beforeunload */
// 모든 리소스가 해제되기 이전에 호출
window.addEventListener('beforeunload', () => {
    console.log('beforeunload');
    alert('beforeunload');
});

/* unload */
// 모든 리소스가 해제된 이후에 호출
window.addEventListener('unload', () => {
    console.log('unload');
    alert('unload');
```