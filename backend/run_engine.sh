#! /bin/sh
# kill bot program if it is currently running

PID=$(ps -ef | grep app.py |grep -v grep |awk '{print $2}')

if [[ "$PID" ]]; then
	echo "** Killing running server"
	kill -9 $PID
fi

echo "** Prepare scenario dataset"
python ../talkengine/prepare_data.py -root_path=../talkengine/resource/ -input_path=../talkengine/resource/pre_analysis.tsv

echo "** Run tikitatka server"
nohup python app.py &

exit