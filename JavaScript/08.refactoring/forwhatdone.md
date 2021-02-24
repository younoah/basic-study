```
//main.js

'use strict';

import PopUp from './popup.js';

const gameFinishBanner = new PopUp();

gameFinishBanner.setClickListner(() => {
   startGame(); 
});

```

```
'use strict';

//이 PopUp이라는 클래스를 바깥에 노출(외부에서도 이 클래스 사용 가능)
export default class PopUp {
    //필요한 것들을 초기화
    //PopUp이라는 클래스에 멤버변수 3개를 만듬
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        
        //팝업리프레시 버튼에 이벤트 등록
        //클릭되면 할당한 콜백함수 호출
        this.popUpRefresh.addEventListner('click', ()=> {
            //멤버 변수에 등록된 onClick이 있으면 && 뒤에 코드가 실행
            this.onClick && this.onClick();
            this.hide();
        });
    }
    
    //PopUp 클래스에 setClickListner 등록
    //PopUp 클래스를 쓰는 사람이 setClickListner를 실행하면 콜백onClick 호출
    setClickListener(onClick) {
        //PopUp 클래스에 onClick이라는 멤버변수 생성
        this.onClick = onClick;
    }
    
    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }
    
    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}
```