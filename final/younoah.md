### 강제 푸쉬

```shell
git push -f # -f 옵션 : 강제 푸쉬
```

로컬에서 a.txt 라는 파일을 작업하고 있고 서버에서도 똑같이 a.txt라는 파일이 업로드되어있다. 로컬과 서버는 동기화가 되지 않은 상태라서 로컬에서 일반적인 ` git push` 를 하게 될 경우 충돌이 발생한다.

이때 로컬에서  `-f` 옵션으로 강제 푸쉬를 하게 되면 서버의 a.txt 파일 변경사항을 무시하고(없애버리고) 로컬의 a.txt를 서버에 푸쉬할 수 있다.

 

### 이미 만들어진 깃프로젝트를 깃허브에 추가하기

1. 깃허브에서 레포지토리를 생성한다.
2. remote주소를 복사한다.
3. 로컬에 있는 깃프로젝트에서 `git remote add 원격저장소이름 원격저장소주소 ` 를 입력한다.



## fetch vs full



### fetch

![fetch](https://user-images.githubusercontent.com/41064875/107731147-90363580-6d38-11eb-8549-65196edfec2a.png)

히스토리를 업데이트 하지만 내가 현재 바라보고 있는 작업 환경인 HEAD(master)는 그대로 유지가 된다. 또한 **merge**가  발생하지 않는다.

fetch는 주로 원격저장소에서 어떤 일들이 발생하고 있는지, 누가 어떤 일을 하는지 확인하고 싶은 경우에 많이 사용한다.



### pull

![pull](https://user-images.githubusercontent.com/41064875/107731150-93312600-6d38-11eb-83f7-2b5569e19769.png)

히스토리를 업데이트 하면서 나의 local에 있는 내용을 **merge** 한다. 즉, 원격저장소의에 있는 내용을 받아와서 나의 로컬 버전도 원격저장소와 함꼐 동일하게 만든다.

그래서 새로운 커밋을 받음과 동시에 origin master와 local의 master가 동시에 최신 커밋을 가리킨다.

**만약 conflict가 발생했을 경우**

1. no-fast-forward merge

	```shell
	git pull # pull 이후 conflict 확인
	
	git mergetool # merge tool로 conflict 해결
	
	git add . # 변경사항 staging area에 추가
	git merge --continue # merge 완료하기
	```

2. rebase 활용하여 깔끔하게 merge하기

	```shell
	git pull --rebase # rebase모드로 pull
	
	git mergetool # merge tool로 conflict 해결
	
	git rebase --continue  # rebase 완료하기
	```





```shell
git fetch 원격저장소 # 해당 원격저장소의 히스토리를 fetch
git fetch 원격저장소 브랜치 # # 해당 원격저장소의 브랜치의 히스토리만을 fetch

git pull 원격저장소 # 해당 원격저장소의 히스토리를 pull
git pull 원격저장소 브랜치 # # 해당 원격저장소의 브랜치의 히스토리만을 pull
```



## git으로 디버깅하기



### blame

`git blame` 을 활용하면 코드 한줄한줄을 누가 수정/작성하고 커밋했는지 자세하게 확인 할 수 있다.

```shell
git blame 파일명
```



### bisect

`git bisect` 명령어를 이용하면 시작시점과 끝시점을 이진탐색을 통해 문제점을 찾아낼 수 있다.

```shell
# 우선 시작점(시작 커밋)으로 이동한다. - 문제가 없던 마지막 부문을 시작커밋으로
git bisect start # bisect 시작
git bisect good # 시작점은 문제가 없는 부분이니 good을 체크한다.

# 문제를 인식 시점을 마지막 시점으로 하고 마지막시점(커밋)으로 이동한다.
git bisect bad # 마지막 시점은 문제가 있는 부분이니 bad를 체크한다.

# 시작점과 마지막점을 good/bad로 세팅하면 그사이 중간지점으로 간다.
# 해당 지점에서 문제가 있으면 good를
# 해당 지점에서 문제가 있다면 bad를 체크한다.

# 다시 good과 마지막점(bad)의 중간지점으로 로 이동하며 반복한다.

# 이렇게 점차 탐색을 하다 최종적으로 하나의 커밋으로 수렴하면 bisect가 종료되며 안내해준다.
```

