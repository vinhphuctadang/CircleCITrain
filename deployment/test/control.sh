
CMD=$1
case $CMD in
  "start")
    echo "Starting environment: 'test'"
    docker-compose up -d
  ;;

  "stop")
    echo "Stopping environment: 'test'"
    docker-compose down
  ;;

  *)
    echo "Unknow command"
    exit 1
esac
