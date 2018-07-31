FROM nginx:1.11.8
COPY dist/ /usr/share/nginx/html/lims-ui
COPY nginx.conf /etc/nginx/conf.d/default.conf
