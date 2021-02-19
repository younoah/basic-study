### DOM(DocumentObjectModel)

>  DOM은 자바스크립트와 같은 프로그래밍 언어가 문서의 구조에 접근할 수 있는 방법을 제공하고, 변경할 수 있게 해준다는 것입니다.

브라우저가 html파일을 한줄 한줄씩 읽으면서 브라우저가 이해할 수 있도록 자신들만의 오브젝트나무, 즉 DOM 트리로 만들어 간다. 또한 메모리에 저장할 수 있도록 하기위해  DOM트리로 변환한다.

HTML의 Tag를 JavaScript의 Node라는 오브젝트로 변환한다.

이 Node의 오브젝트안에는 태그, 텍스트 등 모든 정보를 포함하고 있다.

DOM으로 바꾼 HTML은 자바스크립트가 조작할 수 있다.



### Node 상속 관계

![Node](/Users/uno/Desktop/Node.png)

노드라는 오브젝트는 EventTarget 객체를 상속받는다. 

Document, Element, Text 등등 은 Node 객체를 상속 받는다.

Element는 다양한 Element 자식들을 상속하고 있다.



### DOM 트리 예시

![dom-tree](/Users/uno/Desktop/dom-tree.png)



### BOM(BrowserObjectModel)

웹 브라우저 환경의 다양한 기능을 객체처럼 다루는 모델

- **1) window**: Global Context. 브라우저 창 객체
- **2) screen**: 사용자 환경의 디스플레이 정보 객체
- **3) location**: 현재 페이지의 url을 다루는 객체
- **4) navigator**: 웹브라우저 및 브라우저 환경 정보 객체
- **5) history**: 현재의 브라우저가 접근했던 URL history



## 렌더링



### CSSOM(CSS Object Model)

![CSSOM1](/Users/uno/Desktop/CSSOM1.png)



브라우저에서 DOM을 만들게 되면 CSS와 병합해서 CSSSOM을 만들어 낸다.

CSSOM에는 정의한 스타일뿐만 아니라 브라우저에서 기본적으로 설정된 모든 속성값들, 즉 cascading룰에 따라서 합해진 모든 css 값을이 정의되어있다.



### 렌더트리

![renderTree](/Users/uno/Desktop/renderTree.png)



처음엔 DOM을 만들고 DOM을 참고하여 CSSOM을 만들어낸다.

이후 DOM과 CSSOM을 합해서 최종적으로 브라우저에 표기될 아이들만 선별해서 RenderTree가 작성된다.

렌더트리에는 Document에 보여질 애들만 작성이 되는데 head같은 정보를 담는 노드는 렌더트리에 작성되지 않는다.



**눈에 보이지 않는 옵션의 렌더트리**

display: 0  - 렌더트리에 작성되지 않는다.

opacity: 0 or visibility: hidden - 렌더트리에는 작성이 되고 눈에만 보이지 않는다.



## 렌더링 프로세스

![renderProcess](/Users/uno/Desktop/renderProcess.png)



- **requests/response** : 브라우저가 서버에게 html 파일을 요청, 서버에 request를 하면 가장먼저 index.html을 받아오고 그 파일안에서 링크된 필요한 파일들(CSS,JS)을 받아오고, 필요한 리소스(이미지, 폰트)들을 순차적으로 서버에서 받아옴
- **loading** : html 파일을 서버에서 받아 로딩
- **scripting** : html 파일을 읽어 DOM 요소로 변환(DOM 트리 생성), CSS 스타일을 모두 계산해서 CSSOM 트리 생성
- **rendering** : DOM 트리 + CSSOM 트리 → 브라우저에 표기될 요소들만 선별하여 Render Tree 생성
- **layout** : Render Tree 각 요소들의 위치와 크기 계산
- **painting** : 그림 그리기**



**html 파일을 브라우저가 이해할 수 있도록 브라우저의 언어로 바꾸는 Construction part**

→ DOM, CSSOM, Render Tree를 만드는 부분



**Construction part 에서 생성된 Render Tree를 이용해서 브라우저 window에 표기할 요소의 위치, 크기 등을 계산하고 그림을 그리는 operation part**

→ layout, paint, composition을 거쳐서 사용자에게 보여주는 부분



- Construction 

DOM요소로 변환하고 CSSOM을 만들고 최종적으로 렌더트리를 만드는것 까지이다.



