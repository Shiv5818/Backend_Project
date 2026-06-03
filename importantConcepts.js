/*
is URL encoding.In URLs, @ is a special separator character.
Browsers, Node.js, MongoDB drivers all use this system.
| Character | Encoding |
| --------- | -------- |
| `@`       | `%40`    |
| `/`       | `%2F`    |
| `:`       | `%3A`    |
| `#`       | `%23`    |

*/

// Access token VS Refresh Token
/*
Access Token is Short lived 
Refresh Token is comparatively long lived

// Access Token and the Refresh Token
AT: it is short lived
RT: it is saved in the database and long lived 
