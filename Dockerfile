FROM nginx:alpine
COPY . /usr/share/nginx/html/

# docker run -p 8080:80 --name bmi-container bmi-image
# the app is running at http://localhost:8080/