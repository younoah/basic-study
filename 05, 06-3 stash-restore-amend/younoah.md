## stash

<img width="579" alt="stash1" src="https://user-images.githubusercontent.com/41064875/107145825-8b176600-6987-11eb-8a00-2f8d389961b4.png">

git에는 stash stack이 존재한다. 

stash를 이용하면 git histoty에 저장하지 않고 임시로 stash에 저장할 수 있다.

**워킹 디렉터리에서 작업하다가 add, commit을 하지 않고 잠시 다른 브랜치를 이동**해야하거나

혹은 워킹디렉터리에서 버그를 고치고 있는데 **여러가지 시도를 할 때 각각의 시도를 잠시 저장**할 때

stash를 유용하게 사용할 수 있다.

> 어떤 브랜치에서 작업하다가 commit을 하지 않고 다른 브랜치로 이동을 하게 되면 워킹 디렉터리에서 작업중이던 내용과 함께 다른 브랜치로 이동하게 된다. 따라서 어떤 작업을 하다가 다른 브랜치로 이동을 할 때는 커밋을 하고 이동해야한다.



### stash 명령어

- 저장

```shell
git stash # git stash push와 동일
git stash push -m "message" # make a new stash with message
git stash --keep-index # stash but keep them in the staging area 
git stash -u # --include-untracked
```

> `git stash --keep-index` 명령어를 사용하면 stash하고 staged area도 유지하게 된다.
>
> 이 상태에서 다른 브랜치로 이동하면 이동한 브랜치에서 staged area도 같이 이동되어 적용되기 때문에 이점을 유의하고 사용해야한다.

> 새로 추가한 파일을 stash 해보면 안되는것을 확인할 수 있다. untracked 파일은 stash할 수 없고 tracked 파일만 stash할 수 있다. 하지만 `git stash -u` 명령어를 사용하면 untracked 파일도 stash가 가능핟.



- stash 리스트 확인

```shell
git stash list #see all the stashes
git stash show hash #see the given stash
git stash show hash -p #see the given stash with details
```

> hash는  `stash@{0}` , `stash@{1}` ... 이런 아이들



- apply

```shell
git stash apply hash # applies the given stash
git stash apply # applies the latest stash
git stash apply --index # apply the stated changes
git stash pop # apply the latest stash and drop
git stash branch branchName # creat new branch and apply stash in a new branch
```



- stash 삭제

```shell
git stash drop hash #deletes the given stash 
git stash clear #deletes all the stashes
```



### 참고

> 어느 브랜치든 stash에 있는 내용을 확인(list)할 수 있고, 적용(apply)와 삭제(drop, clean) 모두 할 수 있다. 



## git undo (git 되돌리기)

나의 로컬에만 있는 커밋들만 수정하거나 되돌려야한다.

만약 서버(원격저장소)에 올린 커밋이라면 push를 통해서 서버에도 적용해야한다.

혹시 다른 개발자와 협업하는 브랜치라면 충돌이 발생할 수 있으므로 조심해야한다.



## Local change

> 로컬에서 작업하고 있는 staging area나 working directory에서 작업하는 내용을 초기화 할수 있는 방법



#### tracked 파일의 변경사항(modified) 초기화

<img width="507" alt="restore1" src="https://user-images.githubusercontent.com/41064875/107145829-8eaaed00-6987-11eb-916d-82b07e7634c7.png">

tracked 파일의 내용을 수정하면 git에서 자동으로 modified로 지정되는데 

이때 아래 명령어를 이용하면 

```shell
git restore 파일명
```

tracked 파일의 수정된 내용을 되돌릴수 있다.  (modified 내용 삭제)

즉, 수정한 내용을 삭제해버리고 기존 상태로 되돌린다.



#### staging area에 올라간 파일을 되돌리기

<img width="369" alt="restore2" src="https://user-images.githubusercontent.com/41064875/107145828-8e125680-6987-11eb-9a52-faff2a7253cb.png">

여기 staging area에 올라간 파일이 있다.

아래와 같은 명령어를 이용하면

```shell
git restore --stged 파일명
git restore --source=hash file.txt
```

staging area에 올라가 있는 파일을  staging area에서 빼낼수 있다.

<img width="503" alt="restore3" src="https://user-images.githubusercontent.com/41064875/107145827-8ce12980-6987-11eb-9381-030bb49e101a.png">

빼내고 나면 위의 이미지와 같이 staging area에서는 나와 working directory로 옮겨진다.

> 초록색 표시는 staging area에 있는 상태
>
> 빨간색 표시는 working directory에만 있는 상태

> **`git restore --stged` 와 비슷한 `git reset`**
>
> `git reset HEAD` 를 이용하면 포인터가 가리키는 버전에 맞는 상태로 staging area를 빼내온다.(초기화 된다.)





## 최신 커밋 수정하기 : `commit -amend`

- 가장 최신 커밋의 커밋 메시지 수정하기

```shell
git commit --amend -m "수정된 커밋내용"
```



- 가장 최신 커밋의 내용 수정하기

1. 파일을 수정하고 `add` 한다.
2. 아래 명령어를 통해서 커밋의 내용을 새로 적용한다.

```shell
git commit --amend
```







### 새로 알게된 내용

- index는 staged area, staging은  같은 표현이다.

- git history, git repositoy, git directory는 같은 말이다. 

- 워킹 디렉토리, 작업 트리는, 작업 디렉토리 같은 말이다.

- WIP : working in progress
- 해시코드, 헤드, 헤드^, 헤드~ 들은 하나의 포인터이다.
