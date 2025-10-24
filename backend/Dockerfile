FROM golang:1.23.5-alpine

WORKDIR $GOPATH/src

COPY . .

RUN go mod download
RUN go build -o /backend

EXPOSE 3000

CMD ["/backend"]