#! /bin/sh

echo "** Prepare scenario dataset"
python prepare_data.py -root_path=./resource/ -input_path=./resource/pre_analysis.tsv

echo "** Run slackbot server"
nohup python run_slackbot.py &

echo "** Run telegrambot server"
nohup python run_telegrambot.py &

exit