from http.server import BaseHTTPRequestHandler, HTTPServer
from image_processing import process_image, get_random_string
from json import dumps
from urllib.parse import urlparse, parse_qs

hostName = "localhost"
serverPort = 80

class MyServer(BaseHTTPRequestHandler):

    images = {}

    def do_POST(self):
        print("POST")
        if self.path == "/upload":
            self.send_response(200)
            self.send_header('Content-type', 'text/jpeg')
            self.end_headers()
            content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
            post_data = self.rfile.read(content_length) 
            images, colors = process_image(post_data)
            token = get_random_string(30)
            self.wfile.write(dumps({
                "token": token,
                "colors": colors
            }).encode())
            self.images[token] = {color: image for color, image in zip(colors, images)}
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()


    def do_GET(self):
        print("GET")
        if self.path.startswith("/next"):
            print("GET NEXT")
            # Get token and return next image
            try:
                parsed_url = urlparse(self.path)
                query_params = parse_qs(parsed_url.query)
                token = query_params['token'][0]
                color = query_params['color'][0]
                image = self.images[token].pop(color)
                if len(self.images[token].keys()) == 0:
                    self.images.pop(token)
            except:
                print(f"Failed to get data for token {token} and color {color}")
                self.send_response(404)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                return

            self.send_response(200)
            self.send_header('Content-type', 'text/jpeg')
            self.end_headers()
            self.wfile.write(image)
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")