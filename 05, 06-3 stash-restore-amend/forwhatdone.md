# stash

## 1. Stash란?
- 아직 commit 할 단계가 아닐 때, Git history에 저장하지 않고도 작업하는 내용들을 저장할 때 쓰는 명령어
- stash stack에 잠시 저장 한 후 필요할 때 working directory로 옮길 수 있다

## 2. Stash 사용 배경 예시
- 잠시 작업하고 있는 내용들을 저장해두고 branch 를 전환할 때나
- 내가 버그를 고치는 경우 여러 시도를 해볼 때 각각의 시도를 잠시 저장해두고 싶을 때

## 3. 예제

```
echo add >> about.txt
#fix branch checkout 해서 잘 되는 지 확인 요청이 들어옴
#수정한 about.txt 파일이 아직 commit 하기에는 일러서 stash stack에 저장

git stash push -m "first-try" #first-try라는 타이틀과 함께 저장 후 working directory와 staging area 영역이 깨끗해짐

echo add >> about.txt
git add .
git stash push -m "second-try" --keep-index #second-try라는 타이틀과 함께 저장, staging 영역의 내용도 같이 저장됨

echo new > nex.txt #untracking file
git stash #untracking file 은 자동적으로 stash stack에 저장되지 않음
git stash -u #untracking file 모두 합해서 staging area에 저장됨
git stash list #stash 된 list 확인 가능
git stash show stash@{3}

#fix branch 확인 후 다시 나의 업무로 돌아가기 위해서는
git stash list #돌아가고자 하는 stash id 확인 후
git stash apply stash@{3} #stash id값이 3에 해당하는 stash로 적용되어 내가 작업하고 있던 파일이 working directory나 index에 온 것을 확인할 수 있음
git stash list #이전 stash 내용들이 그대로 있음
```

## 4. 명령어
```
git stash push #아무런 타이틀 없이 저장
git stash push -m "메모" #메모라는 타이틀과 함께 저장
git stash push -m "메모" --keep-index #staging 영역까지 함께 저장
git stash -u #untracking file 모두 합해서 staging area에 저장됨
git stash list #stash list를 확인할 수 있음, 콜론 앞의 정보들이 stash id 에 해당함 ex) stash@{0}
git stash show stashId #stash id 에 해당하는 정보 확인 가능
git stash show stashId -p #stash id 에 해당하는 자세한 정보 확인 가능
git stash apply #stack 제일 위에 것이 적용
git stash apply stashId #stashId 에 해당하는 것이 적용
git stash pop #제일 위에 있는 내용이 working directory로 옮겨져 나오며, stash list에서 해당 내용이 사라짐
git stash drop stashId #stashId의 내용을 목록에서 삭제
git stash clear #전에 stash를 삭제
git stash branch 브랜치이름 #브랜치를 만들면서 stash를 적용
```

## 5. 소스트리로 stash 활용하기
- 작업하고 있는 파일 클릭
- 상단바 stash icon 클릭 후 메세지 작성
- 왼쪽 메뉴바의 stashes 메뉴에서 show 를 클릭하면 stash 내용 확인 가능
- stash 의 내용을 working directory에 다시 적용하고 싶다면 stashes 메뉴에서 해당하는 stash를 더블클릭 후 ok 클릭
- woking directory 적용 후 stash 를 삭제하고 싶다면 이전 단계에서 delete after applying 옵션 체크 후 ok 클릭



# 실수를 만회하는 방법

## restore
- commit을 너무 성급하게 했을 때 되돌릴 수 있는, 초기화 할 수 있는 명령어

## 2. 구체적인 상황
- commit을 너무 성급하게 했을 때 
	- 모든 수정 사항을 함께 commit 못했을 경우
	- commit message가 마음에 들지 않거나
	- commit을 너무 많이 해버려서 잘라서 commit을 다시 하고 싶을 경우
	- commit을 너무 조금씩해서 하나로 묶어 다시 commit 하고 싶을 경우
	- 실수로 버그가 들어간 commit 이 있을 경우

## 3. 주의할 점
- git history를 수정하는 것은 local에서만
- 이미 서버에 업로드 된 경우, 다른 개발자와 공유된 상태라면 절대 수정 X!!!
- 내가 수정하고자 하는 history가 이미 서버에 push 되었는지 다른 개발자와 함께 협업한느 Branch 인지 따진 다음 신중하게 써야 함!!

## 4. 예제
```
echo add >> payment-ui.txt #working directory에 있는 payment-ui.txt 파일 수정
git status #파일이 수정되었으면 working directory에 있음을 확인

#modified된 것을 취소하고 싶다면
git restore payment-ui.txt #해당 파일 변경사항을 취소
```

```
echo add > add.txt
git add .
git commit -m "."

git commit --amend -m "Add new file" #방금 커밋한 메시지가 . -> Add new file 로 수정됨
#파일 내용도 수정이 되어야 한다면 해당 파일을 열어서 수정하고 git add 명령어로 staging area에 올린다음
git commit --amend 
```

## 5. 명령어
```
git restore 파일이름 #파일에 대한 변경사항을 취소한다.
git restore . #working directory에 있는 모든 파일들을 초기화
git restore --staged payment-ui.txt #staging area에 있는 파일을 다시 working directory에 가져가고 싶을 때
git reset HEAD . #특정한 포인터를 가리켜 초기화 하고 싶을 때
git restore --source=해시코드 #어떤 commit으로부터 파일을 초기화 할 건지 설정할 수 잇음
git restore --source=HEAD~2 파일이름 #HEAD에서 2번째 떨어진 commit 에서 해당하는 파일을 초기화

git commit --amend -m "메세지" #직전에 커밋한 메시지를 변경하고 싶을 때
```

## 6. 기타
- WIP : Working In Progress(아직 일이 진행중..)














