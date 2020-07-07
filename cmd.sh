
build(){
	docker build -t vinhphuctadang/key-value-server:latest .
	docker push vinhphuctadang/key-value-server:latest
}

startComponents(){
		DIR=$pwd
		cd ${target}
		./control.sh start
		cd ${DIR}
}

# detect environment
ENV=${ENV:-dev}

# set value for $ENV
case $ENV in
	"dev")
		target="dev"
	;;
	"minikube")
		target="minikube"
	;;

	"stage")
		target="stage"
	;;

	"test")
		target="test"
	;;

	*)
		echo "error: ${ENV} is not supported. Only support 'dev', 'test', 'minikube' or 'stage' environment"
		exit 1
	;;
esac

export target="deployment/${target}"

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
