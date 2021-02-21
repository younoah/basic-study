# 6.1 Events 정확하게 이해 하기 + 종류들

## 이벤트가 발생하는 경우

- mouse click
- keyboard
- resizing window
- close window
- page loading
- form submission
- video is being played
- error

## Event Handler

- **특정 요소에서 발생하는 이벤트를 처리하기 위해서는 이벤트 핸들러(event handler)라는 함수를 작성하여 연결**해야만 합니다. 이벤트 핸들러가 연결된 특정 요소에서 지정된 타입의 이벤트가 발생하면, 웹 브라우저는 연결된 이벤트 핸들러를 실행합니다.
    - 자세한 순서
        - 핸들하고 싶은 요소에 이벤트 핸들러 등록 → 특정 요소에서 이벤트 발생 → 브라우저에서 이벤트라는 오브젝트 생성 → 다양한 정보가 담긴 이벤트 오브젝트를 우리가 등록한 콜백 함수에 전달 →
- **이벤트 핸들러를 등록할 수 있는 요소** : EventTarget 을 상속하는 모든 요소(모든 Element는 Node를 상속하고 Node는 EventTarget을 상속하니깐), 즉 모든 Element에 EventHandler를 다 등록할 수가 있습니다.
- **실습**

```jsx
$0.addEventListener('click', () => {console.log('clicked!')});
$0.dispatchEvent(new Event('click')) // clicked! 이렇게 인공적으로 이벤트를 전달도 가능

/////////////////////
const listner = () => {console.log('clicked!')}
$0.addEventListener('click', listner); // element에 클릭이 listner 콜백함수 호출 
$0.removeListener('click', listener); // 이벤트 핸들러 호출 X
```

- 브라우저에서 이벤트라는 오브젝트를 만들어서 이 이벤트 오브젝트에는 어떤 부분에서 클릭이 되었는지 어떤 요소가 클릭이 되었는지 다양한 정보가 들어있는 이 오브젝트를 우리가 등록한 여기 콜백함수에 전달해주게 됩니다.
- 이벤트 핸들러를 등록할 수 있는 요소에는 이벤트 target을 상속하는 모든 요소에는, 모든 엘리먼트는 노드를 상속하고 노드는 이벤트 타겟을 상속하니깐 모든 엘리먼트는 타겟

## 참고

- 이벤트 개념 :

[Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)

- 이벤트 종류 :

[Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)



# 6.2 필수로 알아야 하는 Bubbling & capturing 그리고 꿀팁(실습8)

## 실습

