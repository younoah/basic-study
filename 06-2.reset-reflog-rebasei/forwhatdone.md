# reset

## 1. reset이란?

- 특정한 commit으로 초기화 시켜주는 명령어
- 초기화할 때 변경했던 든 내용들을 local로 가져오거나 완전히 삭제할 수 있음

```bash
git reset 해시코드 # git reset HEAD~숫자
```

- 초기화한 commit 은 history에서 사라졌지만 작업하고 있는 파일은 wd에 남아있음

## 2. reset 명령어

```bash
git reset # git reset --mixed 와 같음, version history에는 사라지지만 작업하고 있는 파일은 working directory에 남아있게 함
git reset --soft HEAD~1 #작업하고 있는 파일이 staging area로 들어와 있는 것을 확인할 수 있음
git reset --hard HEAD #local로도 가져오지 말고, commit 에서도 지워주는 완전히 삭제
```


# reflog

- git reflog (reference 를 참고하다)
- git reset 을 이용하여 commit 을 초기화 했다가 다시 이전으로 돌아가고 싶을 때 사용

```bash
git reflog #레퍼런스를 참고, 이전 HEAD가 가리키고 있는 내용을 다 기억하고 있음

#여태까지 실행했던 명령어 노출
#변경되었던 HEAD가 가리키고 있었던 포인트까지 확인
git reset --hard 해시태그 
```

- 주의!
    - commit 이후 git reset --hard 해시코드를 이용할 것
    - commit 이전에 local 에 작성한 파일을 git reset --hard 를 이용해 초기화를했다면 다시돌아갈 확률이 적다!
        - intelliJ idea에는 기본적으로 local history가 포함됨
        - local history extension 설치 후

# revert

```bash
git revert hashcode
git revert --no-commit hashcode #commit을 하지않고 취소되는 변경사항을 staging area에 추가
```

- commit에서 변경했던 모든 사항을 다 삭제해주는 새로운 commit 생성
- 주의! revert 할 경우 다른 내용을 수정하거나 버그를 고치는 것 XX

# Interactive rebasing

- 최신 commit이 아니라 이전 commit을 업데이트 하고싶을 때 사용하는 옵션

```bash
git rebase -i 변경하거 싶은 커밋 이전 해시코드
```

```bash
pick # 사용
reword # commit 메세지 변경
edit # commit 사용, 변경사항을 바꿈
squash # 여러가지 commit 을 하나로 묶어주는
fixup # 여러가지 commit 을 하나로 묶어주는, 커밋 메세지는 남기지 않음
break # 여기서 멈춤
d # 해당하는 commit을 제거할 때
```

- 주의
    - rebasing 하는 순간, 하나를 수정하더라도 해당 커밋 이후의 커밋은 업데이트 됨
    - 기존에 존재하는, commit 된 history를 변경하는 것이기 때문에 서버에 업로드된 경우는 피해야한다

### 예제

```bash
git rebase -i HEAD~2
# 삭제하고자 하는 커밋이 있을 경우
pick 해시코드 > d 해시코드 로 수정
git add .
git rebase --continue

```
