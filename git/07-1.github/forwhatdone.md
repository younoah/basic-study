## 6.11 - 12 코끼리 커밋 분할하기

- commit 은 한가지만 하는 것이 좋다
    1. 기능 하나 추가
    2. 버그 하나 수정
    3. library 하나 추가

```bash
#git log를 통해 수정해야할 커밋 이전 해시코드 확인
git rebase -i 해시코드 

#수정해야할 commit 확인하고
pick 해시코드 > e 해시코드 
#저장하면 HEAD가 수정해야할 commit에 위치해 있음을 확인

#commit 을 2개로 분리하고 싶은 경우, commit을 다시 wd 가져와야 함
git reset HEAD~1
git add 파일1
git commit -m "Add payment library"

git add 파일2
git commit -m "Add payment service"

#변경 사항이 마음에 들면
git rebase --continue
```

 

## 6.13 - 14 개미들을 모아서

```bash
#git hist 또는 git hist를 통해서 수정해야할 커밋 이전 해시코드 확인
git rebase -i 해시코드

#설정한 editor 띄워짐

#squash 할 commit 중 제일 위에 있는 커밋은 pick 명령어 유지
#나머지 commit은 pick -> squash 로 수정 
```


# 7. 깃허브
## 7.1 깃허브의 필요성

- local(내 PC)에만 git repository를 만들고 간직한다면 내 PC에 문제가 생기거나 다른 환경에서 작업을 하고 싶을 때 repository에 접근이 불가능
- 위의 문제를 해결하거나 다른 사람들과의 협업을 위해서 **remote라는 server에 나의 git repository를 업로드**해두어서 항상 다른 PC에서도 접근이 가능하고 다른 개발자들과 함께 일을 할 수 있도록 하기 위해서 sever 를 이용


- 깃 특징 및 장점
    - 분산형 시스템

    - 각각의 개발자들이 history를 가지고 있음으로서 서로 공유할 수도 가능
    - 문제가 생겼을 때 복원도 가능
    - 오프라인에서 작업할 수 있음

- local 에서 작업한 내용을 sever에 업로드 해두고 sever에서 작업한 것을 local로 가지고 오는 방법
    - server에 이미 존재하고 있는 git repository를 가지고 올때는 : **`clone`**
    - local에서 commit 한 내용을 sever에 올려 두고 싶을 때는 : **`push`**
    - serve에 업데이트 된 내용을 나의 local에 업데이트 하고 싶을 때는 : **`pull`**
    - serve에 업데이트 된 내용이 내가 local에서 작업하고 있는 동일한 파일이라면 > merge conflicts 발생

## 7.2 오픈소스 프로젝트 참여하기

- 오픈소스 프로젝트에 대한 접근과 쓰기 권한이 없으므로 오픈소스 프로젝트 repository를 fork 해 온다.
    - fork란 기존의 repository에 바로 commit을 하는 것이 아니라 나의 repository에 동일하게 복사해서 가지고 오는 것을 말합니다. **`(clone과는 무엇이 다른지?)`**
- fork된 나의 repository에 내가 구현한 것을 commit한 다음 pr, pull request 작성해서 이 오픈 소스에 제출(코드리뷰 요청하는 것과 같음)
- 오픈소스 프로젝트 관리자가 나의 pr을 리뷰한다.
- 오픈소스 프로젝트에 업데이트 된 다른 commit이 있다면 rebase를 이용해서 나의 repository를 최신 버전으로 즉, 오픈소스 프로젝트 sync를해서 최신상태를 유지한 다음에 merge PR을 할수 있다.


## 7.3 깃허브 계정 만들기

- Manage access : 협업할 개발자 추가 페이지
    - invite collaborator : 아이디나 이메일로 추가
        - 상대방이 나의 git repository에 push할 수 가 있음

## 7.4 깃허브 프로젝트를 내 PC에 가지고 오기

- server에 있는 프로젝트를 local로 가져올 때
    - git clone할 수 있는 주소

        ```bash
        git clone
        ```

    - download.zip

- 명령어

    ```bash
    # 작업하고 있는 폴더로 directory 설정
    git clone 복사한 주소
    git remote #서버의 관련된 정보를 확인, 기본적으로 server에 있는 것의 이름은 origin
    git remote -v #origin의 정확한 정보들을 확인할 수 있음

    #현재 있는 폴더에서 다른 깃허브 프로젝트를 추가하고 싶을 때 다수의 origin을 설정 가능
    git remote add 이름 링크 

    git remote show origin #origin에 대한 정보를 볼 수 있다
    git remote show 이름 #이름에 해당하는 원격정보를 볼 수 있다.
    ```

## 7.5 나의 커밋을 서버에 저장하기

 

```bash
#wd 설정
echo add > add.txt
git add .
git commit -m "Add new file"
git hist 
```

- git server 에는 2번째 커밋까지, local은 세번째 commit까지 더 앞서 있는 상태

```bash
git push #local에 있는 commit을 server에 업데이트 
#github 유저 이름과 패스워드 입력
```

- github 페이지 들어가서 확인


## 7.6 푸쉬를 간편하게 하기 SSH

- SSH : secure shell protocol , 우리가 사용하고 있는 terminal과 serval 간에 안전하게 아이디와 비밀번호를 유지
- server에는 public key를 제공하고 local에는 private key를 생성해 넣음으로써 push를 할 때 번거롭게 아이디와 비밀번호를 입력하지 않아도 된다.

- 설정하는 방법
    1. 깃헙페이지 아바타 클릭해서 settings 메뉴를 클릭
    2. SSH and GPG keys 클릭
    3. generating ssh key 링크 클릭
