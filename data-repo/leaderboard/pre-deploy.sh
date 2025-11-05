#!/usr/bin/env bash

: "${LEADERBOARD_REPO:=https://github.com/coronasafe/leaderboard.git}"

git init
git remote add --mirror=fetch upstream ${LEADERBOARD_REPO}
git pull upstream main

mkdir -p ../contributors ../data/github ../data/slack

ln -s ../ ./data-repo
