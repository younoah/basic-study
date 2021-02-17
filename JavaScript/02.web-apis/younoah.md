## WEB APIs

### API란?

Application Programming Interface의 약자

- OS나 플랫폼에서 제공하는 프로그램

- 프로젝트에서 작성한 프로그램(함수들의 묶음), 하나의 기능이 있는 프로그램



### 브라우저에서 제공하는 주요 API

- DOM APIs
- Network APIs
- Graphics APIs
- Audio/Video APIs
- Device APIs
- File APIs
- Storage APIs

https://developer.mozilla.org/ko/docs/Web/API



## 윈도우 사이즈

### window.screen

- 모니터의 사이즈

```javascript
window.screen.width
window.screen.height
```



### window.outer

- 브라우저의 전체 사이즈

```javascript
window.outerWidth
window.outerHeight
```



### window.inner

- 브라우저 내의 **스크롤바 포함한 document** 사이즈

```javascript
window.innerWidth
window.innerHeight
```



### documentElement.client

- 브라우저 내의 **스크롤바를 제외한 document** 사이즈

```javascript
document.documentElement.clientWidth
document.documentElement.clientHeight
```



## 브라우저의 좌표

coordinates(좌표)



![cordinate](/Users/uno/Desktop/cordinate.png)

- 윈도우에서는  document의 왼쪽 위를 기준(0,0) 으로 하여 top, bottom, left, right를 정의한다.
- 주의 할 점은 css에서의 bottom, right는 document의 오른쪽 아래쪽에서 기준이 되어 계산된다.



### Element.getBoundingClientRect()

요소의 크기(넓이, 높이), 위치(top, bottom, left, right) 값을 받아온다.



### clientX,Y vs pageX,Y

- `event` 에는 `clientX`, `clientY`,  `pageX`, `pageY` 값을 가지고 있다.
- 즉, 클릭 같은 이벤트가 발생했을 경우 해당 이벤트의 좌표값을 `event.clientX`, `event.clientY`,  `event.pageX`, `event.pageY`를 통해서 알 수 있다. 

- 이 때 `client` 좌표값은 스크롤을 무시하고 보고있는 document화면을 기준으로  x, y 값으로 계산된다.

- 반면에 `page` 는 보고 있는 화면이 아닌 페이지 전체를 기준으로 x, y 값을 계산한다.



> 스크롤 막는 방법
>
> ```html
> body {
> 	overflow: hidden;
> }
> ```



## 스크롤

### scrollBy

윈도우의 스크롤을 수정하여 이동시킨다.

```javascript
// 기본사용
window.scrollBy(x-coord, y-coord)

/* scrollToOptions 활용 */
window.scrollBy({top: 100, left: 0, behavior: 'smooth'})
// top에서 부터 x를 100 증가, 부드럽게 이동
```



### scrollTo

윈도우의 해당 좌표로 이동한다.

```javascript
window.scrollTo(x-coord, y-coord)
```



### scrollIntoView

해당 노드(element)의 위치로 스크롤이 이동한다.

```javascript
element.scrollIntoView()
```



## window.load



```javascript
/* DOMContentLoaded */
// only document, HTML만 로딩이 완료되면 호출이 된다.
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
});

/* load */
// 모든 리소스가 다운 완료된 이후에 호출
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





