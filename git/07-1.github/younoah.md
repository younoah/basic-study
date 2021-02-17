

## 커밋 분할하기



1. intreractive rabse로 진입

```shell
git rebase -i 해시코드
```

> 해시코드는 분할하고 싶은 커밋들의 바로 이전 커밋의 해시코드를 작성한다.



2. 분할하고 싶은 커밋 앞에 키워드 e or edit 작성하고 저장후 종료



3. HEAD가 분할하고 싶은 커밋에 머물러있는 것을 확인



4. 커밋을 git history에서 빼와서 워키디렉토리로 옮기기

```shell
git reset --mixed HEAD~1
```

> 분할하고 싶은 커밋의 앞 버전으로 리셋



5. `git status`에서 워키디렉터릭 변경사항 확인



6. 원하는 변경사항을 분리해서 커밋진행하기

ex)

modified : a.txt

untracked : b.txt

```shell
git add a.txt
git commit -m "update a.txt" 

git add b.txt
git commit -m "add b.txt"
```



7. rebase 마무리하기

```shell
git rebase --continue
```



## 커밋 합치기



1. intreractive rabse로 진입

```shell
git rebase -i 해시코드
```

> 해시코드는 합치고 싶은 커밋들의 바로 이전 커밋의 해시코드를 작성한다.



2. (in editor) 합치고 싶은 커밋들중 가장 첫번째(오래된) 커밋은 pick으로, 나머지 커밋들은 s or squash로 작성하고 저장후 종료



3. (in editor) 커밋 메시지를 수정하고 저장후 종료



4. 커밋을 git history에서 빼와서 워키디렉토리로 옮기기

```shell
git reset --mixed HEAD~1
```

> 분할하고 싶은 커밋의 앞 버전으로 리셋



5. `git status`에서 워키디렉터릭 변경사항 확인



6. 원하는 변경사항을 분리해서 커밋진행하기

ex).

modified : a.txt

untracked : b.txt

```shell
git add a.txt
git commit -m "update a.txt" 

git add b.txt
git commit -m "add b.txt"
```



7. rebase 마무리하기

```shell
git rebase --continue
```



## 주의사항

git histoy를 수정하는 것은 수정한 부분부터 뒤로 쭉 모든 커밋들의 수정이 된다. 정확하게는 자기 앞의 커밋이 바뀌었기 때문에 참조하는 포인터가 변경이되어 해시코드(포인터)가 변경이된다.

따라서 혼자서 로컬이나 원격에서 작업할 때 사용해도 괜찮지만

다른 사람과 협업할 때 서버에 업로드된 git histoy를 수정하면 충돌이 발생하기 때문에 주의해야한다.



## 깃허브



- local에 commit한 내용을 server에 올리기

```shell
git push
```

- server에 업데이트 된 내용을 local에 가져오기

```shell
git pull
```



### 깃허브 프로젝트를 내 PC에 가져오기

1. 원격 저장소 주소 복사해 놓기
2. local의 워하는 폴더에 clone 받기

```shell
git clone 원격저장소주소 # 깃허브 저장소 이름으로 디렉터리 생성
git clone 원격저장소주소 디렉터리명 # 디렉터리명 지정하여 생성
```



**remote관련 명령어**

```shell
git remote # 연결된 원격 저장소 이름 확인
git remote -v # 연결된 원격 저장소 이름과 주소 확인
git remote add 원격저장소이름 주소 # 새로운 원격저장소 주소를 이름을 지정하여 연결
git remote show 원격저장소이름 # 원격 저장소 정보를 자세하게 확인
```