- operation

레이아웃, 페인트, 컴포지션을 통해서 웹페이지를 보여준다.



레이아웃 : 렌더트리 기반으로 레이아웃을 계산한다.

페인트 : 그려질 대상들을 레이어(층)을 구성하여 준비한다.

컴포지션 : 최종적으로 준비된 대상들을 조합하여 완료한다.

> 빠른 렌더링을 위해서는 컴포지션만 일어나도록 구성하는것이 좋다.
>
> 컴포지션 > 페인트 > 레이아웃 순으로 속도가 빠르게 진행된다.



## eventTarget

> 모든 Node는 eventTaget이다.



- 이벤트 리스너 등록

```javascript
EventTarget.addEventListener()
```



- 이벤트 리스너 삭제

```javascript
EventTarget.removeEventListener()
```



- 특정 인벤트 발행

```javascript
EventTarget.dispatchEvent()
```





## 성능 개선하기

- 기존코드

```javascript
const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

document.addEventListener('mousemove', event => {
  const x = event.clientX;
  const y = event.clientY;

  vertical.style.left = `${x}px`;
  horizontal.style.top = `${y}px`;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  tag.style.left = `${x}px`;
  tag.style.top = `${y}px`;
  tag.innerHTML = `${x}px ${y}px`;
});
```

마우스가 움직일 때마다 top, left를 바꾸는 코드이다. 하지만 top, left를 바꾸면 레이아웃부터 발생하기 때문에 렌더링 속도가 느리다. 따라서 **translate** 을 사용하게되면 composite만 발생할 수 있기 때문에 개선해보자.



- 성능개선

```javascript
const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');
//추가
const targetRect = target.getBoundingClientRect();
const targetHalfwidth = targetRect.width / 2;
const targetHalfheight = targetRect.height / 2;

document.addEventListener('mousemove', event => {
  const x = event.clientX;
  const y = event.clientY;

  vertical.style.transform = `translateX(${x}px)`;
  horizontal.style.transform = `translateY(${y}px)`;
  target.style.transform = `translate(${x - targetHalfwidth}px, ${
    y - targetHalfheight
  }px)`;
  tag.style.transform = `translate(${x}px, ${y}px)`;
  tag.innerHTML = `${x}px ${y}px`;
});
```



> ❗️성능개선 확인방법
>
> 개발툴 -> Performance탭 에서 확인가능!



## DOM 조작하기



- 요소(Element) 가져오기

```javascript
const $header = document.querySelector('h1'); // 첫 번째 1개만
const $header = document.querySelectorAll('h1'); // 모든 요소를 리스트형태로
```



- 요소(Element) 생성하기

```javascript
const $tag = document.createElement('tag');
```



- 요소(Element) 속성 다루기

```javascript
elem.hasAttribute(name) // 속성 존재 여부 확인
elem.getAttribute(name) // 속성값을 가져옴
elem.setAttribute('class', 'title') // 속성값을 변경함
elem.removeAttribute(name) // 속성값을 지움
elem.attributes // 속성의 컬렉션을 반환함
```



- 노드 / 요소 삽입 삭제하기

```javascript
node.append(노드나 문자열) // node 끝에 노드를 삽입
node.before(노드나 문자열) // node 이전에 노드를 삽입
node.remove() // node를 제거
```



- 탐색 프로퍼티

```javascript
// 노드 탐색
node.parentNode
node.childNodes
node.firstChild
node.lastChild
node.previousSibling
node.nextSibling

// 요소 탐색
element.parentElement
element.children
element.firstElementChild
element.lastElementChild
element.previousElementSibling
element.nextElementSibling
```



## innerHTML로 삽입하기 vs element생성후 삽입하기

아래 2가지 방식은 동일한 결과를 보여준다. 

동적으로 사용할 일이 많다면 element생성 방식을

한번 만들어 놓고 변경사항이 없다면 innerHTML 방식을 사용하면 깔끔하다.

- element생성후 삽입하기

```javascript
const section = docuement.querySelector('section');
const h2 = docuement.creatElement('h2');

h2.setAttribute('class', 'title');
h2.textContent = 'this is a title';

section.append(h2);
```



- innerHTML로 삽입하기

```javascript
section.innerHTML = `
	...
	<h2 class="title">this is a title</h2>
`
```

