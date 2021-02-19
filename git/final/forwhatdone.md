# 7.7 push 심화 내용
- local 에 있는 내용으로만  push를 하고 싶다면
```
git push -f
```

# 7.8  이미 만들어진 프로젝트 깃허브에 추가하기
- github 에서 새로운 repository 생성
- cli 에서 wd 설정한 후
	```
	git remote add origin url주소 
	git remote #origin 이름 확인
	git push
	```

# 7.9 fetch vs pull 차이점
- fetch
	- server에 있는 history를 가져와서 local에 있는 history를 업데이트 하게 됨
	- history를 업데이트 하지만 내가 현재 바라보고 있는 환경의 HEAD는 그대로 유지됨
- pull
	- server에 있는 history를 가지고 오면서 
	- local에 있는 내용을 함께 merge하게 됨

# 7.10 fetch 심화
```
git fetch remote이름 
```

# 7.11 pull 심화
- local과 server에서 같은 파일에 수정을 하고 각각 새로운 commit이 있을 때
- merge conflict 발생
```
git mergetool 수정
git add .
git merge --continue
```
- merge 됨

- rebase를 이용해서 local과 server의 commit을 합치고 싶다면
```
git reflog
git reset --hard 해시코드 #local commit을 만든시점으로 바꾸고
git pull --rebase 
git mergetool # 수정 후
git rebase --continue 
git push 
```


# 7.12 오픈소스 프로젝트 참가법 
- 개인 계정에서 fork 버튼 클릭
- cloning 클릭 
	- SSH 가 설정되 어 있으면 해당 링크 클릭
	- 아니라면 HTTPS 클릭 후 해당 링크 클릭
- TERMINAL 에서
	```
	git clone 복사한 링크
	# clone 후
	cd 해당 폴더
	git switch -C fix 
	ls
	start awesome.txt
	# 버그 삭제, 및 수정 후
	git commit -am "FIX"
	git push origin fix
	```
- github 사이트 프로젝트 안에서 pull request 버튼 클릭
- Title은 핵심내용만 간결하게 description 자세하게 적는 것이 좋다


# debugging
## terminal
```
git blame 파일명
```

## sourcetree
- 폴더 오른쪽 마우스 클릭 > Annotate Selected 


## editor
- git lens 확장자 설치
- 오른쪽 상단 git lens 아이콘 클릭


# Bisect
- 괜찮은 커밋 을 확인
```
git checkout 해시코드
git bisect start 
git bisect good
git checkout master
bit bisect master 
```
