## conflict, vscode로 해결하기

#### 1. mergetool 설정하기

- git 환경설정 파일 열기

```shell
git config --global -e
```

- merge, mergetool 설정하기

```shell
[merge]
	tool = vscode
[mergetool "vscode"]
	cmd = code --wait $MERGED
```



#### 2. merge하기

- merge하기

```shell
git merge 브랜치
```



- conflict 알림

> Auto-merging main.txt
> CONFLICT (content): Merge conflict in main.txt
> Automatic merge failed; fix conflicts and then commit the result.



- mergetool(vscode) 실행하기

```shell
git mergetool
```



- vscode에서 conflict 해결하기

![2021-02-06_19-21-37](/Users/uno/Desktop/2021-02-06_19-21-37.png)

3가지 옵션중 한가지를 클릭하고 저장한다.

- Current Change : 현재 HEAD의 내용
- Incoming Change : merge되는 다른 브랜치의 내용

Compare Change는 2개의 파일을 각각 열어서 비교해준다.



- ❗️merge의 부산물

![2021-02-06_19-25-19](/Users/uno/Desktop/2021-02-06_19-25-19.png)

vscode로 merge를 하고 나면 `파일명.확장자.orig` 파일이 생긴것을 확인할 수 있다.

이 파일은 conflict가 발생했을 때의 내용을 그대로 담고 있는 파일이다.

하지만 이런 파일이 생기는것은 번거롭기 때문에 아래와 같은 명령어를 이용하여 설정을 끄도록 하자.

> mergetool의 백업파일(`.orig` 파일)을 유지하는 옵션을 끈다.

```shell
git config --global mergetool.keepBackup false
```

혹은 git config 파일을 열어서 아래와 같이 옵션을 추가한다.

```shell
[merge]
	tool = vscode
[mergetool "vscode"]
	cmd = code --wait $MERGED
	trustExitCode = true
	keepBackup = false # 백업파일 생성하지 않도록 옵션 추가.
```

> 부산물 (`.orig` 파일) 삭제하기
>
> 이미 생성되어있는 부산물 파일을 `git clean` 명령어를 이용하여 삭제할 수 있다.
>
> (물론 GUI에서 편하게 삭제할 수 도 있다.)
>
> `git clean` 명령어는 추적이 되고 있는 않는 (unstaged) 파일들을 삭제하는 명령어이다.
>
> 간단하게 `git clean -f` 이용해서 삭제하자.  
>
> 옵션) -f : 강제 삭제 , -d : 디렉토리 삭제



- merge 완료하기

```shell
git merge --continue
```

위 명령어를 통해 merge를 마무리한다.



## rebase

merge기록을 남기지 않는 fast-forward merge방식을 선호한다면, fast-forward merge가 불가능한 상황 (three-way merge case) 일 때 어쩔수 없이 no-fast-forward merge를 진행하여 merge기록을 남겨야만 하는것은 아니다.

rebase를 활용하면 fast-forward merge를 할 수 있다.



- fast-forward merge가 불가능한 상황 (three-way merge case)

![rebase1](/Users/uno/Desktop/rebase1.png)

위 이미지는 현재 fast-forward merge가 불가능한 상황인 three-way merge case이다. 



![rebase2](/Users/uno/Desktop/rebase2.png)

`branch1` 을 커밋 `f`를 가리키게 rebase를 한다면 fast-forward merge가 가능하다.



### rebase 주의점

나 혼자서 `branch1` 을 작업하고 있다면 언제든지 rebase를 자유롭게 할 수 있지만 만약 다른 개발자와 함께 `branch1` 에서 작업을 하고 있을 때 rebase를 한다면 위험하다.

rebase를 한다면 커밋의 포인터를 변경하게되는데 이렇게 커밋의 포인터정보가 바뀌게 된다면 기존의 커밋이 유지되는 것이 아니라 겉으로는 이름까지 같아보이는 새로운 커밋이 생성된 것이다.

이 때 내가 rebase를 한다면 다른 개발자와 커밋정보가 다르기 때문에 충돌이 발생할 수도 있으니 꼭 혼자만 브랜치를 관리하고 있을 때만 rebase를 사용하도록 하자.



> 실험결과 rebase는 해당 브랜치가 파생된 커밋 이전으로 rebase는 불가능한 것 같다.
>
> 위 그림 예제를 통해 보면 `branch1` 은 c커밋 이전으로 rebase가 불가하고 이후 커밋으로만 rebase가 가능하다.



### rebase 명령어

```shell
# in rebase를 진행할 브랜치
git rebase 브랜치or해시코드
```



이후에 `master` 에서  `branch1` 을 fast-forward merge할 수 있다.

```shell
# in master
git merge branch1 #  fast-forward merge 진행
```





## rebase --onto



**브랜치에서 파생된 브랜치**를 **master브랜치**에 **rebase**를 해야하는 경우가 있다.



![rebase--onto1](/Users/uno/Desktop/rebase--onto1.png)

예를 들어 위의 이미지와 같이 `server` 브랜치에서 파생된 `client` 브랜치가 있다고 하자. 

이 때 테스트가 덜된 `sever` 브랜치는 납두고 `client` 브랜치만 `master` 브랜치로 합치고 싶을 때 `rebase` 의 `--onto` 옵션을 활용한다.

```shell
git rebase --onto master server client
```

> server브랜치에서 파생된 client 브랜치를 master 브랜치로 rebase --onto 하는 명령어이다.

해당 명령어를 수행하면 아래 이미지와 같이 `client` 브랜치가 변경된 것을 확인할 수 있다.

![rebase--onto2](/Users/uno/Desktop/rebase--onto2.png)



## cherry pick

cherry pick은 다른 브랜치에 있는 내가 원하는 커밋 1개를 가지고 오는 명령어이다.



아래 이미지와 같이 `e` 라는 커밋만을 master 브랜치로 가지고 오고 싶다고 하자.

![cherrypick1](/Users/uno/Desktop/cherrypick1.png)



마스터 브랜치에서 아래 명령어를 통해 체리픽을 사용하면

```shell
#in master branch
git cherry-pick 해시코드(e커밋)
```



 아래 이미지 처럼 `e` 라는 커밋만을 master 브랜치로 가지고 올 수 있다.

![cherrypick2](/Users/uno/Desktop/cherrypick2.png)



