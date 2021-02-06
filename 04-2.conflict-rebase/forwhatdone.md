# 4.7 VS Code로 Conflict 해결하기

## 1. 깃에서 merge tool에 대한 글로벌 세팅을 해준다.
```
git config --global -e #edit 모드로 연다.
```

## 2. 아래 코드 추가
```
[merge]
	tool = vscode
[mergetool "vscode"]
	cmd = code --wait $MERGED
```

## 3. cmder 에서 conflict 이 발생했을 때 git merge tool을 사용하면 지정한 에디터가 열린다.
```
git merge feature 

#conflict 발생

git mergetool #지정한 에디터 vscode가 열린다
```

## 4. conflict 발생한 곳에 4가지 옵션이 있다.
- Accept current change (현재 브랜치의 내용을 받아들임)
- Accept Incoming Change (merge 하고자 하는 브랜치의 내용을 받아들임)
- Accept Both Change (둘 다 사용)
- Compare Change (간편하게 확인하고 비교해보고 싶을 때)

필요한 옵션을 선택하고 저장한다.


## 5. cmder 창에서 상태 확인 후 merge 한다.
``` 
git status 
#conflict 발생했던 문서가 commit 할 준비가 되었음을 확인할 수 있다. 
#merge conflict이 발생했던 내용이 포함된 ***.orig 파일이 생겼다.
```

* .orig 파일 생성 막는 방법
```
git config --global mergetool.keepBackup false
```

```
git merge --continue
```



# 4.8 P4Merge로 Conflict 해결하기

## 1. p4merge download 
- 운영체제 선택 후 다운로드 클릭
- 개인정보 입력하는 부분 skip 후 다운로드 계속 진행


## 2. git mergetool을 p4merge 로 지정한다.
```
git config --global -e 
```

```
#vscode에서 mergetool을 p4merge로 설정하는 코드를 추가한다.
[mergetool "p4merge"]
	path = "p4merge가 설치된 경로"
```


## 3.
```
git mergetool #p4merge 실행
```
- 왼쪽창 : 머지하고자 하는 브랜치
- 중간창 : 변경사항이 없는 베이스
- 오른쪽 창 : 현재 경로에 있는 브랜치


## 4. p4merge 저장


## 5. 터미널에서 이전 명령어를 계속 수행중일 경우 Ctrl+C 를 이용해서 종료


## 6. 수정된 파일 확인 후 머지
```
git status
git merge --continue
```



# 4.9 Rebbase란 무엇일까? 왜 꿀일까?

- three-way merge와 같은 상황에 놓여 있을 때 fast-forward 할 수 있는 방법 : rebase
- master 버전의 최신 버전으로 rebase 후 fast-forward merge 가능

- 주의사항 : 다른 개발자와 함께 작업 시 주의
	- 포인터의 정보를 변경하게 되면 기존의 commit을 유지하는 것이 아니라 새로운 커밋을 만든다.
	- 다른 개발자가 같은 브랜치에서 작업 하고 있는 상황에 push 하게 되면 커밋이 다르기 때문에 merge conflict 가 발생할 수 있다.
	- 서버에 업데이트 안 된 local이나 혼자 작업 시 rebase를 쓰도록 한다

## 1.
```
git checktout feature-b
git rebase master
git checkout master
git merge feature-b #fast-forward 
```



# 4.10 브랜치들 사이에서의 Rebase 팁!
* 브랜치 위에 브랜치들을 master branch에 연결하고 싶을 때
* 주의 ui 브랜치가 이미 서버에 업데이트 되어 있다면 쓸 때 주의

## 1. 
```
git rebase --onto master profile(master branch 위에 파생된 브랜치) profile-ui(profile 위에 파생된 브랜치) 
```

## 2. profile-ui branch가 master branch 에 rebase된다. 

## 3. master branch로 이동후 merge
```
git checkout master
git merge profile ui
```



# 4.11 필요한 커밋만 쏘옥!
* cherry pick
- 브랜치 안에 특정한 커밋만 머지하고 싶을 때

## 1. 가져오고 싶은 커밋의 해시코드 복사

## 2. master branch 위에 붙이기
```
git cherry-pick 해시코드
```



# 4.12 소스트리 활용

- 왼쪽 바에서 branches 안에 생성된 branch 확인 가능
## 1. 상단바 브랜치 아이콘 클릭 후 branch 이름 적고 생성

## 2. 머지 아이콘 클릭 후 merge 하고자 하는 branch를 선택한 후 옵션 선택 후 merge
- commit 을 즉각적으로 하고 싶을 경우
- merge 커밋에 메세지를 보여주고 싶은 경우
- fast-forward 가능해도 merge commit 만들 고 싶은 경우 
- merge 대신 rebase 하고 싶은 경우

## 3. 브랜치 아이콘 클릭 후 delete branch 

## 4. 원하는 커밋 선택 후 마우스 오른쪽 클릭 시 다양한 옵션 확인 가능
  
