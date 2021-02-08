## reset

만약 커밋을 진행하던 중에 이전 커밋 버전으로 되돌리고 싶다면 어떻게 해야할까??

**`git reset`  명령을 이용하면 이전 커밋으로 되돌릴 수 있다.**



```shell
git reset --soft HEAD #removes the commit and keep changes at staging area

git reset --mixed HEAD #removes the commit and keep changes at working directory 

git reset --hard HEAD #removes the commit and don't keep the code
```



> **주의!**
>
> 만약 어떤 A라는 작업을 진행하다가 commit을 하지 않은 상태에서  `git reset --hard` 로 초기화 했다면 A라는 작업을 잃어버릴수 있다. 
>
> 그러니 꼭 reset을 하기 전에는 commit을 하여 git history를 남겨두고 reset을 하는것이 안전하다.



## reflog

**만약 `git reset` 으로 이전 커밋으로 돌아간 상태인데 다시 원래대로 되돌리고 싶으면 어떻게 해야할까?**



이때 `git reflog` 를 활용하면 다시 원상복귀 하는것 도 가능하다.

`reflog` 는 reference log의 약자로  git의 모든 log를 참조할 수 있다.

`git reflog` 명령어를 치면 해당 프로젝트에서 사용한 모든 git 기록들과 해시코드가 나와있다.



### 예제

![reflog1](/Users/uno/Desktop/reflog1.png)

처음 깃 히스토리 에서 "update hello.txt"(`0020e11`) 로 `git reset --hard 0020e1` 로 커밋을 되돌려 보겠다.



![reflog2](/Users/uno/Desktop/reflog2.png)

`git reset --hard 0020e1` 결과 위와 같은 상태가 되었다. 그런데 다시 "update about.txt"(`20a0cbc`) 로 돌아가고 싶다면 어떻게 할까?



우선 아래 명령어를 통해 reference를 확인해보자

```shell
git reflog
```

![reflog3](/Users/uno/Desktop/reflog3.png)

위와 같이 해당 깃 히스토리에 대한 모든 레퍼런스르 확인할 수 있다. 여기서 내가 돌아고 싶은 시점인 `20a0cbc` 해시코드를 확인한다.



reset 명령어를 통해서 해당 커밋 시점(버전)으로 되돌아 가자.

```shell
git reset --hard 20a0cbc
```



> 이 때 `--hard` 옵션을 주어야 깔끔하게 되돌아 갈 수 있다.
>
> `---mixed` 나 `--soft` 옵션으로 reset을 하게되면 현재 워키디렉터리의 상태가 유지되면서 되돌아 가게 되는데 이렇게 되면 워키디렉토리에 남아있는 파일들이 함께 이동되거나 되돌아간 시점의 파일이 삭제된 상태가 유지될 수 있기 때문이다.
>
> **`git reset 20a0cbc` 을 진행 했을 경우**
>
> ![reflog4](/Users/uno/Desktop/reflog4.png)
>
> 현재 워킹디렉토리에는 new.txt가 없는 상태이기 때문에 이 상태가 반영이 되버린다. 따라서 new.txt가 있는 커밋 버전으로 돌아갔음에도 불구하고 해당 파일이 삭제되거나 내용을 잃을수 있기 때문에 `--hard` 옵션으로 되돌려야 한다.



**최종 결과**

![reflog1](/Users/uno/Desktop/reflog1.png)

`git reflog` 와 `git reset --hard` 명령어를 통해서 깔끔하게 원래대로 되돌아 왔다.



## revert - 커밋을 취소하고 버전으로 남기기

문제가 되는 커밋을 완전히 제거해서 이전 상태로 되돌려야할 경우에 

`git revert` 명령어를 이용하면 커밋을 취소하고 이전상태로 되돌린 후 커밋으로 기록을 남길 수 있다.



### 예제

`user.txt` , `login.txt` 라는 2개의 파일을 생성하고 각각 "user", "login" 이라는 텍스트를 입력하고 커밋을 해두었다.

그리고 각각 "update" 라는 텍스트를 추가하여 update 커밋을 각각 해두었다. 

**(파일 내용)**

```shell
# in user.txt
user
update # 새로 추가한 내용 (커밋 : update user.txt)

# in login.txt
login
update # 새로 추가한 내용 (커밋 : update login.txt)
```



**(커밋 log)**

![revert1](/Users/uno/Desktop/revert1.png)



이 때 user.txt 의 업데이트 내용이 잘못된 것을 알게 되었다. user.txt의 상태를 이전으로 되돌리고 커밋을 취소해보자.



아래 명령어를 통해서 "update uset.txt"(`2682273`) 커밋을 취소하고 user.txt 를 원래 상태로 되돌려보자.

```shell
git revert 2682273
```

![revert2](/Users/uno/Desktop/revert2.png)

