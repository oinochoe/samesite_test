# host 설정

- \$ sudo vi /etc/hosts
- 아이피 주소를 넣고 구분은 탭(tab)으로 해야 한다.
- \$ dscacheutil -flushcache (dns 캐시 재부팅)

```js
// hosts
127.0.0.1 하고싶은도메인.com
127.0.0.1 sub.하고싶은도메인.com
127.0.0.1 third.com
```

## 쿠키 생성

1. 하고싶은도메인.com 들어가서 cookieMaker를 눌러 쿠키를 생성한다
2. third.com 들어가면 cookie가 없는 것을 확인할 수 있다. samesite 도메인이 아니므로
3. third.com 에서 cookieConfirm을 눌러 하고싶은도메인.com 에 쿠키 서드파티 인젝션을 시도
4. 쿠키가 생성된 것을 확인할 수 있다.(네트워크 탭에서 request 헤더 탭을 보면 확인 가능)

- 이렇게 사용자가 모르는 정보가 알아서 전송되는 것을 CSRF 공격으로 간주할 수 있다.
- 여러 경우 이렇게 third.com에서 하고싶은도메인.com으로 자동으로 전송되는 공격에 의해서 보안의 위협이 있다.

## Same Site 설정

```javascript
res.append('Set-Cookie', `cookie1=default_value; SameSite=none;`);
res.append('Set-Cookie', `cookie2=Lax; SameSite=Lax;`);
res.append('Set-Cookie', `cookie3=Strict; SameSite=Strict;`);
```

## Sub 도메인과 Third 도메인 확인

- network에서 request 정보를 확인해보면 sub 도메인은 3개 다 요청하는 반면
- Third 도메인은 `cookie1=default_value` 만 전송하는 것을 확인할 수 있다.

## Same Site Lax

- 서드파티에서 SameSite Lax는 몇 가지 경우에서만 가능하다.
