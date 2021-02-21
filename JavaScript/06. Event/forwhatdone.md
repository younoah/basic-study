# 6.1 Events ��Ȯ�ϰ� ���� �ϱ� + ������

## �̺�Ʈ�� �߻��ϴ� ���

- mouse click
- keyboard
- resizing window
- close window
- page loading
- form submission
- video is being played
- error

## Event Handler

- **Ư�� ��ҿ��� �߻��ϴ� �̺�Ʈ�� ó���ϱ� ���ؼ��� �̺�Ʈ �ڵ鷯(event handler)��� �Լ��� �ۼ��Ͽ� ����**�ؾ߸� �մϴ�. �̺�Ʈ �ڵ鷯�� ����� Ư�� ��ҿ��� ������ Ÿ���� �̺�Ʈ�� �߻��ϸ�, �� �������� ����� �̺�Ʈ �ڵ鷯�� �����մϴ�.
    - �ڼ��� ����
        - �ڵ��ϰ� ���� ��ҿ� �̺�Ʈ �ڵ鷯 ��� �� Ư�� ��ҿ��� �̺�Ʈ �߻� �� ���������� �̺�Ʈ��� ������Ʈ ���� �� �پ��� ������ ��� �̺�Ʈ ������Ʈ�� �츮�� ����� �ݹ� �Լ��� ���� ��
- **�̺�Ʈ �ڵ鷯�� ����� �� �ִ� ���** : EventTarget �� ����ϴ� ��� ���(��� Element�� Node�� ����ϰ� Node�� EventTarget�� ����ϴϱ�), �� ��� Element�� EventHandler�� �� ����� ���� �ֽ��ϴ�.
- **�ǽ�**

```jsx
$0.addEventListener('click', () => {console.log('clicked!')});
$0.dispatchEvent(new Event('click')) // clicked! �̷��� �ΰ������� �̺�Ʈ�� ���޵� ����

/////////////////////
const listner = () => {console.log('clicked!')}
$0.addEventListener('click', listner); // element�� Ŭ���� listner �ݹ��Լ� ȣ�� 
$0.removeListener('click', listener); // �̺�Ʈ �ڵ鷯 ȣ�� X
```

- ���������� �̺�Ʈ��� ������Ʈ�� ���� �� �̺�Ʈ ������Ʈ���� � �κп��� Ŭ���� �Ǿ����� � ��Ұ� Ŭ���� �Ǿ����� �پ��� ������ ����ִ� �� ������Ʈ�� �츮�� ����� ���� �ݹ��Լ��� �������ְ� �˴ϴ�.
- �̺�Ʈ �ڵ鷯�� ����� �� �ִ� ��ҿ��� �̺�Ʈ target�� ����ϴ� ��� ��ҿ���, ��� ������Ʈ�� ��带 ����ϰ� ���� �̺�Ʈ Ÿ���� ����ϴϱ� ��� ������Ʈ�� Ÿ��

## ����

- �̺�Ʈ ���� :

[Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)

- �̺�Ʈ ���� :

[Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)



# 6.2 �ʼ��� �˾ƾ� �ϴ� Bubbling & capturing �׸��� ����(�ǽ�8)

## �ǽ�

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

- button(���� ���) Ŭ�� �� outer(�θ� ���), middle(�ڽ� ���), button(���� ���)�� ��ϵ� ��� �̺�Ʈ�� ȣ��ȴ�
    - �ڼ��� ����
    - ��ư Ŭ�� �� ������ ĸó�� ����, �� �θ� �����̳ʿ��� ����ȫ��, �׸��� ��ư���� ĸó���� ���� �������� �ȴ�. �� ��ư�� ��ϵ� �̺�Ʈ �ڵ鷯 ȣ�� �� �̺�Ʈ ���� ��, �� ������ �ִ� �θ��� �̺�Ʈ �ڵ鷯�� ���ʴ�� ȣ��

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dacb3c16-48b0-4275-819b-5ab6008761bd/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dacb3c16-48b0-4275-819b-5ab6008761bd/Untitled.png)

## ���ǻ���

- ��ư �±��� �̺�Ʈ �ڵ鷯�� ȣ���ϰ� ���� ��쿡! �� ���� �θ�� ���� �Ǵ� ���� ���� ���� ��(stopPropagation)! ���� �±׿� ��ϵ� �ٸ� �̺�Ʈ�� ���� ���� ��(stopImmediatePropagation, �� �޼ҵ尡 ȣ��� ���� �̺�Ʈ�� ����, ���� ��ϵ� �̺�Ʈ�� ������ �� �̺�Ʈ�� �����)
    - event.stopPropagation(); event.stopImmediatePropagation(); **���ߺ���!! (�ֳ��ϸ� �θ� ��ҿ� �ٸ� �̺�Ʈ�� ó���ؾ��� ��찡 �ֱ� ������)**

    ```jsx
    /* ��ư Ŭ�� �� �ܼ� â */
    button: [object HTMLButtonElement], [object HTMLButtonElement]
    middle: [object HTMLDivElement], [object HTMLButtonElement]
    outer: [object HTMLDivElement], [object HTMLButtonElement]
    ```

    - �ذ� ���

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

    // �θ��Ҵ� �̺�Ʈ Ÿ���� Ŀ��Ʈ Ÿ�ٰ� �ٸ��� ������ ������� �ʴ� ���� Ȯ���� �� �ִ�
    ```



# 6.3 �������� ����϶�! ������ �� ??

## ����

- **`event.preventDefault()` : ���������� �߻��ϴ� �⺻ ������ ���´�**

```html
<script>
	const checkbox = document.querySelector('input');
	checkbox.addEventListenr('click', event => {
		console.log('checked');
		event.preventDefault(); // ������ �⺻ ������ ���� ��, üũ�� �ȵ�
	});

	document.addEventListenr('wheel', event => {
		console.log('scrolling');
		event.preventDefault(); // ���� �߻�, passive event listener������ preventDefault()�� �̿��� �� ����
	});
</script>
```

- ���ǻ���
    - ��ũ�Ѹ� �̺�Ʈ�� ���� ������ ���� �����ؾ��ϴ� �̺�Ʈ�� �߻��� �� �������� preventDeafault �� ���� �޼ҵ带 �����Ѵ�. �� �������� �⺻ ���� ����� �� ���ٴ� ���!!
    - ���� ����ϰ� �ʹٸ�

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

    - scroll �̺�Ʈ ó�� �⺻������ passive �� true�� ������ ���̴� passive �� false�� �������� �ʴ� ���� ����



# 6.4 ����� �̺�Ʈ ���� (BAD vs GOOD)

## ����

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

- �θ� �����̳ʴ� �ڽ� ��ҿ� � �̺�Ʈ�� �߻��ϵ� ��� �̺�Ʈ�� �� ���� ���� �ִ�.
- �θ� �� �ڽ� ��ҿ��� ���������� ���� ó���� �ؾ� �� ��, ������ �̺�Ʈ �����ʸ� �ڽ�  �߰��ϴ� �ͺ��� �θ� ����ϴ� ���� ����.