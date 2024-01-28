# Running and Using the Server
- Run with cwd in the topmost level of the repository
- run `pip install -r ./server/requirements.txt`

## Endpoints

### POST /upload
- Body should contain byte data for an image
- Response body: {"token": "TOKEN_STRING", "colors": ["LIST", "OF", "COLORS"]}

After hitting /upload, hit the GET /next endpoint with each color

### GET /next
- url should contain the following query params
  - color
  - token
ex: `http://localhost/next?color=orange&token=tprjlqusddxziiuharauznynouodaf`

- Response body: contains byte data for the image with the specified color's highlights.