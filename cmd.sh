
# detect environment
case $ENV in
	"dev")
		target="dev"
	;;
	"minikube")
		target="minikube"
	;;
	*)
		echo "error: ${ENV} is not supported. Only support 'dev' or 'minikube' environment"
		exit 1
	;;
esac

export target="deployment/${target}"

build(){
	docker build -t vinhphuctadang/app:latest .
	docker push vinhphuctadang/app:latest
}

startComponents(){
		DIR=$pwd
		cd ${target}
		./control.sh start
		cd ${DIR}
}

stop(){
	DIR=$pwd
	cd ${target}
	./control.sh stop
	cd ${DIR}
}

CMD=$1
case $CMD in
  "build")
    echo "Dockerizing server..."
    build
    ;;

  "start")
    echo "Working ..."
    startComponents
    ;;

  "stop")
    echo "Going to stop components in current environment..."
    stop
    ;;
  *)
    echo "Unknown"
    ;;
esac
