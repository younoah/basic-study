## 이벤트



### 대표적인 이벤트

##### 1) 사용자 인터페이스

```javascript
load
unload
error
resize
scroll
```

##### 2) 키보드

```javascript
keydown
keyup
kepress
```

##### 3) 마우스

```javascript
click
dbclick
mousedown
mouseup
mousemove
mouseover
mouseout
```





(mdn 이벤트 종류)

https://developer.mozilla.org/en-US/docs/Web/Events



## 이벤트 핸들러

- 이벤트 핸들링 하는 대표적인 방법은 **이벤트 리스너**를 이용하는 것이다.
- 이벤트가 발생했을 때 브라우저가 `event` 라는 객체를 만들어서 이벤트 핸들러에 전달한다.

```javascript
event.target // 이벤트가 발생한 요소
event.currenTarget // 버블링에 따라 이벤트의 타겟이 바뀔수 있는데, 현재 이벤트가 발생한 요소
event.type // 발생한 이벤트의 종류
```



- 모든 노드는 `eventTarget` 을 상속받기 때문에 모든 노드에 이벤트 핸들러를 등록할 수 있다.

```javascript
element.addEventListener('이벤트', 콜백함수[, option]);

// 예시
const handleClick = () = {
    console.log('클릭!')
}

// 이벤트리스너로 이벤트핸들러 등록
$0.addEventListener('click', handleClick) 

// 이벤트 핸들러 삭제
// addEventListener와 동일하게 작성해야한다.
$0.removeEventListner('click', handleClick) 

// 이벤트 객체 발생(생성)
$0.dispatchEvent(new Event('click'))
// 출력 : 클릭!
```

> option
>
> 모두다 boolean 형이다.
>
> - capture
> - once
> - passive
> - mozSystemGroup



## 캡처링과 버블링

![bubbling&capturing](/Users/uno/Desktop/bubbling&capturing.png)

##### 캡처링

`Click Me` 버튼 클릭시 브라우저는 **캡처링**을 시작한다.

부모 컨테이너에서부터 시작해서 '노란색박스', '연분홍 박스', '버튼' 순으로 전파되어 온다.



##### 버블링

이후에 `Click Me` 버튼에서 이벤트 핸들러가 호출되고 상위 노드에 등록된 인벤트 핸들러도 순차적으로 전파되어 호출된다.



> 보톤 캡처링 단계에서 무언가를 처리하는 일은 흔하지 않다.
>
> 하지만 버블링은 이벤트 핸드러를 실행시키기 때문에 집중해서 봐야할 필요가 있다.

> 위와 같은 이벤트의 흐름으로 인해 내가 원하는 동작이외에도 이벤트가 퍼져나가서 예상치 못한 오류가 발생하는 경우가 있다.
>
> 이때 이벤트 객체가 제공해주는 메서드를 이용하면 문제를 미리 예방할 수 있다.
>
> ```javascript
> event.stopPropagation() // 이벤트의 캡처링이나 버블링을 중단한다.
> 
> event.stopImmediatePropagation() // 현재 노드의 이벤트 핸들러만 실행되고 나머지는 무시
> ```
>
> 하지만 이 방식은 코드의 흐름을 방해하기 때문에 **정말 좋지 않은 방식**이다.
>
> 따라서 예외처리 (`if`) 를 통해 특정한 조건일 때만 발생하도록 이벤트 핸들러에 등록하여 처리하는 것이 좋다.
>
> ```javascript
> element.addEventListener('click', (event) = {
>     if (event.target !== event.currentTarget) return;
> })
> .
> .
> .
> ```



## 브라우저의 기본 기능 취소

링크를 클릭하거나 폼을 제출하는 것과 같은 몇 가지 이벤트들은 사용자에게 다른 페이지를 보여주는 기본적인 효과를 가지고 있다. 만약 이런 기본 동작을 갖고 있는 이벤트의 기본 동작이 발생하지 않도록 하기 위해서는 위와 같은 메서드를 활용하자. (feat.checked)

```javascript
event.preventDefault() // 이벤트의 기본 동작을 취소한다.
```

> `wheel`(스크롤)같은 경우 `preventDefault()` 메서드를 사용할 수 없다.
>
> 이유는 이벤트 리스너로 `wheel` 을 등록하면 해당 이벤트 리스너는 `passive event listener` 가 되기 때문이다.
>
> 즉, `passive event listener` 에는  `preventDefault()` 메서드를 사용할 수 없다.
>
> `passive event listener` 란?
>
> 빠르게 뭔가가 동작해야되는 이벤트 같은경우는 다른 처리를 기다리지 않고 곧바로 이벤트가 발생해야 사용성이 좋다. 
>
> 예를들어 휠 같은 경우 휠을 내렸는데 로딩이 걸려서 휠이 로딩이 된 이후에 내려가면 유저는 속이 답답할 것이다. 이런 이유때문에 휠을 내리더라도 우선 휠의 기본동작을 최우선적으로 발생시키게 하는것이다. 
>
> 이런 자신의 기본동작을 최우선시 하는 이벤트를 갖고 있는 이벤트 리스너를 **패시브 이벤트 리스너** 라고 한다.
>
> ##### passive 기능 끄고 키는 방법!
>
> ```javascript
> // 패시브 이벤트 리스너로 만들기
> $0.addEventListener('checked', handleChecked, {passive: true}) 
> 
> // 패시브 꺼버리기
> $0.addEventListener('wheel', handleWheel, {passive: false}) 
> ```
>
> 왠만해서는 기본값이 패시브인 이벤트 리스너는 패시브를 끄지 않는게 좋다!!



## 이벤트 위임

이벤트 위임은 **버블링**을 활용한다.

부모 요소는 자식의 이벤트를 모두 다 알수 있다는 점을 활용하여 

자식의 이벤트 리스너를 등록하는 것이 아닌 부모에게 이벤트 리스너를 등록하는 방법이다!

이렇게 하면 조금 더 가독성과 성능도 좋고 깔끔하게 코드를 작성할 수 있다.

```javascript
// Bad
const lis = document.querySelectorAll('li');
lis.forEach(li => {
    li.addEventListener('click', () => {
        li.classList.add('selected');
    })
})

// good
const ul = document.querySelector('ul');
ul.addEventListner('click', event => {
    if (event.target.tageName != 'LI') return;
    event.taget.classList.add('selected');
})
```