```html
<body>
	<div class="outer">
		<div class="middle">
			<button>Click Me</button>
		</div>
	</div>

	<script>
		const outer = document.querySelector('.outer');
		const middle = document.querySelector('.middle');
		const button = document.querySelector('button');

		outer.addEventListener('click', event => {
			console.log(`outer: ${event.currentTarget}, ${event.target}`)
		});
		middle.addEventListener('click', event => {
			console.log(`middle: ${event.currentTarget}, ${event.target}`)
		});
		button.addEventListener('click', event => {
			console.log(`button: ${event.currentTarget}, ${event.target}`)
		});
	</script>
</body>
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f941f110-af68-431c-b4e3-27326b0f41f6/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f941f110-af68-431c-b4e3-27326b0f41f6/Untitled.png)

- button(손자 요소) 클릭 시 outer(부모 요소), middle(자식 요소), button(손자 요소)에 등록된 모든 이벤트가 호출된다
    - 자세한 순서
    - 버튼 클릭 → 브라우저 캡처링 시작, 즉 부모 컨테이너에서 연분홍색, 그리고 버튼까지 캡처링을 통해 내려오게 된다. → 버튼에 등록된 이벤트 핸들러 호출 → 이벤트 버블링 업, 즉 상위에 있는 부모의 이벤트 핸들러를 차례대로 호출

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dacb3c16-48b0-4275-819b-5ab6008761bd/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dacb3c16-48b0-4275-819b-5ab6008761bd/Untitled.png)

## 주의사항

- 버튼 태그의 이벤트 핸들러만 호출하고 싶을 경우에! 즉 상위 부모로 버블링 되는 것을 막고 싶을 때(stopPropagation)! 같은 태그에 등록된 다른 이벤트를 막고 싶을 때(stopImmediatePropagation, 이 메소드가 호출된 다음 이벤트만 막음, 먼저 등록된 이벤트가 있으면 그 이벤트는 실행됨)
    - event.stopPropagation(); event.stopImmediatePropagation(); **비추비추!! (왜냐하면 부모 요소에 다른 이벤트를 처리해야할 경우가 있기 때문에)**

    ```jsx
    /* 버튼 클릭 시 콘솔 창 */
    button: [object HTMLButtonElement], [object HTMLButtonElement]
    middle: [object HTMLDivElement], [object HTMLButtonElement]
    outer: [object HTMLDivElement], [object HTMLButtonElement]
    ```

    - 해결 방법

    ```html
    <body>
    	<div class="outer">
    		<div class="middle">
    			<button>Click Me</button>
    		</div>
    	</div>

    	<script>
    		const outer = document.querySelector('.outer');
    		const middle = document.querySelector('.middle');
    		const button = document.querySelector('button');

    		outer.addEventListener('click', event => {
    			if (event.target !== event.currentTarget) {
    	      return;
    			}
    			console.log(`outer: ${event.currentTarget}, ${event.target}`)
    		});
    		middle.addEventListener('click', event => {
    			if (event.target !== event.currentTarget) {
    	      return;
    			}
    			console.log(`middle: ${event.currentTarget}, ${event.target}`)
    		});
    		button.addEventListener('click', event => {
    			console.log(`button: ${event.currentTarget}, ${event.target}`)
    		});
    	</script>
    </body>

    // 부모요소는 이벤트 타겟이 커런트 타겟과 다르기 때문에 실행되지 않는 것을 확인할 수 있다
    ```



# 6.3 브라우저를 취소하라! 유의할 점 ??

## 예제

- **`event.preventDefault()` : 브라우저에서 발생하는 기본 동작을 막는다**

```html
<script>
	const checkbox = document.querySelector('input');
	checkbox.addEventListenr('click', event => {
		console.log('checked');
		event.preventDefault(); // 브라우저 기본 동작을 막음 즉, 체크가 안됨
	});

	document.addEventListenr('wheel', event => {
		console.log('scrolling');
		event.preventDefault(); // 에러 발생, passive event listener에서는 preventDefault()를 이용할 수 없음
	});
</script>
```

- 주의사항
    - 스크롤링 이벤트와 같이 빠르게 뭔가 동작해야하는 이벤트가 발생할 때 브라우저는 preventDeafault 와 같은 메소드를 무시한다. 즉 브라우저의 기본 값을 취소할 수 없다는 얘기!!
    - 만약 취소하고 싶다면

        ```html
        <script>
        	document.addEventListenr('wheel', event => {
        		console.log('scrolling');
        		event.preventDefault();
        	}**,
        	{ passive: false }**
        	);
        </script>
        ```

    - scroll 이벤트 처럼 기본적으로 passive 가 true로 설정된 아이는 passive 를 false로 설정하지 않는 것이 좋다



# 6.4 우아한 이벤트 위임 (BAD vs GOOD)

## 예제

```html
<head>
	<style>
		.selected {
			background-color: yellow;
		}
	</style>
</head>
<body>
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>

	<script>
		// Baaaaaad
		const lis = document.querySelectorAll('li');
		lis.forEach(li => {
			li.addEventListener('click', () => {
				li.classList.add('selected');
			});
		});

		// Cooooooool
		const ul = document.querySelector('ul');
		ul.addEventListener('click', event => {
			if (event.target.tagName == 'LI') {
				event.target.classList.add('selected');
			}
		});
	</script>
</body>
```

- 부모 컨테이너는 자식 요소에 어떤 이벤트가 발생하든 모든 이벤트를 다 들을 수가 있다.
- 부모 안 자식 요소에게 공통적으로 무언가 처리를 해야 될 때, 일일이 이벤트 리스너를 자식  추가하는 것보다 부모에 등록하는 것이 좋다.