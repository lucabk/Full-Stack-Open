{"collection":{"info":{"_postman_id":"5fe01e9c-a358-4715-9ae1-1b733a95a343","name":"FullStackOpen-Part13","schema":"https://schema.getpostman.com/json/collection/v2.1.0/collection.json","updatedAt":"2024-10-13T09:13:17.000Z","createdAt":"2024-10-11T13:39:49.000Z","lastUpdatedBy":"37886224","uid":"37886224-5fe01e9c-a358-4715-9ae1-1b733a95a343"},"item":[{"name":"login","event":[{"listen":"test","script":{"id":"1a751626-0319-43a4-a666-127a4374a05b","exec":["pm.test(\"Status code is 200\", function () {\r","    pm.response.to.have.status(200);\r","});"],"type":"text/javascript","packages":{}}}],"id":"8382f188-374d-4cde-95b6-525a33d92f54","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"POST","header":[],"body":{"mode":"raw","raw":"{\r\n    \"username\":\"silviodante@email.com\",\r\n    \"password\":\"silviodante\"\r\n}","options":{"raw":{"language":"json"}}},"url":{"raw":"http://localhost:3003/api/login","protocol":"http","host":["localhost"],"port":"3003","path":["api","login"]}},"response":[],"uid":"37886224-8382f188-374d-4cde-95b6-525a33d92f54"},{"name":"add_user_w/same_username","event":[{"listen":"test","script":{"id":"695f8b51-0f7b-4582-b7e9-b60733f79c39","exec":["pm.test(\"Status code is 409\", function () {\r","    pm.response.to.have.status(409);\r","});\r","pm.test(\"Body matches string\", function () {\r","    pm.expect(pm.response.text()).to.include(\"username must be unique\");\r","});"],"type":"text/javascript","packages":{}}}],"id":"12df4e8f-e438-4f83-95ed-6179e4477a5f","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"POST","header":[],"body":{"mode":"raw","raw":"{\r\n    \"username\":\"silviodante@email.com\",\r\n    \"name\":\"Silvio Dante\",\r\n    \"password\":\"silviodante\"\r\n}","options":{"raw":{"language":"json"}}},"url":{"raw":"http://localhost:3003/api/users","protocol":"http","host":["localhost"],"port":"3003","path":["api","users"]}},"response":[],"uid":"37886224-12df4e8f-e438-4f83-95ed-6179e4477a5f"},{"name":"add_user","event":[{"listen":"test","script":{"id":"695f8b51-0f7b-4582-b7e9-b60733f79c39","exec":["pm.test(\"Successful POST request\", function () {\r","    pm.expect(pm.response.code).to.be.oneOf([201, 202]);\r","});"],"type":"text/javascript","packages":{}}}],"id":"550827cc-52ca-4328-a0e4-041a65b7b429","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"POST","header":[],"body":{"mode":"raw","raw":"{\r\n    \"username\":\"littlepaulygualtieri@email.com\",\r\n    \"name\":\"Little Pauly Gualtieri\",\r\n    \"password\":\"littlegualtieri\"\r\n}","options":{"raw":{"language":"json"}}},"url":{"raw":"http://localhost:3003/api/users","protocol":"http","host":["localhost"],"port":"3003","path":["api","users"]}},"response":[],"uid":"37886224-550827cc-52ca-4328-a0e4-041a65b7b429"},{"name":"get_all_users","event":[{"listen":"test","script":{"id":"9dfcb97d-aa0a-4d03-8f33-6a99dedd0afe","exec":["pm.test(\"Status code is 200\", function () {\r","    pm.response.to.have.status(200);\r","});\r","\r",""],"type":"text/javascript","packages":{}}}],"id":"bc862b98-9057-4433-8b41-2e16eb22069f","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"GET","header":[],"url":{"raw":"http://localhost:3003/api/users","protocol":"http","host":["localhost"],"port":"3003","path":["api","users"]}},"response":[],"uid":"37886224-bc862b98-9057-4433-8b41-2e16eb22069f"},{"name":"get_user","event":[{"listen":"test","script":{"id":"357e3249-5c49-4a9a-b3b8-e9458e29b5e2","exec":["pm.test(\"Status code is 200\", function () {\r","    pm.response.to.have.status(200);\r","});\r",""],"type":"text/javascript","packages":{}}}],"id":"dfb12ce2-8d1c-472a-8d7a-e6e5dc7c7833","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"GET","header":[],"url":{"raw":"http://localhost:3003/api/users/1","protocol":"http","host":["localhost"],"port":"3003","path":["api","users","1"]}},"response":[],"uid":"37886224-dfb12ce2-8d1c-472a-8d7a-e6e5dc7c7833"},{"name":"put_user","event":[{"listen":"test","script":{"id":"3f33ff3b-616b-4ec5-bfd3-c8d9721793a0","exec":["\r","pm.test(\"Status code is 200\", function () {\r","    pm.response.to.have.status(200);\r","});\r",""],"type":"text/javascript","packages":{}}}],"id":"47c3122c-2c49-4054-868e-6280a87d35b0","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"PUT","header":[],"body":{"mode":"raw","raw":"{\r\n    \"username\":\"Anthonysoprano@email.com\",\r\n    \"password\":\"tonysoprano\"\r\n}","options":{"raw":{"language":"json"}}},"url":{"raw":"http://localhost:3003/api/users/Anthonysoprano@email.com","protocol":"http","host":["localhost"],"port":"3003","path":["api","users","Anthonysoprano@email.com"]}},"response":[],"uid":"37886224-47c3122c-2c49-4054-868e-6280a87d35b0"},{"name":"add_blog","event":[{"listen":"test","script":{"id":"1ef604aa-7793-4dd2-906a-d9539ec7d9dc","exec":["pm.test(\"Successful POST request\", function () {\r","    pm.expect(pm.response.code).to.be.oneOf([201, 202]);\r","});\r","pm.test(\"Content-Type is present\", function () {\r","    pm.response.to.have.header(\"Content-Type\");\r","});\r",""],"type":"text/javascript","packages":{}}}],"id":"ef4c9d9b-84b1-47a8-a34a-5668f2e94907","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"auth":{"type":"bearer","bearer":[{"key":"token","value":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNpbHZpb2RhbnRlQGVtYWlsLmNvbSIsImlkIjoyLCJpYXQiOjE3Mjg4MTEyNTN9.wcndyiNdQW8uQINJ1p-QgRret3FVItatc-cZD9rg1EE","type":"string"}]},"method":"POST","header":[],"body":{"mode":"raw","raw":"{\r\n    \"title\": \"W Rock\",\r\n    \"author\": \"W Man\",\r\n    \"url\": \"https://wkrock.com\",\r\n    \"likes\": 21\r\n}","options":{"raw":{"language":"json"}}},"url":{"raw":"http://localhost:3003/api/blogs","protocol":"http","host":["localhost"],"port":"3003","path":["api","blogs"]}},"response":[],"uid":"37886224-ef4c9d9b-84b1-47a8-a34a-5668f2e94907"},{"name":"get_all_blogs","event":[{"listen":"test","script":{"id":"75e70d91-cf22-4353-9556-9c6ea332b602","exec":["pm.test(\"Status code is 200\", function () {\r","    pm.response.to.have.status(200);\r","});"],"type":"text/javascript","packages":{}}}],"id":"ae58b482-6acb-4ae1-ac01-2d5439421df9","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"GET","header":[],"url":{"raw":"http://localhost:3003/api/blogs","protocol":"http","host":["localhost"],"port":"3003","path":["api","blogs"]}},"response":[],"uid":"37886224-ae58b482-6acb-4ae1-ac01-2d5439421df9"},{"name":"get_all_blogs_w/query","event":[{"listen":"test","script":{"id":"9f0071c4-affb-48ba-95a4-92d836afd966","exec":["\r","pm.test(\"Status code is 200\", function () {\r","    pm.response.to.have.status(200);\r","});\r",""],"type":"text/javascript","packages":{}}}],"id":"9b30be17-3743-4d3d-ab5b-e23aa62bed72","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"GET","header":[],"url":{"raw":"http://localhost:3003/api/blogs?search=book","protocol":"http","host":["localhost"],"port":"3003","path":["api","blogs"],"query":[{"key":"search","value":"book"}]}},"response":[],"uid":"37886224-9b30be17-3743-4d3d-ab5b-e23aa62bed72"},{"name":"delete_blog","id":"6cbfab32-016b-404d-b181-f658932b0ac6","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"auth":{"type":"bearer","bearer":[{"key":"token","value":"{{TOKEN_BLOG\n}}","type":"string"}]},"method":"DELETE","header":[],"url":{"raw":"http://localhost:3003/api/blogs/7","protocol":"http","host":["localhost"],"port":"3003","path":["api","blogs","7"]}},"response":[],"uid":"37886224-6cbfab32-016b-404d-b181-f658932b0ac6"},{"name":"get_blog","event":[{"listen":"test","script":{"id":"f2261358-c6d7-422e-b903-2fe7b938dda8","exec":["pm.test(\"Status code is 200\", function () {\r","    pm.response.to.have.status(200);\r","});\r",""],"type":"text/javascript","packages":{}}}],"id":"715d9884-5537-470a-a1b0-b6463b937fc2","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"GET","header":[],"url":{"raw":"http://localhost:3003/api/blogs/1","protocol":"http","host":["localhost"],"port":"3003","path":["api","blogs","1"]}},"response":[],"uid":"37886224-715d9884-5537-470a-a1b0-b6463b937fc2"}],"event":[{"listen":"prerequest","script":{"id":"dd55f73a-c19f-4fa6-af41-ff95290a9306","type":"text/javascript","packages":{},"exec":[""]}},{"listen":"test","script":{"id":"0ad90895-cfda-49c0-8828-2c4614c8e419","type":"text/javascript","packages":{},"exec":[""]}}]}}