from http.server import BaseHTTPRequestHandler, HTTPServer
from image_processing import process_image
from json import dumps

hostName = "localhost"
serverPort = 80

class MyServer(BaseHTTPRequestHandler):

    def do_POST(self):
        print("POST")
        if self.path == "/upload":
            self.send_response(200)
            self.send_header('Content-type', 'text/jpeg')
            self.end_headers()
            content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
            post_data = self.rfile.read(content_length) 
            images = process_image(post_data)
            self.wfile.write(images)
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()

    def do_GET(self):
        pass

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")