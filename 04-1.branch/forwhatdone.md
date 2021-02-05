# 4.1 브랜치를 왜 꼭 써야 할까?

- Git 에서 따로 지정을 하지 않는 이상 master branch가 쓰임
- 보통 master branch는 코드가 검증이 된 것들이 포함됨
- 만약 새로운 기능인 Feature A를 개발한다고 한다면 master branch에 작업하기 보다는 feature A라는 branch를 새로 만들어서 거기에서 commit을 해나감
- 보통 branch는 기능, 리팩토링, 버그 픽스 별로 만든다.
- 장점 : 동시 다발적으로 다수의 개발자가 개발을 해 나갈 수 있기 때문에 병렬적으로 업무를 진행할 수 있다.

# 4.2 브랜치 기본 사용법
```bash
git branch //현재 repository에 있는 branch 확인 가능
git branch -v //간단하게 최신 커밋들도 확인 가능
git branch --all //서버에 있는 모든 branch 확인 가능
git branch new-branch //new-branch 라는 branch 생성
git switch new-branch //new-branch로 branch 이동
git switch -C new-branch2 //new-branch2 라는 branch 생성 후 branch 이동
git checkout bd7bd28 //해시코드에 해당하는 커밋으로 이동, 이 커밋 버전에 해당하는 파일 확인 가능, checkout을 사용하면 원하는 버전, 원하는 브랜치로 이동 가능
git checkout -b testing //texting이라는 브랜치 생성후 생성된 브랜치로 이동
git branch --merged //현재 branch에 merge가 된 branch들 확인 가능 현재 브랜치 위의 브랜치는 머지O, 아래 브랜치는 생성만되고 머지 되지 않음
git branch --no-merged //현재 branch에 merge되지 않은 branch들을 확인
git merge fix //fix라는 branch를 현재 branch에 병합
git branch -d new-branch2 //new-branch2 branch 삭제
git push origin --delete new-branch2 //삭제된 브랜치를 원격 저장소에 업데이트(상태를 업데이트)
git branch --move fix fix-welcome //fix브랜치를 fix-welcome이라는 이름으로 변경
git push --set-upstream origin fix-welcome //변경된 이름의 브랜치를 서버에 업데이트
git log master..test //master branch와 test branch간의 로그 확인\
git diff master..test //코드 확인  
```
- 내가 원하는 브랜치로 이동하고 싶을 때, checkout 또는 switch를 쓰면 된다.


# 4.3 머지란? fast-forward merge

- fast-forward merge란 master branch에서 새로운 branch가 생성된 이후에 master branch에 변동사항이 없다면 merge를 할 때 단순히 master branch가 가리키고 있는 포인터를 d→f로 옮기면 된다.
- 이후 feature A branch를 삭제하면 fast-forward merge가 발생함

- fast-forward merge 의 단점:
    - history에 merge가 되었다는 사실이 남지 않는다.

```bash
git merge feature-a //feature-a 브랜치를 master 브랜치에 merge
```


# 4.4 머지 옵션 no-off

- fast-forward merge가 하기 싫을 경우

```bash
git merge --no-ff feature-c //feature-c라는 branch를 fast-forward merge를 하지 않고 merge 관련된 commit이 생성됨
```


# 4.5 머지의 중요한 컨셉, three-way merge

- fast-forward merge가 불가능한 경우(아래 사진 같은 경우)


```bash

```

- base branch인 master branch와 파생된 feature A branch 의 변동사항을 모두 합해서 merge commit 생성 후 master branch에 commit 해야한다.



# 4.6 Conflict 해결 방법

- merge 시 자동적으로 해결할 수 없는 문제가 있을 때 충돌 : conflict
- 두 가지 branch에서 동일한 파일을 수정한 경우 Git이 어떤 내용을 추가해야할 지 결정할 수 없을 때 conflict 발생


- 수동적으로 할 방법

```bash
start main.txt //파일을 열고 문서 파일 삭제 또는 수정을 직접한다

git merge --abort //merge를 취소하는 방법

git add main.txt //merge를 계속 하는 방법 1단계
git merge --continue //merge를 계속 하는 방법 2단계
```

- 주의 사항 : 충돌이 발생된 부분만 수정!!