명령어를 치면 위와 같이 커밋이 진행되며선 커밋메시지를 작성하도록 뜬다. 저장하고 종료해보자.



![revert3](/Users/uno/Desktop/revert3.png)

다시 log를 확인해보면 "update uset.txt" 커밋이 revert 되었다는 커밋이 새로 추가된 것을 확인할 수 있다.



```shell
# in user.txt
user
```

user.txt 파일을 열어보면 update 내용이 삭제된것을 확인해 볼수 있다.



- `git revert --no-commit`

revert 할 때 `--no-commit` 옵션을 주면 커밋을 하지 않고 변경사항이 staging area에만 추가 되어진다. 

![revert4](/Users/uno/Desktop/revert4.png)

위 이미지와 같이 user.txt 안에  "update" 라는 내용이 삭제된 상태가 staging area에 추가되어있다. 

보통은 revert를 할 때 자동으로 아무런 옵션을 주지 않고 `git revert 해시코드` 만으로 revert를 돌려서 깔끔하게 revert만 했다는 것을 기록해야한다. 만약 `git revert --no-commit` 을 하고 다른 기능을 추가하고 난뒤 커밋을 하게 되면 revert 커밋을 의미가 사라지고 혼란스러워지기 때문이다.

`git revert --no-commit` 은 충돌난 파일이여서 어쩔수 없이 수정을 해야할 때만 사용하자.



## 이전 커밋 수정하기

가장 최신 커밋을 수정할 때는 `git commit -ammend` 를 활요하 였다. 하지만 그 이전의 커밋이라면

`git rebase -i 해시코드` 명령어를 통해 수정할 수 있다. `-i` 옵션은 interactive의 약자로써 지정한 해시코드 부터 interactive하게 뒤에 어지는 커밋들 까지 rebase를 하게 한다.



![rebase-i1](/Users/uno/Desktop/rebase-i1.png)

이 히스토리에서 WIP 커밋메세지를 수정해보자.



```shell
git rebase -i 726898b
```

> **중요**❗️
>
> 이때 "WIP" 커밋 부터 수정하고 싶으면 "WIP" 커밋 바로 이전 커밋의 해시코드를 작성해야한다.



![rebase-i2](/Users/uno/Desktop/rebase-i2.png)

명령어를 치면 위와 같이 에디터 창이 열리는데 이곳에서, `726898b` 커밋 이후의 커밋들을 수정할 수 있다. 주석을 보면 다양한 옵션들을 확인해 볼수 있다.

> `p or pick` : 해당 커밋 유지
>
> `r or reword` : 해당 커밋의 메시지 변경
>
> `e or edit` : 해당 커밋의 내용 변경
>
> `s or sqush` : 커밋을 묶어 준다.
>
> `f or fixup` : sqush와 비슷하지만 메시지를 남기지 않는다.
>
> `d or drop` : 해당 커밋을 제거



![rebase-i3](/Users/uno/Desktop/rebase-i3.png)

커밋 메시지를 수정하고 싶으니 WIP 커밋 앞에 `r` 혹은 `reword` 키워드를 작성하고 저장한뒤 종료한다.



![rebase-i4](/Users/uno/Desktop/rebase-i4.png)

종료하고 나면 다시 새로운 창이 실행되면서 커밋 메시지를 수정할 수 있게 된다. 여기서 커밋메시지를 수정하고 종료 해보자. ("WIP" → "change commit message" 라고 수정함.)



![rebase-i5](/Users/uno/Desktop/rebase-i5.png)

![rebase-i5](/Users/uno/Desktop/rebase-i6.png)

rebase가 완료되고 커밋 메시지도 변경된것을 확인할 수 있다.



## 필요없는 커밋 삭제하기



![](/Users/uno/Desktop/rebase-i1.png)

이번에는 "WIP" 커밋을 삭제해보자.



```shell
git rebase -i 726898b
```

"WIP" 커밋의 이전 커밋해시코드를 작성하여 interactive rebase를 실행한다.



  ![deleteCommit1](/Users/uno/Desktop/deleteCommit1.png)

d or drop 옵션 선택, 저장후 종료하면 커밋이 삭제된다.



만약 아래 이미지와 같이 충돌이 발생할 수도 있다.

![deleteCommit2](/Users/uno/Desktop/deleteCommit2.png)

이는 내가 삭제한 커밋이 이후에 오는 커밋과 연관이 있기 때문에 커밋이 충돌나는 경우이다.



(git status)

![deleteCommit3](/Users/uno/Desktop/deleteCommit3.png)

이 때는 간단하게 삭제된 커밋을 내용을 그대로 사용해도 되기 때문에 `git add` 명령어로 이어 나가면 된다.



```shell
git add
git reabse --contimue # 충돌 해결후 이어서 rebase를 완료
```

`git reabse --contimue` 를 이어서 입력하면 삭제가 완료된다.