# 4.1 DOM 큰 그림 이해하기

# DOM

- Document Object Model

## 순서

- 브라우저가 html 파일을 한줄 한줄 읽는다
- 브라우저에서는 모든 태그들을 분석해서 DOM 트리(노드 트리)로 변환시킨다(브라우저가 가지고 있고 이해할 수 있는 자신만의 오브젝트로 변환)

- ⇒ HTML 태그가 JavaScript에서는 Node라는 오브젝트로 변환(이 노드 안에는 태그 안에 작성했던 클래스 또는 텍스트 같은 정보들이 포함됨)

## 특징

- 모든 노드에서 이벤트가 발생할 수 있다
    - Node라는 Object는 EventTarget이라는 오브젝트를 상속(= 모든 Node는 이벤트가 발생할 수 있다)
    - Document도 Node를 상속하기 때문에(=Document도 Node이기 때문에)   Document에서도 이벤트가 발생할 수 있다
    - 이미지나, html 요소들은 element로 변환되는데 element도 node이기 때문에 모든 요소에서도 이벤트가 발생할 수 있다
- HTML태그에는 그에 상응하는 DOM 트리 요소가 있음


# 4.2 우리의 조상 이벤트 타겟

# DOM Node

- DOM Node라는 인터페이스는 우리가 DOM API를 쓰는데 필요한 인터페이스로 Node안에는 Document나 Element 들이 있다.
- Node는 EventTarget을 상속한다(즉 모든 노드는 이벤트타겟이라고 할 수 있다)

[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)

# EventTarget

- 총 3가지의 Methods가 있다
    - addEventListener() : 우리가 계속 썼던 이 아이는 EventTarget에서 지원해주는 API
    - removeEventListener()
    - dispatchEvent()

[EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)


# 4.3 웹페이지 요소 분석(콘솔툴 활용)

```jsx
/* 콘솔창에서 $0 을 출력하면 선택된, 참조된 Elemet 요소가 나타난다 */
$0

/* 선택된 element 안에 있는 모든 Node들을 출력*/
$0.childNodes

/* 선택된 elemet 형제 요소를 출력*/
$0.nextSibling

/* 선택된 elemet 부모 요소를 출력*/
$0.parentNode
```


# 4.4 알면 유용한 CSSOM

# CSSOM(CSS Object Model)

- 브라우저에서 Document Object Model을 만들게 되면 우리가 정의한 CSS를 병합해서 CSSOM이라는 아이를 만들게 됨
- 브라우저가 HTML파일을 Document Object Model로 만들었다면

- DOM과 CSS요소를 병합해서 CSS DOM이라는, 즉 CSS Object Model이라는 트리를 다시 만들게 된다
- 우리가 정의한 스타일 뿐만 아니라 브라우저에서 기본적으로 설정된 모든 속성값들 즉, cascading rule에 따라서 합해진 모든 css값들이 정의되어져 있습니다

# Render Tree

- 브라우저가 우리의 HTML 파일을 읽게 되면 제일 처음 Document Object Model 트리를 만들게 되고,
- 그 다음에 CSS 파일을 읽은 다음에 전부 다 계산해서 최종적으로 확정된 이 CSS 스타일의 트리(CSSOM)을 만들게 된다

- 이 다음에 DOM과 CSSOM을 합해서, 즉 **최종적으로 브라우저에 표기될 아이들**만 Render 트리에 선별되어져서 표기가 된다 (elemet 에 스타일이 display: none 이 정의되어 있으면 Render Tree에서는 보여지지 않게 된다.)



# 4.5 성능 보장 렌더링 순서

# Critical rendering path

- 브라우저에서 url 입력하면
    - reqeust/response → loading → scripting → rendering → layout → painting

- request/response : 브라우저가 서버에게 해당 파일(html파일)을 요청하고 서버는 해당파일을 찾아 응답한다.
- loading : 서버에서 받은 파일을 로딩한다
- scripting : 파일을 한줄한줄 읽어서 DOM 요소로 변환시키고 CSS요소를 CSSOM으로 변환시킨다
- rendering : 렌더링 트리를 만든 다음에
- layout: 각각의 요소들이 어떤 위치에 얼마나 크게 표기될건지 계산을 한 다음에
- painting : 브라우저에 표시하게 된다

## Construction

- html페이지에서 브라우저가 이해할 수 있도록 브라우저만의 언어로 바꾸는 Construction

## Operation

- 브라우저가 이해할 수 있는 rendering tree를 이용해서 구조를 작성하고 어디에다 배치할건지 계산한 다음에 실제로 브라우저 window에 그림을 그려주는 Operation
    - layout : 렌더트리 기반으로 레이아웃을 계산한다
    - paint : 각각의 요소들을 레이어 별로 준비해놓는다
        - 브라우저가 성능 개선을 위해서
    - composition : 레이어를 순서대로 차곡차곡 브라우저 위에다가 표기하면 된다
- animation이 발생할 때, composition 부분만 바뀌는 것이 브라우저 성능면에서 가장 좋다


# 4.8 좌표 실습 성능 개선

- 기존 코드 : mousemove 이벤트가 발생할때마다 left, top을 바꿔주기 때문에 layout 단계부터 렌더링 되기때문에 성능이 낮다.
- 성능개선 코드 : translate 속성을 이용해서 composition 단계에서 렌더링 되도록 하도록 하자

```jsx
const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

addEventListener('load', () => {
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
		tag.style.transform = `translate(${x + 20}px ${y + 20}px)`;
	});
});
```


# 4.10 DOM 조작하기

## **DOM 조작하기**

- 요소(Element) 가져오기

```jsx
const image = document.querySelector('img'); // 처음 요소 1개만
const images = document.querySelectorAll('img'); // 모든 요소를 리스트형태로
```

- 요소(Element) 생성하기

```jsx
const h2 = document.createElement('h2');
```

- 요소(Element) 속성 다루기

```jsx
h2.setAttribute('class', 'title') // 속성값을 변경함
h2.textContent = 'This is a title' // h2 text값 설정
section.appendChild(h2); // 자식요소 추가
```


# 4.11 innerHtml vs element 뭘쓰지?

```jsx
section.innerHtml = ` <img src="" > `
section.createElement('img)
```

- 부분적으로나 수정사항이 변경할 때는 전체적인 html을 수정하는 innerHtml 보다는 element 를 직접 다루는 것이 좋다