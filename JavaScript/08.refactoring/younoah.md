## addEventListner와 this, 메서드

```javascript
export class Field {
  constructor(carrotCount, bugCount) {
    ...
    this.$field.addEventListener('click', this.onClick);
  }
  
  // 함수 선언식  
  onClick(event) {
      this.onItemClick(ItemType.carrot);
  };
    
  // 함수 표현식  
  onClick = event => {
      this.onItemClick(ItemType.carrot);
  };
}
```

> 1. 함수 실행시에는 전역(window) 객체를 가리킨다.
>
> 2. 메소드 실행시에는 메소드를 소유하고 있는 객체를 가리킨다.
>
> 3. 생성자 실행시에는 새롭게 만들어진 객체를 가리킨다.

클래스 안에 서 정의된 this는 객체로 this바인딩이 되어진다. 그래서 `this.메서드` 혹은 `this.프로퍼티` 이렇게 정의를 하면 `객체.메서드`, `객체.프로퍼티` 라고 사용하게 된다.

하지만 `addEventListener` 메서드는 콜백함수의 this를 자동으로 이벤트가 발생한 타겟으로 this바인딩을 하도록 정의되어있다. 

따라서 위에 `onclick` 함수에서 this가 해당 클래스의 정보가 전달되지 않고 이벤트타겟이 전달되기 때문에 오류가 발생한다.

따라서 this바인딩을 통해서 this에 해당 클래스로 정의를 해야한다.

##### this바인딩

1. bind() 메서드

```javascript
this.onClick = this.onClick.bind(this)
```

2. 화살표함수

> 일반 함수는 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다
>
> 화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다.

```javascript
this.$field.addEventListener('click', (event) => this.onClick(event));

// 또는

onClick = event => {
      this.onItemClick(ItemType.carrot);
  };
```





## 빌더패턴

- 기존방식

```javascript
class Game {
   constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
   }
    ...
}

const game = new Game(5, 10, 10);
```



- 빌더패턴

```javascript
class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  carrotCount(carrotCount) {
    this.carrotCount = carrotCount;
    return this;
  }

  bugCount(bugCount) {
    this.bugCount = bugCount;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}

class Game {
   constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
   }
    ...
}
    
const game = new GameBuilder()
  .gameDuration(5)
  .carrotCount(10)
  .bugCount(0)
  .build();
```



## 상수관리



객체 상수로 관리하면 타입을 안전하고 편하게 관리할 수 있다.

Object.freeze를 이용하면 객체는 불변객체가 된다.

```javascript
export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

console.log(Reason.win) // win
```

