# 4.1 DOM ū �׸� �����ϱ�

# DOM

- Document Object Model

## ����

- �������� html ������ ���� ���� �д´�
- ������������ ��� �±׵��� �м��ؼ� DOM Ʈ��(��� Ʈ��)�� ��ȯ��Ų��(�������� ������ �ְ� ������ �� �ִ� �ڽŸ��� ������Ʈ�� ��ȯ)

- �� HTML �±װ� JavaScript������ Node��� ������Ʈ�� ��ȯ(�� ��� �ȿ��� �±� �ȿ� �ۼ��ߴ� Ŭ���� �Ǵ� �ؽ�Ʈ ���� �������� ���Ե�)

## Ư¡

- ��� ��忡�� �̺�Ʈ�� �߻��� �� �ִ�
    - Node��� Object�� EventTarget�̶�� ������Ʈ�� ���(= ��� Node�� �̺�Ʈ�� �߻��� �� �ִ�)
    - Document�� Node�� ����ϱ� ������(=Document�� Node�̱� ������)   Document������ �̺�Ʈ�� �߻��� �� �ִ�
    - �̹�����, html ��ҵ��� element�� ��ȯ�Ǵµ� element�� node�̱� ������ ��� ��ҿ����� �̺�Ʈ�� �߻��� �� �ִ�
- HTML�±׿��� �׿� �����ϴ� DOM Ʈ�� ��Ұ� ����


# 4.2 �츮�� ���� �̺�Ʈ Ÿ��

# DOM Node

- DOM Node��� �������̽��� �츮�� DOM API�� ���µ� �ʿ��� �������̽��� Node�ȿ��� Document�� Element ���� �ִ�.
- Node�� EventTarget�� ����Ѵ�(�� ��� ���� �̺�ƮŸ���̶�� �� �� �ִ�)

[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)

# EventTarget

- �� 3������ Methods�� �ִ�
    - addEventListener() : �츮�� ��� ��� �� ���̴� EventTarget���� �������ִ� API
    - removeEventListener()
    - dispatchEvent()

[EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)


# 4.3 �������� ��� �м�(�ܼ��� Ȱ��)

```jsx
/* �ܼ�â���� $0 �� ����ϸ� ���õ�, ������ Elemet ��Ұ� ��Ÿ���� */
$0

/* ���õ� element �ȿ� �ִ� ��� Node���� ���*/
$0.childNodes

/* ���õ� elemet ���� ��Ҹ� ���*/
$0.nextSibling

/* ���õ� elemet �θ� ��Ҹ� ���*/
$0.parentNode
```


# 4.4 �˸� ������ CSSOM

# CSSOM(CSS Object Model)

- ���������� Document Object Model�� ����� �Ǹ� �츮�� ������ CSS�� �����ؼ� CSSOM�̶�� ���̸� ����� ��
- �������� HTML������ Document Object Model�� ������ٸ�

- DOM�� CSS��Ҹ� �����ؼ� CSS DOM�̶��, �� CSS Object Model�̶�� Ʈ���� �ٽ� ����� �ȴ�
- �츮�� ������ ��Ÿ�� �Ӹ� �ƴ϶� ���������� �⺻������ ������ ��� �Ӽ����� ��, cascading rule�� ���� ������ ��� css������ ���ǵǾ��� �ֽ��ϴ�

# Render Tree

- �������� �츮�� HTML ������ �а� �Ǹ� ���� ó�� Document Object Model Ʈ���� ����� �ǰ�,
- �� ������ CSS ������ ���� ������ ���� �� ����ؼ� ���������� Ȯ���� �� CSS ��Ÿ���� Ʈ��(CSSOM)�� ����� �ȴ�

- �� ������ DOM�� CSSOM�� ���ؼ�, �� **���������� �������� ǥ��� ���̵�**�� Render Ʈ���� �����Ǿ����� ǥ�Ⱑ �ȴ� (elemet �� ��Ÿ���� display: none �� ���ǵǾ� ������ Render Tree������ �������� �ʰ� �ȴ�.)



# 4.5 ���� ���� ������ ����

# Critical rendering path

- ���������� url �Է��ϸ�
    - reqeust/response �� loading �� scripting �� rendering �� layout �� painting

- request/response : �������� �������� �ش� ����(html����)�� ��û�ϰ� ������ �ش������� ã�� �����Ѵ�.
- loading : �������� ���� ������ �ε��Ѵ�
- scripting : ������ �������� �о DOM ��ҷ� ��ȯ��Ű�� CSS��Ҹ� CSSOM���� ��ȯ��Ų��
- rendering : ������ Ʈ���� ���� ������
- layout: ������ ��ҵ��� � ��ġ�� �󸶳� ũ�� ǥ��ɰ��� ����� �� ������
- painting : �������� ǥ���ϰ� �ȴ�

## Construction

- html���������� �������� ������ �� �ֵ��� ���������� ���� �ٲٴ� Construction

## Operation

- �������� ������ �� �ִ� rendering tree�� �̿��ؼ� ������ �ۼ��ϰ� ��𿡴� ��ġ�Ұ��� ����� ������ ������ ������ window�� �׸��� �׷��ִ� Operation
    - layout : ����Ʈ�� ������� ���̾ƿ��� ����Ѵ�
    - paint : ������ ��ҵ��� ���̾� ���� �غ��س��´�
        - �������� ���� ������ ���ؼ�
    - composition : ���̾ ������� �������� ������ �����ٰ� ǥ���ϸ� �ȴ�
- animation�� �߻��� ��, composition �κи� �ٲ�� ���� ������ ���ɸ鿡�� ���� ����


# 4.8 ��ǥ �ǽ� ���� ����

- ���� �ڵ� : mousemove �̺�Ʈ�� �߻��Ҷ����� left, top�� �ٲ��ֱ� ������ layout �ܰ���� ������ �Ǳ⶧���� ������ ����.
- ���ɰ��� �ڵ� : translate �Ӽ��� �̿��ؼ� composition �ܰ迡�� ������ �ǵ��� �ϵ��� ����

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


# 4.10 DOM �����ϱ�

## **DOM �����ϱ�**

- ���(Element) ��������

```jsx
const image = document.querySelector('img'); // ó�� ��� 1����
const images = document.querySelectorAll('img'); // ��� ��Ҹ� ����Ʈ���·�
```

- ���(Element) �����ϱ�

```jsx
const h2 = document.createElement('h2');
```

- ���(Element) �Ӽ� �ٷ��

```jsx
h2.setAttribute('class', 'title') // �Ӽ����� ������
h2.textContent = 'This is a title' // h2 text�� ����
section.appendChild(h2); // �ڽĿ�� �߰�
```


# 4.11 innerHtml vs element ������?

```jsx
section.innerHtml = ` <img src="" > `
section.createElement('img)
```

- �κ������γ� ���������� ������ ���� ��ü���� html�� �����ϴ� innerHtml ���ٴ� element �� ���� �ٷ�� ���� ����