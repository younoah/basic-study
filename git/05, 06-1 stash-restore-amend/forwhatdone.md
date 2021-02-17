# stash

## 1. Stash��?
- ���� commit �� �ܰ谡 �ƴ� ��, Git history�� �������� �ʰ� �۾��ϴ� ������� ������ �� ���� ��ɾ�
- stash stack�� ��� ���� �� �� �ʿ��� �� working directory�� �ű� �� �ִ�

## 2. Stash ��� ��� ����
- ��� �۾��ϰ� �ִ� ������� �����صΰ� branch �� ��ȯ�� ����
- ���� ���׸� ��ġ�� ��� ���� �õ��� �غ� �� ������ �õ��� ��� �����صΰ� ���� ��

## 3. ����

```
echo add >> about.txt
#fix branch checkout �ؼ� �� �Ǵ� �� Ȯ�� ��û�� ����
#������ about.txt ������ ���� commit �ϱ⿡�� �Ϸ��� stash stack�� ����

git stash push -m "first-try" #first-try��� Ÿ��Ʋ�� �Բ� ���� �� working directory�� staging area ������ ��������

echo add >> about.txt
git add .
git stash push -m "second-try" --keep-index #second-try��� Ÿ��Ʋ�� �Բ� ����, staging ������ ���뵵 ���� �����

echo new > nex.txt #untracking file
git stash #untracking file �� �ڵ������� stash stack�� ������� ����
git stash -u #untracking file ��� ���ؼ� staging area�� �����
git stash list #stash �� list Ȯ�� ����
git stash show stash@{3}

#fix branch Ȯ�� �� �ٽ� ���� ������ ���ư��� ���ؼ���
git stash list #���ư����� �ϴ� stash id Ȯ�� ��
git stash apply stash@{3} #stash id���� 3�� �ش��ϴ� stash�� ����Ǿ� ���� �۾��ϰ� �ִ� ������ working directory�� index�� �� ���� Ȯ���� �� ����
git stash list #���� stash ������� �״�� ����
```

## 4. ��ɾ�
```
git stash push #�ƹ��� Ÿ��Ʋ ���� ����
git stash push -m "�޸�" #�޸��� Ÿ��Ʋ�� �Բ� ����
git stash push -m "�޸�" --keep-index #staging �������� �Բ� ����
git stash -u #untracking file ��� ���ؼ� staging area�� �����
git stash list #stash list�� Ȯ���� �� ����, �ݷ� ���� �������� stash id �� �ش��� ex) stash@{0}
git stash show stashId #stash id �� �ش��ϴ� ���� Ȯ�� ����
git stash show stashId -p #stash id �� �ش��ϴ� �ڼ��� ���� Ȯ�� ����
git stash apply #stack ���� ���� ���� ����
git stash apply stashId #stashId �� �ش��ϴ� ���� ����
git stash pop #���� ���� �ִ� ������ working directory�� �Ű��� ������, stash list���� �ش� ������ �����
git stash drop stashId #stashId�� ������ ��Ͽ��� ����
git stash clear #���� stash�� ����
git stash branch �귣ġ�̸� #�귣ġ�� ����鼭 stash�� ����
```

## 5. �ҽ�Ʈ���� stash Ȱ���ϱ�
- �۾��ϰ� �ִ� ���� Ŭ��
- ��ܹ� stash icon Ŭ�� �� �޼��� �ۼ�
- ���� �޴����� stashes �޴����� show �� Ŭ���ϸ� stash ���� Ȯ�� ����
- stash �� ������ working directory�� �ٽ� �����ϰ� �ʹٸ� stashes �޴����� �ش��ϴ� stash�� ����Ŭ�� �� ok Ŭ��
- woking directory ���� �� stash �� �����ϰ� �ʹٸ� ���� �ܰ迡�� delete after applying �ɼ� üũ �� ok Ŭ��



# �Ǽ��� ��ȸ�ϴ� ���

## restore
- commit�� �ʹ� �����ϰ� ���� �� �ǵ��� �� �ִ�, �ʱ�ȭ �� �� �ִ� ��ɾ�

## 2. ��ü���� ��Ȳ
- commit�� �ʹ� �����ϰ� ���� �� 
	- ��� ���� ������ �Բ� commit ������ ���
	- commit message�� ������ ���� �ʰų�
	- commit�� �ʹ� ���� �ع����� �߶� commit�� �ٽ� �ϰ� ���� ���
	- commit�� �ʹ� ���ݾ��ؼ� �ϳ��� ���� �ٽ� commit �ϰ� ���� ���
	- �Ǽ��� ���װ� �� commit �� ���� ���

## 3. ������ ��
- git history�� �����ϴ� ���� local������
- �̹� ������ ���ε� �� ���, �ٸ� �����ڿ� ������ ���¶�� ���� ���� X!!!
- ���� �����ϰ��� �ϴ� history�� �̹� ������ push �Ǿ����� �ٸ� �����ڿ� �Բ� �����Ѵ� Branch ���� ���� ���� �����ϰ� ��� ��!!

## 4. ����
```
echo add >> payment-ui.txt #working directory�� �ִ� payment-ui.txt ���� ����
git status #������ �����Ǿ����� working directory�� ������ Ȯ��

#modified�� ���� ����ϰ� �ʹٸ�
git restore payment-ui.txt #�ش� ���� ��������� ���
```

```
echo add > add.txt
git add .
git commit -m "."

git commit --amend -m "Add new file" #��� Ŀ���� �޽����� . -> Add new file �� ������
#���� ���뵵 ������ �Ǿ�� �Ѵٸ� �ش� ������ ��� �����ϰ� git add ��ɾ�� staging area�� �ø�����
git commit --amend 
```

## 5. ��ɾ�
```
git restore �����̸� #���Ͽ� ���� ��������� ����Ѵ�.
git restore . #working directory�� �ִ� ��� ���ϵ��� �ʱ�ȭ
git restore --staged payment-ui.txt #staging area�� �ִ� ������ �ٽ� working directory�� �������� ���� ��
git reset HEAD . #Ư���� �����͸� ������ �ʱ�ȭ �ϰ� ���� ��
git restore --source=�ؽ��ڵ� #� commit���κ��� ������ �ʱ�ȭ �� ���� ������ �� ����
git restore --source=HEAD~2 �����̸� #HEAD���� 2��° ������ commit ���� �ش��ϴ� ������ �ʱ�ȭ

git commit --amend -m "�޼���" #������ Ŀ���� �޽����� �����ϰ� ���� ��
```

## 6. ��Ÿ
- WIP : Working In Progress(���� ���� ������..)














