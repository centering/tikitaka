#! /bin/sh
# kill bot program if it is currently running

PID_slack=$(ps -ef | grep run_slackbot.py | grep -v grep | awk '{print $2}')
PID_telegram=$(ps -ef | grep run_telegrambot.py |grep -v grep |awk '{print $2}')
PID_app=$(ps -ef | grep app.py |grep -v grep |awk '{print $2}')

if [[ "$PID_slack" ]] && [[ "$PID_telegram" ]] && [[ "$PID_app" ]]; then
	echo "** Killing running bot program"
	kill -9 $PID_slack $PID_telegram $PID_app
fi

echo "** Prepare scenario dataset"
python prepare_data.py -root_path=./resource/ -input_path=./resource/pre_analysis.tsv

echo "** Run slackbot server"
nohup python run_slackbot.py -thres_prob=0.9 &

echo "** Run telegrambot server"
nohup python run_telegrambot.py -thres_prob=0.9 &

echo "** Run tikitatka server"
nohup python app.py -thres_prob=0.9 &

exit