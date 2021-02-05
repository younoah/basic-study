## branch

### 브랜치란?

브랜치는 git의 커밋들의 줄기이다.

git은 기본적으로 커밋의 가장 큰 줄기는 main(구, master)이라는 브랜치가 가리킨다.

하지만 하나의 줄기(main브랜치)로만 프로젝트를 관리하다 보면 병렬적으로 커밋을 관리할 수 없다.

따라서 줄기를 나누어서, 즉 여러 브랜치를 만들어서 커밋을 관리하고 main브랜치에 merge하는 식으로 커밋을 관리하면 직관적이고 병렬적으로 git을 관리를 할 수 있다.



### 명령어 정리

- 브랜치 목록 확인

```shell
git branch # local의 브랜치만 확인
git branch --all # 원격 서버와 연결된 브랜치까지 전부 확인
git branch -v # 브랜치 목록과 함껜 최신 commit정보 함께 확인
git branch --merged # 현재 브랜치에 merge된 브랜치 목록 확인
git branch --no-merged # 현재 브랜치에 merge되지 않은 브랜치 목록 확인
```



- 브랜치 생성

```shell
git branch 브랜치명
```



- 브랜치 이동(변경)

```shell
git switch 브랜치명
git checkout 브랜치명
```

> `git checkout ` 은 브랜치 이동 뿐 아니라 커밋 이동도 가능한 유용한 명령어이다.
>
> `git checkout 커밋해쉬코드` : 커밋 이동
>
> `git checkout 브랜치명` : 브랜치 이동



- 브랜치 생성하고, 즉시 생성된 브랜치로 이동

```shell
git switch -C 브랜치명 # -C 옵션: create branch
git checkout -b 브랜치명 # -b 옵션: 브랜치 생성
```



- 브랜치 삭제

```shell
git branch -d 브랜치명 # -d 옵션: delete branch
git push origin(원격저장소명) --delete 브랜치명 # 원격서버에 존재하는 브랜치 삭제
```



- 브랜치명 변경

```shell
git branch --move 기존브랜치명 새로운브랜치명
git push --set-upstream origin(원격저장소명) 기존브랜치명 새로운브랜치명  # 원격서버에 존재하는 브랜치명 변경
```



- 2개의 브랜치 간에 관계

```shell
git log 브랜치1..브랜치2 # 두 브랜치간에 관계된 log만 보여준다.
git diff 브랜치1..브랜치2 # 두 브랜치간에 변경된 것을 확인
```



## merge



### merge명렁어

- merge 진행하기

master 브랜치로 이동한 뒤 아래 명령어를 작성한다.

```shell
git branch 브랜치 # default is fast-forward
git branch --no-ff 브랜치 # no-fast-forward

git branch -d 브랜치 # merge한 이후에는 merge된 브랜치를 삭제한다.
```

> 보통 HEAD를 master로 해서 merge하지만
>
> HEAD를 다른 브랜치로 하여 다른 브랜치를 merge할 수도 있다.



- mgere 취소하기

```shell
git merge --abort
```



- 충돌 해결하고 이어서 merge하기

```shell
git merge --continue
```





### three-way merge 방식

- fast-forward merge (default)
- no-fast-forward merge
- fast-forward merge 불가능 -> no-fast-forward merge



> 그냥 git merge를 할 때 기본적으로 fast-forward merge가 가능하다면 fast-forward merge를 진행한다 하지만 three-way 같은 상황이여서 fast-forward merge가 불가능하다면 no-fast-forward merge가 진행되면서 커밋 기록을 남긴다.
>
> fast-forward merge가 가능한 상황임에도 커밋 기록을 남기는 no-fast-forward merge를 하고싶다면 `git merge --no--ff 브랜치` 를 사용한다.



### fast-forward merge

![merge1](/Users/uno/Desktop/merge1.png)

![merge2](/Users/uno/Desktop/merge2.png)



기존에 작업하던 브랜치가 가리키는 커밋에 master 브랜치를 가리키도록 하고 브랜치를 삭제하는 방식이다.

이 방식은 히스토리에 merge가 되었다는 사실이 남지 않기 때문에 깔끔하게 merge하는 방식이다. merge가 기록이 되지 않는다는점에서 단점이 될 수도 있다.

```shell
# in master branch
git merge branch1

git branch -d branch1
```



### no-fast-forward merge

merge 기록까지 모두 히스토리에 남기고 싶다면 아래와 같이 c커밋과 e커밋을 합한 f커밋을 새로 만들고 master브랜치에 커밋한다. 이렇게 하면 branch1이 merge되었다는 것을 기록에 남길 수 있다.

![merge3](/Users/uno/Desktop/merge3.png)



```shell
# in master
git merge --no-ff branch1 # --no-ff 옵션: no fast-forward
```



### fast-forward merge가 불가능한 상황

![merge4](/Users/uno/Desktop/merge4.png)

위와 같은 상황이 fast-forward merge가 불가능한 상황이다. 커밋 e로 master브랜치를 fast-forward merge 하게되면 커밋 f와 커밋g를 잃게 된다. 따라서 no-fast-forward merge를 진행해야 한다. 

git은 이런 상황에서 아무런 옵션없이  `git merge branch1` 만 해도  no-fast-forward merge를 진행한다.



## conflict

서로 다른 2가지 이상의 브랜치에서 동일한 파일의 내용을 수정하고 merge를 하면 충동이 발생한다.



충돌 해결 방법

- 수동으로 해결
- vscode 활용
- M4Merge 툴 활용



### 충돌 상황

```shell
<<<<<<< HEAD
Oh.. Here!! From master branch!
=======
Oh.. Here!! From feature branch!
>>>>>>> another-branch
```

merge를 하고 출동이 발생하면 해당 파일에 이러한 표시가 보인다.

HEAD는 현재 브랜치의 내용을 표시하고 another-branch는 HEAD가 아닌 다른 브랜치를 말한다.



### 수동으로 해결하기

직접 해당 파일로 들어가서 충돌 부분에서 둘중 1개를 선택하든지 둘다 선택하든 하여 수정해주고 저장한다.

이후에 git status를 확인하면 아래와 같은 순서대로 진행하게 되어있다.

```shell
git add 충돌파일
git merge --contine
```

이렇게 되면 no-fast-forward merge가 진행되면서 완료된다.