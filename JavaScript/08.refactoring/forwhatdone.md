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

//�� PopUp�̶�� Ŭ������ �ٱ��� ����(�ܺο����� �� Ŭ���� ��� ����)
export default class PopUp {
    //�ʿ��� �͵��� �ʱ�ȭ
    //PopUp�̶�� Ŭ������ ������� 3���� ����
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        
        //�˾��������� ��ư�� �̺�Ʈ ���
        //Ŭ���Ǹ� �Ҵ��� �ݹ��Լ� ȣ��
        this.popUpRefresh.addEventListner('click', ()=> {
            //��� ������ ��ϵ� onClick�� ������ && �ڿ� �ڵ尡 ����
            this.onClick && this.onClick();
            this.hide();
        });
    }
    
    //PopUp Ŭ������ setClickListner ���
    //PopUp Ŭ������ ���� ����� setClickListner�� �����ϸ� �ݹ�onClick ȣ��
    setClickListener(onClick) {
        //PopUp Ŭ������ onClick�̶�� ������� ����
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