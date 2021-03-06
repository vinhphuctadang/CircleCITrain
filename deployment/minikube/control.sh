
start(){
  kubectl apply -f mongo.yaml
  kubectl apply -f app.yaml
  kubectl apply -f ingress.yaml
}

stop(){
  kubectl delete -f mongo.yaml
  kubectl delete -f app.yaml
  kubectl delete -f ingress.yaml
  helm install nginx ingress-nginx/ingress-nginx
}

CMD=$1
case $CMD in
  "start")
    echo "Starting environment: 'minikube'"
    start
  ;;

  "stop")
    echo "Stopping environment: 'minikube'"
    stop
  ;;

  *)
    echo "Unknow command"
    exit 1
esac
