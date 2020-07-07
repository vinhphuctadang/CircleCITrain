
CMD=$1
case $CMD in
  "start")
    echo "Starting environment: 'dev'"
    docker-compose up -d
  ;;

  "stop")
    echo "Stopping environment: 'dev'"
    docker-compose down
  ;;

  *)
    echo "Unknow command"
    exit 1
esac
