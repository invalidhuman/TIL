
### Expo에서 Deep Link 등록하는 법

Expo에서는 `app.json`에 스킴을 등록해두면 된다.

```json
{
  "expo": {
    "scheme": "myapp"
  }
}
```

이 한 줄이 OS한테 **"myapp:// 로 시작하는 주소는 이 앱으로 열어줘"** 하고 등록

**실제 코드 흐름**

