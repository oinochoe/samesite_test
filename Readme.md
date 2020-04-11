# host 설정
* $ sudo vi /etc/hosts
* 아이피 주소를 넣고 구분은 탭(tab)으로 해야 한다.
* $ dscacheutil -flushcache (dns 캐시 재부팅)

```js
// hosts
127.0.0.1 하고싶은도메인.com
127.0.0.1 sub.하고싶은도메인.com
127.0.0.1 third.com
```
